import React, { memo } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons'

const Process = memo(({ resource, selected }) => {
    return (
        <Box layerStyle={ 'process' } className='flex-center'>
            {
                resource.map(({ key, text }, index) => (
                    <React.Fragment key={ key }>
                        <Text className='text-content' is-selected={`${ key === selected }`}>{`${ text }`}</Text>
                        { (index + 1) !== resource.length ? <ArrowForwardIcon /> : null }
                    </React.Fragment>
                ))
            }
        </Box>
    );
});

export default Process;