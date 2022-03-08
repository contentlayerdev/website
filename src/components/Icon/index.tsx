import { FC } from 'react'

import { CodeIcon } from './Code'
import { DiscordIcon } from './Discord'
import { ExternalLinkIcon } from './ExternalLink'
import { GitHubIcon } from './GitHub'
import { CheckIcon } from './Check'
import { CodeLightIcon } from './CodeLight'
import { CheckCircleIcon } from './CheckCircle'
import { LightningIcon } from './Lightning'

export type IconName =
  | 'code'
  | 'discord'
  | 'external-link'
  | 'github'
  | 'check'
  | 'code-light'
  | 'check-circle'
  | 'lightning'

const iconMap = {
  code: CodeIcon,
  discord: DiscordIcon,
  'external-link': ExternalLinkIcon,
  github: GitHubIcon,
  check: CheckIcon,
  'code-light': CodeLightIcon,
  'check-circle': CheckCircleIcon,
  lightning: LightningIcon,
}

export const Icon: FC<{ name: IconName }> = ({ name }) => {
  const IconComponent = iconMap[name]
  return <IconComponent />
}