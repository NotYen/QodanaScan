/* import `Audio` source */
import audio from '../../../../../assecs/source/house-3.m4a';

const config = {
    illustrate: {
        text: "示範疊高積木至少4塊，然後恢復原狀後說｢換你」",
        audio: audio
    },
    reaction: [
        {
            name: '2610：蓋房子2',
            value: 'FM',
            text: "疊高積木大於或等於四塊"
        },
        {
            name: '2610：蓋房子2',
            value: 'O',
            text: "無法疊高積木大於或等於四塊"
        }
    ]
}

export default config;
