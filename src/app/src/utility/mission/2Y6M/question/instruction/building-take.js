/* import `Audio` source */
import audio from '../../../../../assecs/source/take.m4a';
import assistAudio from '../../../../../assecs/source/parents_2.m4a';

const config = {
    illustrate: {
        text: "請拿一塊積木給我",
        audio: audio,
        remind: false,
        assistText: "請家長在聽完系統指導語後，先示範一次給孩子看",
        assistAudio: assistAudio
    },
    reaction: [
        {
            name: '2608：拿積木',
            value: 'C, LR',
            text: "正確將1塊積木放到手上"
        },
        {
            name: '2608：拿積木',
            value: 'LR',
            text: "將積木放到手上，但不只一塊"
        },
        {
            name: '2608：拿積木',
            value: 'C-D, LR-D',
            text: "超過5s才有動作或需要重複指令，但可以正確拿取一塊積木放手上"
        },
        {
            name: '2608：拿積木',
            value: 'LR-D',
            text: "超過5才將積木放到手上，且不只一塊"
        },
        {
            name: '2608：拿積木',
            value: 'O',
            text: "超過5s沒有反應或放在非手上的位置上"
        }
    ]
};

export default config;
