import React from 'react'
import { FaArrowRight } from "react-icons/fa6";

function DetailsChangesPopUp() {
  return (
    <div className='change-logs'>
        <div className='change-logs-cont'>
            <div className='change-logs-head'>
                <span>Changes made</span>
            </div>
            <div className='change-logs-content'>
                <span style={{textAlign:'left'}}>hfgdgfdgfdhfgdgfdgfdhfgdgfdgfdhfgdgfdgfdhfgdgfdgfdhfgdgfdgfd</span>
                <FaArrowRight/>
                <span style={{textAlign:'left'}}>hsgdfgshsgdfgshsgdfgshsgdfgshsgdfgshsgdfgshsgdfgshsgdfgshsgdfgshsgdfgs</span>
            </div>
            <div className='change-logs-btns'>
                <button className='change-logs-save-btns'>
                    Change
                </button >
                <button className='change-logs-cance-btns'>cancel</button>
            </div>
        </div>
    </div>
  )
}

export default DetailsChangesPopUp