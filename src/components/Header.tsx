import Link from 'next/link'
import { useRouter } from 'next/router'

import { headerConfig } from '.contentlayer/data'
import type * as types from '.contentlayer/types'

export const Header = () => {
  const router = useRouter()

  const navLinkClassName = (link: types.Link): string => {
    let classes = 'ml-3 text-black no-underline'
    const currentPath = router?.asPath
    if (currentPath === link.url || (link.url !== '/' && currentPath.startsWith(link.url))) {
      classes += ' font-bold'
    }
    return classes
  }

  return (
    <header className="flex fixed z-10 justify-between px-6 py-4 w-full bg-white bg-opacity-90 border-b backdrop-filter backdrop-blur-sm">
      <Link href="/">
        <a className="font-extrabold text-black no-underline">Contentlayer</a>
      </Link>

      <nav className="flex text-sm">
        {(headerConfig.nav || []).map((item, idx: number) => {
          return (
            <Link key={idx} href={item.url}>
              <a className={navLinkClassName(item)}>{item.label}</a>
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
