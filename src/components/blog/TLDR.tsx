import { Card } from '../common/Card'
import { Icon } from '../common/Icon'

export const TLDR: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Card className="mb-12 p-6">
      <h3 className="mt-0">TL;DR</h3>
      <div className="text-md leading-normal text-slate-700 dark:text-slate-300">{children}</div>
    </Card>
  )
}
