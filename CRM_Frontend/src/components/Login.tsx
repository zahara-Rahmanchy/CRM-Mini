import React from 'react';

const Login = () => {
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 shadow-lg w-full max-w-md p-8 flex flex-col gap-6 relative lg:right-20 ">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Login to CRM
        </h1>

        <form className="flex flex-col gap-4">
          <input
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            type="email"
            placeholder="Email address"
          />

          <input
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            type="password"
            placeholder="Password"
          />

          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg mt-2 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          Don't have an account?{" "}
          <span className="text-teal-600 dark:text-teal-400 font-medium hover:underline cursor-pointer">
            Sign up
          </span>
        </p>
      </div>
  );
};

export default Login;
