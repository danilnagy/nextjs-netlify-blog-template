import React from "react";
import { PostContent } from "../lib/posts";
import PostItem from "./PostItem";
import TagLink from "./TagLink";
import Pagination from "./Pagination";
import { TagContent } from "../lib/tags";

type Props = {
  loggedIn: boolean;
  login: React.MouseEventHandler<HTMLButtonElement>;
  logout: React.MouseEventHandler<HTMLButtonElement>;
  user: any;
};
export default function UserText({ loggedIn, login, logout, user }: Props) {
  return (
    <div>
      { loggedIn ? 
        <div>
          You are logged in as <u>{user?.user_metadata.full_name}</u>. You can <span className="button" onClick={logout}>Log out</span> or <a className="button">Manage your subscription</a>.
        </div>
      : 
        <div>
          <span className="button" onClick={login}>Log in</span> or <span className="button">Sign up</span> to view tutorials.
        </div>
      }
      {/*  */}
      
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
