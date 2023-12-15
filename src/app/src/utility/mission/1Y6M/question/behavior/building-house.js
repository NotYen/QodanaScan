/* import `Audio` source */
import audio from '../../../../../assecs/source/house-2.m4a';

const config = {
    illustrate: {
        text: "示範將一個積木疊上另一個積木，然後說「換你」",
        audio: audio,
        remind: false
    },
    reaction: [
        {
            name: '1618：一起疊積木2',
            value: 'FM',
            text: "疊高積木大於或等於兩塊"
        },
        {
            name: '1618：一起疊積木2',
            value: 'O',
            text: "無法疊高積木大於或等於兩塊"
        }
    ]
};

export default config;
