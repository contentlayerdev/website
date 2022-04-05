import { FC } from 'react'

import { ArrowStraightLong } from './StraightLong'
import { ArrowStraightShort } from './StraightShort'
import { ArrowStraightDashed } from './StraightDashed'
import { ArrowCurvedLong } from './CurvedLong'
import { ArrowCurvedShort } from './CurvedShort'
import { ArrowLoopedLong } from './LoopedLong'
import { ArrowLoopedShort } from './LoopedShort'

export type ArrowType =
  | 'straight-long'
  | 'straight-short'
  | 'straight-dashed'
  | 'curved-long'
  | 'curved-short'
  | 'looped-long'
  | 'looped-short'

const arrows = {
  'straight-long': ArrowStraightLong,
  'straight-short': ArrowStraightShort,
  'straight-dashed': ArrowStraightDashed,
  'curved-long': ArrowCurvedLong,
  'curved-short': ArrowCurvedShort,
  'looped-long': ArrowLoopedLong,
  'looped-short': ArrowLoopedShort,
}

export const Arrow: FC<{ type: ArrowType; className: string }> = ({ type, className }) => {
  const Arrow = arrows[type]
  return (
    <div className={`transform ${className}`}>
      <Arrow />
    </div>
  )
}
