import axios from 'axios';

export async function getResult(case_id, handleSuccess, handleError) {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/result`, {
          params: {
            case_id: case_id
          }
        });
        if (res.data) {
            localStorage.setItem('result', JSON.stringify(res.data));
        }
        if (handleSuccess) {
          handleSuccess()
        }
    } catch (error) {
        console.log('get result error', error);
        if (handleError) {
          handleError(error)
        }
    }
}
