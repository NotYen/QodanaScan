/* import `Audio` source */
import audio from '../../../../../assecs/source/woof.m4a';
import assistAudio from '../../../../../assecs/source/parents_3.m4a';

const config = {
    illustrate: {
        text: "很棒！小狗怎麼叫?",
        audio: audio,
        remind: true,
        assistText: "請家長讓孩子聽完任務指導語後，讓孩子自己回答即可",
        assistAudio: assistAudio
    },
    reaction: [
        {
            name: '1623：學動物叫(小狗)',
            value: 'C, LE',
            text: "有發出聲音類似汪汪"
        },
        {
            name: '1623：學動物叫(小狗)',
            value: 'LE-1',
            text: "有發出聲音但非汪汪音"
        },
        {
            name: '1623：學動物叫(小狗)',
            value: 'C-D, LE',
            text: "超過5s 才有反應，但可發出汪汪"
        },
        {
            name: '1623：學動物叫(小狗)',
            value: 'LE-1',
            text: "超過5s 才有反應，有發出聲音但非汪汪音"
        },
        {
            name: '1623：學動物叫(小狗)',
            value: 'O',
            text: "無任何聲音反應"
        }
    ]
};

export default config;
