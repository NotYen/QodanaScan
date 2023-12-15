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
        prompt: "示範疊高積木至少4塊，然後恢復原狀後說｢換你」"
    },
    reaction: [
        {
            name: '2610：蓋房子',
            value: 'FM',
            text: "以成熟握姿模仿完成疊高積木"
        },
        {
            name: '2610：蓋房子',
            value: 'O',
            text: "無法以成熟握姿模仿完成疊高積木"
        }
    ]
};

export default config;
