/* import `Audio` source */
import audio from '../../../../../assecs/source/what-2.m4a';

const config = {
    illustrate: {
        text: "順著孩子興趣，陪他玩(2分鐘）",
        audio: audio
    },
    reaction: [
        {
            name: '2604：詢問興趣2',
            value: 'O',
            text: "互動很少或沒有互動，不太理人，自玩自的"
        },
        {
            name: '2604：詢問興趣2',
            value: 'SLE',
            text: "只有出現溝通性的肢體語言，沒有任何口語或口語單字少於 5個"
        },
        {
            name: '2604：詢問興趣2',
            value: 'LE',
            text: "有出現溝通性的口語，且單字超過5個"
        },
        {
            name: '2604：詢問興趣2',
            value: 'O',
            text: "很少或沒有發出聲音或沒有肢體語言"
        }
    ]
}

export default config;
