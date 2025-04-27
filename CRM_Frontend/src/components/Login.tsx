
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { LoginForm, loginSchema } from '../utils/SchemaValidation/AuthValidation';
import { useAuth } from '../hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api/authApi';
import { key, setCookie } from '../utils/cookieHelper';
import { decodeToken } from '../utils/decodeToken';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema), // Use Zod for form validation
  });
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();


  const mutation= useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setLoading(false)
      // console.log('Login successful:', data);
    
      const token = data.data.token;
     
      // Save token using the cookie helper function
      setCookie(key,token);

      // Verify token and set the user in the context
      const user = decodeToken(token);
      if (user) {
        setUser(user);
      }
     // Redirect or perform other actions on success
     navigate('/dashboard');
      alert("Logged In Succesfully")

     
    },
    onError: (error: any) => {
      // setLoading(false)
      alert(error?.response?.data?.message || 'Login failed!');
      
    },
  });

  const { mutate} = mutation;
  const onSubmit = (formData: {email: string; password: string }) => {
    setLoading(true)
    mutate(formData);
  };
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 shadow-lg w-full max-w-md p-8 flex flex-col gap-6 relative lg:right-20 ">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Login to CRM
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            type="email"
            {...register('email')}
            placeholder="Email address"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

          <input
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            type="password"
            placeholder="Password"
            {...register('password')}
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg mt-2 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link to="/Register" className="text-teal-600 dark:text-teal-400 font-medium hover:underline cursor-pointer">
            Register
        </Link>
        </p>
      </div>
  );
};

export default Login;
