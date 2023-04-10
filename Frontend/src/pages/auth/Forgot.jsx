import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import "./Login.scss";

const Login = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
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
              <label htmlFor='email'>Email:</label>
              <input
                className=' p-4 rounded-md'
                type='email'
                placeholder='Place your email'
                {...register("email")}
              />
              {errors.email && (
                <span className=' text-red-600 text-3xl'>
                  {errors.email.message}
                </span>
              )}
            </div>

            <input
              className=' w-1/2 text-white text-3xl rounded-md p-4 bg-purple-800 cursor-pointer hover:bg-purple-900'
              type='submit'
              value='Submit'
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
