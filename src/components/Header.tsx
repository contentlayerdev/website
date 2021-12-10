import Link from 'next/link'
import { useRouter } from 'next/router'

import { headerConfig } from '.contentlayer/data'
import classNames from 'classnames'

export const Header = () => {
  const router = useRouter()

  return (
    <header className="fixed z-10 flex justify-between w-full px-6 items-center bg-white border-b border-gray-100 dark:bg-gray-950 dark:border-gray-800 bg-opacity-90 backdrop-filter backdrop-blur-sm h-[60px]">
      <div className="flex items-center space-x-2.5">
        <Link href="/">
          <a className="font-extrabold no-underline text-gray-950 dark:text-white">Contentlayer</a>
        </Link>
        <span className="px-1.5 py-0.5 uppercase bg-blue-50 text-blue-400 border border-blue-100 dark:border-blue-900/90 dark:bg-blue-900/10 dark:text-blue-300 rounded-md tracking-wide [font-size:11px]">
          Alpha
        </span>
      </div>

      <nav className="flex items-center space-x-3 text-sm">
        {(headerConfig.nav ?? []).map((link, idx) => {
          const isActive = router.asPath === link.url || (link.url !== '/' && router.asPath.startsWith(link.url))
          return (
            <Link key={idx} href={link.url}>
              <a
                className={classNames(
                  ' inline-flex items-center space-x-1 font-medium',
                  isActive
                    ? 'text-gray-950 dark:text-gray-100'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-950 dark:hover:text-gray-100',
                )}
              >
                <span>{link.label}</span>
                {link.isExternal && <ExternalLinkIcon />}
              </a>
            </Link>
          )
        })}
        <GitHubLogoLink />
      </nav>
    </header>
  )
}

const GitHubLogoLink = () => (
  <a className="p-2 text-current" href="https://github.com/contentlayerdev/contentlayer" target="_blank">
    <svg height="24" viewBox="2 2 20 20" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3C7.0275 3 3 7.12937 3 12.2276C3 16.3109 5.57625 19.7597 9.15374 20.9824C9.60374 21.0631 9.77249 20.7863 9.77249 20.5441C9.77249 20.3249 9.76125 19.5982 9.76125 18.8254C7.5 19.2522 6.915 18.2602 6.735 17.7412C6.63375 17.4759 6.19499 16.6569 5.8125 16.4378C5.4975 16.2647 5.0475 15.838 5.80124 15.8264C6.51 15.8149 7.01625 16.4954 7.18499 16.7723C7.99499 18.1679 9.28875 17.7758 9.80625 17.5335C9.885 16.9337 10.1212 16.53 10.38 16.2993C8.3775 16.0687 6.285 15.2728 6.285 11.7432C6.285 10.7397 6.63375 9.9092 7.20749 9.26326C7.1175 9.03257 6.8025 8.08674 7.2975 6.81794C7.2975 6.81794 8.05125 6.57571 9.77249 7.76377C10.4925 7.55615 11.2575 7.45234 12.0225 7.45234C12.7875 7.45234 13.5525 7.55615 14.2725 7.76377C15.9937 6.56418 16.7475 6.81794 16.7475 6.81794C17.2424 8.08674 16.9275 9.03257 16.8375 9.26326C17.4113 9.9092 17.76 10.7281 17.76 11.7432C17.76 15.2843 15.6563 16.0687 13.6537 16.2993C13.98 16.5877 14.2613 17.1414 14.2613 18.0065C14.2613 19.2407 14.25 20.2326 14.25 20.5441C14.25 20.7863 14.4188 21.0746 14.8688 20.9824C16.6554 20.364 18.2079 19.1866 19.3078 17.6162C20.4077 16.0457 20.9995 14.1611 21 12.2276C21 7.12937 16.9725 3 12 3Z"
        fill="currentColor"
      />
    </svg>
  </a>
)

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
)
