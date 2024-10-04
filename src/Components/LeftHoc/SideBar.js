import React from 'react'
import './SideBar.css'

function SideBar() {
    return (
        <div className='sidebar-page'>
            <div className='sidebar-page-top'>
                <div className='sidebar-page-title'>
                    <img src='https://img.freepik.com/free-vector/www-internet-globe-grid_78370-2008.jpg?size=338&ext=jpg&ga=GA1.1.1819120589.1727481600&semt=ais_hybrid' alt='logo' width={40} height={40} />
                    <span>
                        Task management
                    </span>
                </div>
                <div className='sidebar-page-nav'>
                    <img src='https://cdn-icons-png.freepik.com/256/13485/13485450.png?ga=GA1.1.1462843302.1696500966&semt=ais_hybrid' alt='logout' width={40} height={40} />
                    navs
                </div>

            </div>
            {/* https://cdn-icons-png.freepik.com/256/13485/13485450.png?ga=GA1.1.1462843302.1696500966&semt=ais_hybrid */}
            <div className='sidebar-logout'>
                <img src='https://cdn-icons-png.freepik.com/256/16312/16312100.png?ga=GA1.1.1462843302.1696500966&semt=ais_hybrid' alt='logout' width={40} height={40} />
                <span>Logout</span>
            </div>
        </div>
    )
}

export default SideBar