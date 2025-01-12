import React from "react";
import { PostContent } from "../lib/posts";
import PostItem from "./PostItem";
import TagLink from "./TagLink";
import Pagination from "./Pagination";
import { TagContent } from "../lib/tags";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { ro } from "date-fns/locale";

export default function UserAuth() {

  const { user, login, signup, logout } = useContext(AuthContext);

  const getRoles = (user) => {
    return user?.app_metadata.roles.map( (role) => {
      <span> {role} </span>
    })
  }

  const manageSubscription = () => {
    fetch("/.netlify/functions/create-manage-link", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((link) => {
        console.log(link);
        window.location.href = link;
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="wrapper">
      { user ? 
        <div className="text">
          <span>
            Welcome <u>{user?.user_metadata.full_name}</u> [
          </span>
          { user?.app_metadata?.roles?.map( (role) => (
            <span className="highlight" key={role}>{role}</span>
          ))}
          <span>
            ]. You can <span className="button" onClick={logout}>Log out</span>
            { !user?.app_metadata?.roles?.includes("guest") && <span> or  <a className="button" onClick={manageSubscription}>Manage your subscription</a>. </span>}
            
          </span>
        </div>
      : 
        <div className="text">
          <span>Welcome. Please <span className="button" onClick={login}>Log in</span> or <span className="button" onClick={signup}>Sign up</span> to access all site content.
          </span>
        </div>
      }      
      <style jsx>{`
        .wrapper {
          margin: 2rem 0;
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
        .highlight {
          background-color: yellow;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
