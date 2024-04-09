import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBikes } from '../redux/actions/bikesAction';
import { Row, Col, DatePicker } from 'antd';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm } from 'antd';
import { deleteBike } from '../redux/actions/bikesAction';
const { RangePicker } = DatePicker;


function AdminHome() {
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



  return (
    <div>
      <DefaultLayout>
        <Row gutter={16} className='mt-2'>
          <Col lg={20} sm={24}>
            <div className='d-flex justify-content-between admin-label '>
              <h3>Admin Panel</h3>
              <button className='btn1 add-btn'><a style={{ color: "#640B33", textDecoration: "none" }} href="/addbike">ADD BIKE</a></button>
            </div>
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
                      <p>Rent Per Hour {bike.rentPerHour} /-</p>
                    </div>
                    <div className='mr-6'>
                      <Link to={`/editbike/${bike._id}`}><EditOutlined className='mr-6' style={{ color: "green", cursor: "pointer" }} /></Link>

                      <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this bike?"
                        onConfirm={() => { dispatch(deleteBike({ bikeid: bike._id })) }}

                        okText="Yes"
                        cancelText="No"
                      >
                        <DeleteOutlined className="p-2" style={{ color: "red", cursor: "pointer" }} />

                      </Popconfirm>



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

export default AdminHome;
