/* import `Audio` source */
import audio from '../../../../../assecs/source/tuka.m4a';
import assistAudio from '../../../../../assecs/source/parents_2.m4a';

/* import `Image` source */
import imageSource from '../../../../../assecs/images/gif/pulltuka.gif';

const config = {
    illustrate: {
        text: "把積木放到圖案一樣的位置",
        audio: audio,
        image: imageSource,
        remind: false,
        assistText: "請家長在聽完系統指導語後，先示範一次給孩子看",
        assistAudio: assistAudio
    },
    reaction: []
};

export default config;
