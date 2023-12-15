/* import `Audio` source */
import audio from '../../../../../assecs/source/box.m4a';
import assistAudio from '../../../../../assecs/source/parents_1.m4a';

const config = {
    illustrate: {
        text: "哪一顆球在盒子裡面?",
        audio: audio,
        remind: true,
        assistText: "請家長讓孩子聽完任務指導語後，在螢幕圖卡上點選答案作答",
        assistAudio: assistAudio
    },
    reaction: [
        {
            name: '2627-1：空間對應：盒子裡',
            value: 'C',
            text: "指對圖案"
        },
        {
            name: '2627-1：空間對應：盒子裡',
            value: 'C-D',
            text: "超過5s才有動作或需要重複問，但指對"
        },
        {
            name: '2627-1：空間對應：盒子裡',
            value: 'O',
            text: "超過5s沒有反應或錯誤"
        }
    ]
};

export default config;
