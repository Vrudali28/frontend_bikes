import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBikes } from '../redux/actions/bikesAction';
import Spinner from '../components/Spinner';
import { Row, Col, Divider, DatePicker, Checkbox, Modal } from 'antd';
import moment from 'moment';
import { bookBike } from '../redux/actions/bookingAction';
import StripeCheckout from 'react-stripe-checkout';
const { RangePicker } = DatePicker;

function BookingBike() {
  const { bikeid } = useParams();
  const { bikes } = useSelector(state => state.bikesReducer);
  const { loading } = useSelector(state => state.alertsReducer);
  const dispatch = useDispatch();
  const [bike, setBike] = useState({});
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [timeSlotsSelected, setTimeSlotsSelected] = useState(false);

  useEffect(() => {
    if (bikes.length === 0) {
      dispatch(getAllBikes());
    } else {
      setBike(bikes.find(o => o._id === bikeid));
    }
  }, [bikes, dispatch, bikeid]);

  useEffect(() => {
    setTotalAmount((prevTotalAmount) => (prevTotalAmount = totalHours * bike.rentPerHour + (driver ? totalHours * 30 : 0)));
  }, [driver, totalHours, bike.rentPerHour]);

  function selectTimeSlots(values) {
    if (values && values.length === 2) {
      const selectedFrom = moment(values[0].$d, "DD/MM/YYYY HH:mm");
      const selectedTo = moment(values[1].$d, "DD/MM/YYYY HH:mm");

      const overlapping = bike.bookedTimeSlots.some(booking => {
        const bookingFrom = moment(booking.from, "DD/MM/YYYY HH:mm");
        const bookingTo = moment(booking.to, "DD/MM/YYYY HH:mm");

        return (
          (selectedFrom.isSameOrAfter(bookingFrom) && selectedFrom.isSameOrBefore(bookingTo)) ||
          (selectedTo.isSameOrAfter(bookingFrom) && selectedTo.isSameOrBefore(bookingTo)) ||
          (selectedFrom.isBefore(bookingFrom) && selectedTo.isAfter(bookingTo))
        );
      });

      if (overlapping) {
        setTimeSlotsSelected(false);
        return;
      }

      const formattedStartDate = selectedFrom.format('DD/MM/YYYY HH:mm');
      const formattedEndDate = selectedTo.format('DD/MM/YYYY HH:mm');

      console.log('Start Date:', formattedStartDate);
      console.log('End Date:', formattedEndDate);
      setFrom(formattedStartDate);
      setTo(formattedEndDate);

      const totalHours = selectedTo.diff(selectedFrom, 'hours');
      setTotalHours(totalHours);
      setTimeSlotsSelected(true);
    }
  }


  function bookNow(){
    const reqObj = {
      user: JSON.parse(localStorage.getItem('user'))._id,
      bike: bike._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to
      }
    };
  
    dispatch(bookBike(reqObj));
  }
  

  return (
    <div>
      <DefaultLayout>
        {loading && <Spinner />}

        <Row gutter={16} justify='center' className='d-flex align-items-center' style={{ minHeight: '90vh' }}>
          <Col lg={10} sm={24} xs={24}>
            <img src={bike.image} className='carimg2 bs1' alt='Bike' />
          </Col>
          <Col lg={10} sm={24} xs={24}>
            <Divider type='horizontal' dashed style={{ borderColor: '#000' }}>Bike Info</Divider>
            <div style={{ textAlign: 'right' }}>
              <p className='p2'>{bike.name}</p>
              <p className='p2'>{bike.rentPerHour} Rent Per Hour /-</p>
              <p className='p2'>Fuel: {bike.fuelType}</p>
              <p className='p2'>Max Persons: {bike.capacity}</p>
            </div>
            <Divider type='horizontal' dashed style={{ borderColor: '#000' }}>Select Time Slots</Divider>
            <RangePicker className='btn-p2 range-picker' showTime={{ format: 'HH:mm' }} format='DD/MM/YYYY HH:mm' onChange={selectTimeSlots} />
            <br />
            <div className='btn-bookingSlot'>
              <button className='btn1 mt-2 ' onClick={() => setShowModal(true)}>See Booked Slots</button>
            </div>

            {timeSlotsSelected && (
              <div>
                <p className='p2'>Total Hours: <b>{totalHours}</b></p>
                <p className='p2'>Rent Per Hour: <b>{bike.rentPerHour}</b></p>
                <Checkbox className='checkbox-p2' onChange={(e) => setDriver(e.target.checked)}>Driver Required</Checkbox>
                <br />
                <h3 className='total-amount p2 '>Total Amount: {totalAmount}</h3>

                
                <button className='btn1 btn-p2' onClick={bookNow}>Book Now</button>
                 


              </div>
            )}
          </Col>
        </Row>
        <Modal open={showModal} closable={false} footer={false} title='Booked Time Slots'>
          {bike && bike.bookedTimeSlots && ( // Check if bike and bookedTimeSlots are defined
            <div className='p-2'>
              {bike.bookedTimeSlots.map(slot => (
                <button className='btn1 mt-2'>{slot.from} - {slot.to}</button>
              ))}

              <div className='text-right mt-5'>
                <button className='btn1'
                  onClick={() => {
                    setShowModal(false);
                  }}


                >CLOSE</button>

              </div>

            </div>
          )}
        </Modal>
      </DefaultLayout>
    </div>
  );
}

