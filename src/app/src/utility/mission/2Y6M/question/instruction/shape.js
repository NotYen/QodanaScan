/* import `Audio` source */
import audio from '../../../../../assecs/source/friends.m4a';
import assistAudio from '../../../../../assecs/source/parents_4.m4a';

/* import `Image` source */
import imageSourc from '../../../../../assecs/images/gif/shape.gif';

const config = {
    illustrate: {
        text: "請將三枚金幣找好朋友",
        audio: audio,
        image: imageSourc,
        remind: false,
        assistText: "請家長讓孩子聽完任務指導語後，讓孩子自己作答即可",
        assistAudio: assistAudio
    },
    reaction: [
        {
            name: '2626：形狀對應',
            value: 'C',
            text: "5s 內放至正確對應的形狀框"
        },
        {
            name: '2626：形狀對應',
            value: 'C-D',
            text: "超過5s放至正確對應的形狀框"
        },
        {
            name: '2626：形狀對應',
            value: 'O',
            text: "超過5s沒有反應或錯誤"
        }
    ]
};

export default config;
