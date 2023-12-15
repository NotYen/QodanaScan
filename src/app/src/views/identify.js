import { Box, Text } from "@chakra-ui/react";
import { LazyLoadImage } from "react-lazy-load-image-component";

/* import `Image` source */
import robot from '../assecs/images/icon/robot.png';

const Identify = () => {
    return (
        <Box layerStyle={ 'identifyLoad' }>
            <div className="content-container">
                <div className="icon-container">
                    <LazyLoadImage src={ robot } />
                </div>
                <Text>AI識別中，請稍候</Text>
            </div>
        </Box>
    );
};

export default Identify;