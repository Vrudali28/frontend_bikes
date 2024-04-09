import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout'
import { Row, Col ,Form , Input } from 'antd'
import { useDispatch ,useSelector} from 'react-redux'
import { addBike } from '../redux/actions/bikesAction'
import Spinner from '../components/Spinner'
import { getAllBikes, editBike } from '../redux/actions/bikesAction'
import { useParams } from 'react-router-dom';
function EditBike(match) {
 
 const { bikeid } = useParams();
 const { bikes } = useSelector(state => state.bikesReducer);
 const dispatch = useDispatch()
 const { loading } = useSelector(state => state.alertsReducer);
 const [bike , setBike] = useState()
 const [totalbikes , settotalbikes] = useState([])

 useEffect(() => {
    if (bikes.length == 0) {
        dispatch(getAllBikes());
      } else {
        settotalbikes(bikes);
        setBike(bikes.find(o => o._id == bikeid));
      }
    }, [bikes]); 


function onFinish(values){
values._id = bike._id
    dispatch(editBike(values));
    console.log(values);
}


  return (
  <DefaultLayout>
      {loading && <Spinner />}
<Row justify='center mt-5' >
    <Col lg={12} sm={24}>

    {totalbikes.length>0 &&  <Form  initialValues={bike} className='bs1 p-2' layout='vertical' onFinish={onFinish}>
        <h3>Edit Bike</h3>
        <hr/>
        <Form.Item name='name' label='name' rules={[{required: true}]}>
            <Input/>
        </Form.Item>
        <Form.Item name='image' label='Image url' rules={[{required: true}]}>
            <Input/>
        </Form.Item>
        <Form.Item name='rentPerHour' label='Rent per hour' rules={[{required: true}]}>
            <Input/>
        </Form.Item>
        <Form.Item name='capacity' label='Capacity' rules={[{required: true}]}>
            <Input/>
        </Form.Item>
        <Form.Item name='fuelType' label='Fuel Type' rules={[{required: true}]}>
            <Input/>
        </Form.Item>
       
        <button className='btn1'>EDIT BIKE</button>
       
       

    </Form>}
    
    </Col>
</Row>
    </DefaultLayout>
  )
}

export default EditBike