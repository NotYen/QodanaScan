import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from "react-lazy-load-image-component";

/* import components from components folder */
import Subject from "../../components/subject";

/* import `Image` source */
import spoon from '../../assecs/images/source/source_01.png';
import box from '../../assecs/images/source/source_61.png';
import cup from '../../assecs/images/source/source_02.png';
import thumbsup from '../../assecs/images/source/card/thumbsup.png';

/* import function from store folder */
import { setStatus, setCorrect } from '../../store/gamesSlice';

/* import context function */
import { setPersist } from "../../services/persist";

const DisappearMeasured = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [completed, setCompleted] = useState(false);
    const { current: { key, question } } = useSelector(state => state.games);
    const instruction = question[key].instruction;

    const handleClick = ({ target }) => {
        const isAnswer = target.getAttribute('is-answer');

        if (isAnswer === 'true') {
            setCompleted(true);
            setTimeout(() => navigate('/games/disappear') , 1000);

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
        } else navigate('/games/disappear');

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
        <Box layerStyle={ 'find' }>
            <Subject title='什麼不見了' illustrate={ instruction.illustrate } />
            <Box className="measured-container">
                <div className="answer-box flex-center" onClick={ handleClick }>
                <samp className="samp-first">
                        <LazyLoadImage src={ spoon } />
                    </samp>
                    <samp>
                        <LazyLoadImage src={ box } />
                    </samp>
                    <samp is-answer={`${ key === 'disappear-answer' }`}>
                        { key !== 'disappear-later' && <LazyLoadImage src={ cup } is-answer={`${ key === 'disappear-answer' }`} /> }
                    </samp>
                </div>
                { completed && <LazyLoadImage src={ thumbsup } className="thumbsup" /> }
            </Box>
        </Box>
    );
};

export default DisappearMeasured;
