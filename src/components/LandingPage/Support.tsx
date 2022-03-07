import Image from 'next/image'
import { FC } from 'react'

const content = {
  logosPath: '/images/logos/',
  frameworks: {
    label: 'Supported Frameworks',
    items: [
      { logo: { file: 'nextjs.svg', width: 81, height: 48 }, label: 'Next.js', supported: true },
      { logo: { file: 'remix.svg', width: 28, height: 32 }, label: 'Remix', supported: false },
      { logo: { file: 'vite.svg', width: 36, height: 36 }, label: 'Vite', supported: false },
      { logo: { file: 'astro.svg', width: 26, height: 40 }, label: 'Astro', supported: false },
    ],
  },
  contentSources: {
    label: 'Supported Content Sources',
    items: [
      { logo: { file: 'mdx.svg', width: 77, height: 32 }, label: 'MDX', supported: true },
      { logo: { file: 'contentful.svg', width: 33, height: 38 }, label: 'Contentful', supported: true },
      { logo: { file: 'notion.svg', width: 39, height: 38 }, label: 'Notion', supported: false },
      { logo: { file: 'sanity.svg', width: 135, height: 28 }, label: 'Sanity', supported: false },
    ],
  },
}

export const Support: FC = () => {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 pt-16 md:pt-24">
      <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-16 justify-center">
        <div>
          <h2 className="text-gray-400 font-normal text-base my-0">{content.frameworks.label}</h2>
          <div className="flex items-center flex-wrap -mx-3">
            {content.frameworks.items.map(({ logo, label, supported }, index) => (
              <div key={index} className={`p-3 h-16 flex items-center ${supported ? 'opacity-100' : 'opacity-25'}`}>
                <Image src={content.logosPath + logo.file} alt={label} width={logo.width} height={logo.height} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-gray-400 font-normal text-base my-0">{content.contentSources.label}</h2>
          <div className="flex items-center flex-wrap -mx-3">
            {content.contentSources.items.map(({ logo, label, supported }, index) => (
              <div key={index} className={`p-3 h-16 flex items-center ${supported ? 'opacity-100' : 'opacity-25'}`}>
                <Image src={content.logosPath + logo.file} alt={label} width={logo.width} height={logo.height} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
