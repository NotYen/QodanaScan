/* import `Audio` source */
import audio from '../../../../../assecs/source/puzzle.m4a';
import assistAudio from '../../../../../assecs/source/parents_2.m4a';

const config = {
    illustrate: {
        text: "這是間房子，請幫我把它拼起來",
        audio: audio,
        remind: false,
        assistText: "請家長在聽完系統指導語後，先示範一次給孩子看",
        assistAudio: assistAudio
    },
    reaction: [
        {
            name: '1628：拼圖',
            value: 'FM',
            text: "在60秒內將兩片拼圖拼完成"
        },
        {
            name: '1628：拼圖',
            value: 'FM-D',
            text: "超過5s才開始動作或需重複口語或示範，但完成時間<60s"
        },
        {
            name: '1628：拼圖',
            value: 'FM-1',
            text: "5s內開始動作，但完成時間>60秒"
        },
        {
            name: '1628：拼圖',
            value: 'FM-1',
            text: "超過5s開始動作，且完成拼圖時間超過60秒"
        },
        {
            name: '1628：拼圖',
            value: 'O',
            text: "超過2分鐘無法完成拼圖"
        }
    ]
};

export default config;
