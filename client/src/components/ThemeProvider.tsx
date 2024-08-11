import { RootState } from "../redux/store"
import { useSelector } from "react-redux"

export default function ThemeProvider({children}: React.PropsWithChildren) {
  const {theme} = useSelector((state: RootState) => state.theme)

  return (
    <div className={theme}>
      <div className='min-h-screen dark:text-gray-200 dark:bg-neutral-800 transition-colors duration-300'>
        {children}
      </div>
    </div>
  )
}