import { FC } from 'react'
import { type DocHeading } from '../contentlayer/document/Doc'
import { getNodeText, sluggifyTitle } from '../utils/sluggify'
import { Icon } from './Icon'

export const PageNavigation: FC<{ headings: DocHeading[] }> = ({ headings }) => {
  return (
    <div className="text-sm">
      <ul className="space-y-2">
        {headings
          .filter((_) => _.level > 1)
          .map(({ title, level }, index) => (
            <li key={index}>
              {/* {level > 1 ? ( */}
              <a
                href={`#${sluggifyTitle(getNodeText(title))}`}
                style={{ marginLeft: (level - 2) * 16 }}
                className="flex hover:text-slate-600 dark:hover:text-slate-300"
              >
                <span className="mr-2 mt-[5px] block w-1.5 shrink-0 text-slate-400 dark:text-slate-500">
                  <Icon name="chevron-right" />
                </span>
                <span>{title}</span>
              </a>
              {/* ) : (
                <h4 className="mb-4 font-medium text-slate-600 dark:text-slate-300">{title}</h4>
              )} */}
            </li>
          ))}
      </ul>
    </div>
  )
}
