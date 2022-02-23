import { FC } from 'react'

import { CodeIcon } from './Code'
import { GitHubIcon } from './GitHub'

export type IconName = 'code' | 'github'

const iconMap = {
  code: CodeIcon,
  github: GitHubIcon,
}

export const Icon: FC<{ name: IconName }> = ({ name }) => {
  const IconComponent = iconMap[name]
  return <IconComponent />
}
