import React from 'react'
import { Link } from 'react-router-dom';

// Components
import Topbar from '../components/Topbar/Topbar'

// Icons
import {
  Group as MemberIcon,
  LibraryBooks as ContentIcon, 
  Send as SendIcon,
  Settings as SettingIcon,
  WidthFull,
} from '@mui/icons-material';

function Dashboard() {
  // get token from the cookie
  return (
    <div>
        <Topbar />
        <div className="container-body">
          <h1 className='heading-1'>
            Consider the members page will be the main dashboard itself
          </h1>
          
          <div className="recent-list flex mt-10">
            <h1 className='text-3xl font-bold flex flex-row'>Recent Activities</h1>
            <div className='flex'>
                <p>Admin</p>
                <p>Members</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Dashboard
