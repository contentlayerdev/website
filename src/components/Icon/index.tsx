import { FC } from 'react'

import { CodeIcon } from './Code'
import { DiscordIcon } from './Discord'
import { ExternalLinkIcon } from './ExternalLink'
import { GitHubIcon } from './GitHub'
import { CheckIcon } from './Check'
import { CodeLightIcon } from './CodeLight'
import { CheckCircleIcon } from './CheckCircle'
import { LightningIcon } from './Lightning'
import { BarsIcon } from './Bars'
import { CloseIcon } from './Close'
import { PlayButtonIcon } from './PlayButton'
import { ChevronDownIcon } from './ChevronDown'
import { GitpodIcon } from './Gitpod'
import { ChevronRightIcon } from './ChevronRight'

export type IconName =
  | 'code'
  | 'discord'
  | 'external-link'
  | 'github'
  | 'check'
  | 'code-light'
  | 'check-circle'
  | 'lightning'
  | 'bars'
  | 'close'
  | 'play-button'
  | 'chevron-down'
  | 'gitpod'
  | 'chevron-right'

const iconMap = {
  code: CodeIcon,
  discord: DiscordIcon,
  'external-link': ExternalLinkIcon,
  github: GitHubIcon,
  check: CheckIcon,
  'code-light': CodeLightIcon,
  'check-circle': CheckCircleIcon,
  lightning: LightningIcon,
  bars: BarsIcon,
  close: CloseIcon,
  'play-button': PlayButtonIcon,
  'chevron-down': ChevronDownIcon,
  'chevron-right': ChevronRightIcon,
  gitpod: GitpodIcon,
}

export const Icon: FC<{ name: IconName }> = ({ name }) => {
  const IconComponent = iconMap[name]
  return <IconComponent />
}
