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
import { InfoIcon } from './Info'
import { ExclamationIcon } from './Exclamation'
import { RocketIcon } from './Rocket'
import { SignIcon } from './Sign'
import { SearchIcon } from './Search'
import { ChevronLeftIcon } from './ChevronLeft'
import { UsersIcon } from './Users'
import { CalendarIcon } from './Calendar'

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
  | 'chevron-left'
  | 'info'
  | 'exclamation'
  | 'rocket'
  | 'sign'
  | 'search'
  | 'users'
  | 'calendar'

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
  'chevron-left': ChevronLeftIcon,
  gitpod: GitpodIcon,
  info: InfoIcon,
  exclamation: ExclamationIcon,
  rocket: RocketIcon,
  sign: SignIcon,
  search: SearchIcon,
  users: UsersIcon,
  calendar: CalendarIcon,
}

export const Icon: FC<{ name: IconName }> = ({ name }) => {
  const IconComponent = iconMap[name]
  return <IconComponent />
}