import type { FC } from "react";
import { Helmet } from "react-helmet";

import type * as types from ".contentlayer/types";

import { Header } from "./Header";

export const Layout: FC<{
  doc: types.Doc | types.Page;
}> = ({ doc, children, ...props }) => {
  return (
    <>
      <Helmet>
        <title>{doc.title}</title>
      </Helmet>
      <Header />
      <div id="page" className="site">
        <main>{children}</main>
      </div>
    </>
  );
};
