/* import `Audio` source */
import audio from '../../../../../assecs/source/nameface.m4a';
import assistAudio from '../../../../../assecs/source/parents_3.m4a';

const config = {
    illustrate: {
        text: "(指著眼睛)這是什麼?",
        audio: audio,
        remind: true,
        assistText: "請家長讓孩子聽完任務指導語後，讓孩子自己回答即可",
        assistAudio: assistAudio
    },
    reaction: [
        {
            name: '2613-1：圖卡命名-玩偶五官：眼睛',
            value: 'LE',
            text: "正確說出圖卡名稱"
        },
        {
            name: '2613-1：圖卡命名-玩偶五官：眼睛',
            value: 'LE-D',
            text: "超過5s才正確說出，或需要問第二次"
        },
        {
            name: '2613-1：圖卡命名-玩偶五官：眼睛',
            value: 'O',
            text: "沒有口語反應或說錯"
        }
    ]
};

export default config;
