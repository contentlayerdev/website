import { FC } from 'react'
import Link from 'next/link'
import { Icon } from './Icon'
import { format } from 'date-fns'
import { Doc } from 'contentlayer/generated'

export const DocsFooter: FC<{ doc: Doc }> = ({ doc }) => {
  return (
    <>
      <hr />
      <div className="space-y-4 text-sm sm:flex sm:justify-between sm:space-y-0">
        <p className="m-0">
          Was this article helpful to you? <br />{' '}
          <Link href="/">
            <a className="inline-flex items-center space-x-1">
              <span className="inline-block w-4">
                <Icon name="discord" />
              </span>
              <span>Provide feedback</span>
            </a>
          </Link>
        </p>
        <p className="m-0">Last edited on {format(new Date(doc.last_edited), 'MMMM dd, yyyy')}.</p>
      </div>
    </>
  )
}
