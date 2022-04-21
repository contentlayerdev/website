import { Icon, IconName } from '../common/Icon'

/* ----- Types ----- */

type StackItem = {
  icons: IconName[]
  label: string
  className?: string
}

type Props = {
  content: StackItem
  processor: StackItem
  pages: StackItem
  decoupled?: boolean
}

/* ----- Shared Components ----- */

const StackItem: React.FC<StackItem> = ({ icons, label, className }) => {
  return (
    <div>
      <div className="mb-4 flex flex-col items-center justify-around sm:h-12 sm:flex-row">
        {icons.map((name, idx) => {
          return (
            <span key={idx} className={`svg-h-full m-4 mb-0 block h-12 shrink-0 ${className ? className : ''}`}>
              <Icon name={name} />
            </span>
          )
        })}
      </div>
      <span className="block leading-snug">{label}</span>
    </div>
  )
}

const PlusIcon: React.FC = () => {
  return (
    <span className="m-6 block h-4 w-4 shrink-0 text-slate-500">
      <Icon name="plus" />
    </span>
  )
}

/* ----- Stacks ----- */

const borderClasses = `rounded-lg border border-slate-500`

const DecoupledStack: React.FC<Exclude<Props, 'decoupled'>> = ({ content, processor, pages }) => {
  return (
    <div className={`flex flex-col items-center justify-between text-center md:flex-row`}>
      <div className={`p-8 ${borderClasses}`}>
        <StackItem {...content} />
      </div>
      <PlusIcon />
      <div className={`p-8 ${borderClasses} flex flex-col items-center justify-between text-center sm:flex-row`}>
        <StackItem {...processor} />
        <PlusIcon />
        <StackItem {...pages} />
      </div>
    </div>
  )
}

const MonolithicStack: React.FC<Exclude<Props, 'decoupled'>> = ({ content, processor, pages }) => {
  return (
    <div className={`flex justify-center`}>
      <div className={`flex flex-col items-center justify-between p-8 text-center sm:flex-row ${borderClasses}`}>
        <StackItem {...content} />
        <PlusIcon />
        <StackItem {...processor} />
        <PlusIcon />
        <StackItem {...pages} />
      </div>
    </div>
  )
}

/* ----- Main Component ----- */

export const ContentStack: React.FC<Props> = ({ decoupled = false, ...props }) => {
  const StackComponent = decoupled ? DecoupledStack : MonolithicStack
  const numIcons = [props.content, props.pages, props.processor]
    .map((item) => item.icons.length)
    .reduce((prev, curr) => prev + curr)

  let maxWidthClass = `max-w-xl`
  if (numIcons > 3) maxWidthClass = `max-w-2xl`
  if (numIcons > 5) maxWidthClass = ``

  return (
    <div className={`mx-auto my-12 ${maxWidthClass} text-sm`}>
      <StackComponent {...props} />
    </div>
  )
}
