import React, {useState, Fragment} from 'react'
// Components
import Topbar from '../components/Topbar/Topbar'
import Back from '../components/Back/Back'
// import { Calendar as CalendarComponent} from '../components/Calendar/Calendar'

// Other Components
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Divider } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// Custom Hooks
import useCustomModal from '../hooks/useCustomModal';

// Icon
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';

const Calendar = () => {
    const { handleOpen, handleClose, CustomModal } = useCustomModal(); 

    const f2fMeeting = () => {
        return (
            <div className='border text-center rounded-md mt-2 bg-orange-200 p-3 text-gray-600'>
                <span className='font-bold '>Face-To-Face Meeting</span><br/>
                <p>Sili Deli, OSAS Building, Bicol University </p>
            </div>
        );
    };

    const zoomMeeting = () => {
        return (
            <div className='border text-center rounded-md mt-2 bg-blue-200 p-3 text-gray-600 cursor-pointer'>
                <span className='font-bold '>Zoom Meeting</span><br/>
                <a className='element_a' href="#">https://us04web.zoom.us/j/2214143?pwd=password</a>
            </div>
        );
    }

    return (
    <div>
        <Topbar />
        <div className="container">
        {open && (<CustomModal 
            open={open}
            handleClose={handleClose}
            content = {
                <Fragment>
                    <h1 className='mb-2 element_h1'>Select a different date</h1>
                    <div className="w-full"> {/* Use w-full to make the container full width */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker orientation='landscape' />
                        </LocalizationProvider>
                    </div>
                </Fragment>
            }
            additions={
            <button className='btn-blue mt-2'>Submit</button>
            }
        />)}
            <Back link='/dashboard'/>
            <div className='flex row-auto '>
                <div className="p-4">
                    <h1 className='element_h1 mb-4'>Calendar</h1>
                    <Divider/>
                    <div className='mt-4'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar />
                        </LocalizationProvider>
                    </div>
                </div>
                <div>
                    <div className='p-4'>
                        <h3 className='element_h3'>Scheduled Meetings</h3>                
                        <span>November 11, 2023</span>
                    </div>
                    <div className="w-[100%] p-4 space-y-8 overflow-y-auto max-h-screen">
                        <div className='space-y-3'>
                            <div className='flex row-auto justify-between items-center'>
                                <h1 className='heading-1'>Jake Zyrus</h1>
                                <div className='child2 ml-auto'>
                                <button onClick={handleOpen} className='btn-orange flex items-center justify-center space-x-2'>
                                        <ScheduleSendIcon/>
                                        <span>Reschedule</span>
                                    </button>
                                </div>
                            </div>
                            <h4 className='mt-2'>1130marcusa@gmail.com</h4>
                            <span>11:00 AM - 12:00 PM</span>
                            {zoomMeeting()}
                            <p className='mt-4'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce leo augue, accumsan sed risus non, scelerisque commodo tortor. In sed lacus egestas magna ullamcorper varius vitae eu elit. Proin enim est, viverra tincidunt ornare id, vestibulum nec neque. In urna sem, elementum at porta eget, tristique nec orci. Nulla semper odio non nunc vulputate, sit amet interdum lacus molestie. Phasellus a accumsan sapien, ut varius leo. Sed et elit vitae ipsum lobortis volutpat non ac ligula. Sed efficitur, mi vel eleifend eleifend, dui nisi dapibus est, et sollicitudin felis nibh non metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed mattis metus dapibus neque commodo, non scelerisque felis pretium. Morbi molestie egestas mauris, quis cursus dolor varius eu. Fusce id mi ligula. Nulla libero metus, dapibus nec mauris eu, cursus efficitur sem. Praesent dignissim sem at lorem fermentum maximus. In in tincidunt ex.
                                Curabitur pellentesque consequat erat at tempor. Vivamus sollicitudin bibendum viverra. Proin ornare vel metus non ultricies. Aliquam eget dui libero. Mauris ac congue nunc, ac finibus ex. Suspendisse vestibulum tortor nec suscipit fringilla. Donec maximus, odio vitae convallis tempor, nunc nunc pellentesque enim, non sagittis odio mauris id turpis. Aenean maximus nisl nibh, non bibendum velit iaculis id. Nullam ornare faucibus dolor sed porta. Vivamus semper risus in iaculis ultrices. Quisque nec posuere nisi, sed euismod lacus. Suspendisse a nunc metus. Vestibulum auctor ultrices nisl sit amet rhoncus. Suspendisse diam tortor, feugiat a euismod fringilla, posuere eget est. Vestibulum convallis, tortor et lacinia ullamcorper, nibh elit malesuada nisl, ut hendrerit lectus nunc sit amet turpis.
                                Nullam faucibus blandit sem, eu porttitor felis feugiat quis. Praesent mattis diam sed erat tristique, nec condimentum leo maximus. Cras ac elit iaculis, consectetur lorem ut, pretium elit. Cras non neque iaculis, porta nunc et, consectetur dui. Morbi in pretium est. Maecenas lacus enim, suscipit eu erat non, egestas dapibus lectus. In dignissim interdum dui, eget fermentum quam facilisis quis. 
                            </p>
                        </div>

                        <div>
                            <div className='flex row-auto justify-between items-center'>
                                <h1 className='heading-1'>Charice</h1>
                                <div className='child2 ml-auto'>
                                <button onClick={handleOpen} className='btn-orange flex items-center justify-center space-x-2'>
                                        <ScheduleSendIcon/>
                                        <span>Reschedule</span>
                                    </button>
                                </div>
                            </div>
                            <h4 className='mt-2'>1130marcusa@gmail.com</h4>
                            <span>01:00 PM - 02:00 PM</span>
                            {f2fMeeting()}
                            <p className='mt-4'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce leo augue, accumsan sed risus non, scelerisque commodo tortor. In sed lacus egestas magna ullamcorper varius vitae eu elit. Proin enim est, viverra tincidunt ornare id, vestibulum nec neque. In urna sem, elementum at porta eget, tristique nec orci. Nulla semper odio non nunc vulputate, sit amet interdum lacus molestie. Phasellus a accumsan sapien, ut varius leo. Sed et elit vitae ipsum lobortis volutpat non ac ligula. Sed efficitur, mi vel eleifend eleifend, dui nisi dapibus est, et sollicitudin felis nibh non metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed mattis metus dapibus neque commodo, non scelerisque felis pretium. Morbi molestie egestas mauris, quis cursus dolor varius eu. Fusce id mi ligula. Nulla libero metus, dapibus nec mauris eu, cursus efficitur sem. Praesent dignissim sem at lorem fermentum maximus. In in tincidunt ex.
                                Curabitur pellentesque consequat erat at tempor. Vivamus sollicitudin bibendum viverra. Proin ornare vel metus non ultricies. Aliquam eget dui libero. Mauris ac congue nunc, ac finibus ex. Suspendisse vestibulum tortor nec suscipit fringilla. Donec maximus, odio vitae convallis tempor, nunc nunc pellentesque enim, non sagittis odio mauris id turpis. Aenean maximus nisl nibh, non bibendum velit iaculis id. Nullam ornare faucibus dolor sed porta. Vivamus semper risus in iaculis ultrices. Quisque nec posuere nisi, sed euismod lacus. Suspendisse a nunc metus. Vestibulum auctor ultrices nisl sit amet rhoncus. Suspendisse diam tortor, feugiat a euismod fringilla, posuere eget est. Vestibulum convallis, tortor et lacinia ullamcorper, nibh elit malesuada nisl, ut hendrerit lectus nunc sit amet turpis.
                                Nullam faucibus blandit sem, eu porttitor felis feugiat quis. Praesent mattis diam sed erat tristique, nec condimentum leo maximus. Cras ac elit iaculis, consectetur lorem ut, pretium elit. Cras non neque iaculis, porta nunc et, consectetur dui. Morbi in pretium est. Maecenas lacus enim, suscipit eu erat non, egestas dapibus lectus. In dignissim interdum dui, eget fermentum quam facilisis quis. 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    </div>
    )
    }

export default Calendar
