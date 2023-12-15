import { useState } from "react";
import { HStack, Stack, Box, Text, Image, Checkbox } from "@chakra-ui/react";

/* import `Image` source */
import audio from '../../assecs/images/icon/audio.png';
import vector from '../../assecs/images/icon/vector.png';

const Instruction = ({ resource, answer, onChange }) => {
    const { illustrate, reaction } = resource;
    const [playing, setPlay] = useState(false);
    const handleClick = () => {
        const url = illustrate.audio;
        const control = new Audio(url);
        if (!playing) {
            control.play();
            setPlay(true);
            // setTimeout(() => setPlay(false), 1);
        }
        control.addEventListener('ended', () => {
            console.log('播放结束');
            setPlay(false);
            window.timeStart = new Date().getTime();
        });
    };

    return (
        <HStack className="question-container" layerStyle={ 'interface' }>
            <Box className="illustrate">
                <Text className="title">任務說明</Text>
                <Stack className="stack-content">
                    <label className="image-container">
                        <Image src={ audio } onClick={ handleClick } />
                    </label>
                    <div className="text-container">
                        <samp className="label">口語指令</samp>
                        <div className="text-bubble">
                            <Image className="img-bubble" src={ vector }/>
                            <samp className="text">{ illustrate.text }</samp>
                        </div>
                    </div>
                </Stack>
            </Box>
            <Box className="reaction">
                <Text className="title">孩子反應</Text>
                <Stack className="checkbox-group">
                    {
                        reaction.map(({ name, value, text }) => {
                            const _value = `${text} (${value})`;

                            return (
                                <Checkbox key={ text } name={ name } value={ _value } isChecked={ answer?.[name] && answer?.[name]['answer'] === _value } onChange={ onChange }>{ text }</Checkbox>
                            );
                        })
                    }
                </Stack>
            </Box>
        </HStack>
    );
};

export default Instruction;
