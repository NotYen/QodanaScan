import { Box } from "@chakra-ui/react";

/* import components from components folder */
import Behavior from '../../components/behavior/index';
import Instruction from '../../components/instruction/index';

const Question = ({ resource, autoAnswer, onChange }) => {
    const behavior = resource?.behavior;
    const instruction = resource?.instruction;

    return (
        <Box layerStyle={ 'question' }>
            { instruction && <Instruction resource={ instruction } autoAnswer={ autoAnswer } onChange={ onChange } /> }
            { behavior && <Behavior resource={ behavior } autoAnswer={ autoAnswer } onChange={ onChange } /> }
        </Box>
    );
};

export default Question;