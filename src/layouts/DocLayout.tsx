import type { FC } from "react";

import { Layout } from "../components/Layout";
import { allDocs } from ".contentlayer/data";
import type * as types from ".contentlayer/types";

export const DocLayout: FC<{ doc: types.Doc }> = ({ doc }) => {
  return (
    <Layout doc={doc}>
      <div>
        <h2>All Docs</h2>
        <ul>
          {allDocs.map((doc, idx) => {
            return (
              <li key={idx}>
                <a href={`/${doc.url_path}`}>{doc.title}</a>
              </li>
            );
          })}
        </ul>
      </div>
      <h1>{doc.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: doc.body.html }} />
    </Layout>
  );
};
