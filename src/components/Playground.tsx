import { FC } from 'react'

export const Playground: FC = () => {
  return (
    <iframe
      className="w-full h-[700px] my-5"
      src="https://stackblitz.com/edit/github-nm2nxj-aekprc?devtoolsheight=33&embed=1&file=posts/pre-rendering.md"
    />
  )
}
