/* import `Audio` source */
import audio from '../../../../../assecs/source/puzzles.m4a';
import assistAudio from '../../../../../assecs/source/parents_2.m4a';

const config = {
    illustrate: {
        text: "這是一隻狗，把它拼起來",
        audio: audio,
        remind: false,
        assistText: "請家長在聽完系統指導語後，先示範一次給孩子看",
        assistAudio: assistAudio
    },
    reaction: [
        {
            name: '2630：拼圖',
            value: 'FM',
            text: "在60秒內將兩片拼圖拼完成"
        },
        {
            name: '2630：拼圖',
            value: 'FM-1',
            text: "完成拼圖時間超過60秒"
        },
        {
            name: '2630：拼圖',
            value: 'O',
            text: "無法完成拼圖"
        }
    ]
};

export default config;
