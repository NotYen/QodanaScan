/* import `Audio` source */
import audio from '../../../../../assecs/source/corresponding.m4a';
import assistAudio from '../../../../../assecs/source/parents_2.m4a';

/* import `Image` source */
import imageSource from '../../../../../assecs/images/gif/corresponding.gif';

const config = {
    illustrate: {
        text: "把他們全部送回家",
        audio: audio,
        image: imageSource,
        remind: false,
        assistText: "請家長在聽完系統指導語後，先示範一次給孩子看",
        assistAudio: assistAudio
    },
    reaction: [
        {
            name: '1627：圖卡對應',
            value: 'LR',
            text: "聽完「換你」後才開始動作,沒有提早或延遲超過5s"
        },
        {
            name: '1627：圖卡對應',
            value: 'LR-1',
            text: "還沒有聽完「換你」就開始動作"
        },
        {
            name: '1627：圖卡對應',
            value: 'LR-D',
            text: "聽完「換你」後，超過5s 才開始動作"
        },
        {
            name: '1627：圖卡對應',
            value: 'O',
            text: "對指令沒有反應"
        }
    ]
};

export default config;
