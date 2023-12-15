import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from "react-lazy-load-image-component";

/* import components from components folder */
import Subject from "../../components/subject";

/* import `Image` source */
import book from '../../assecs/images/source/source_20.png';
import sleep from '../../assecs/images/source/source_21.png';
import handwashing from '../../assecs/images/source/source_22.png';
import fly from '../../assecs/images/source/source_23.png';
import thumbsup from '../../assecs/images/source/card/thumbsup.png';

/* import function from store folder */
import { setStatus, setCorrect } from '../../store/gamesSlice';

/* import context function */
import { useModelContext } from '../../context/ModelContext';

import { setPersist } from "../../services/persist";

const ActionMeasured = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { actions } = useModelContext();
    const [completed, setCompleted] = useState(false);
    const { current: { key, question } } = useSelector(state => state.games);
    const instruction = question[key].instruction;

    const handleClick = ({ target }) => {
        const isAnswer = target.getAttribute('is-answer');

        if (isAnswer === 'true') {
            if (key !=='action-fly') {
                setCompleted(true);
                setTimeout(() => navigate('/games/action') , 1000);
            }
            else {
                actions.setModel('cat', () => {
                    navigate('/games/action');
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
        } else navigate('/games/action');

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
            <Subject title='動作圖卡' illustrate={ instruction.illustrate } />
            <Box className="measured-container">
                <div className="answer-box flex-center" onClick={ handleClick }>
                    <samp is-answer={`${ key === 'action-sleep' }`}>
                        <LazyLoadImage src={ sleep } is-answer={`${ key === 'action-sleep' }`} />
                    </samp>
                    <samp is-answer={`${ key === 'action-handwashing' }`}>
                        <LazyLoadImage src={ handwashing } is-answer={`${ key === 'action-handwashing' }`} />
                    </samp>
                    <samp is-answer={`${ key === 'action-fly' }`}>
                        <LazyLoadImage src={ fly } is-answer={`${ key === 'action-fly' }`} />
                    </samp>
                    <samp is-answer={`${ key === 'action-book' }`}>
                        <LazyLoadImage src={ book } is-answer={`${ key === 'action-book' }`} />
                    </samp>
                </div>
                { completed && <LazyLoadImage src={ thumbsup } className="thumbsup" /> }
            </Box>
        </Box>
    );
};

export default ActionMeasured;
