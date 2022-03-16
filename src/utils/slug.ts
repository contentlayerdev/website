export const slug = (title: string): string => {
  return title.toLowerCase().replaceAll(' ', '-')
}
