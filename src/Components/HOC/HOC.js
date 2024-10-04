import React from 'react'
import LoggedInNavPage from '../HomePage/LoggedInNavPage'
import SideBar from '../LeftHoc/SideBar'

function HOC({children}) {
  return (
    <div>
        <LoggedInNavPage/>
        <div style={{ display: 'flex' }}>
        <SideBar/>
        {children}
        </div>
        
    </div>
  )
}

export default HOC