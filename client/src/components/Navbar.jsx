import{useState}from 'react';
import{ HiMenuAlt4} from 'react-icons/hi';
import{AiOutlineClose} from 'react-icons/ai';
import logo from '../../images/logo.png';
const NavbarItem=({title, classProps})=>{
    return (                                                            //redering classProps and li= list items
        <li className={'mx-4 cursor-pointer ${classProps}'}>                                 
                                                                             
  {title}
        </li>
    )
}
const Navbar = ()=>{
    const[toggleMenu,setToggleMenu]=useState(false);
    return(
       <nav className="w-full flex md:justify-center justify-between items-center p-4">
           <div className="md:flex-[0.5] flex-initial justified-center items-center">
           <img src={logo} alt="logo" className="w-32 cursor-pointer"/>
           </div>
           <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
           {["Market", "Exchange","Wallets"].map((item, index)=>(         //dynamic array
           <NavbarItem key={item+index} title={item}/>                    //key exist to make it unique
           ))} 
           <li className="bg-[2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
               LOGIN
           </li>
           </ul>
           <div className="flex relative">  
           { toggleMenu
               ? <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)}/>
               : <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)}/>}                                  
           {toggleMenu &&(                                    //&& means it will run only if condition is true
                 <ul
                     className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                     flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"> 
                 <li className="text-xl w-full my-2">
                 <AiOutlineClose onClick={()=>setToggleMenu(false)}/>
                 </li>
                 {["Market", "Exchange", "Wallets"].map((item, index)=>(         //dynamic array
           <NavbarItem key={item+index} title={item} classProps="my-2 text-lg"/>                    //key exist to make it unique
           ))} 
                 </ul>
               )}  
           </div>
       </nav>
    );
}
export default Navbar;