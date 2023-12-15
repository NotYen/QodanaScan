/* import `Audio` source */
import audio from '../../../../../assecs/source/eye.m4a';
import assistAudio from '../../../../../assecs/source/parents_1.m4a';

const config = {
    illustrate: {
        text: "寶寶的眼睛在哪裡？",
        audio: audio,
        remind: true,
        assistText: "請家長讓孩子聽完任務指導語後，在螢幕圖卡上點選答案作答",
        assistAudio: assistAudio
    },
    reaction: [
        {
            name: '1611-1：玩偶五官：眼睛',
            value: 'C, LR',
            text: "聽指令完成動作"
        },
        {
            name: '1611-1：玩偶五官：眼睛',
            value: 'C-D, LR-D',
            text: "超過5s才有動作，但正確"
        },
        {
            name: '1611-1：玩偶五官：眼睛',
            value: 'O',
            text: "超過5s沒有反應或錯誤"
        }
    ]
};

export default config;