export default BookingBike;





//WORKING(STRIPE_ISSUUE)//
/*import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBikes } from '../redux/actions/bikesAction';
import Spinner from '../components/Spinner';
import { Row, Col, Divider, DatePicker, Checkbox, Modal } from 'antd';
import moment from 'moment';
import { bookBike } from '../redux/actions/bookingAction';
import StripeCheckout from 'react-stripe-checkout';
const { RangePicker } = DatePicker;

function BookingBike() {
  const { bikeid } = useParams();
  const { bikes } = useSelector(state => state.bikesReducer);
  const { loading } = useSelector(state => state.alertsReducer);
  const dispatch = useDispatch();
  const [bike, setBike] = useState({});
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [timeSlotsSelected, setTimeSlotsSelected] = useState(false);

  useEffect(() => {
    if (bikes.length === 0) {
      dispatch(getAllBikes());
    } else {
      setBike(bikes.find(o => o._id === bikeid));
    }
  }, [bikes, dispatch, bikeid]);

  useEffect(() => {
    setTotalAmount((prevTotalAmount) => (prevTotalAmount = totalHours * bike.rentPerHour + (driver ? totalHours * 30 : 0)));
  }, [driver, totalHours, bike.rentPerHour]);

  function selectTimeSlots(values) {
    if (values && values.length === 2) {
      const selectedFrom = moment(values[0].$d, "DD/MM/YYYY HH:mm");
      const selectedTo = moment(values[1].$d, "DD/MM/YYYY HH:mm");

      const overlapping = bike.bookedTimeSlots.some(booking => {
        const bookingFrom = moment(booking.from, "DD/MM/YYYY HH:mm");
        const bookingTo = moment(booking.to, "DD/MM/YYYY HH:mm");

        return (
          (selectedFrom.isSameOrAfter(bookingFrom) && selectedFrom.isSameOrBefore(bookingTo)) ||
          (selectedTo.isSameOrAfter(bookingFrom) && selectedTo.isSameOrBefore(bookingTo)) ||
          (selectedFrom.isBefore(bookingFrom) && selectedTo.isAfter(bookingTo))
        );
      });

      if (overlapping) {
        setTimeSlotsSelected(false);
        return;
      }

      const formattedStartDate = selectedFrom.format('DD/MM/YYYY HH:mm');
      const formattedEndDate = selectedTo.format('DD/MM/YYYY HH:mm');

      console.log('Start Date:', formattedStartDate);
      console.log('End Date:', formattedEndDate);
      setFrom(formattedStartDate);
      setTo(formattedEndDate);

      const totalHours = selectedTo.diff(selectedFrom, 'hours');
      setTotalHours(totalHours);
      setTimeSlotsSelected(true);
    }
  }


  function bookNow() {
    
  }
function onToken(token){

  const reqObj = {
    token,
    user: JSON.parse(localStorage.getItem('user'))._id,
    bike: bike._id,
    totalHours,
    totalAmount,
    driverRequired: driver,
    bookedTimeSlots: {
      from,
      to
    }
  }
  dispatch(bookBike(reqObj))
}
  return (
    <div>
      <DefaultLayout>
        {loading && <Spinner />}

        <Row gutter={16} justify='center' className='d-flex align-items-center' style={{ minHeight: '90vh' }}>
          <Col lg={10} sm={24} xs={24}>
            <img src={bike.image} className='carimg2 bs1' alt='Bike' />
          </Col>
          <Col lg={10} sm={24} xs={24}>
            <Divider type='horizontal' dashed style={{ borderColor: '#000' }}>Bike Info</Divider>
            <div style={{ textAlign: 'right' }}>
              <p className='p2'>{bike.name}</p>
              <p className='p2'>{bike.rentPerHour} Rent Per Hour /-</p>
              <p className='p2'>Fuel: {bike.fuelType}</p>
              <p className='p2'>Max Persons: {bike.capacity}</p>
            </div>
            <Divider type='horizontal' dashed style={{ borderColor: '#000' }}>Select Time Slots</Divider>
            <RangePicker className='btn-p2 range-picker' showTime={{ format: 'HH:mm' }} format='DD/MM/YYYY HH:mm' onChange={selectTimeSlots} />
            <br />
            <div className='btn-bookingSlot'>
              <button className='btn1 mt-2 ' onClick={() => setShowModal(true)}>See Booked Slots</button>
            </div>

            {timeSlotsSelected && (
              <div>
                <p className='p2'>Total Hours: <b>{totalHours}</b></p>
                <p className='p2'>Rent Per Hour: <b>{bike.rentPerHour}</b></p>
                <Checkbox className='checkbox-p2' onChange={(e) => setDriver(e.target.checked)}>Driver Required</Checkbox>
                <br />
                <h3 className='total-amount p2 '>Total Amount: {totalAmount}</h3>

                <StripeCheckout
                   shippingAddress
                  token={onToken}
                  amount={totalAmount * 100}
                  //currency='inr'
                  stripeKey="pk_test_51Ovc8NSAxiTA3depvYMyh9n8ZAgPH8FXfNGdU2g8haDrhZ4TguRUN1iTrLdoAx7o3jitKLDRzSnSLb1zViMsHX9p005wuy3wJz"
                >
                   <button className='btn1 btn-p2'>Book Now</button>
                  </StripeCheckout>


              </div>
            )}
          </Col>
        </Row>
        <Modal open={showModal} closable={false} footer={false} title='Booked Time Slots'>
          {bike && bike.bookedTimeSlots && ( // Check if bike and bookedTimeSlots are defined
            <div className='p-2'>
              {bike.bookedTimeSlots.map(slot => (
                <button className='btn1 mt-2'>{slot.from} - {slot.to}</button>
              ))}

              <div className='text-right mt-5'>
                <button className='btn1'
                  onClick={() => {
                    setShowModal(false);
                  }}


                >CLOSE</button>

              </div>

            </div>
          )}
        </Modal>
      </DefaultLayout>
    </div>
  );
}

export default BookingBike;*/


