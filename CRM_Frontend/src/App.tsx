import './App.css';
import { useTheme } from './hooks/useTheme';

function App() {
  const { darkMode, toggleTheme } = useTheme();
  return (
    <>
      <h1 className='text-3xl font-bold underline text-red-300 '>
        Hello world!
      </h1>
      <button
        onClick={toggleTheme}
        className="w-10 h-10 m-2 text-white p-2 rounded cursor-pointer bg-yellow-50">
           {darkMode ? '🌙' : '🌞'}

     </button>
    </>
  );
}

export default App;
