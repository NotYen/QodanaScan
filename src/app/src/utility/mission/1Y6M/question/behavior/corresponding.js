/* import `Audio` source */
import audio from '../../../../../assecs/source/corresponding-2.m4a';

const config = {
    illustrate: {
        text: "將恐龍圖卡放到恐龍框中，然後恢復原狀後說｢換你」",
        audio: audio,
        remind: true
    },
    reaction: [
        {
            name: '1627：圖卡對應2',
            value: 'C',
            text: "將恐龍圖卡放至正確顏色對應框"
        },
        {
            name: '1627：圖卡對應2',
            value: 'O',
            text: "任一圖卡沒有放至正確顏色對應框"
        }
    ]
}

export default config;
