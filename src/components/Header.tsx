import Link from 'next/link'
import { useState } from 'react'

import { Icon, IconName } from '../components/Icon'
import { Label } from '../components/Label'
import { Logo } from './Logo'

function isExternalUrl(link: string): boolean {
  return !link.startsWith('/')
}

const navLinks: Array<{ label: string; url: string }> = [
  { label: 'Docs', url: '/docs' },
  { label: 'Why Contentlayer?', url: '/docs/concepts/why-contentlayer' },
  { label: 'Blog', url: '/blog' },
  { label: 'Examples', url: '/docs/other/examples' },
]

const iconLinks: Array<{ name: IconName; url: string }> = [
  { name: 'github', url: 'https://github.com/contentlayerdev/contentlayer' },
  { name: 'discord', url: 'https://discord.gg/rytFErsARm' },
]

export const Header = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed z-10 flex justify-between w-full px-4 md:px-8 items-center bg-white border-b border-gray-100 dark:bg-gray-950 dark:border-gray-800 bg-opacity-90 backdrop-filter backdrop-blur h-20">
      <div className="flex items-center space-x-2.5">
        <Link href="/">
          <a className="flex items-center space-x-2.5 font-bold no-underline text-slate-800 dark:text-white">
            <Logo />
            <span>Contentlayer</span>
          </a>
        </Link>
        <Label text="Beta" />
      </div>
      <div className="md:hidden">
        <button type="button" aria-label="Toggle menu" onClick={() => setOpen(!open)} className="flex items-center">
          <span className="inline-block w-5">
            <Icon name={open ? 'close' : 'bars'} />
          </span>
        </button>
        {open && (
          <div className="fixed z-50 inset-x-0 top-20 h-screen pb-20 bg-white dark:bg-gray-950 bg-opacity-90 backdrop-filter backdrop-blur">
            <nav className="h-full flex flex-col justify-center items-center space-y-16">
              <div className="flex flex-col items-center space-y-8">
                {navLinks.map((link, idx) => (
                  <Link key={idx} href={link.url}>
                    <a
                      className="inline-flex items-center space-x-1 font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                      target={isExternalUrl(link.url) ? '_blank' : undefined}
                    >
                      <span>{link.label}</span>
                      {isExternalUrl(link.url) && (
                        <span className="inline-block w-4">
                          <Icon name="external-link" />
                        </span>
                      )}
                    </a>
                  </Link>
                ))}
              </div>
              {/* TODO search box */}
              <div className="flex items-center space-x-4">
                {iconLinks.map((link, idx) => (
                  <Link href={link.url} key={idx}>
                    <a
                      className="inline-block w-5 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                      target={isExternalUrl(link.url) ? '_blank' : undefined}
                    >
                      <span className="sr-only">{link.name}</span>
                      <Icon name={link.name} />
                    </a>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
      <nav className="hidden md:flex items-center space-x-16">
        <div className="flex items-center space-x-4 lg:space-x-8">
          {navLinks.map((link, idx) => (
            <Link key={idx} href={link.url}>
              <a
                className="inline-flex items-center space-x-1 font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                target={isExternalUrl(link.url) ? '_blank' : undefined}
              >
                <span>{link.label}</span>
                {isExternalUrl(link.url) && (
                  <span className="inline-block w-4">
                    <Icon name="external-link" />
                  </span>
                )}
              </a>
            </Link>
          ))}
        </div>
        {/* TODO search box */}
        <div className="flex items-center space-x-4">
          {iconLinks.map((link, idx) => (
            <Link href={link.url} key={idx}>
              <a
                className="inline-block w-5 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                target={isExternalUrl(link.url) ? '_blank' : undefined}
              >
                <span className="sr-only">{link.name}</span>
                <Icon name={link.name} />
              </a>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
