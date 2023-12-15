/* import `Audio` source */
import audio from '../../../../../assecs/source/namedoing.m4a';
import assistAudio from '../../../../../assecs/source/parents_3.m4a';

const config = {
    illustrate: {
        text: "(手指著「洗手」圖卡) 他在做什麼?",
        audio: audio,
        remind: true,
        assistText: "請家長讓孩子聽完任務指導語後，讓孩子自己回答即可",
        assistAudio: assistAudio
    },
    reaction: [
        {
            name: '2624-1：圖卡命名-動作圖卡：洗手',
            value: 'LE',
            text: "正確回答"
        },
        {
            name: '2624-1：圖卡命名-動作圖卡：洗手',
            value: 'LE-D',
            text: "超過5s才正確說出，或需要問第二次"
        },
        {
            name: '2624-1：圖卡命名-動作圖卡：洗手',
            value: 'O',
            text: "沒有口語反應或說錯"
        }
    ]
};

export default config;
