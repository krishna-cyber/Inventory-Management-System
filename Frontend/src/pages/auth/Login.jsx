import { useForm } from "react-hook-form";
import "./Login.scss";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <>
      <div className=' h-screen w-screen flex justify-center items-center flex-col gap-8'>
        <h1 className=' text-center text-4xl text-white font-bold'>Login</h1>
        <form
          className=' flex flex-col gap-10 bg-slate-100 p-8 rounded-xl shadow-xl w-2/5 h-2/4'
          onSubmit={handleSubmit(onSubmit)}>
          <div className=' w-full h-full flex flex-col justify-center items-center justify-around'>
            <div className=' text-3xl flex gap-8 items-center'>
              <label htmlFor='username'>Username:</label>
              <input
                type='email'
                className=' p-4 rounded-md'
                placeholder='username'
                {...register("username", {
                  required: [true, "Username is required"],
                })}
              />
              {errors.username && <span>{errors.username.message}</span>}
            </div>

            <div className=' text-3xl flex gap-8 items-center'>
              <label htmlFor='password'>Password:</label>
              <input
                className=' p-4 rounded-md'
                type='password'
                placeholder='password'
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>

            <input
              className=' w-1/2 text-white text-3xl rounded-md p-4 bg-purple-800 cursor-pointer hover:bg-purple-900'
              type='submit'
            />
          </div>
          <div className=' flex justify-between'>
            <Link className=' text-4xl text-blue-400 underline' to='/'>
              Home
            </Link>
            <span className='flex'>
              <p className=' text-3xl'>Not registered yet?</p>
              <Link
                className=' ml-4 text-4xl text-blue-400 underline'
                to='/register'>
                Register
              </Link>
            </span>
            <span className=' ml-auto'>
              <p className=' text-4xl '>forgot your password:</p>
              <Link
                className=' text-3xl underline text-blue-300'
                to='/forgot-password'>
                Reset
              </Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
