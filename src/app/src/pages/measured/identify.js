import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from "react-lazy-load-image-component";

/* import components from components folder */
import Subject from "../../components/subject";

/* import `Image` source */
import car from '../../assecs/images/source/source_16.png';
import bowl from '../../assecs/images/source/source_17.png';
import door from '../../assecs/images/source/source_18.png';
import puppy from '../../assecs/images/source/source_19.png';
import thumbsup from '../../assecs/images/source/card/thumbsup.png';

/* import function from store folder */
import { setStatus, setCorrect } from '../../store/gamesSlice';
import { setPersist } from "../../services/persist";

const IdentifyMeasured = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [completed, setCompleted] = useState(false);
    const { current: { key, question } } = useSelector(state => state.games);
    const instruction = question[key].instruction;

    const handleClick = ({ target }) => {
        const isAnswer = target.getAttribute('is-answer');

        if (isAnswer === 'true') {
            setCompleted(true);
            setTimeout(() => navigate('/games/identify') , 1000);

            dispatch(setCorrect(true));
            setPersist((error) => {
                if (error.status === 401 ||
                    error.status === 403 ||
                    error.status === 404) {
                  navigate('/login')
                } else {
                    alert(error.data.message);
                }
            })
        } else navigate('/games/identify');

        dispatch(setStatus('completed'));
        setPersist((error) => {
            if (error.status === 401 ||
                error.status === 403 ||
                error.status === 404) {
              navigate('/login')
            } else {
                alert(error.data.message);
            }
        })
    };

    return (
        <Box layerStyle={ 'identify' }>
            <Subject title='圖卡指認' illustrate={ instruction.illustrate } />
            <Box className="measured-container">
                <div className="answer-box flex-center" onClick={ handleClick }>
                    <samp is-answer={`${ key === 'identify-car' }`}>
                        <LazyLoadImage src={ car } is-answer={`${ key === 'identify-car' }`} />
                    </samp>
                    <samp is-answer={`${ key === 'identify-bowl' }`}>
                        <LazyLoadImage src={ bowl } is-answer={`${ key === 'identify-bowl' }`} />
                    </samp>
                    <samp is-answer={`${ key === 'identify-door' }`}>
                        <LazyLoadImage src={ door } is-answer={`${ key === 'identify-door' }`} />
                    </samp>
                    <samp is-answer={`${ key === 'identify-puppy' }`}>
                        <LazyLoadImage src={ puppy } is-answer={`${ key === 'identify-puppy' }`} />
                    </samp>
                </div>
                { completed && <LazyLoadImage src={ thumbsup } className="thumbsup" /> }
            </Box>
        </Box>
    );
};

export default IdentifyMeasured;
