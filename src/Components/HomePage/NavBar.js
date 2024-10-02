import React from 'react'
import './HomePage.css'
import { useNavigate } from 'react-router-dom'

function NavBar() {
    const nav = useNavigate()
    return (
        <div className='top-nav'>
            <div className='logo'>
                <img src='https://img.freepik.com/free-vector/www-internet-globe-grid_78370-2008.jpg?size=338&ext=jpg&ga=GA1.1.1819120589.1727481600&semt=ais_hybrid' alt='logo' />
                <div></div>
                <span>Task management</span>
            </div>
            <div className='login-buttons'>
                <button onClick={()=>nav('/signup')}>Signup</button>
                <button onClick={()=>nav('/login')}>Login</button>
            </div>
        </div>
    )
}

export default NavBar