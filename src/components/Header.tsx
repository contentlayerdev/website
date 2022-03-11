import Link from 'next/link'
import { useRouter } from 'next/router'

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
  const router = useRouter()

  return (
    <header className="fixed z-10 flex justify-between w-full px-6 items-center bg-white border-b border-gray-100 dark:bg-gray-950 dark:border-gray-800 bg-opacity-90 backdrop-filter backdrop-blur-sm h-[60px]">
      <div className="flex items-center space-x-2.5">
        <Link href="/">
          <a className="flex items-center space-x-2.5 font-bold no-underline text-slate-800 dark:text-white">
            <Logo />
            <span>Contentlayer</span>
          </a>
        </Link>
        <Label text="Beta" />
      </div>

      <nav className="flex items-center space-x-3 text-sm">
        {navLinks.map((link, idx) => (
          <Link key={idx} href={link.url}>
            <a
              className="inline-flex items-center space-x-1 font-medium text-slate-500 dark:text-slate-300 hover:text-slate-950 dark:hover:text-slate-100"
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

        {/* TODO search box */}

        <div className="flex">
          {iconLinks.map((link, idx) => (
            <Link href={link.url} key={idx}>
              <a
                className="p-2 text-current inline-block w-10 dark:text-slate-300 dark:hover:text-slate-100"
                target={isExternalUrl(link.url) ? '_blank' : undefined}
              >
                <Icon name={link.name} />
              </a>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
