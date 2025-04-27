import { Outlet } from "react-router-dom"
// import Login from "../components/Login"
import ThemeButton from "../components/ThemeButton"

const Home = () => {
  return (
     
    <section className=" min-h-screen w-full bg-[#C9F4EB] dark:bg-black flex flex-col md:flex-row items-center justify-center md:justify-end p-4">
    <div className="absolute top-2 left-2"> <ThemeButton /></div>
    {/* Background Illustration */}
    <div className="flex items-center justify-center">
        <img
          src="/bg-image.png" // replace with your image path
          alt="Illustration"
          className="md:w-3/4 h-auto "
        />
      </div>
      <Outlet/>
     </section>
  )
}

export default Home