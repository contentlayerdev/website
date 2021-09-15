import type { FC } from "react";
// import React from "react";

import { Layout } from "../components/Layout";
// import { htmlToReact, withPrefix } from "../utils";
import type * as types from ".contentlayer/types";

export const DocLayout: FC<{ doc: types.Doc }> = ({ doc }) => {
  console.log(doc);

  return (
    <Layout doc={doc}>
      <h1>{doc.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: doc.body.html }} />
    </Layout>
  );
};
