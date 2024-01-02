import React, {useState, Fragment, useEffect} from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import moment from 'moment';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Components
import Topbar from '../components/Topbar/Topbar'
import Back from '../components/Back/Back'
// import { Calendar as CalendarComponent} from '../components/Calendar/Calendar'

// Other Components
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar, Timepicker } from '@mui/x-date-pickers';
import { Divider } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// Custom Hooks
import useCustomModal from '../hooks/useCustomModal';

// Icon
import {
    ScheduleSend,
    Visibility
} from '@mui/icons-material';

const Calendar = () => {
    const { handleOpen, handleClose, CustomModal } = useCustomModal();
    const [selectedDate, setSelectedDate] = useState('');
    const [appointments, setAppointments] = useState(null);

    const fetchDate = async (date) => {
        try {
            const response = await axios.get(`http://localhost:3100/api/schedule/${date}`);
            // Handle the data from the response
            return response.data;
            // You can update your state or perform other actions with the data
        } catch (error) {
            // Handle errors
            console.error('Error fetching data:', error.message);
        }
    };

    useEffect(() => {
        const fetchInitialDate = async () => {
            const date = await moment().format("YYYY-MM-DD");
            setSelectedDate(date);
        };

        fetchInitialDate();
    }, []);
  
    // Function to handle date selection
    const handleDateChange = async (newDate) => {
        const formattedDate = await newDate.format('YYYY-MM-DD');
        setSelectedDate(formattedDate);
    };

    const handleSubmitReschedule = async () => {
        console.log("pressed");
    }
    
    useEffect(() => {
        const loadNewDate = () => {
            setSelectedDate(selectedDate);
            fetchDate(selectedDate)
                .then(results => {
                    setAppointments(results);
                    console.log(selectedDate, results);
                    // Update state or perform other actions with the result
                })
                .catch(error => {
                    console.error('Error: ', error.message);
                });
        };
    
        loadNewDate();
    }, [selectedDate]);

    const f2fMeeting = () => {
        return (
            <div className='border text-center rounded-md mt-2 bg-orange-200 p-3 text-gray-600'>
                <span className='font-bold '>Face-To-Face Meeting</span><br/>
                <p>Sili Deli, OSAS Building, Bicol University </p>
            </div>
        );
    };

    const zoomMeeting = (link) => {
        return (
            <div className='border text-center rounded-md mt-2 bg-blue-200 p-3 text-gray-600 cursor-pointer'>
                <span className='font-bold '>Zoom Meeting</span><br/>
                <a className='element_a' href={link}>{link}</a>
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
                    <button onClick={handleSubmitReschedule} className='btn-blue mt-2'>Submit</button>
                }
            />)}
            <Back link='/dashboard'/>
            <div className='flex row-auto '>
                <div className="p-4" style={{ flex: 1 }}>
                    <h1 className='element_h1 mb-4'>Calendar</h1>
                    <Divider/>
                    <div className='mt-4'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar
                                style={{ width: '100%' }}
                                date={selectedDate} 
                                onChange={handleDateChange}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                <div style={{ flex: 2 }}>
                    <div className='p-4'>
                        <h3 className='element_h3'>Scheduled Interviews</h3>                
                        <span><Moment format='MMMM DD, YYYY'>{selectedDate}</Moment></span> {/*It doesn;t load here*/}
                    </div>
                    <div className="p-4 space-y-10  overflow-y-auto">
                    {
                        appointments && appointments.length > 0 ? (
                            appointments.map((appointment) => {
                                return (
                                    <div className='space-y-3' key={appointment.sched_id}>
                                    {/* Header */}
                                    <div className='flex row-auto justify-between items-center'>
                                        <h1 className='heading-1'>{appointment.app_institution}</h1>
                                        <div className='ml-auto'>
                                        <Link to={'#'}><button  className='btn bg-blue-400 flex items-center justify-center space-x-2'>
                                                <Visibility/>
                                                <span>View Application</span>
                                            </button></Link>
                                        </div>
                                        <div>
                                        <button onClick={() => handleOpen(appointment)} className='btn-orange flex items-center justify-center space-x-2'>
                                                <ScheduleSend/>
                                                <span>Reschedule</span>
                                            </button>
                                        </div>
                                    </div>
                                    <h4>{appointment.app_email}</h4>
                                    <span><Moment format="hh:mm A" parse="HH:mm:ss">{appointment.sched_timestart}</Moment> - <Moment format="hh:mm A" parse="HH:mm:ss">{appointment.sched_timedue}</Moment></span>
                                    {appointment.sched_zoomlink && appointment.sched_zoomlink.length > 0 ? (
                                        zoomMeeting(appointment.sched_zoomlink)
                                        ) : (
                                        f2fMeeting()
                                    )}
                                </div>
                                );
                            })
                        ) : (
                            <div>
                                <h1 className='text-6xl font-bold mb-5'>
                                    No Scheduled Interview on this Date
                                </h1>
                                <a href="#" className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>
                                    Check Applications...
                                </a>
                            </div>
                        )
                    }
                    </div>
                </div>
            </div>
        </div>    
    </div>
    )
}

export default Calendar
