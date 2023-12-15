import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from "react-lazy-load-image-component";

/* import components from components folder */
import Subject from "../../components/subject";

/* import `Image` source */
import source from '../../assecs/images/source/source_65.png';
import thumbsup from '../../assecs/images/source/card/thumbsup.png';

/* import function from store folder */
import { setStatus, setCorrect } from '../../store/gamesSlice';

/* import context function */
import { setPersist } from "../../services/persist";

const FeaturesMeasured = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [completed, setCompleted] = useState(false);
    const { current: { key, question } } = useSelector(state => state.games);
    const instruction = question[key].practise;

    const handleClick = ({ target }) => {
        const isAnswer = target.getAttribute('is-answer');

        if (isAnswer === 'true') {
            setCompleted(true);
            setTimeout(() => navigate('/games/features/measured') , 1000);

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
        } else navigate('/games/features/measured');

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

    const nextHandleClick = () => {
        setCompleted(true);
        setTimeout(() => navigate('/games/features/measured'), 1000);
    }

    return (
        <Box layerStyle={ 'features' }>
            <Subject title='玩偶五官練習' illustrate={ instruction.illustrate } />
            <Box className="measured-container flex-center">
                <LazyLoadImage src={ source } />
                <div className="answer-box" onClick={ handleClick }>
                    <samp className="head" is-answer={`${ key === 'features-eye' }`}></samp>
                </div>
                <Button className="button-next" onClick={ nextHandleClick }>完成</Button>
                { completed && <LazyLoadImage src={ thumbsup } className="thumbsup" /> }
            </Box>
        </Box>
    );
};

export default FeaturesMeasured;
