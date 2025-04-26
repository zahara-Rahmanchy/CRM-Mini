import Login from "../components/Login"


const Home = () => {
  return (
     
    <section className=" min-h-screen w-full bg-[#C9F4EB] dark:bg-black flex flex-col md:flex-row items-center justify-center md:justify-end p-4">
      
    {/* Background Illustration */}
    <div className="flex items-center justify-center">
        <img
          src="/bg-image.png" // replace with your image path
          alt="Illustration"
          className="md:w-3/4 h-auto w-1/2"
        />
      </div>
    <Login/>
     </section>
  )
}

export default Home