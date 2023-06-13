import { useKBar } from 'kbar'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { isExternalUrl } from '../../utils/helpers'
import { ColorSchemeSwitcher } from './ColorSchemeSwitcher'
import { Icon, IconName } from './Icon'
import { Label } from './Label'
import { Logo } from './Logo'

const navLinks: Array<{ label: string; url: string }> = [
  { label: 'Documentation', url: '/docs' },
  //
  // Removing this temporarily, until it is more active.
  // { label: 'Blog', url: '/blog' },
  //
  // NOTE until we have a proper example overview page and multiple examples, link directly to Next.js example
  { label: 'Examples', url: '/examples/nextjs' },
]

const iconLinks: Array<{ label: string; icon: IconName; url: string }> = [
  { label: 'Github', icon: 'github', url: 'https://github.com/contentlayerdev/contentlayer' },
  { label: 'Discord', icon: 'discord', url: 'https://discord.gg/rytFErsARm' },
]

const NavLink: FC<{ label?: string; hideLabel?: boolean; icon?: IconName; url: string }> = ({
  label,
  hideLabel = false,
  icon,
  url,
}) => {
  const router = useRouter()
  const active = router.pathname.split('/')[1] == url.replace('/', '')

  return (
    <Link href={url}>
      <a
        className={`group flex h-8 items-center rounded-md bg-transparent px-3 text-sm font-medium leading-none ${
          active
            ? 'bg-violet-50 text-violet-900 dark:bg-violet-500/20 dark:text-violet-50'
            : 'text-slate-600 hover:bg-gray-50 hover:text-slate-700 dark:text-slate-300 dark:hover:bg-gray-900 dark:hover:text-slate-200'
        }`}
        target={isExternalUrl(url) ? '_blank' : undefined}
        rel={isExternalUrl(url) ? 'noreferrer' : undefined}
      >
        {icon && (
          <span className="block w-5 text-slate-400 group-hover:text-slate-500 dark:text-slate-500 dark:group-hover:text-slate-400">
            <Icon name={icon} />
          </span>
        )}
        {label && <span className={hideLabel ? 'sr-only' : ''}>{label}</span>}
      </a>
    </Link>
  )
}

export const SearchButton: FC<{ showShortcut?: boolean }> = ({ showShortcut = true }) => {
  const { query } = useKBar()

  return (
    <button
      aria-label="Search"
      onClick={query.toggle}
      className="flex items-center h-8 px-2 text-sm border border-gray-200 rounded-md cursor-text bg-gray-50 hover:border-gray-300 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700 dark:hover:bg-gray-800"
    >
      <span className="block w-3 mr-2">
        <Icon name="search" />
      </span>
      <span className="mr-8 text-slate-400 dark:text-slate-500">Search...</span>
      {showShortcut && <Label text="⌘K" />}
    </button>
  )
}

export const MainNavigation = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed z-50 w-full bg-white border-b border-gray-200 bg-opacity-90 backdrop-blur backdrop-filter dark:border-gray-800 dark:bg-gray-950">
      <div className="flex items-center justify-between w-full h-16 px-4 mx-auto max-w-screen-2xl md:px-8 lg:px-16">
        <div className="flex items-center space-x-2.5">
          <Link href="/">
            <a className="flex items-center space-x-2.5 font-bold text-slate-800 no-underline dark:text-white">
              <Logo />
              <span className="-mt-0.5">Contentlayer</span>
            </a>
          </Link>
          <Label text="Beta" />
        </div>
        <div className="lg:hidden">
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="flex items-center justify-end w-8 h-8 text-slate-600 dark:text-slate-300"
          >
            <span className="inline-block w-4">
              <Icon name={open ? 'close' : 'bars'} />
            </span>
          </button>
          {open && (
            <div className="fixed inset-0 top-[65px] z-50 h-screen bg-gray-950/10 pb-20 backdrop-blur-lg backdrop-filter dark:bg-gray-950/50">
              <nav className="absolute right-0 h-full p-8 bg-white border-l border-gray-200 divide-y divide-gray-200 dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-950">
                <div className="flex flex-col items-end pb-8 space-y-2">
                  <div className="mb-2">
                    <SearchButton showShortcut={false} />
                  </div>
                  {navLinks.map(({ label, url }, index) => (
                    <NavLink
                      key={index}
                      label={label}
                      url={url}
                      icon={isExternalUrl(url) ? 'external-link' : undefined}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-end pt-8 space-x-4">
                  {iconLinks.map(({ label, icon, url }, index) => (
                    <NavLink key={index} label={label} hideLabel url={url} icon={icon} />
                  ))}
                </div>
              </nav>
            </div>
          )}
        </div>
        <nav className="items-center hidden divide-x divide-gray-200 dark:divide-gray-800 lg:flex">
          <div className="flex items-center pr-2 lg:space-x-4 lg:pr-8">
            {navLinks.map(({ label, url }, index) => (
              <NavLink key={index} label={label} url={url} icon={isExternalUrl(url) ? 'external-link' : undefined} />
            ))}
            <div className="px-3">
              <SearchButton />
            </div>
          </div>
          <div className="flex items-center pl-2 lg:space-x-2 lg:pl-8">
            <ColorSchemeSwitcher />
            {iconLinks.map(({ label, icon, url }, index) => (
              <NavLink key={index} label={label} hideLabel url={url} icon={icon} />
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
