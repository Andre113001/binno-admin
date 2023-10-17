import React from 'react'
import { Link } from 'react-router-dom'
import {ArrowBack as ArrowBackIcon} from '@mui/icons-material'

function Back(props) {
    return (
        <div>
            <Link to={props.link}>
                <div className="flex space-x-3 mb-5 mt-10 w-full cursor-pointer">
                    <div className="icon" >
                        <ArrowBackIcon />
                        <span>Back</span>
                    </div>
                </div>
            </Link>
        </div>
  )
}

export default Back
