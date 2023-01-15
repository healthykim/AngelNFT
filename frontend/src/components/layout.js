import React from 'react';
import { Link } from 'react-router-dom';


function Layout({ children }) {
  return (
    <div className='w-ful'>
      <div className='fixed w-full backdrop-blur z-30'>
        <nav className="flex h-16 justify-between items-center px-12">
          <div className="flex items-center">
            <Link to="/" className="text-black font-bold text-xl mr-4">Angel NFT</Link>
            <Link to="/donate" className="text-black mr-4">Donate</Link>
            <Link to="/trade" className="text-black mr-4">Trade</Link>
          </div>
          <Link to="/my_page/my_nft" className="flex items-center">
            <div className='w-10 h-10 rounded-full bg-black'>
            </div>
          </Link>
        </nav>
      </div>
      {/* <div className='h-16 bg-ukblue'></div> */}
      <div className='flex-col w-full h-full justify-center items-center'>
        {children}
      </div>
    </div>
  );
}

export default Layout;