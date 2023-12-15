import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
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
import { useModelContext } from '../../context/ModelContext';
import { setPersist } from "../../services/persist";

const ConformMeasured = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { actions } = useModelContext();
    const [completed, setCompleted] = useState(false);
    const { current: { key, question } } = useSelector(state => state.games);
    const instruction = question[key].instruction;

    const handleClick = ({ target }) => {
        const isAnswer = target.getAttribute('is-answer');

        if (isAnswer === 'true') {
            if (key !== 'find-spoon') {
                setCompleted(true);
                setTimeout(() => navigate('/games/find') , 1000);
            } else {
                actions.setModel('dinosaur', () => {
                    navigate('/games/find');
                });
            }

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
        } else navigate('/games/find');

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
            <Subject title='尋找物品' illustrate={ instruction.illustrate } />
            <Box className="measured-container">
                <div className="answer-box flex-center" onClick={ handleClick }>
                    <samp className="samp-first" is-answer={`${ key === 'find-spoon' }`}>
                        <LazyLoadImage src={ spoon } is-answer={`${ key === 'find-spoon' }`} />
                    </samp>
                    <samp is-answer={`${ key === 'find-box' }`}>
                        <LazyLoadImage src={ box } is-answer={`${ key === 'find-box' }`} />
                    </samp>
                    <samp is-answer={`${ key === 'find-cup' }`}>
                        <LazyLoadImage src={ cup } is-answer={`${ key === 'find-cup' }`} />
                    </samp>
                </div>
                { completed && <LazyLoadImage src={ thumbsup } className="thumbsup" /> }
            </Box>
        </Box>
    );
};

export default ConformMeasured;
