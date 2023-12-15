/* import `Audio` source */
import audio from '../../../../../assecs/source/straight.m4a';
import assistAudio from '../../../../../assecs/source/parents_5.m4a';

/* import `Image` source */
import imageSource from '../../../../../assecs/images/source/source_63.png';

const config = {
    illustrate: {
        text: "狗想要玩球，請幫狗找到球。幫狗和球畫一條線連起來。",
        audio: audio,
        image: imageSource,  
        remind: true,
        assistText: "幫孩子按下語音按鈕之後，讓孩子自己操作即可",
        assistAudio: assistAudio
    },
    reaction: [
        {
            name: '2629：畫直線',
            value: 'FM',
            text: "可以連成一直線，不會太彎曲"
        },
        {
            name: '2629：畫直線',
            value: 'O',
            text: "直線無法完成或太彎曲"
        }
    ]
};

export default config;
