import { memo } from 'react';
import { Box, Text } from '@chakra-ui/react';

const Topic = memo(({ resource }) => {
    const { topic, narrative } = resource;

    return (
        <Box layerStyle={ 'topic' }>
            <Text className='topic'>{ topic }</Text>
            { narrative && <Text className="narrative">{`教具：${ narrative }`}</Text> }            
        </Box>
    );
});

export default Topic;