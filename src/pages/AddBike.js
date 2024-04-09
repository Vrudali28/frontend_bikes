import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Row, Col ,Form , Input } from 'antd'
import { useDispatch ,useSelector} from 'react-redux'
import { addBike } from '../redux/actions/bikesAction'
import Spinner from '../components/Spinner'
function AddBike() {
 const dispatch = useDispatch()
 const { loading } = useSelector(state => state.alertsReducer);
function onFinish(values){
    values.bookedTimeSlots = [];
    dispatch(addBike(values));
    console.log(values);
}


  return (
  <DefaultLayout>
      {loading && <Spinner />}
<Row justify='center mt-5' >
    <Col lg={12} sm={24}>
    <Form className='bs1 p-2' layout='vertical' onFinish={onFinish}>
        <h3>Add New Bike</h3>
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
       
        <button className='btn1'>ADD BIKE</button>
       
       

    </Form>
    </Col>
</Row>
    </DefaultLayout>
  )
}

export default AddBike