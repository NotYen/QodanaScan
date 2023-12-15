/* import `Audio` source */
import audio from '../../../../../assecs/source/what.m4a';

const config = {
    illustrate: {
        text: "你想玩什麼？",
        audio: audio
    },
    reaction: [
        {
            name: '1604：詢問興趣',
            value: 'S',
            text: "分享（展示）、手指物、假裝的玩法：出現３項"
        },
        {
            name: '1604：詢問興趣',
            value: 'S-D',
            text: "分享（展示）、手指物、假裝的玩法：有出現２項"
        },
        {
            name: '1604：詢問興趣',
            value: 'S-1',
            text: "分享（展示）、手指物、假裝的玩法：只出現１項"
        }
    ]
}

export default config;
