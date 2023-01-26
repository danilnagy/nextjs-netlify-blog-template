import Link from "next/link";
import { TagContent } from "../lib/tags";
import Tooltip from "../components/Tooltip";

type Props = {
  prev?: string;
  next?: string;
  nextRoles?: string[];
  role: string;
};
export default function NextLink({ prev, next, nextRoles, role }: Props) {
  return (
    <div className="container">
      { prev ? <Link href={prev}>
        <a className="button">{`< Previous`}</a>
      </Link> : <div></div>}
      { next && ( nextRoles.includes(role) || nextRoles.length == 0 ? <Link href={next}>
        <a className="button">{`Next >`}</a>
      </Link> : 
        <Tooltip content={"FOO"} direction={"top"} roles={nextRoles}>
          <span className="disabled">{`🔒 Next >`}</span>
        </Tooltip>
      ) }
      <style jsx>{`
        .container {
          // padding: 2em 0 0 0;
          display: flex;
          justify-content: space-between;
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
        .disabled {
          padding: 0.5rem 0.5rem;
          background-color: LightSalmon;
          border: 2px solid Crimson;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
