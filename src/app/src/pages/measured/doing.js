import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from "react-lazy-load-image-component";

/* import components from components folder */
import Subject from "../../components/subject";

/* import `Image` source */
import jump from '../../assecs/images/source/source_58.png';
import ride from '../../assecs/images/source/source_59.png';
import blow from '../../assecs/images/source/source_60.png';
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
            setTimeout(() => navigate('/games/doing') , 1000);

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
        } else navigate('/games/doing');

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
        <Box layerStyle={ 'doing' }>
            <Subject title='動作圖卡' illustrate={ instruction.illustrate } />
            <Box className="measured-container">
                <div className="answer-box flex-center" onClick={ handleClick }>
                    <samp className="samp-first" is-answer={`${ key === 'doing-jump' }`}>
                        <LazyLoadImage src={ jump } is-answer={`${ key === 'doing-jump' }`} />
                    </samp>
                    <samp is-answer={`${ key === 'doing-ride' }`}>
                        <LazyLoadImage src={ ride } is-answer={`${ key === 'doing-ride' }`} />
                    </samp>
                    <samp is-answer={`${ key === 'doing-blow' }`}>
                        <LazyLoadImage src={ blow } is-answer={`${ key === 'doing-blow' }`} />
                    </samp>
                </div>
                { completed && <LazyLoadImage src={ thumbsup } className="thumbsup" /> }
            </Box>
        </Box>
    );
};

export default ConformMeasured;
