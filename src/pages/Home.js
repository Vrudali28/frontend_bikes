import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBikes } from '../redux/actions/bikesAction';
import { Row, Col, DatePicker } from 'antd';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import moment from 'moment';
const { RangePicker } = DatePicker;

function Home() {
  const { bikes } = useSelector(state => state.bikesReducer);
  const { loading } = useSelector(state => state.alertsReducer);
  const [totalBikes, setTotalBikes] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBikes());
  }, [dispatch]); // Include dispatch in the dependency array

  useEffect(() => {
    setTotalBikes(bikes);
  }, [bikes]);

  function setFilter(values) {
    if (!values || !values[0] || !values[1] || !values[0].$d || !values[1].$d) {
      // Handle the case where values or its properties are null
      return;
    }

    const selectedFrom = moment(values[0].$d, "DD/MM/YYYY HH:mm");
    const selectedTo = moment(values[1].$d, "DD/MM/YYYY HH:mm");

    const temp = totalBikes.filter(bike => {
      for (const booking of bike.bookedTimeSlots) {
        const bookingFrom = moment(booking.from, "DD/MM/YYYY HH:mm");
        const bookingTo = moment(booking.to, "DD/MM/YYYY HH:mm");

        if (
          (selectedFrom.isSameOrAfter(bookingFrom) && selectedFrom.isSameOrBefore(bookingTo)) ||
          (selectedTo.isSameOrAfter(bookingFrom) && selectedTo.isSameOrBefore(bookingTo)) ||
          (selectedFrom.isBefore(bookingFrom) && selectedTo.isAfter(bookingTo))
        ) {
          return false; // Overlapping, hide the bike
        }
      }
      return true; // No overlapping, keep the bike
    });

    setTotalBikes(temp);
  }

  return (
    <div>
      <DefaultLayout>
        
        <Row className='mt-3' justify='center'>
          <Col lg={20} sm={24} className='d-flex justify-content-left'>
            <RangePicker
              format="DD/MM/YYYY HH:mm"
              showTime={{ format: 'HH:mm' }}
              onChange={setFilter}
            />
          </Col>
        </Row>

        {loading && <Spinner />}

        <Row justify='center' gutter={16}>
          {totalBikes.map(bike => {
            return (
              <Col lg={5} sm={24} xs={24} key={bike._id}>
                <div className='bike p-2 bs1 mt-3'>
                  <img src={bike.image} className='bikeimg' alt='Bike' />

                  <div className='bike-content d-flex align-items-center justify-content-between'>
                    <div>
                      <p>{bike.name}</p>
                      <p>Rent Per Hour {bike.rentPerHour}  /-</p>
                    </div>
                    <div>
                      <button className='btn1'>
                        <Link to={`/booking/${bike._id}`} style={{color:"#640B33" , textDecoration:"none"}}>Book Now</Link>
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </DefaultLayout>
    </div>
  );
}

export default Home;
