import Link from 'next/link'
import classnames from 'classnames'

export type ButtonProps = {
  label: string
  href: string
  color?: 'blue' | 'lime' | 'limeDark'
}

const buttonColorClassMap = {
  blue: 'bg-blue text-black',
  lime: 'bg-lime text-black',
  limeDark: 'bg-green-900 text-lime',
}

export function Button(props: ButtonProps): JSX.Element {
  const buttonClasses = classnames(
    buttonColorClassMap[props.color || 'blue'],
    'inline-block font-bold rounded-md py-3 px-12 text-sm',
  )
  return (
    <Link href={props.href}>
      <a className={buttonClasses}>{props.label}</a>
    </Link>
  )
}
