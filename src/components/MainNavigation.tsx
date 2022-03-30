import Link from 'next/link'
import { FC, useState } from 'react'

import { Icon, IconName } from './Icon'
import { Label } from './Label'
import { Logo } from './Logo'

const isExternalUrl = (link: string): boolean => !link.startsWith('/')

const navLinks: Array<{ label: string; url: string }> = [
  { label: 'Documentation', url: '/docs' },
  { label: 'Why Contentlayer?', url: '/docs/concepts/why-contentlayer' },
  { label: 'Blog', url: '/blog' },
  { label: 'Examples', url: '/docs/other/examples' },
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
  return (
    <Link href={url}>
      <a
        className="group flex h-8 items-center rounded-md bg-transparent px-3 text-sm font-medium leading-none text-slate-600 hover:bg-gray-50 hover:text-slate-700 dark:text-slate-300 dark:hover:bg-gray-900 dark:hover:text-slate-200"
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

export const MainNavigation = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed z-50 w-full border-b border-gray-200 bg-white bg-opacity-90 backdrop-blur backdrop-filter dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between px-4 md:px-8 lg:px-16">
        <div className="flex items-center space-x-2.5">
          <Link href="/">
            <a className="flex items-center space-x-2.5 font-bold text-slate-800 no-underline dark:text-white">
              <Logo />
              <span>Contentlayer</span>
            </a>
          </Link>
          <Label text="Beta" />
        </div>
        <div className="md:hidden">
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="flex h-8 w-8 items-center justify-end text-slate-600 dark:text-slate-300"
          >
            <span className="inline-block w-4">
              <Icon name={open ? 'close' : 'bars'} />
            </span>
          </button>
          {open && (
            <div className="fixed inset-0 top-[65px] z-50 h-screen bg-gray-950/10 pb-20 backdrop-blur-lg backdrop-filter dark:bg-gray-950/50">
              <nav className="absolute right-0 h-full divide-y divide-gray-200 border-l border-gray-200 bg-white p-8 dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-950">
                <div className="flex flex-col items-end space-y-2 pb-8">
                  {navLinks.map(({ label, url }, index) => (
                    <NavLink
                      key={index}
                      label={label}
                      url={url}
                      icon={isExternalUrl(url) ? 'external-link' : undefined}
                    />
                  ))}
                </div>
                {/* TODO search box */}
                <div className="flex items-center justify-end space-x-4 pt-8">
                  {iconLinks.map(({ label, icon, url }, index) => (
                    <NavLink key={index} label={label} hideLabel url={url} icon={icon} />
                  ))}
                </div>
              </nav>
            </div>
          )}
        </div>
        <nav className="hidden items-center divide-x divide-gray-200 dark:divide-gray-800 md:flex">
          <div className="flex items-center pr-2 lg:space-x-4 lg:pr-8">
            {navLinks.map(({ label, url }, index) => (
              <NavLink key={index} label={label} url={url} icon={isExternalUrl(url) ? 'external-link' : undefined} />
            ))}
          </div>
          {/* TODO search box */}
          <div className="flex items-center pl-2 lg:space-x-2 lg:pl-8">
            {iconLinks.map(({ label, icon, url }, index) => (
              <NavLink key={index} label={label} hideLabel url={url} icon={icon} />
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
