/* import `Audio` source */
import audio from '../../../../../assecs/source/cup.m4a';
import assistAudio from '../../../../../assecs/source/parents_1.m4a';

const config = {
    illustrate: {
        text: "杯子在哪裡? ",
        audio: audio,
        assistText: "請家長讓孩子聽完任務指導語後，在螢幕圖卡上點選答案作答",
        assistAudio: assistAudio
    },
    reaction: [
        {
            name: '1613-1：尋找物品：杯子',
            value: 'C, LR',
            text: "聽指令找對物品"
        },
        {
            name: '1613-1：尋找物品：杯子',
            value: 'C-D, LR-D',
            text: "超過5s才有動作,但反應正確"
        },
        {
            name: '1613-1：尋找物品：杯子',
            value: 'O',
            text: "超過5s沒有反應"
        }
    ]
};

export default config;
