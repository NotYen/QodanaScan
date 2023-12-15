/* import `Audio` source */
import audio from '../../../../../assecs/source/house02.m4a';
import assistAudio from '../../../../../assecs/source/parents_2.m4a';

const config = {
    illustrate: {
        text: "換你自己蓋房子",
        audio: audio,
        remind: false,
        assistText: "請家長在聽完系統指導語後，先示範一次給孩子看",
        assistAudio: assistAudio,
        prompt: "將積木拿下恢復，散放在桌上"
    },
    reaction: [
        {
            name: '1619：自己疊積木',
            value: 'FM',
            text: "用成熟握姿疊積木"
        },
        {
            name: '1619：自己疊積木',
            value: 'O',
            text: "無法用成熟握姿疊積木"
        }
    ]
};

export default config;
