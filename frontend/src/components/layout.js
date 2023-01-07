import React from 'react';
import { Link } from 'react-router-dom';


function Layout({ children }) {
    return (
        <div className='w-ful'>
            <div className='fixed w-full backdrop-blur'>
                <nav class="flex h-16 justify-between items-center px-12">
                    <div class="flex items-center">
                        <Link to="/" class="text-black font-bold text-xl mr-4">Angel NFT</Link>
                        <Link to="/donate" class="text-black mr-4">Donate</Link>
                        <Link to="/trade" class="text-black mr-4">Trade</Link>
                    </div>
                    <div class="flex items-center">
                        <div className='w-8 h-8 rounded-full bg-black'>
                        </div>
                    </div>
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