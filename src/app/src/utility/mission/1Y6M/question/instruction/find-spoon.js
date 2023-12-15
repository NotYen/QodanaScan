/* import `Audio` source */
import audio from '../../../../../assecs/source/spoon.m4a';
import assistAudio from '../../../../../assecs/source/parents_1.m4a';

const config = {
    illustrate: {
        text: "湯匙在哪裡? ",
        audio: audio,
        remind: true,
        assistText: "請家長讓孩子聽完任務指導語後，在螢幕圖卡上點選答案作答",
        assistAudio: assistAudio
    },
    reaction: [
        {
            name: '1613-2：尋找物品：湯匙',
            value: 'C, LR',
            text: "聽指令找對物品"
        },
        {
            name: '1613-2：尋找物品：湯匙',
            value: 'C-D, LR-D',
            text: "超過5s才有動作,但反應正確"
        },
        {
            name: '1613-2：尋找物品：湯匙',
            value: 'O',
            text: "超過5s沒有反應"
        }
    ]
};

export default config;
