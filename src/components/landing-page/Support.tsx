import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'

const content = {
  logosPath: '/images/logos/',
  frameworks: {
    label: 'Supported Frameworks',
    items: [
      // TODO add links to docs
      {
        logo: { file: 'nextjs.svg', width: 81, height: 48 },
        label: 'Next.js',
        url: 'https://nextjs.org/docs/getting-started',
        supported: true,
      },
      {
        logo: { file: 'remix.svg', width: 28, height: 32 },
        label: 'Remix',
        url: 'https://remix.run/docs/en/v1',
        supported: false,
      },
      {
        logo: { file: 'vite.svg', width: 36, height: 36 },
        label: 'Vite',
        url: 'https://vitejs.dev/guide/',
        supported: false,
      },
      {
        logo: { file: 'astro.svg', width: 26, height: 40 },
        label: 'Astro',
        url: 'https://docs.astro.build/de/getting-started/',
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
        url: 'https://mdxjs.com/docs/',
        supported: true,
      },
      {
        logo: { file: 'contentful.svg', width: 33, height: 38 },
        label: 'Contentful',
        url: 'https://www.contentful.com/developers/docs/',
        supported: true,
      },
      {
        logo: { file: 'notion.svg', width: 39, height: 38 },
        label: 'Notion',
        url: 'https://developers.notion.coms',
        supported: false,
      },
      {
        logo: { file: 'sanity.svg', width: 135, height: 28 },
        label: 'Sanity',
        url: 'https://www.sanity.io',
        supported: false,
      },
    ],
  },
}

export const Support: FC = () => {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 pt-16 md:pt-24">
      <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-16 justify-center">
        <div>
          <h2 className="text-slate-500 font-normal text-sm md:text-center mt-0 mb-2">{content.frameworks.label}</h2>
          <div className="flex items-center flex-wrap -mx-3">
            {content.frameworks.items.map(({ logo, label, url, supported }, index) => (
              <Link key={index} href={url}>
                <a
                  className="p-3 h-16 flex items-center dark:filter dark:brightness-150"
                  rel="noreferrer"
                  target="_blank"
                >
                  <Tooltip.Root delayDuration={100}>
                    <Tooltip.Trigger className="h-full flex items-center">
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
                      className="bg-gray-800 rounded text-slate-100 text-sm px-3 py-1.5 shadow-xl shadow-white dark:bg-violet-200 dark:text-violet-900 dark:shadow-black"
                    >
                      {`${label}${supported ? '' : ' – Coming soon!'}`}
                      <Tooltip.Arrow className="mx-1 fill-current text-gray-800 dark:text-violet-200" />
                    </Tooltip.Content>
                  </Tooltip.Root>
                </a>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-slate-500 font-normal text-sm md:text-center mt-0 mb-2">
            {content.contentSources.label}
          </h2>
          <div className="flex items-center flex-wrap -mx-3">
            {content.contentSources.items.map(({ logo, label, supported }, index) => (
              <div key={index} className="p-3 h-16 flex items-center dark:filter dark:brightness-150">
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
                    className="bg-gray-800 rounded text-slate-100 text-sm px-3 py-1.5 shadow-xl shadow-white dark:bg-violet-200 dark:text-violet-900 dark:shadow-black"
                  >
                    {`${label}${supported ? '' : ' – Coming soon!'}`}
                    <Tooltip.Arrow className="mx-1 fill-current text-gray-800 dark:text-violet-200" />
                  </Tooltip.Content>
                </Tooltip.Root>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
