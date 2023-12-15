/* import `Audio` source */
import audio from '../../../../../assecs/source/fly.m4a';
import assistAudio from '../../../../../assecs/source/parents_1.m4a';

const config = {
    illustrate: {
        text: "誰在飛？",
        audio: audio,
        remind: true,
        assistText: "請家長讓孩子聽完任務指導語後，在螢幕圖卡上點選答案作答",
        assistAudio: assistAudio
    },
    reaction: [
        {
            name: '1624-4：動作圖卡：飛',
            value: 'C, LR',
            text: "指對圖卡"
        },
        {
            name: '1624-4：動作圖卡：飛',
            value: 'C-D, LR-D',
            text: "超過5s才有動作或需要重複問"
        },
        {
            name: '1624-4：動作圖卡：飛',
            value: 'O',
            text: "超過5s沒有反應或錯誤"
        }
    ]
};

export default config;
