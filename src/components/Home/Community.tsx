import { Button, ButtonProps } from '../Button'
import { Icon, IconName } from '../Icon'

type HomeCommunityData = {
  icon: IconName
  heading: string
  body: string
  button: ButtonProps
}

const data: HomeCommunityData = {
  icon: 'discord',
  heading: 'Join the community',
  body: "Join the growing number of developers working with Contentlayer today. Get help, showcase your project, and keep up on Contentlayer's development.",
  button: {
    label: 'Join Discord',
    href: 'https://discord.gg/rytFErsARm',
    color: 'limeDark',
  },
}

export function HomeCommunity() {
  return (
    <div className="bg-gray-100 text-black text-center pt-36 pb-56">
      <div className="max-w-3xl mx-auto">
        <span className="inline-block mb-4 bg-lime p-4 rounded-lg">
          <span className="block w-16">
            <Icon name={data.icon} />
          </span>
        </span>
        <h2 className="text-4xl mb-6">{data.heading}</h2>
        <p className="text-lg mb-12">{data.body}</p>
        <Button {...data.button} />
      </div>
    </div>
  )
}
