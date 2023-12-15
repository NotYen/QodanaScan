import axios from 'axios';

export async function updateResult(infor, name, selected, _answers, handleError) {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/result`, {
            case_id: infor.case_id,
            question: name,
            answer: _answers[selected][name].answer,
            spend_time: _answers[selected][name].spend_time,
            more: _answers[selected][name].more
        });
        console.log('res', res);
    } catch (error) {
        console.log('upload result error', error);
        if (handleError) {
            handleError(error)
        }
    }
}

export async function updateScore(infor, score, handleError) {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/result/score`, {
            case_id: infor.case_id,
            score: score
        });
        console.log('res', res);
    } catch (error) {
        console.log('upload score error', error);
        if (handleError) {
            handleError(error)
        }
    }
}