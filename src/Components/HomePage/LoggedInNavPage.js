import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './HomePage.css'
import MemberSettings from './MemberSettings';

function LoggedInNavPage() {
    const [openNotiofications, setOpenNotifications] = useState(false)
    const [notificationCount, setNotificationCount] = useState('');
    const nav = useNavigate()
    const handleMakeZero = () => {
        setNotificationCount(0);
    };
    return (
        <>
            <div className='top-nav'>
                <div >
                    
                </div>
                <div className='user-icons'>
                    <img onClick={() => setOpenNotifications(!openNotiofications)} src='https://cdn-icons-png.freepik.com/256/5794/5794042.png?ga=GA1.1.1462843302.1696500966&semt=ais_hybrid' alt='' />
                    <img src='https://icon-library.com/images/username-icon-png/username-icon-png-19.jpg' alt='' onClick={()=>nav('/edit-details')}/>
                    {/* <button>Signup</button>
                <button>Login</button> */}
                </div>
            </div>
            <MemberSettings memberPhoto=''  memberName='sr' memberEmail='s@gmail.com' onClose={false}/>
            {openNotiofications && <Notification onclose={() => setOpenNotifications(!openNotiofications)} handleMakeZero={handleMakeZero} />}
        </>

    )
}

export default LoggedInNavPage