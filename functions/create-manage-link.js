const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { faunaFetch } = require("./utils/fauna");

exports.handler = async (_event, context) => {
  const { user } = context.clientContext;

  console.log(`Getting Stripe link for user: ${ user.user_metadata.full_name } / ${ user.sub }`)

  const result = await faunaFetch({
    query: `
      query ($netlifyID: ID!) {
        getUserByNetlifyID(netlifyID: $netlifyID) {
          stripeID
        }
      }
    `,
    variables: {
      netlifyID: user.sub,
    },
  });

  const { stripeID } = result.data.getUserByNetlifyID;
  
  console.log(`Found Stripe user with id: ${ stripeID }`)

  const link = await stripe.billingPortal.sessions.create({
    customer: stripeID,
    return_url: process.env.URL,
  });
  
  console.log(`Generated Stripe link: ${ link.url }`)

  return {
    statusCode: 200,
    body: JSON.stringify(link.url),
  };
};
