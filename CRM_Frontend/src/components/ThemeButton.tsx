import { useTheme } from "../hooks/useTheme";

const ThemeButton = () => {
    const { darkMode, toggleTheme } = useTheme();
  return (
     <button
     
        onClick={toggleTheme}
        className="w-10 h-10 m-2 text-white p-1 rounded-full cursor-pointer bg-yellow-50 dark:bg-gray-500">
        {darkMode ? '🌙' : '🌞'}

     </button> 
  )
}

export default ThemeButton