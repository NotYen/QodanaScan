/* import `Audio` source */
import audio from '../../../../../assecs/source/hair.m4a';
import assistAudio from '../../../../../assecs/source/parents_1.m4a';

const config = {
    illustrate: {
        text: "寶寶的頭髮在哪裡？",
        audio: audio,
        remind: true,
        assistText: "請家長讓孩子聽完任務指導語後，在螢幕圖卡上點選答案作答",
        assistAudio: assistAudio
    },
    reaction: [
        {
            name: '2611-2：指出五官部位：頭髮',
            value: 'C, LR',
            text: "聽指令完成動作"
        },
        {
            name: '2611-2：指出五官部位：頭髮',
            value: 'C-D, LR-D',
            text: "超過5s才有動作，但正確"
        },
        {
            name: '2611-2：指出五官部位：頭髮',
            value: 'O',
            text: "超過5s沒有反應或錯誤"
        }
    ]
};

export default config;
