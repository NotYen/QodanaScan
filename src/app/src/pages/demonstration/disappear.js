import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useSelector } from 'react-redux';
import { LazyLoadImage } from "react-lazy-load-image-component";

/* import components from components folder */
import Subject from "../../components/subject";

/* import `Image` source */
import spoon from '../../assecs/images/source/source_01.png';
import box from '../../assecs/images/source/source_61.png';
import cup from '../../assecs/images/source/source_02.png';

const DisappearDemoMeasured = () => {
    const navigate = useNavigate();
    const { current: { key, question } } = useSelector(state => state.games);
    console.log('key', key);
    const instruction = question[key].practise;
    const [remark, setRemark] = useState(false);

    const handleClick = () => {
        setRemark(true);
    }

    const nextHandleClick = () => {
        setTimeout(() => navigate('/games/disappear/measured'), 1000);
    }

    return (
        <Box layerStyle={ 'find' }>
            <Subject title='什麼不見了' illustrate={ instruction.illustrate } remark={ remark } />
            <Box className="measured-container">
                <div className="answer-box flex-center" onClick={ remark ? nextHandleClick : handleClick }>
                    <samp className="samp-first">
                        <LazyLoadImage src={ spoon } />
                    </samp>
                    <samp>
                        <LazyLoadImage src={ box } />
                    </samp>
                    <samp>
                        {remark ? null : <LazyLoadImage src={ cup } /> }
                    </samp>
                </div>
            </Box>
        </Box>
    );
};

export default DisappearDemoMeasured;
