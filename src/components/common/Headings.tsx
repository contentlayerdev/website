import { sluggifyTitle, getNodeText } from 'src/utils/sluggify'

export const H2: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const slug = sluggifyTitle(getNodeText(children))
  return (
    <h2 id={slug} onClick={() => (window.location.hash = `#${slug}`)} className="cursor-pointer group">
      <span className="hidden absolute left-8 text-slate-400 group-hover:inline dark:text-slate-600">#</span>
      {children}
    </h2>
  )
}

export const H3: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const slug = sluggifyTitle(getNodeText(children))
  return (
    <h3 id={slug} onClick={() => (window.location.hash = `#${slug}`)} className="cursor-pointer group">
      <span className="hidden absolute left-8 text-slate-400 group-hover:inline dark:text-slate-600">#</span>
      {children}
    </h3>
  )
}

export const H4: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const slug = sluggifyTitle(getNodeText(children))
  return (
    <h4 id={slug} onClick={() => (window.location.hash = `#${slug}`)} className="cursor-pointer group">
      <span className="hidden absolute left-8 text-slate-400 group-hover:inline dark:text-slate-600">#</span>
      {children}
    </h4>
  )
}
