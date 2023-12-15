/* import `Audio` source */
import audio from '../../../../../assecs/source/look.m4a';

/* import `Image` source */
import imageSource from '../../../../../assecs/images/source/source_05.png';

const config = {
    illustrate: {
        text: "將口語指令說給寶寶聽並勾選右方反應選項",
        audio: audio,
        image: imageSource
    },
    reaction: [
        {
            name: '1602：呼喚孩子名字',
            value: 'C',
            text: "聽到名字有反應"
        },
        {
            name: '1602：呼喚孩子名字',
            value: 'O',
            text: "聽到名字沒有反應"
        }
    ]
};

export default config;
