import { GetStaticProps, GetStaticPaths } from "next";
import renderToString from "next-mdx-remote/render-to-string";
import { MdxRemote } from "next-mdx-remote/types";
import hydrate from "next-mdx-remote/hydrate";
import matter from "gray-matter";
import { fetchPostContent } from "../../lib/posts";
import fs from "fs";
import yaml from "js-yaml";
import { parseISO } from 'date-fns';
import PostLayout from "../../components/PostLayout";

import InstagramEmbed from "react-instagram-embed";
import YouTube from "react-youtube";
import { TwitterTweetEmbed } from "react-twitter-embed";
import rehypeHighlight from "rehype-highlight"

import { PluggableList } from "unified";

export type Props = {
  title: string;
  dateString: string;
  slug: string;
  tags: string[];
  roles?: string[];
  nextRoles?: string[];
  author: string;
  prev?: string;
  next?: string;
  description?: string;
  source: MdxRemote.Source;
  mode: string;
};

const components = { InstagramEmbed, YouTube, TwitterTweetEmbed };
const slugToPostContent = (postContents => {
  let hash = {}
  postContents.forEach(it => hash[it.slug] = it)
  return hash;
})(fetchPostContent());

export default function Post({
  title,
  dateString,
  slug,
  tags,
  roles = [],
  nextRoles = [],
  author,
  prev = "",
  next = "",
  description = "",
  source,
  mode,
}: Props) {
  const content = hydrate(source, { components })
  return (
    <PostLayout
      title={title}
      date={parseISO(dateString)}
      slug={slug}
      tags={tags}
      roles={roles}
      nextRoles={nextRoles}
      author={author}
      prev={prev}
      next={next}
      description={description}
      mode={mode}
    >
      {content}
      {/* Restricted */}
    </PostLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fetchPostContent().map(it => "/posts/" + it.slug);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.post as string;
  const source = fs.readFileSync(slugToPostContent[slug].fullPath, "utf8");
  const { content, data } = matter(source, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object }
  });
  const mdxSource = await renderToString(content, { components, scope: data, mdxOptions: { rehypePlugins: [rehypeHighlight] as PluggableList } });
  return {
    props: {
      title: data.title,
      dateString: data.date,
      slug: data.slug,
      description: "",
      tags: data.tags,
      roles: data.roles || [],
      nextRoles: data.nextRoles || [],
      author: data.author,
      prev: data.prev || "",
      next: data.next || "",
      source: mdxSource,
      mode: process.env.MODE || "none",
    },
  };
};

