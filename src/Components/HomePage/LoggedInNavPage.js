import React,{useState} from 'react'
import './HomePage.css'

function LoggedInNavPage() {
    const [openNotiofications,setOpenNotifications] = useState(false)
    const [notificationCount, setNotificationCount] = useState('');
    const handleMakeZero = () => {
        setNotificationCount(0);
      };
    return (
        <>
        <div className='top-nav'>
            <div className='logo'>
                <img src='https://img.freepik.com/free-vector/www-internet-globe-grid_78370-2008.jpg?size=338&ext=jpg&ga=GA1.1.1819120589.1727481600&semt=ais_hybrid' alt='logo' />
                <div></div>
                <span>Task management</span>
            </div>
            <div className='user-icons'>
                <img onClick={()=>setOpenNotifications(!openNotiofications)} src='https://cdn-icons-png.freepik.com/256/5794/5794042.png?ga=GA1.1.1462843302.1696500966&semt=ais_hybrid' alt=''/>
                <img src='https://icon-library.com/images/username-icon-png/username-icon-png-19.jpg' alt=''/>
                {/* <button>Signup</button>
                <button>Login</button> */}
            </div>
        </div>
        {openNotiofications && <Notification onclose={()=>setOpenNotifications(!openNotiofications)} handleMakeZero={handleMakeZero}/>}
        </>
        
    )
}

export default LoggedInNavPage