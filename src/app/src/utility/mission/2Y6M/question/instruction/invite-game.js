/* import `Audio` source */
import audio from '../../../../../assecs/source/together.m4a';

const config = {
    illustrate: {
        text: "我們一起玩好不好？",
        audio: audio
    },
    reaction: [
        {
            name: '2603：邀請加入遊戲',
            value: 'S, LR, SLE',
            text: "有點頭/搖頭或是口語反應"
        },
        {
            name: '2603：邀請加入遊戲',
            value: 'S-D, LR-D, SLE-D',
            text: "超過 5s 有反應"
        },
        {
            name: '2603：邀請加入遊戲',
            value: 'O',
            text: "無反應"
        }
    ]
};

export default config;
