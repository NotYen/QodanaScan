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
            name: '2606：將車開進車庫裡',
            value: 'S, C, LR',
            text: "正確把車「開」到車庫圖卡上"
        },
        {
            name: '2606：將車開進車庫裡',
            value: 'S-D, C-D, LR-D',
            text: "超過5s, 把車「開」到車庫圖卡上"
        },
        {
            name: '2606：將車開進車庫裡',
            value: 'O',
            text: "超過5s沒有反應或車子放在非車庫的位置上"
        }
    ]
}

export default config;
