import { FC } from 'react'

import { GitHubIcon } from './GitHub'

export type IconName = 'github'

const iconMap = {
  github: GitHubIcon,
}

export const Icon: FC<{ name: IconName }> = ({ name }) => {
  const IconComponent = iconMap[name]
  return <IconComponent />
}
