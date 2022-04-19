const TableHeadCell: React.FC<
  React.PropsWithChildren<{
    style?: React.CSSProperties
    className?: string
  }>
> = ({ children, className, style }) => {
  return (
    <th className={`py-4 px-3 ${className}`} style={style}>
      {children}
    </th>
  )
}

const TableCell: React.FC<
  React.PropsWithChildren<{
    style?: React.CSSProperties
    className?: string
  }>
> = ({ children, className, style }) => {
  return (
    <td className={`py-3 px-3 ${className}`} style={style}>
      {children}
    </td>
  )
}

const ResultCell: React.FC<React.PropsWithChildren<{ success?: boolean }>> = ({ children, success }) => {
  let classes = `font-mono`
  if (success) classes += ` font-bold text-green-500`

  return <TableCell className={classes}>{children}</TableCell>
}

export const BenchmarkResults: React.FC = () => {
  return (
    <div className="mx-auto my-12 max-w-xl space-y-4">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 p-4 text-xs text-slate-500 shadow-lg shadow-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-slate-400 dark:shadow-gray-900">
        <table className="m-0 table-fixed text-[1rem]">
          <thead>
            <tr>
              <TableHeadCell style={{ width: '14rem' }}></TableHeadCell>
              <TableHeadCell>Cold Build</TableHeadCell>
              <TableHeadCell>Cached Build</TableHeadCell>
            </tr>
          </thead>
          <tbody className="table-fixed">
            <tr>
              <TableCell className="font-bold">Next.js + Contentlayer</TableCell>
              <ResultCell success={true}>25.73 s</ResultCell>
              <ResultCell success={true}>16.29 s</ResultCell>
            </tr>
            <tr>
              <TableCell>Next.js + DIY Content</TableCell>
              <ResultCell>44.48 s</ResultCell>
              <ResultCell>39.27 s</ResultCell>
            </tr>
            <tr>
              <TableCell>Gatsby</TableCell>
              <ResultCell>46.59 s</ResultCell>
              <ResultCell>25.73 s</ResultCell>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-full text-center text-sm text-slate-300 dark:text-slate-500">
        Smaller is better/faster. Used machine:{' '}
        <a
          href="https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#supported-runners-and-hardware-resources"
          target="_blank"
          rel="noreferrer"
        >
          GitHub Actions
        </a>
        .
      </div>
    </div>
  )
}
