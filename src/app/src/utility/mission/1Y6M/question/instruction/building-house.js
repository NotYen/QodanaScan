/* import `Audio` source */
import audio from '../../../../../assecs/source/house.m4a';
import assistAudio from '../../../../../assecs/source/parents_2.m4a';

const config = {
    illustrate: {
        text: "讓我們一起蓋房子，我先",
        audio: audio,
        remind: false,
        assistText: "請家長在聽完系統指導語後，先示範一次給孩子看",
        assistAudio: assistAudio,
        prompt: "示範將一個積木疊上另一個積木，然後說「換你」"
    },
    reaction: [
        {
            name: '1618：一起疊積木',
            value: 'FM',
            text: "用成熟握姿疊積木"
        },
        {
            name: '1618：一起疊積木',
            value: 'O',
            text: "無法用成熟握姿疊積木"
        }
    ]
};

export default config;
