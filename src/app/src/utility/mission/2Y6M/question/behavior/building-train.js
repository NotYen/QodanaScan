/* import `Audio` source */
import audio from '../../../../../assecs/source/train-2.m4a';

const config = {
    illustrate: {
        text: "示範將4塊積木橫向排列，然後推動積木像火車一樣前進，之後將積木恢復成散放原狀後說「換你」",
        audio: audio
    },
    reaction: [
        {
            name: '2609：用積木仿做火車2',
            value: 'FM',
            text: "橫向排列積木四塊"
        },
        {
            name: '2609：用積木仿做火車2',
            value: 'O',
            text: "無法橫向排列積木四塊"
        }
    ]
}

export default config;
