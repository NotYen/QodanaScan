/* import `Audio` source */
import audio from '../../../../../assecs/source/pull.m4a';

const config = {
    illustrate: {
        text: "手指整張圖卡示意放哪裡 ? (但不提示位置)",
        audio: audio,
        remind: true
    },
    reaction: [
        {
            name: '2607：拉取對應圖卡',
            value: 'C, LR',
            text: "正確將積木放到積木圖卡上"
        },
        {
            name: '2607：拉取對應圖卡',
            value: 'C-D, LR-D',
            text: "超過5s才將積木放到積木圖卡上"
        },
        {
            name: '2607：拉取對應圖卡',
            value: 'O',
            text: "超過5s沒有反應或放在非積木圖卡的位置上"
        }
    ]
}

export default config;
