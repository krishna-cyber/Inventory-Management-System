import React from "react";
import { FaProductHunt } from "react-icons/fa";
import image from "../assets/hero.png";

const Home = () => {
  return (
    <>
      <section className=' h-screen w-screen text-white bg-blue-950'>
        <nav className=' max-w-4xl mx-auto p-4 flex justify-between items-center'>
          <FaProductHunt className='text-4xl' />

          <div className='flex gap-4'>
            <button className='bg-blue-800 cursor-pointer hover:bg-blue-900 text-white font-bold py-2 px-4 rounded'>
              Sign In
            </button>
            <button className='bg-blue-800 cursor-pointer hover:bg-blue-900 text-white font-bold py-2 px-4 rounded'>
              Sign Up
            </button>
          </div>
        </nav>
        <section className='max-w-4xl mx-auto py-20 flex items-center'>
          <div className=' w-1/2 flex flex-col gap-10'>
            <h1 className=' text-4xl'>
              Inventory and stock management solution for you.
            </h1>
            <p className=' text-lg font-thin'>
              Inventory system to control and manage proucts in the warehouse in
              real timeand integrated to make it easier to develop your
              business.
            </p>
            <button className=' text-left p-2 border border-white w-fit rounded animate-bounce cursor-pointer'>
              Free Trial 1 Month
            </button>
            <div className=' flex gap-4 text-lg'>
              <span>
                <span className=' font-semibold'> 14k</span> <br></br>Brand
                Owners
              </span>
              <span>
                <span className=' font-semibold'> 23K</span> <br></br>Active
                Users
              </span>
              <span>
                <span className=' font-semibold'>500+</span> <br></br>Partners
              </span>
            </div>
          </div>
          <div className='w-1/2'>
            <img src={image} alt='Stock Management' srcset='' />
          </div>
        </section>
      </section>
    </>
  );
};

export default Home;
