const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { faunaFetch } = require("./utils/fauna");

exports.handler = async (event) => {
  const { user } = JSON.parse(event.body);

  console.log(`Registering user: ${ user.user_metadata.full_name }`)

  // create a new customer in Stripe
  const customer = await stripe.customers.create({
    email: user.email,
    name: user.user_metadata.full_name,
  });
  
  console.log(`Created new Stripe customer with id: ${ customer.id }`)

  // subscribe the new customer to the free plan
  await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: process.env.STRIPE_DEFAULT_PRICE_PLAN }],
  });

  // store the Netlify and Stripe IDs in Fauna
  const result = await faunaFetch({
    query: `
      mutation ($netlifyID: ID!, $stripeID: ID!) {
        createUser(data: { netlifyID: $netlifyID, stripeID: $stripeID }) {
          netlifyID
          stripeID
        }
      }
    `,
    variables: {
      netlifyID: user.id,
      stripeID: customer.id,
    },
  });

  console.log(`User data stored in DB: ${ user.id } / ${ customer.id }`)

  return {
    statusCode: 200,
    body: JSON.stringify({
      app_metadata: {
        roles: ["guest"], // switch to go live
        // roles: ["free"],
      },
    }),
  };
};
