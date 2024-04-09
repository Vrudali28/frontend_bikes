import React, { useState, useEffect } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookings } from '../redux/actions/bookingAction'
import moment from 'moment';
import { Row, Col } from 'antd'
import Spinner from '../components/Spinner';

function UserBookings() {
    const dispatch = useDispatch()
    const { bookings } = useSelector(state => state.bookingsReducer)
    const user = JSON.parse(localStorage.getItem("user"));
    const { loading } = useSelector(state => state.alertsReducer);
    useEffect(() => {
        dispatch(getAllBookings())
    }, [])




    return (
        <DefaultLayout>
               {loading && <Spinner />}
            <h3 className='text-cenmter mt-2'>My Bookings</h3>
            <Row justify={'center'} gutter={16}>
                <Col lg={15} sm={24}>
                   
                     {bookings.filter(o=>o.user==user._id).map((booking) => {
                        console.log(booking); 
                   return   <Row justify={'center'} gutter={16} className='bs1 m-2 text-left'> 
                       <>
                       <Col lg={4} sm={24}>
                        <p><b>{booking.bike.name}</b></p>
                        <p>Total hours:<b>{booking.totalHours}</b></p>
                        <p>Rent per hour:<b>{booking.bike.rentPerHour}</b></p>
                        <p>Total amount:<b>{booking.totalAmount}</b></p>
                       </Col>
                       <Col lg={10} sm={24}>
                {booking.transactionId && <p>Transaction Id: <b>{booking.transactionId}</b></p>}
                {booking.bookedTimeSlots && (
                    <>
                        <p>From: <b>{booking.bookedTimeSlots.from}</b></p>
                        <p>To: <b>{booking.bookedTimeSlots.to}</b></p>
                    </>
                )}
                <p>Date of booking: <b>{moment(booking.createdAt).format('DD/MM/YYYY')}</b></p>
            </Col>



                       <Col lg={4} sm={24}>
                       <img src={booking.bike.image} height='140' className='p-2'/>
                       </Col>
                     
                       
                       </>

                       </Row>

                     })}




                    
                </Col>
            </Row>
        </DefaultLayout>
    )
}

export default UserBookings