/* import `Audio` source */
import audio from '../../../../../assecs/source/look-2.m4a';

/* import `Image` source */
import imageSourc from '../../../../../assecs/images/source/source_64.png';

const config = {
    illustrate: {
        text: "家長先手指玩具，然後說 : 「OO(孩子名)，你看」",
        image: imageSourc,
        audio: audio,
    },
    reaction: [
        {
            name: '2602：呼喚孩子名字2',
            value: 'S',
            text: "眼睛看向桌上玩具"
        },
        {
            name: '2602：呼喚孩子名字2',
            value: 'O',
            text: "眼睛沒有看向桌上玩具或看別處或無反應"
        }
    ]
}

export default config;
