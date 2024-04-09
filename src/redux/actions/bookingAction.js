import axios from 'axios';
import { message } from 'antd';
import { constantApi } from '../../const';

const instance = axios.create({
  baseURL: constantApi,
});

export const bookBike = (reqObj) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    await instance.post('/api/bookings/bookbike', reqObj);

    dispatch({ type: 'LOADING', payload: false });

    setTimeout(() => {
      message.success('Your Bike is Booked Successfully');
      window.location.href = '/userbookings';
    }, 2000);

  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOADING', payload: false });
    message.error('Something Went Wrong, Please Try Later');
  }
};

export const getAllBookings = () => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    const response = await instance.get('/api/bookings/getallbookings');
    dispatch({ type: 'GET_ALL_BOOKINGS', payload: response.data });
    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOADING', payload: false });
  }
};

//without backend url
/*import axios from 'axios';
import { message } from 'antd';

export const bookBike = (reqObj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });
    
    try {
        await axios.post('/api/bookings/bookbike' , reqObj );
        
        dispatch({ type: 'LOADING', payload: false });
        
        setTimeout(() => {
            message.success('Your Bike is Booked Successfully');
            window.location.href='/userbookings'
        }, 2000);
           
            
         
   
       
    } catch(error) {
        console.log(error);
        dispatch({ type: 'LOADING', payload: false });
        message.error('Something Went Wrong, Please Try Later');
    }
};


export const getAllBookings=()=> async dispatch=>{
    dispatch({type: 'LOADING', payload:true})

    try{
        const response = await axios.get('/api/bookings/getallbookings')
        dispatch({type: 'GET_ALL_BOOKINGS', payload:response.data})
        dispatch({type: 'LOADING', payload:false})
    }
    catch(error){
        console.log(error)
        dispatch({type: 'LOADING', payload:false})
    }
}*/