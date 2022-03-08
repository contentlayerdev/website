import { FC } from 'react'

import { CodeIcon } from './Code'
import { DiscordIcon } from './Discord'
import { ExternalLinkIcon } from './ExternalLink'
import { GitHubIcon } from './GitHub'
import { CheckIcon } from './Check'

export type IconName = 'code' | 'discord' | 'external-link' | 'github' | 'check'

const iconMap = {
  code: CodeIcon,
  discord: DiscordIcon,
  'external-link': ExternalLinkIcon,
  github: GitHubIcon,
  check: CheckIcon,
}

export const Icon: FC<{ name: IconName }> = ({ name }) => {
  const IconComponent = iconMap[name]
  return <IconComponent />
}
