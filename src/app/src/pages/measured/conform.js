import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from "react-lazy-load-image-component";

/* import components from components folder */
import Subject from "../../components/subject";

/* import `Image` source */
import train from '../../assecs/images/source/source_52.png';
import clothing from '../../assecs/images/source/source_53.png';
import pen from '../../assecs/images/source/source_54.png';
import grape from '../../assecs/images/source/source_55.png';
import chair from '../../assecs/images/source/source_56.png';
import airplane from '../../assecs/images/source/source_57.png';
import thumbsup from '../../assecs/images/source/card/thumbsup.png';

/* import function from store folder */
import { setStatus, setCorrect } from '../../store/gamesSlice';
import { setPersist } from "../../services/persist";

const ConformMeasured = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [completed, setCompleted] = useState(false);
    const { current: { key, question } } = useSelector(state => state.games);
    const instruction = question[key].instruction;

    const handleClick = ({ target }) => {
        const isAnswer = target.getAttribute('is-answer');

        if (isAnswer === 'true') {
            setCompleted(true);
            setTimeout(() => navigate('/games/conform') , 1000);

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
        } else navigate('/games/conform');

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
        <Box layerStyle={ 'conform' }>
            <Subject title='圖卡對應' illustrate={ instruction.illustrate } />
            <Box className="measured-container">
                <div className="answer-box flex-center" onClick={ handleClick }>
                    <samp is-answer={`${ key === 'conform-train' }`}>
                        <LazyLoadImage src={ train } is-answer={`${ key === 'conform-train' }`} />
                    </samp>
                    <samp is-answer={`${ key === 'conform-clothing' }`}>
                        <LazyLoadImage src={ clothing } is-answer={`${ key === 'conform-clothing' }`} />
                    </samp>
                    <samp is-answer={`${ key === 'conform-draw' }`}>
                        <LazyLoadImage src={ pen } is-answer={`${ key === 'conform-draw' }`} />
                    </samp>
                    <samp is-answer={`${ key === 'conform-eat' }`}>
                        <LazyLoadImage src={ grape } is-answer={`${ key === 'conform-eat' }`} />
                    </samp>
                    <samp is-answer={`${ key === 'conform-sit' }`}>
                        <LazyLoadImage src={ chair } is-answer={`${ key === 'conform-sit' }`} />
                    </samp>
                    <samp is-answer={`${ key === 'conform-fly' }`}>
                        <LazyLoadImage src={ airplane } is-answer={`${ key === 'conform-fly' }`} />
                    </samp>
                </div>
                { completed && <LazyLoadImage src={ thumbsup } className="thumbsup" /> }
            </Box>
        </Box>
    );
};

export default ConformMeasured;
