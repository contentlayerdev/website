import React, { useEffect } from 'react'
import { ColorScheme } from './utils/syntax-highlighting'

const ColorSchemeContext = React.createContext<ColorScheme>('light')

export const useColorScheme = () => React.useContext(ColorSchemeContext)

export const ColorSchemeProvider: React.FC = ({ children }) => {
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>('light')

  useEffect(() => {
    // needed for server-side rendering
    if (typeof window === 'undefined') return

    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    setColorScheme(isDarkMode ? 'dark' : 'light')

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => setColorScheme(e.matches ? 'dark' : 'light'))
  }, [setColorScheme])

  return <ColorSchemeContext.Provider value={colorScheme}>{children}</ColorSchemeContext.Provider>
}
