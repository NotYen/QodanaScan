import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from "react-lazy-load-image-component";

/* import components from components folder */
import Subject from "../../components/subject";

/* import `Image` source */
import source from '../../assecs/images/source/source_15.png';
import thumbsup from '../../assecs/images/source/card/thumbsup.png';

/* import function from store folder */
import { setStatus, setCorrect } from '../../store/gamesSlice';

/* import context function */
import { useModelContext } from '../../context/ModelContext';
import { setPersist } from "../../services/persist";

const FaceMeasured = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { actions } = useModelContext();
    const [completed, setCompleted] = useState(false);
    const { current: { key, question } } = useSelector(state => state.games);
    const instruction = question[key].instruction;

    const handleClick = ({ target }) => {
        const isAnswer = target.getAttribute('is-answer');

        if (isAnswer === 'true') {
            if (key !=='face-hair') {
                setCompleted(true);
                setTimeout(() => navigate('/games/face') , 1000);
            }
            else {
                actions.setModel('rabbit', () => {
                    navigate('/games/face');
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
        } else navigate('/games/face');

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
        <Box layerStyle={ 'face' }>
            <Subject title='指出五官部位' illustrate={ instruction.illustrate } />
            <Box className="measured-container flex-center">
                <LazyLoadImage src={ source } />
                <div className="answer-box" onClick={ handleClick }>
                    <samp className="nose" is-answer={`${ key === 'face-nose' }`}></samp>
                    <samp className="mouth" is-answer={`${ key === 'face-mouth' }`}></samp>
                    <samp className="hair" is-answer={`${ key === 'face-hair' }`}></samp>
                </div>
                { completed && <LazyLoadImage src={ thumbsup } className="thumbsup" /> }
            </Box>
        </Box>
    );
};

export default FaceMeasured;
