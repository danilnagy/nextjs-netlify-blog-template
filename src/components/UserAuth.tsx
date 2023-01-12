import React from "react";
import { PostContent } from "../lib/posts";
import PostItem from "./PostItem";
import TagLink from "./TagLink";
import Pagination from "./Pagination";
import { TagContent } from "../lib/tags";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

export default function UserAuth() {

  const { user, login, signup, logout } = useContext(AuthContext);

  const manageSubscription = () => {
    fetch("/.netlify/functions/create-manage-link", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((link) => {
        window.location.href = link;
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="wrapper">
      { user ? 
        <div className="text">
          You are logged in as <u>{user?.user_metadata.full_name}</u>. You can <span className="button" onClick={logout}>Log out</span> or <a className="button" onClick={manageSubscription}>Manage your subscription</a>.
        </div>
      : 
        <div className="text">
          <span className="button" onClick={login}>Log in</span> or <span className="button" onClick={signup}>Sign up</span> to view tutorials.
        </div>
      }      
      <style jsx>{`
        .wrapper {
          // padding: 2rem 0 0 0;
        }
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
        .text {
          line-height: 1.75rem;
        }
      `}</style>
    </div>
  );
}
