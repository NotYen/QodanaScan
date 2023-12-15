/* import `Audio` source */
import audio from '../../../../../assecs/source/imitate.m4a';
import assistAudio from '../../../../../assecs/source/parents_4.m4a';

const config = {
    illustrate: {
        text: "很棒！我們一起拍拍手 （家長示範）",
        audio: audio,
        remind: false,
        assistText: "請家長讓孩子聽完任務指導語後，讓孩子自己作答即可",
        assistAudio: assistAudio
    },
    reaction: [
        {
            name: '1612：動作模仿',
            value: 'FM, LR',
            text: "正常拍手動作"
        },
        {
            name: '1612：動作模仿',
            value: 'FM, LR-D',
            text: "超過5s才有正常拍手動作"
        },
        {
            name: '1612：動作模仿',
            value: 'LR-D',
            text: "超過5s才有反應，但拍手動作不正確 （手掌未打開或無法對合）"
        },
        {
            name: '1612：動作模仿',
            value: 'O',
            text: "超過5s沒有反應）"
        }
    ]
};

export default config;
