import React from "react";
import { Link } from "react-router-dom";
import { FaProductHunt } from "react-icons/fa";
import "./homepage.scss";
import image from "../../assets/hero.webp";

const homepage = () => {
  return (
    <>
      <nav>
        <div className='logo'>
          <Link to='/'>
            <FaProductHunt size={23} />
          </Link>
        </div>
        <div className='nav-links'>
          <ul>
            <li>
              <Link to='/register'>Register</Link>
            </li>
            <li className='btn'>
              <Link to='/login'>Login</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero section */}
      <section className='hero'>
        <div className='left-section'>
          <h1>Inventory and Stock Management Solution</h1>
          <p>
            Inventory system to control and manage proucts in the warehouse in
            real timeand integrated to make it easier to develop your business.
          </p>
          <div className='btn'>
            <button>Free 1 Month Trial</button>
          </div>
          <div className='counter-container'>
            <span className='counter'>
              <span className='count'>14K</span>{" "}
              <span className='text'>Brand Owners</span>
            </span>
            <span className='counter'>
              <span className='count'>23K</span>{" "}
              <span className='text'>Active Users</span>
            </span>
            <span className='counter'>
              <span className='count'>500+</span>{" "}
              <span className='text'>Partners</span>
            </span>
          </div>
        </div>
        <div className='right-section'>
          <img src={image} alt='hero' />
        </div>
      </section>
    </>
  );
};

export default homepage;
