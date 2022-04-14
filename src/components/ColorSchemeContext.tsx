import { FC, useEffect, Dispatch, SetStateAction, createContext, useState, useContext } from 'react'
import { ColorScheme } from '../utils/syntax-highlighting'

const ColorSchemeContext = createContext<'light' | 'dark' | 'system'>('light')
const UpdateColorSchemeContext = createContext<(colorScheme: 'light' | 'dark' | 'system') => void>(() => {})

export const useColorScheme = () => useContext(ColorSchemeContext)
export const useUpdateColorScheme = () => useContext(UpdateColorSchemeContext)

export const ColorSchemeProvider: FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark' | 'system'>('system')

  // useEffect(() => {
  //   if (typeof window === 'undefined') return
  //   const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  //   setColorScheme(isDarkMode ? 'dark' : 'light')
  //   window
  //     .matchMedia('(prefers-color-scheme: dark)')
  //     .addEventListener('change', (e) => setColorScheme(e.matches ? 'dark' : 'light'))
  // }, [setColorScheme])

  const updateColorScheme = (colorScheme: 'light' | 'dark' | 'system') => {
    setColorScheme(colorScheme)
    if (colorScheme === 'system') {
      localStorage.removeItem('theme')
      document.documentElement.classList.remove('dark')
    } else {
      if (colorScheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      localStorage.theme = colorScheme
    }
  }

  return (
    <ColorSchemeContext.Provider value={colorScheme}>
      <UpdateColorSchemeContext.Provider value={updateColorScheme}>{children}</UpdateColorSchemeContext.Provider>
    </ColorSchemeContext.Provider>
  )
}
