import { PostContent } from "../lib/posts";
import Date from "./Date";
import Link from "next/link";
import { parseISO } from "date-fns";

type Props = {
  post: PostContent;
  index?: number;
};
export default function PostItem({ post, index }: Props) {
  return (
    <Link href={"/posts/" + post.slug}>
      <a>
        {/* <Date date={parseISO(post.date)} /> */}
        <h2>{`${index != undefined ? index + 1 : ''}. ${post.title}`}</h2>
        <style jsx>
          {`
            a {
              color: #222;
              display: inline-block;
              padding: 0.25rem 0;
              margin-left: -0.5rem;
              cursor: pointer;
            }
            a :hover {
              background-color: lightblue;
              box-shadow: 4px 4px 0px 0px steelblue;
            }
            a :active {
              color: white;
              background-color: steelblue;
              box-shadow: none;
            }
            // h2 {
            //   margin: 0;
            //   font-weight: 500;
            // }
            h2 {
              margin: 0;
              font-size: 1.25rem;
              font-weight: 400;
              padding: 0.5rem;
            }
            @media (min-width: 768px) {
              h2 {
                font-size: 1.75rem;
              }
            }
          `}
        </style>
      </a>
    </Link>
  );
}
