import type { FC } from "react";
import { Helmet } from "react-helmet";

import type * as types from ".contentlayer/types";

export const Layout: FC<{
  doc: types.Doc;
}> = ({ doc, children, ...props }) => {
  return (
    <>
      <Helmet>
        <title>{doc.title}</title>
      </Helmet>
      <div id="page" className="site">
        <main>{children}</main>
      </div>
    </>
  );
};
