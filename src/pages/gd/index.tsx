import { GetStaticProps } from "next";
import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import { SocialList } from "../../components/SocialList";
import PostList from "../../components/PostList";
import UserAuth from "../../components/UserAuth";
import { countPosts, listPostContent, PostContent } from "../../lib/posts";
import { listTags, TagContent } from "../../lib/tags";
import config from "../../lib/config";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

type Props = {
  posts: PostContent[];
  tags: TagContent[];
  pagination: {
    current: number;
    pages: number;
  };
  mode: string;
};

export default function Index({ posts, tags, pagination, mode }: Props) {

  const { user, login, signup, logout } = useContext(AuthContext);

  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className="container">
        <div>
          <h1>computerlab<span className="fancy">.</span>app<span className="fancy">/</span>gd</h1>
          <span className="handle">by <a href="https://colidescope.com">Colidescope.com</a></span>
          { mode !== "test" && <UserAuth />}
          <h2>Generative design course</h2>
          {/* <SocialList /> */}
          {/* { user && <PostList posts={posts} tags={tags} pagination={pagination} /> } */}
          <PostList posts={posts} tags={tags} pagination={pagination} />
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1 1 auto;
          padding: 0 1.5rem;
        }
        h1 {
          font-size: 2.0rem;
          margin: 0;
          font-weight: 600;
        }
        h2 {
          font-size: 1.5rem;
          font-weight: 400;
          line-height: 1.25;
        }
        .fancy {
          color: SteelBlue;
        }
        .handle {
          display: inline-block;
          margin-top: 0.275em;
          color: #9b9b9b;
          letter-spacing: 0.05em;
        }

        @media (min-width: 769px) {
          h1 {
            font-size: 3rem;
          }
          h2 {
            font-size: 2.25rem;
          }
        }
      `}</style>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = listPostContent(1, config.posts_per_page);
  const tags = listTags();
  const pagination = {
    current: 1,
    pages: Math.ceil(countPosts() / config.posts_per_page),
  };
  return {
    props: {
      posts,
      tags,
      pagination,
      mode: process.env.MODE || "none",
    },
  };
};