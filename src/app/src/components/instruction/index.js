import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { VStack, Stack, Box, Text, Image, Checkbox } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

/* import `Image` source */
import audioIcon from '../../assecs/images/icon/audio.png';
import vector from '../../assecs/images/icon/vector.png';

const Instruction = ({ resource, autoAnswer, onChange }) => {
    const { status } = useSelector(state => state.games);
    const { illustrate, reaction } = resource;
    const [playing, setPlay] = useState(false);
    const [selected, setSelected] = useState();
    const [options, setOptions] = useState([]);
    const title = (status === 'completed') ? '孩子反應' : '任務說明';
    const label = (status === 'completed') ? '口語指令' : '家長協助';
    const text = (status === 'completed') ? illustrate.text : illustrate.assistText;
    const audio = (status === 'completed') ? illustrate.audio : illustrate.assistAudio;

    const { pathname } = useLocation();

    // let noAnswer = false;

    // console.log('pathname_ans', pathname)

    // if (pathname.includes('voice')) {
    //     noAnswer = true;
    // }

    // console.log('noAnswer', noAnswer)

    const handleChange = event => {
        const { value } = event.target;

        onChange(event);
        setSelected(value);
    };

    const handleClick = () => {
        const url = audio;
        const control = new Audio(url);

        if (!playing) {
            control.play();
            setPlay(true);
            // setTimeout(() => setPlay(false), 2000);
        }
        control.addEventListener('ended', () => setPlay(false));
    };

    useEffect(() => {
        const option = options[autoAnswer];

        if (option) {
            const selectOption = {
                target: {
                    name: option.name,
                    value: option.value,
                    checked: true
                }
            }

            handleChange(selectOption);
        }
    }, [ autoAnswer ]);

    return (
        <VStack className="question-container" layerStyle={ 'interface' }>
            <Box className="illustrate">
                <Text className="title">{ title }</Text>
                <Stack className="stack-content">
                    <label className="image-container">
                        <Image src={ audioIcon } onClick={ handleClick } />
                    </label>
                    <div className="text-container">
                        <samp className="label">{ label }</samp>
                        <div className="text-bubble">
                            <Image className="img-bubble" src={ vector }/>
                            <samp className="text">{ text }</samp>
                        </div>
                    </div>
                </Stack>
            </Box>
            {
                status === 'completed' &&
                <Box className="reaction">
                    <Stack className="checkbox-group">
                        {
                            reaction.map(({ name, value, text }) => {
                                let _value = `${text} (${value})`;
                                console.log('selected', _value, selected)

                                options.push({ name: name, value: _value });
                                return (
                                    <Checkbox key={ text } name={ name } value={ _value } isChecked={ _value === selected } onChange={ handleChange }>{ text }</Checkbox>
                                );
                            })
                        }
                    </Stack>
                </Box>
            }
        </VStack>
    );
};

export default Instruction;
