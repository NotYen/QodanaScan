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

const FeaturesMeasured = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { actions } = useModelContext();
    const [completed, setCompleted] = useState(false);
    const { current: { key, question } } = useSelector(state => state.games);
    const instruction = question[key].instruction;

    const handleClick = ({ target }) => {
        const isAnswer = target.getAttribute('is-answer');

        if (isAnswer === 'true') {
            if (key !=='features-foot') {
                setCompleted(true);
                setTimeout(() => navigate('/games/features') , 1000);
            }
            else {
                actions.setModel('rabbit', () => {
                    navigate('/games/features');
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
        } else navigate('/games/features');

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
        <Box layerStyle={ 'features' }>
            <Subject title='玩偶五官' illustrate={ instruction.illustrate } />
            <Box className="measured-container flex-center">
                <LazyLoadImage src={ source } />
                <div className="answer-box" onClick={ handleClick }>
                    <samp className="left-eyes" is-answer={`${ key === 'features-eye' }`}></samp>
                    <samp className="right-eyes" is-answer={`${ key === 'features-eye' }`}></samp>
                    <samp className="abdomen" is-answer={`${ key === 'features-abdomen' }`}></samp>
                    <samp className="left-foot" is-answer={`${ key === 'features-foot' }`}></samp>
                    <samp className="right-foot" is-answer={`${ key === 'features-foot' }`}></samp>
                </div>
                { completed && <LazyLoadImage src={ thumbsup } className="thumbsup" /> }
            </Box>
        </Box>
    );
};

export default FeaturesMeasured;
