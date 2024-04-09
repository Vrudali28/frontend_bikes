
import { message } from 'antd';
import axios from 'axios';
import { constantApi } from '../../const';

const instance = axios.create({
  baseURL: constantApi,
});

export const getAllBikes = () => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });
  
    try {
      const response = await instance.get('/api/bikes/getallbikes');
      console.log(response.data); // Log response data
      dispatch({ type: 'GET_ALL_BIKES', payload: response.data });
      dispatch({ type: 'LOADING', payload: false });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'LOADING', payload: false });
    }
  };
  

export const addBike = (reqObj) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    const response = await instance.post('/api/bikes/addbike', reqObj);

    dispatch({ type: 'LOADING', payload: false });
    message.success('New bike added successfully');
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const editBike = (reqObj) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    const response = await instance.post('/api/bikes/editbike', reqObj);

    dispatch({ type: 'LOADING', payload: false });
    message.success('Bike details updated successfully');
    setTimeout(() => {
      window.location.href = '/admin';
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const deleteBike = (reqObj) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    const response = await instance.post('/api/bikes/deletebike', reqObj);

    dispatch({ type: 'LOADING', payload: false });
    message.success('Bike deleted successfully');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOADING', payload: false });
  }
};


//without deployed backend url//
/*import { message } from 'antd';
import axios from 'axios';
export const getAllBikes=()=> async dispatch=>{
    dispatch({type: 'LOADING', payload:true})

    try{
        const response = await axios.get('/api/bikes/getallbikes')
        dispatch({type: 'GET_ALL_BIKES', payload:response.data})
        dispatch({type: 'LOADING', payload:false})
    }
    catch(error){
        console.log(error)
        dispatch({type: 'LOADING', payload:false})
    }
}

export const addBike = (reqObj) => async dispatch => {
    dispatch({type: 'LOADING', payload:true})

    try{
        const response = await axios.post('/api/bikes/addbike' , reqObj)
       
        dispatch({type: 'LOADING', payload:false})
        message.success('New bike added successfully')
        setTimeout(()=> {
            
            window.location.href='/'
        },1000);
    }
    catch(error){
        console.log(error)
        dispatch({type: 'LOADING', payload:false})
    }
}

export const editBike = (reqObj) => async dispatch => {
    dispatch({type: 'LOADING', payload:true})

    try{
        const response = await axios.post('/api/bikes/editbike' , reqObj)
       
        dispatch({type: 'LOADING', payload:false})
        message.success('Bike details updated successfully')
        setTimeout(()=> {
            
            window.location.href='/admin'
        },1000);
    }
    catch(error){
        console.log(error)
        dispatch({type: 'LOADING', payload:false})
    }
}


export const deleteBike = (reqObj) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });

    try {
        const response = await axios.post('/api/bikes/deletebike', reqObj);

        dispatch({ type: 'LOADING', payload: false });
        message.success('Bike deleted successfully');
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    } catch (error) {
        console.log(error);
        dispatch({ type: 'LOADING', payload: false });
    }
}
*/