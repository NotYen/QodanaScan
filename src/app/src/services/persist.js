import axios from 'axios';

const getPersist = async (handleSuccess, handleError) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/persist`, {
      params: {
        case_id: JSON.parse(localStorage.getItem('information')).case_id,
      }
    });
    if (res.data) {
      localStorage.setItem('persist:root', res.data.persist)
      console.log(localStorage.getItem('persist:root'))

      if (handleSuccess) {
        handleSuccess(res.data.persist)
      }
      return res.data
    }
  } catch (error) {
    console.log('get persist error', error);
    if (handleError) {
      handleError(error)
    }
  }
}

const setPersist = async (handleError) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/persist`, {
      case_id: JSON.parse(localStorage.getItem('information')).case_id,
      persist: localStorage.getItem('persist:root')
    });
    if (res.data) {
      return res.data
    }
  } catch (error) {
    console.log('get persist error', error);
    if (handleError) {
      handleError(error)
    }
  }
}

export { getPersist, setPersist }