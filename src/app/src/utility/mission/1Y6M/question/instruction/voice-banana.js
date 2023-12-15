/* import `Audio` source */
import audio from '../../../../../assecs/source/voice.m4a';
import assistAudio from '../../../../../assecs/source/parents_3.m4a';

const config = {
    illustrate: {
        text: " (指著香蕉圖卡問)這是什麼?",
        audio: audio,
        remind: true,
        assistText: "請家長讓孩子聽完任務指導語後，讓孩子自己回答即可",
        assistAudio: assistAudio
    },
    reaction: [
        {
            name: '1622-2：圖卡命名：香蕉',
            value: 'LE',
            text: "正確說出圖卡名稱"
        },
        {
            name: '1622-2：圖卡命名：香蕉',
            value: 'LE-D',
            text: "超過5s才正確說出，或需要問第二次"
        },
        {
            name: '1622-2：圖卡命名：香蕉',
            value: 'O',
            text: "沒有口語反應或說錯"
        }
    ]
};

export default config;
