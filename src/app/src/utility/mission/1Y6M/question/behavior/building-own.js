/* import `Audio` source */
import audio from '../../../../../assecs/source/house02-2.m4a';

const config = {
    illustrate: {
        text: "將積木拿下恢復，散放在桌上",
        audio: audio,
        remind: false
    },
    reaction: [
        {
            name: '1619：自己疊積木2',
            value: 'FM',
            text: "疊高積木大於或等於兩塊"
        },
        {
            name: '1619：自己疊積木2',
            value: 'O',
            text: "無法疊高積木大於或等於兩塊"
        }
    ]
};

export default config;
