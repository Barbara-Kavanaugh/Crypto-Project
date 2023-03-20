import React from 'react';
import '../styles/Navbar.scss';


const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='container'>
        <div className='flex'>
            <div className='title'>
                <h2>Crypto Crash</h2>
            </div>
            <div className='winnings'>
                <div className='winnings-wallet'>
                    <input type='text' readOnly/>
                    <button>Claim</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
