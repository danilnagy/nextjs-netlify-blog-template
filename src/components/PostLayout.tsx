import React from "react";
import Link from "next/link";
import styles from "../../public/styles/content.module.css";
import Author from "./Author";
import Copyright from "./Copyright";
import Date from "./Date";
import Layout from "./Layout";
import BasicMeta from "./meta/BasicMeta";
import JsonLdMeta from "./meta/JsonLdMeta";
import OpenGraphMeta from "./meta/OpenGraphMeta";
import TwitterCardMeta from "./meta/TwitterCardMeta";
import { SocialList } from "./SocialList";
import TagButton from "./TagButton";
import { getAuthor } from "../lib/authors";
import { getTag } from "../lib/tags";
import UserAuth from "../components/UserAuth";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import NavLinks from "../components/NavLinks";

type Props = {
  title: string;
  date: Date;
  slug: string;
  tags: string[];
  roles: string[];
  nextRoles: string[];
  author: string;
  prev: string;
  next: string;
  description?: string;
  children: React.ReactNode;
  mode: string;
};
export default function PostLayout({
  title,
  date,
  slug,
  author,
  prev,
  next,
  tags,
  roles,
  nextRoles,
  description = "",
  children,
  mode,
}: Props) {

  const keywords = tags.map(it => getTag(it).name);
  const authorName = getAuthor(author).name;

  const { user, login, signup, logout } = useContext(AuthContext);

  return (
    <Layout>
      <BasicMeta
        url={`/posts/${slug}`}
        title={title}
        keywords={keywords}
        description={description}
      />
      <TwitterCardMeta
        url={`/posts/${slug}`}
        title={title}
        description={description}
      />
      <OpenGraphMeta
        url={`/posts/${slug}`}
        title={title}
        description={description}
      />
      <JsonLdMeta
        url={`/posts/${slug}`}
        title={title}
        keywords={keywords}
        date={date}
        author={authorName}
        description={description}
      />
      <div className={"container"}>
        <div className="topLinks">
          <Link href={'/'}>
            <a className="button">{`< Go back`}</a>
          </Link> to main
        </div>
        <article>
          <header>
            <h1>{title}</h1>
            <div className={"metadata"}>
              <div>
                <Date date={date} />
              </div>
              <div>
                <Author author={getAuthor(author)} />
              </div>
            </div>
          </header>
          { mode !== "test" && <UserAuth />}
          { (user && (roles.includes(user.app_metadata.roles[0])) || roles.length == 0 ?
            <div>
              <div className={styles.content}>{children}</div> 
              {/* <ul className={"tag-list"}>
                {tags.map((it, i) => (
                  <li key={i}>
                    <TagButton tag={getTag(it)} />
                  </li>
                ))}
              </ul> */}
            </div>
            :
            <div>
              <div className="notice">
                <span>{"🔒 You need a"}
                { roles.map( (role) => {
                  return <span className="highlight" key={role}>{role}</span>
                }) }
                {"account to access this content. Please use the link above to upgrade your subscription."}
                </span>
              </div>
            </div>
            )
          }
        </article>
        { (user && (roles.includes(user.app_metadata.roles[0])) || roles.length == 0 &&
            <NavLinks prev={prev} next={next} nextRoles={nextRoles} role={user?.app_metadata.roles[0]}/>
          )
        }
        <footer>
          {/* <div className={"social-list"}>
            <SocialList />
          </div>
          <Copyright /> */}
        </footer>
      </div>
      <style jsx>
        {`
            header {
              margin: 0 0 2rem 0;
            }
            .container {
              display: block;
              max-width: 1000px;
              width: 100%;
              margin: 0 auto;
              // padding: 0 1.5rem;
              box-sizing: border-box;
              z-index: 0;
            }
            .topLinks {
              z-index: 10;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              gap: 0.5rem;
            }
            footer {
              padding-bottom: 4rem;
            }
            .metadata div {
              display: inline-block;
              margin-right: 0.5rem;
            }
            article {
              flex: 1 0 auto;
              padding: 2rem;
              background-color: white;
              // box-shadow: 0px 0px 50px 0px rgb(0 0 0 / 8%);
            }
            h1 {
              margin: 0 0 0.5rem;
              font-size: 2.25rem;
            }
            .tag-list {
              list-style: none;
              text-align: right;
              margin: 1.75rem 0 0 0;
              padding: 0;
            }
            .tag-list li {
              display: inline-block;
              margin-left: 0.5rem;
            }
            .social-list {
              margin-top: 3rem;
              text-align: center;
            }
            .notice {
              margin: 2rem 0;
              display: flex;
              justify-content: center;
              padding: 1rem;
              background-color: LightSalmon;
              border: 2px solid Crimson;
              line-height: 1.5rem;
            }
            .button {
              color: black;
              font-weight: 300;
              padding: 0.25rem 0.5rem;
              background-color: LightBlue;
              border-bottom: 3px solid SteelBlue;
              // border: 1px solid black;
            }
            .button :hover {
              color: white;
              background-color: SteelBlue;
              cursor: pointer;
            }
            .highlight {
              font-weight: 600;
              color: white;
              margin: 0 0.25rem;
              padding: 0 0.25rem;
              background-color: Crimson;
            }

            @media (min-width: 768px) {
              .container {
                display: flex;
                flex-direction: column;
              }
            }
          `}
      </style>
      <style global jsx>
        {`
            /* Syntax highlighting */
            .token.comment,
            .token.prolog,
            .token.doctype,
            .token.cdata,
            .token.plain-text {
              color: #6a737d;
            }

            .token.atrule,
            .token.attr-value,
            .token.keyword,
            .token.operator {
              color: #d73a49;
            }

            .token.property,
            .token.tag,
            .token.boolean,
            .token.number,
            .token.constant,
            .token.symbol,
            .token.deleted {
              color: #22863a;
            }

            .token.selector,
            .token.attr-name,
            .token.string,
            .token.char,
            .token.builtin,
            .token.inserted {
              color: #032f62;
            }

            .token.function,
            .token.class-name {
              color: #6f42c1;
            }

            /* language-specific */

            /* JSX */
            .language-jsx .token.punctuation,
            .language-jsx .token.tag .token.punctuation,
            .language-jsx .token.tag .token.script,
            .language-jsx .token.plain-text {
              color: #24292e;
            }

            .language-jsx .token.tag .token.attr-name {
              color: #6f42c1;
            }

            .language-jsx .token.tag .token.class-name {
              color: #005cc5;
            }

            .language-jsx .token.tag .token.script-punctuation,
            .language-jsx .token.attr-value .token.punctuation:first-child {
              color: #d73a49;
            }

            .language-jsx .token.attr-value {
              color: #032f62;
            }

            .language-jsx span[class="comment"] {
              color: pink;
            }

            /* HTML */
            .language-html .token.tag .token.punctuation {
              color: #24292e;
            }

            .language-html .token.tag .token.attr-name {
              color: #6f42c1;
            }

            .language-html .token.tag .token.attr-value,
            .language-html
              .token.tag
              .token.attr-value
              .token.punctuation:not(:first-child) {
              color: #032f62;
            }

            /* CSS */
            .language-css .token.selector {
              color: #6f42c1;
            }

            .language-css .token.property {
              color: #005cc5;
            }
          `}
      </style>
    </Layout>
  );
}
