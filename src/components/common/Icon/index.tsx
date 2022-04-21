import { FC } from 'react'

import { ApiIcon } from './API'
import { BarsIcon } from './Bars'
import { BrokenLinkIcon } from './BrokenLink'
import { CalendarIcon } from './Calendar'
import { CheckCircleIcon } from './CheckCircle'
import { CheckCircleOutlineIcon } from './CheckCircleOutline'
import { CheckIcon } from './Check'
import { ChevronDownIcon } from './ChevronDown'
import { ChevronLeftIcon } from './ChevronLeft'
import { ChevronRightIcon } from './ChevronRight'
import { CloseIcon } from './Close'
import { CodeIcon } from './Code'
import { CodeLightIcon } from './CodeLight'
import { CollapseIcon } from './Collapse'
import { ContentfulIcon } from './Contentful'
import { ContentlayerIcon } from './Contentlayer'
import { CrossCircleOutlineIcon } from './CrossCircleOutline'
import { DatabaseIcon } from './Database'
import { DiscordIcon } from './Discord'
import { ExclamationIcon } from './Exclamation'
import { ExpandIcon } from './Expand'
import { ExternalLinkIcon } from './ExternalLink'
import { GearIcon } from './Gear'
import { GitHubIcon } from './GitHub'
import { GitpodIcon } from './Gitpod'
import { GraphQLIcon } from './GraphQL'
import { InfoIcon } from './Info'
import { JekyllIcon } from './Jekyll'
import { LightningIcon } from './Lightning'
import { MarkdownIcon } from './Markdown'
import { MoonIcon } from './Moon'
import { NotionIcon } from './Notion'
import { PHPIcon } from './PHP'
import { PlayButtonIcon } from './PlayButton'
import { PlusIcon } from './Plus'
import { QuestionIcon } from './Question'
import { ReactIcon } from './React'
import { RocketIcon } from './Rocket'
import { SearchIcon } from './Search'
import { SignIcon } from './Sign'
import { SunIcon } from './Sun'
import { TemplateIcon } from './Template'
import { UsersIcon } from './Users'
import { WordPressIcon } from './WordPress'

export type IconName =
  | 'api'
  | 'bars'
  | 'broken-link'
  | 'calendar'
  | 'check-circle-outline'
  | 'check-circle'
  | 'check'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'close'
  | 'code-light'
  | 'code'
  | 'collapse'
  | 'contentful'
  | 'contentlayer'
  | 'cross-circle-outline'
  | 'database'
  | 'discord'
  | 'exclamation'
  | 'expand'
  | 'external-link'
  | 'gear'
  | 'github'
  | 'gitpod'
  | 'graphql'
  | 'info'
  | 'jekyll'
  | 'lightning'
  | 'markdown'
  | 'moon'
  | 'notion'
  | 'php'
  | 'play-button'
  | 'plus'
  | 'question'
  | 'react'
  | 'rocket'
  | 'search'
  | 'sign'
  | 'sun'
  | 'template'
  | 'users'
  | 'wordpress'

const iconMap = {
  'broken-link': BrokenLinkIcon,
  'check-circle-outline': CheckCircleOutlineIcon,
  'check-circle': CheckCircleIcon,
  'chevron-down': ChevronDownIcon,
  'chevron-left': ChevronLeftIcon,
  'chevron-right': ChevronRightIcon,
  'code-light': CodeLightIcon,
  'cross-circle-outline': CrossCircleOutlineIcon,
  'external-link': ExternalLinkIcon,
  'play-button': PlayButtonIcon,
  api: ApiIcon,
  bars: BarsIcon,
  calendar: CalendarIcon,
  check: CheckIcon,
  close: CloseIcon,
  code: CodeIcon,
  collapse: CollapseIcon,
  contentful: ContentfulIcon,
  contentlayer: ContentlayerIcon,
  database: DatabaseIcon,
  discord: DiscordIcon,
  exclamation: ExclamationIcon,
  expand: ExpandIcon,
  gear: GearIcon,
  github: GitHubIcon,
  gitpod: GitpodIcon,
  graphql: GraphQLIcon,
  info: InfoIcon,
  jekyll: JekyllIcon,
  lightning: LightningIcon,
  markdown: MarkdownIcon,
  moon: MoonIcon,
  notion: NotionIcon,
  php: PHPIcon,
  plus: PlusIcon,
  question: QuestionIcon,
  react: ReactIcon,
  rocket: RocketIcon,
  search: SearchIcon,
  sign: SignIcon,
  sun: SunIcon,
  template: TemplateIcon,
  users: UsersIcon,
  wordpress: WordPressIcon,
}

export const Icon: FC<{ name: IconName }> = ({ name }) => {
  const IconComponent = iconMap[name]
  return <IconComponent />
}
