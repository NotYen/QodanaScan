import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from "react-lazy-load-image-component";

/* import components from components folder */
import Subject from "../../components/subject";

/* import `Image` source */
import source from '../../assecs/images/source/source_31.png';
import thumbsup from '../../assecs/images/source/card/thumbsup.png';

/* import function from store folder */
import { setStatus, setCorrect } from '../../store/gamesSlice';

/* import context function */
import { useModelContext } from '../../context/ModelContext';
import { setPersist } from "../../services/persist";

const SpaceMeasured = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { actions } = useModelContext();
    const [completed, setCompleted] = useState(false);
    const { current: { key, question } } = useSelector(state => state.games);
    const instruction = question[key].instruction;

    const handleClick = ({ target }) => {
        const isAnswer = target.getAttribute('is-answer');

        if (isAnswer === 'true') {
            if (key !== 'space-size') {
                setCompleted(true);
                setTimeout(() => navigate('/games/space'), 1000);
            } else {
                actions.setModel('gold', () => {
                    navigate('/games/space');
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
        } else navigate('/games/space');

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
        <Box layerStyle={ 'space' }>
            <Subject title='空間對應' illustrate={ instruction.illustrate } />
            <Box className="measured-container flex-center">
                <LazyLoadImage src={ source } />
                <div className="answer-box" onClick={ handleClick }>
                    <samp className="space-box" is-answer={`${ key === 'space-box' }`}></samp>
                    <samp className="space-table" is-answer={`${ key === 'space-table' }`}></samp>
                    <samp className="space-size" is-answer={`${ key === 'space-size' }`}></samp>
                </div>
                { completed && <LazyLoadImage src={ thumbsup } className="thumbsup" /> }
            </Box>
        </Box>
    );
};

export default SpaceMeasured;
