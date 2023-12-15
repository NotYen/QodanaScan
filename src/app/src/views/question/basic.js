import { Box } from "@chakra-ui/react";

/* import components from components folder */
import Behavior from '../../components/behavior/basic';
import Instruction from '../../components/instruction/basic';

const Question = ({ resource, answer, onChange }) => {
    const behavior = resource?.behavior;
    const instruction = resource?.instruction;

    return (
        <Box layerStyle={ 'question-basic' }>
            { instruction && <Instruction resource={ instruction } answer={ answer } onChange={ onChange } /> }
            { behavior && <Behavior resource={ behavior } answer={ answer } onChange={ onChange } /> }
        </Box>
    );
};

export default Question;