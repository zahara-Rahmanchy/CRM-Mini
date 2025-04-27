

// const Register = () => {
//   return (
//     <div className="rounded-2xl bg-white dark:bg-gray-900 shadow-lg w-full max-w-md p-8 flex flex-col gap-6 relative lg:right-20 ">
//     <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
//       Register to CRM
//     </h1>

//     <form className="flex flex-col gap-4">
//     <input
//         className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
//         type="text"
//         placeholder="Name"
//       />
//       <input
//         className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
//         type="email"
//         placeholder="Email address"
//       />

//       <input
//         className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
//         type="password"
//         placeholder="Password"
//       />

//       <button
//         type="submit"
//         className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg mt-2 transition"
//       >
//         Register
//       </button>
//     </form>

//     <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
//        Already have an account?{" "}
//       <span className="text-teal-600 dark:text-teal-400 font-medium hover:underline cursor-pointer">
//         Login
//       </span>
//     </p>
//   </div>
//   )
// }

// export default Register

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterForm, registerSchema } from '../utils/SchemaValidation/AuthValidation';
import { registerUser } from '../api/authApi';
import { Link, useNavigate } from 'react-router-dom';



const Register = () => {
  const { register, handleSubmit, formState: { errors } , reset} = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema), // Use Zod resolver here
  });
  const navigate = useNavigate()
  const { isLoading,mutate } = useMutation( {
    mutationFn:registerUser,
    onSuccess: (data) => {
      console.log("registed: ",data)
      alert('Registration Successful! You can now log in!');
      reset()
      navigate("/")
      
    },
    onError: (error: any) => {
      alert(error?.response?.data?.message || 'Registration failed!');
    },
  });

  const onSubmit = (data: { name: string; email: string; password: string }) => {
    console.log("form data: ",data)
    mutate(data);
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 shadow-lg w-full max-w-md p-8 flex flex-col gap-6 relative lg:right-20 ">
      <h1 className="text-2xl font-bold text-center text-teal-800 italic dark:text-white mb-4">
        Register to CRM
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
          type="text"
          placeholder="Name"
          {...register('name')}
        />
        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}

        <input
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
          type="email"
          placeholder="Email address"
          {...register('email')}
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

        <input
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
          type="password"
          placeholder="Password"
          {...register('password')}
        />
        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
        <input
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
          type="password"
          placeholder="Confirm Password"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="cursor-pointer bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg mt-2 transition"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-4 border-t-4 border-teal-600 border-solid rounded-full animate-spin"></div> // Tailwind spinner
            ) : (
              'Register'
            )}
          
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
        Already have an account?{" "}
        <Link to="/" className="text-teal-600 dark:text-teal-400 font-medium text-md hover:underline hover:text-teal-500 cursor-pointer">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
