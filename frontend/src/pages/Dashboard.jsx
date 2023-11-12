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
          <div className="options grid grid-cols-5 gap-4 text-center text-white w-full">
            
            <Link className='col-span-3' to={'/members'}>
              <div className="option bg-[#ff7a00]">
                <MemberIcon className='option-icon' /><br />
                <span>Members</span>
              </div>
            </Link>

            <Link to={'/announce'} className='col-span-2'>
              <div className="option bg-[#78c1f1]">
                <SendIcon className='option-icon'/><br />
                <span>Announce</span>
              </div>
            </Link>

            <Link to={'/settings'} className='col-span-2'>
              <div className="option bg-[#78c1f1]">
                <SettingIcon className='option-icon'/> <br />
                <span>Settings</span>
              </div>
            </Link>

            <Link to={'/contents'} className='col-span-3'>
            <div className="option bg-[#ff7a00]">
              <ContentIcon className='option-icon'/> <br />
              <span>Contents</span>
            </div>
            </Link>
          
          </div>
          <br />
          <div className="recent-list flex mt-10">
            <h1 className='text-3xl font-bold'>Recent Activities</h1>
          </div>
        </div>
    </div>
  )
}

export default Dashboard
