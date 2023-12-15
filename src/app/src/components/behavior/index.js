import { useState } from "react";
import { useSelector } from 'react-redux';
import { VStack, Stack, Box, Image, Checkbox } from "@chakra-ui/react";

/* import `Image` source */
import behavior from '../../assecs/images/icon/behavior.png';

const Behavior = ({ resource, autoAnswer, onChange }) => {
    const { status } = useSelector(state => state.games);
    const { illustrate, reaction } = resource;
    const [selected, setSelected] = useState();
    // const [options, setOptions] = useState([]);
    const [playing, setPlay] = useState(false);

    const handleChange = event => {
        const { value } = event.target;

        onChange(event);
        setSelected(value);        
    };

    // useEffect(() => {
    //     const option = options[autoAnswer];
        
    //     if (option) {
    //         const selectOption = {
    //             target: {
    //                 name: option.name,
    //                 value: option.value,
    //                 checked: true
    //             }
    //         }
    
    //         handleChange(selectOption);
    //     }
    // }, [ autoAnswer ]);

    const handleClick = () => {
        const url = illustrate.audio;
        const control = new Audio(url);

        if (!playing) {
            control.play();
            setPlay(true);
            // setTimeout(() => setPlay(false), 2000);
        }
        control.addEventListener('ended', () => setPlay(false));
    }

    return (
        (illustrate.text.length ||
        (!illustrate.text.length && reaction.length && status === 'completed')) &&
        <VStack className="question-container" layerStyle={ 'interface' }>
            <Box className="illustrate">
                <Stack className="stack-content">
                    <div className="image-container">
                        <Image src={ behavior } onClick={ handleClick }/>
                    </div>
                    <div className="text-container">
                        <samp className="label">動作</samp>
                        { illustrate.text.length > 0 && <samp className="text">{ illustrate.text }</samp> }
                    </div>
                </Stack>
            </Box>
            {
                status === 'completed' &&
                <Box className="reaction">
                    <Stack className="checkbox-group">
                        {
                            reaction.map(({ name, value, text }) => {
                                const _value = `${text} (${value})`;
                                 
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

export default Behavior;