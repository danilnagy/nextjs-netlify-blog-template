import React from "react";
import { PostContent } from "../lib/posts";
import PostItem from "./PostItem";
import TagLink from "./TagLink";
import Pagination from "./Pagination";
import { TagContent } from "../lib/tags";

// type Props = {
//   user: PostContent[];
//   tags: TagContent[];
//   pagination: {
//     current: number;
//     pages: number;
//   };
// };
export default function UserText() {
  return (
    <div>
      {/* <span className="button">Log in</span> or <span className="button">Sign up</span> to view tutorials. */}
      You are logged in as <u>Danil</u>. You can <a className="button">Log out</a> or <a className="button">Manage your subscription</a>.
      <style jsx>{`
        .button {
          color: black;
          font-weight: 300;
          padding: 0 0.25rem ;
          background-color: LightBlue;
          border-bottom: 3px solid SteelBlue;
          // border: 1px solid black;
        }
        .button :hover {
          color: white;
          background-color: SteelBlue;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
