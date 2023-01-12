import Link from "next/link";
import { TagContent } from "../lib/tags";

type Props = {
  prev?: string;
  next?: string;
};
export default function NextLink({ prev, next }: Props) {
  return (
    <div className="container">
      { prev ? <Link href={prev}>
        <a className="button">{`< Previous`}</a>
      </Link> : <div></div>}
      { next && <Link href={next}>
        <a className="button">{`Next >`}</a>
      </Link>}
      <style jsx>{`
        .container {
          padding: 2em 0 0 0;
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
      `}</style>
    </div>
  );
}
