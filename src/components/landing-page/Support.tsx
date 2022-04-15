import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'

const content = {
  logosPath: '/images/logos/',
  frameworks: {
    label: 'Supported Frameworks',
    items: [
      {
        logo: { file: 'nextjs.svg', width: 81, height: 48 },
        label: 'Next.js',
        url: '/docs/environments/nextjs',
        supported: true,
      },
      {
        logo: { file: 'remix.svg', width: 28, height: 32 },
        label: 'Remix',
        url: '/docs/environments/remix',
        supported: false,
      },
      {
        logo: { file: 'vite.svg', width: 36, height: 36 },
        label: 'Vite',
        url: '/docs/environments/vite',
        supported: false,
      },
      {
        logo: { file: 'astro.svg', width: 26, height: 40 },
        label: 'Astro',
        url: '/docs/environments/astro',
        supported: false,
      },
    ],
  },
  contentSources: {
    label: 'Supported Content Sources',
    items: [
      // TODO add links to docs
      {
        logo: { file: 'mdx.svg', width: 77, height: 32 },
        label: 'MDX',
        url: '/docs/sources/files',
        supported: true,
      },
      {
        logo: { file: 'contentful.svg', width: 33, height: 38 },
        label: 'Contentful',
        url: '/docs/sources/contentful',
        supported: 'Planned',
      },
      {
        logo: { file: 'notion.svg', width: 39, height: 38 },
        label: 'Notion',
        url: '/docs/sources/notion',
        supported: false,
      },
      {
        logo: { file: 'sanity.svg', width: 135, height: 28 },
        label: 'Sanity',
        url: '/docs/sources/sanity',
        supported: false,
      },
    ],
  },
}

export const Support: FC = () => {
  return (
    <div className="w-full max-w-screen-xl px-4 pt-16 mx-auto md:px-8 md:pt-24">
      <div className="flex flex-col justify-center space-y-8 md:flex-row md:space-y-0 md:space-x-16">
        <div>
          <h2 className="mt-0 mb-2 text-sm font-normal text-slate-500 md:text-center">{content.frameworks.label}</h2>
          <div className="flex flex-wrap items-center -mx-3">
            {content.frameworks.items.map(({ logo, label, url, supported }, index) => (
              <Link key={index} href={url}>
                <a className="flex items-center h-16 p-3 dark:brightness-150 dark:filter">
                  <Tooltip.Root delayDuration={100}>
                    <Tooltip.Trigger className="flex items-center h-full">
                      <Image
                        src={content.logosPath + logo.file}
                        alt={label}
                        width={logo.width}
                        height={logo.height}
                        className={`${supported ? 'opacity-100' : 'opacity-25'}`}
                      />
                    </Tooltip.Trigger>
                    <Tooltip.Content
                      sideOffset={10}
                      className="rounded bg-gray-800 px-3 py-1.5 text-sm text-slate-100 shadow-xl shadow-white dark:bg-violet-200 dark:text-violet-900 dark:shadow-black"
                    >
                      {`${label}${supported ? '' : ' – Considering to add support.'}`}
                      <Tooltip.Arrow className="mx-1 text-gray-800 fill-current dark:text-violet-200" />
                    </Tooltip.Content>
                  </Tooltip.Root>
                </a>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mt-0 mb-2 text-sm font-normal text-slate-500 md:text-center">
            {content.contentSources.label}
          </h2>
          <div className="flex flex-wrap items-center -mx-3">
            {content.contentSources.items.map(({ logo, label, supported, url }, index) => (
              <Link key={index} href={url}>
                <a className="flex items-center h-16 p-3 dark:brightness-150 dark:filter">
                  <Tooltip.Root delayDuration={100}>
                    <Tooltip.TooltipTrigger>
                      <Image
                        src={content.logosPath + logo.file}
                        alt={label}
                        width={logo.width}
                        height={logo.height}
                        className={`${supported ? 'opacity-100' : 'opacity-25'}`}
                      />
                    </Tooltip.TooltipTrigger>
                    <Tooltip.Content
                      sideOffset={10}
                      className="rounded bg-gray-800 px-3 py-1.5 text-sm text-slate-100 shadow-xl shadow-white dark:bg-violet-200 dark:text-violet-900 dark:shadow-black"
                    >
                      {`${label}${
                        supported === true
                          ? ''
                          : supported === 'Planned'
                          ? '- Planned'
                          : ' – Considering to add support.'
                      }`}
                      <Tooltip.Arrow className="mx-1 text-gray-800 fill-current dark:text-violet-200" />
                    </Tooltip.Content>
                  </Tooltip.Root>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
