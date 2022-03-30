import { FC, Fragment, useState, useEffect } from 'react'
import { TreeRoot } from '../pages/docs/[[...slug]]'
import Link from 'next/link'
import { DocsNavigation } from './DocsNavigation'
import { Icon } from './Icon'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import { Doc } from 'contentlayer/generated'

export const DocsFooter: FC<{ doc: Doc }> = ({ doc }) => {
  return (
    <>
      <hr />
      <div className="text-sm sm:flex sm:justify-between">
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
