import React from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../../store/slices/nameTrainer.slice'
import './styles/Header.css'

const Header = () => {
  
 const dispach = useDispatch()

const handelClickLogOut = ()=>{
  dispach(logOut()) 
}

  return (
    <header className='header'>
       <div  className='header_red'>
        <div className='header_img'>
            <img src="/images/pokedex.png" alt="" />
        </div>
       </div>
       <div className='header_black'>
        <div className='header_pokeball'>
            <button className='header_btn' onClick={handelClickLogOut}><i className='bx bxs-exit'></i></button>
        </div>
       </div>
    </header>
  )
}

export default Header