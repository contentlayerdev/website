import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";

import { Layout } from "../components/Layout";
import { allDocs } from ".contentlayer/data";
import type * as types from ".contentlayer/types";

export const DocLayout: FC<{ doc: types.Doc }> = ({ doc }) => {
  const router = useRouter();

  const navLinkClassName = (doc: types.Doc): string => {
    let classes = ["px-2", "py-2", "block", "rounded-md"];
    if (router?.asPath === `/${doc.url_path}`) {
      classes.push("bg-gray-200 font-semibold");
    } else {
      classes.push("hover:bg-gray-100 text-gray-700");
    }
    return classes.join(" ");
  };

  return (
    <Layout doc={doc}>
      <div className="flex">
        <aside className="p-4 border-r w-64">
          <nav className="text-sm">
            {allDocs.map((doc, idx) => {
              return (
                <span className="block mb-2">
                  <Link key={idx} href={`/${doc.url_path}`}>
                    <a className={navLinkClassName(doc)}>{doc.title}</a>
                  </Link>
                </span>
              );
            })}
          </nav>
        </aside>
        <div className="flex-1 p-4">
          <h1>{doc.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: doc.body.html }} />
        </div>
      </div>
    </Layout>
  );
};
