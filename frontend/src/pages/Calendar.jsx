import React from 'react'

// Components
import Topbar from '../components/Topbar/Topbar'
import Back from '../components/Back/Back'

function Calendar() {
    return (
        <div>
            <Topbar />
            <div className="container mb-4">
                <Back link='/dashboard'/>

            </div>
        </div>
  )
}

export default Calendar
