//   import React, { useState } from 'react';
//   import { Menu, X } from 'lucide-react'; 
// import { Link } from 'react-router-dom';
//   const Navbar = () => {
//     const [isOpen, setIsOpen] = useState(false);

//     return (
//       <nav className="bg-purple-800 text-white p-4 sticky top-0">
//         <div className="flex justify-between items-center">
//           <h1 className="text-xl font-bold">CryptoApp</h1>

//            <Link to="/" className="text-xl font-bold"></Link>
//           <div className="md:hidden">
//             <button onClick={() => setIsOpen(!isOpen)}>
//               {isOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>

//        <ul className="hidden md:flex justify-evenly w-full font-sans">



           
//             <li className="hover:text-black cursor-pointer">Markets List</li>
//               <Link to="/" >Market</Link>
//             <li className="hover:text-black cursor-pointer">Coin Details</li>
//             <li className="hover:text-black cursor-pointer">Watchlist</li>
//             <Link to="/watchlist" className="hover:text-yellow-300">Watchlist</Link>
//           </ul>
//         </div>

        
//         {isOpen && (
//           <ul className="mt-4 space-y-2 md:hidden font-sans">
            
//             <li className="hover:text-black hover:bg-white-500 cursor-pointer">Markets List</li>
//             <li className="hover:text-black cursor-pointer">Coin Details</li>
//             <li className="hover:text-black cursor-pointer">Watchlist</li>
//           </ul>
//         )}
//       </nav>
//     );
//   };

//   export default Navbar;
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-purple-800 text-white p-4 sticky top-0">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">CryptoApp</Link>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <ul className="hidden md:flex justify-evenly w-full font-sans">
          <li className="hover:text-black cursor-pointer">
            <Link to="/">Markets List</Link>
          </li>
          <li className="hover:text-black cursor-pointer">
            <Link to="/coin/bitcoin">Coin Details</Link>
          </li>
          <li className="hover:text-black cursor-pointer">
            <Link to="/watchlist">Watchlist</Link>
          </li>
        </ul>
      </div>

      {isOpen && (
        <ul className="mt-4 space-y-2 md:hidden font-sans">
          <li className="hover:text-black hover:bg-white-500 cursor-pointer">
            <Link to="/">Markets List</Link>
          </li>
          <li className="hover:text-black cursor-pointer">
            <Link to="/coin/bitcoin">Coin Details</Link>
          </li>
          <li className="hover:text-black cursor-pointer">
            <Link to="/watchlist">Watchlist</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
