import {
  FC,
  useEffect,
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  useContext,
  useMemo,
  useCallback,
} from 'react'
import { ColorScheme } from '../utils/syntax-highlighting'

const ColorSchemeContext = createContext<'light' | 'dark' | 'system'>('light')
const UpdateColorSchemeContext = createContext<(colorScheme: 'light' | 'dark' | 'system') => void>(() => {})

export const useColorScheme = () => useContext(ColorSchemeContext)
export const useUpdateColorScheme = () => useContext(UpdateColorSchemeContext)

export const ColorSchemeProvider: FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const initalColorScheme = useMemo(
    () =>
      typeof window !== 'undefined' ? (localStorage.getItem('theme') as ColorScheme | null) ?? 'system' : 'system',
    [],
  )
  const [colorScheme, setColorScheme] = useState<'light' | 'dark' | 'system'>(initalColorScheme)

  const updateColorScheme = useCallback(
    (newColorScheme: 'light' | 'dark' | 'system') => {
      if (newColorScheme === colorScheme) return

      setColorScheme(newColorScheme)

      if (newColorScheme === 'system') {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        localStorage.removeItem('theme')
      } else {
        if (newColorScheme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        localStorage.theme = newColorScheme
      }
    },
    [colorScheme],
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (colorScheme === 'system') {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => updateColorScheme('system'))
    }
  }, [colorScheme, updateColorScheme])

  return (
    <ColorSchemeContext.Provider value={colorScheme}>
      <UpdateColorSchemeContext.Provider value={updateColorScheme}>{children}</UpdateColorSchemeContext.Provider>
    </ColorSchemeContext.Provider>
  )
}
