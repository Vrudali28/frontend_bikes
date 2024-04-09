import React from 'react';
import { Row, Col, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { userLogin } from '../redux/actions/userAction';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Spinner from '../components/Spinner';
AOS.init();
function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state=>state.alertsReducer)

  function onFinish(values) {
    dispatch(userLogin(values));
    console.log(values);
  }

  return (
    <div className='login'>
      {loading  && (<Spinner/>)}

      <Row gutter={16} className='d-flex align-items-center'>
        <Col lg={16} style={{ position: 'relative' }}>
          <img 
          data-aos = 'slide-right'
          data-aos-duration = '1500'
          src="https://imgd.aeplcdn.com/1280x720/n/cw/ec/169047/hero-mavrick-right-side-view2.jpeg?isig=0" alt="Logo" />
          <h1 className='login-logo'>VRUDALIBIKES</h1>
        </Col>

        <Col lg={8} style={{ textAlign: 'left' }} className='p-5'>
          <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>
            <h1>Login</h1>
            <hr />
            <Form.Item name='username' label='Username' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='password' label='Password' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <button type="submit" className="btn1 mt-2">Login</button>
            <hr />
            <Link to='/register'>Click Here to Register</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;