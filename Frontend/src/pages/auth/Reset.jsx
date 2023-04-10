import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import "./Login.scss";

const Login = () => {
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .email("Email is invalid")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    cPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => console.log(data);
  return (
    <>
      <div className=' h-screen w-screen flex justify-center items-center flex-col gap-8'>
        <h1 className=' text-center text-4xl text-white font-bold'>Register</h1>
        <form
          className=' flex flex-col gap-10 bg-slate-100 p-8 rounded-xl shadow-xl w-2/5 h-2/4'
          onSubmit={handleSubmit(onSubmit)}>
          <div className=' w-full h-full flex flex-col justify-center items-center justify-around'>
            <div className=' text-3xl flex gap-8 items-center'>
              <label htmlFor='password'>Password:</label>
              <input
                className=' p-4 rounded-md'
                type='password'
                placeholder='password'
                {...register("password")}
              />
              {errors.password && (
                <span className=' text-red-600 text-3xl'>
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className=' text-3xl flex gap-8 items-center'>
              <label htmlFor='cPassword'>Password:</label>
              <input
                className=' p-4 rounded-md'
                type='password'
                placeholder='Confirm your password'
                {...register("cPassword")}
              />
              {errors.cPassword && (
                <span className=' text-red-600 text-3xl'>
                  {errors.cPassword.message}
                </span>
              )}
            </div>

            <input
              className=' w-1/2 text-white text-3xl rounded-md p-4 bg-purple-800 cursor-pointer hover:bg-purple-900'
              type='submit'
              value='Reset'
            />
          </div>
          <div className=' flex justify-around'>
            <Link className=' text-4xl text-blue-400 underline' to='/'>
              Home
            </Link>

            <Link className='  text-4xl text-blue-400 underline' to='/login'>
              Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
