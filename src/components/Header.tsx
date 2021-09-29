import Link from "next/link";
import { useRouter } from "next/router";

import { headerConfig } from ".contentlayer/data";
import type * as types from ".contentlayer/types";

export const Header = () => {
  const router = useRouter();

  const navLinkClassName = (link: types.Link): string => {
    let classes = "ml-3";
    const currentPath = router?.asPath;
    if (
      currentPath === link.url ||
      (link.url !== "/" && currentPath.startsWith(link.url))
    ) {
      classes += " font-bold";
    }
    return classes;
  };

  return (
    <header className="px-6 py-4 flex justify-between border-b">
      <Link href="/">
        <a className="font-extrabold">Contentlayer</a>
      </Link>

      <nav className="text-sm flex">
        {(headerConfig.nav_links || []).map((item, idx: number) => {
          return (
            <Link key={idx} href={item.url}>
              <a className={navLinkClassName(item)}>{item.label}</a>
            </Link>
          );
        })}
      </nav>
    </header>
  );
};
