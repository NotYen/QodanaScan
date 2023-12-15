/* import `Audio` source */
import audio from '../../../../../assecs/source/disappear-answer.m4a';
import assistAudio from '../../../../../assecs/source/parents_1.m4a';

const config = {
    illustrate: {
        text: "請指出什麼東西不見了?",
        audio: audio,
        remind: true,
        assistText: "請家長讓孩子聽完任務指導語後，在螢幕圖卡上點選答案作答",
        assistAudio: assistAudio
    },
    reaction: [
        {
            name: '2619：什麼不見了',
            value: 'S, C, LR, LE',
            text: "回答正確"
        },
        {
            name: '2619：什麼不見了',
            value: 'LR-1',
            text: "回答錯誤"
        },
        {
            name: '2619：什麼不見了',
            value: 'S-D, C-D, LR-D, LE-D',
            text: "超過5s才回答，但答案正確"
        },
        {
            name: '2619：什麼不見了',
            value: 'LR-1',
            text: "超過5s才回答，但答案錯誤"
        },
        {
            name: '2619：什麼不見了',
            value: 'O',
            text: "沒有反應"
        }
    ]
};

export default config;
