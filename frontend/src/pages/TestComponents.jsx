//https://react-tailwindcss-datepicker.vercel.app/demo

import React, { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { DragDropContext } from 'react-beautiful-dnd';

import CustomModal from '../components/CustomModal/CustomModal';
import { Button } from '@mui/material';

function TestComponents() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
  <>
    <div className="container">
      <h1 className='heading-1 mt-20'>Testing</h1>
      <CustomModal 
          open={open}
          handleClose={handleClose}
          modalHeading={"From Test"}
          modalDescription={"Description from Test"}
          additions={
            <button className='btn-blue w-full mt-5'>Button from test</button>
          }
      />
      <button className='btn-blue' onClick={handleOpen}>Click Me</button>
    </div>
  </>
  );
}

export default TestComponents
