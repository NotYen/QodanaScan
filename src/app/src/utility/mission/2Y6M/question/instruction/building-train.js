/* import `Audio` source */
import audio from '../../../../../assecs/source/train.m4a';
import assistAudio from '../../../../../assecs/source/parents_2.m4a';

const config = {
    illustrate: {
        text: "讓我們來做一台火車，像這樣",
        audio: audio,
        remind: false,
        assistText: "請家長在聽完系統指導語後，先示範一次給孩子看",
        assistAudio: assistAudio,
        prompt: "示範將4塊積木橫向排列，然後推動積木像火車樣前進",
        prompt_2: "之後將積木回復成散放原狀後說「換你」"
    },
    reaction: [
        {
            name: '2609：用積木仿做火車',
            value: 'FM',
            text: "以成熟握橫向排列積木"
        },
        {
            name: '2609：用積木仿做火車',
            value: 'O',
            text: "無法用成熟握姿完成 "
        }
    ]
};

export default config;
