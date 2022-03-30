export const sluggifyTitle = (title: string) => {
  const re = /[^\w\s]/g
  return title.toLowerCase().replace(re, '').replace(/\s+/g, '-')
}