//OLD1_FILTER_NOT_WORKING//
/*import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBikes } from '../redux/actions/bikesAction';
import Spinner from '../components/Spinner';
import { Row, Col, Divider, DatePicker, Checkbox, Modal } from 'antd';
import moment from 'moment';
import { bookBike } from '../redux/actions/bookingAction';
const { RangePicker } = DatePicker;

function BookingBike() {
  const { bikeid } = useParams();
  const { bikes } = useSelector(state => state.bikesReducer);
  const { loading } = useSelector(state => state.alertsReducer);
  const dispatch = useDispatch();
  const [bike, setBike] = useState({});
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal , setShowModal] = useState(false);

  useEffect(() => {
    if (bikes.length === 0) {
      dispatch(getAllBikes());
    } else {
      setBike(bikes.find(o => o._id === bikeid));
    }
  }, [bikes, dispatch, bikeid]);

  useEffect(() => {
    setTotalAmount((prevTotalAmount) => (prevTotalAmount = totalHours * bike.rentPerHour + (driver ? totalHours * 30 : 0)));
  }, [driver, totalHours, bike.rentPerHour]);

  function selectTimeSlots(values) {
    if (values && values.length === 2) {
      const startDate = moment(values[0].$d).format('DD/MM/YYYY HH:mm');
      const endDate = moment(values[1].$d).format('DD/MM/YYYY HH:mm');

      console.log('Start Date:', startDate);
      console.log('End Date:', endDate);
      setFrom(startDate);
      setTo(endDate);

      setTotalHours(values[1].diff(values[0], 'hours'));
    }
  }

  function bookNow(){
    const reqObj = {
     user : JSON.parse(localStorage.getItem('user'))._id ,
     bike : bike._id,
     totalHours,
     totalAmount,
     driverRequired : driver,
     bookedTimeSlots : {
      from,
      to
     }

    }
    dispatch(bookBike(reqObj))

  }

  return (
    <div>
      <DefaultLayout>
        {loading && <Spinner />}

        <Row gutter={16} justify='center' className='d-flex align-items-center' style={{ minHeight: '90vh' }}>
          <Col lg={10} sm={24} xs={24}>
            <img src={bike.image} className='carimg2 bs1' alt='Bike' />
          </Col>
          <Col lg={10} sm={24} xs={24}>
            <Divider type='horizontal' dashed style={{ borderColor: '#000' }}>Bike Info</Divider>
            <div style={{ textAlign: 'right' }}>
              <p className='p2'>{bike.name}</p>
              <p className='p2'>{bike.rentPerHour} Rent Per Hour /-</p>
              <p className='p2'>Fuel: {bike.fuelType}</p>
              <p className='p2'>Max Persons: {bike.capacity}</p>
            </div>
            <Divider type='horizontal' dashed style={{ borderColor: '#000' }}>Select Time Slots</Divider>
            <RangePicker className='btn-p2 range-picker' showTime={{ format: 'HH:mm' }} format='DD/MM/YYYY HH:mm' onChange={selectTimeSlots} />
            <br/>
            <div className='btn-bookingSlot'>
            <button className='btn1 mt-2 ' onClick={()=>setShowModal(true)}>See Booked Slots</button>
            </div>
           
            
            <div>
              <p className='p2'>Total Hours: <b>{totalHours}</b></p>
              <p className='p2'>Rent Per Hour: <b>{bike.rentPerHour}</b></p>
              <Checkbox className='checkbox-p2'onChange={(e) => setDriver(e.target.checked)}>Driver Required</Checkbox>
              <br/>
              <h3 className='total-amount p2 '>Total Amount: {totalAmount}</h3>
              <button className='btn1 btn-p2' onClick={bookNow}>Book Now</button>
            </div>
          </Col>
        </Row>
        <Modal open={showModal} closable={false} footer={false} title='Booked Time Slots'>
  {bike && bike.bookedTimeSlots && ( // Check if bike and bookedTimeSlots are defined
    <div className='p-2'>
      {bike.bookedTimeSlots.map(slot => (
        <button className='btn1 mt-2'>{slot.from} - {slot.to}</button>
      ))}
    </div>
  )}
</Modal>


      </DefaultLayout>
    </div>
  );
}

export default BookingBike;*/