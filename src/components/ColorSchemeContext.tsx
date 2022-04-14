import { FC, useEffect, Dispatch, SetStateAction, createContext, useState, useContext } from 'react'
import { ColorScheme } from '../utils/syntax-highlighting'

const ColorSchemeContext = createContext<'light' | 'dark' | 'system'>('light')
const UpdateColorSchemeContext = createContext<(colorScheme: 'light' | 'dark' | 'system') => void>(() => {})

export const useColorScheme = () => useContext(ColorSchemeContext)
export const useUpdateColorScheme = () => useContext(UpdateColorSchemeContext)

export const ColorSchemeProvider: FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark' | 'system'>('system')

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (colorScheme === 'system') {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => updateColorScheme('system'))
    }
  }, [colorScheme])

  const updateColorScheme = (colorScheme: 'light' | 'dark' | 'system') => {
    setColorScheme(colorScheme)
    if (colorScheme === 'system') {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      localStorage.removeItem('theme')
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
