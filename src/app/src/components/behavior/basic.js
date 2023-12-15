import { useState } from "react";
import { HStack, Stack, Box, Image, Checkbox } from "@chakra-ui/react";

/* import `Image` source */
import behavior from '../../assecs/images/icon/behavior.png';

const Behavior = ({ resource, answer, onChange }) => {
    const { illustrate, reaction } = resource;
    const [playing, setPlay] = useState(false);

    const handleClick = () => {
        const url = illustrate.audio;
        const control = new Audio(url);

        if (!playing) {
            control.play();
            setPlay(true);
            // setTimeout(() => setPlay(false), 2000);
        }
        control.addEventListener('ended', () => setPlay(false));
    };

    return (
        <HStack className="question-container" layerStyle={ 'interface' }>
            <Box className="illustrate">
                <Stack className="stack-content">
                    <div className="image-container">
                        <Image src={ behavior } onClick={ handleClick } />
                    </div>
                    <div className="text-container">
                        <samp className="label">動作</samp>
                        <samp className="text">{ illustrate.text }</samp>
                    </div>
                </Stack>
                <Stack className="image-content">
                    <Image src={ resource.illustrate.image } />
                </Stack>
            </Box>
            <Box className="reaction">
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

export default Behavior;