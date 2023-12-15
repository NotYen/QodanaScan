import { useState } from "react";
import { Stack, Box, Text, Image } from "@chakra-ui/react";

/* import `Image` source */
import audio from '../assecs/images/icon/audio.png';
import vector from '../assecs/images/icon/vector.png';

const Subject = ({ title, illustrate, record, remark }) => {
    const [playing, setPlay] = useState(false);

    const handleClick = () => {
        console.log('title', title);
        console.log('illustrate', illustrate);
        const url = remark ? illustrate.audio2 : illustrate.audio;
        const control = new Audio(url);

        if (!playing) {
            control.play();
            setPlay(true);
        }
        control.addEventListener('ended', () => {
            setPlay(false)
            window.timeStart = new Date().getTime();
            console.log('播放结束');
            if (record) {
                record()
            }
        });
    };

    return (
        <Box layerStyle={'subject'}>
            <Text className="title">{title}</Text>
            <Stack className="stack-content">
                <label className="image-container">
                    <Image src={audio} onClick={handleClick} />
                </label>
                <div className="text-container">
                    <samp className="label">口語指令</samp>
                    <div className="text-bubble">
                        <Image className="img-bubble" src={vector} />
                        <samp className="text">{remark ? illustrate.text2 : illustrate.text}</samp>
                    </div>
                </div>
            </Stack>
        </Box>
    );
};

export default Subject;
