import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from "react-lazy-load-image-component";

/* import components from components folder */
import Subject from "../../components/subject";

/* import `Image` source */
import triangle01 from '../../assecs/images/source/source_41.png';
import round01 from '../../assecs/images/source/source_42.png';
import square01 from '../../assecs/images/source/source_43.png';
import round02 from '../../assecs/images/source/source_36.png';
import square02 from '../../assecs/images/source/source_37.png';
import triangle02 from '../../assecs/images/source/source_38.png';
import thumbsup from '../../assecs/images/source/card/thumbsup.png';

/* import function from store folder */
import { setStatus, setCorrect } from '../../store/gamesSlice';

/* import context function */
import { useModelContext } from '../../context/ModelContext';
import { setPersist } from "../../services/persist";

const ShapeMeasured = () => {
    const targetRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { actions } = useModelContext();
    const [completed, setCompleted] = useState(false);
    const [complete, setComplete] = useState([]);
    const { current: { key, question } } = useSelector(state => state.games);
    const instruction = question[key].instruction;
    let touchStartX, touchStartY, touchEndX, touchEndY, targetName;

    const handleTouchStart = event => {
        if (event.target.name) {
            targetName = event.target.name;
            touchStartX = event.touches[0].clientX;
            touchStartY = event.touches[0].clientY;
            event.target.style.transform = `scale(1.2)`;
        }
        else targetName = null;
    };

    const handleTouchMove = event => {
        // event.preventDefault();
        if (event.target.name === targetName) {
            touchEndX = event.touches[0].clientX;
            touchEndY = event.touches[0].clientY;
            const dx = touchEndX - touchStartX;
            const dy = touchEndY - touchStartY;

            event.target.style.transform = `scale(1.2) translate(${dx}px, ${dy}px)`;
        }
    };

    const handleTouchEnd = event => {
        const container = targetRef.current.childNodes;

        for (let target of container) {
            const containerName = target.getAttribute('name');

            if (containerName === targetName) {
                const targetRect = target.getBoundingClientRect();
                const drapRect = event.target.getBoundingClientRect();
                const drapCenterX = drapRect.x + (drapRect.width / 2);
                const drapCenterY = drapRect.y + (drapRect.height / 2);

                if (
                    drapCenterX > targetRect.left &&
                    drapCenterX < targetRect.right &&
                    drapCenterY > targetRect.top &&
                    drapCenterY < targetRect.bottom
                ) {
                    const childNode = target.children[0];

                    target.removeChild(childNode);
                    target.appendChild(event.target);
                    setComplete(state => [...state, targetName]);
                }

                event.target.style.transform = '';
            }
        }
    };

    const handleDragStart = event => {
        console.log(event.target.name);
        targetName = event.target.name
        event.dataTransfer.setData('text/plain', event.target.id);
        event.dataTransfer.dropEffect = 'move';
    };

    const handleDragEnd = event => {
        if (event.target.name !== targetName) {
            return
        }
        console.log(event.target.name);
        let data = event.dataTransfer.getData('text/plain');
        event.target.parentNode.appendChild(document.getElementById(data));
        event.target.parentNode.removeChild(event.target);
        event.dataTransfer.clearData();
        setComplete(state => [...state, targetName]);
    };

    const handleDragOver = event => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    useEffect(() => {
        if (complete.length === 3) {
            setCompleted(true);
            dispatch(setCorrect(true));
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
            setTimeout(() =>
                actions.setModel('gold', () => {
                    navigate('/games/shape')
                })
            , 1000);
        }

        document.oncontextmenu = () => {
            window.event.returnValue = false;
        };

        return () => document.oncontextmenu = null;
    }, [ complete ])

    return (
        <Box layerStyle={ 'corresponding' }>
            <Subject title='形狀對應' illustrate={ instruction.illustrate } />
            <Box className="measured-container">
                <div ref={ targetRef } id="droppable-container" className="flex-center">
                    <samp name='triangle' className="droppable-area" onDrop={ handleDragEnd } onDragOver={handleDragOver}>
                        <LazyLoadImage src={ triangle01 } name='triangle' />
                    </samp>
                    <samp name='round' className="droppable-area" onDrop={ handleDragEnd } onDragOver={handleDragOver}>
                        <LazyLoadImage src={ round01 } name='round' />
                    </samp>
                    <samp name='square' className="droppable-area" onDrop={ handleDragEnd } onDragOver={handleDragOver}>
                        <LazyLoadImage src={ square01 } name='square' />
                    </samp>
                </div>
                <div id="droppable-element" className="flex-center" onDragStart={ handleDragStart } onTouchStart={ handleTouchStart } onTouchMove={ handleTouchMove } onTouchEnd={ handleTouchEnd }>
                    <samp draggable="true" >
                        <LazyLoadImage src={ round02 } id="droppable-round" name='round' />
                    </samp>
                    <samp draggable="true">
                        <LazyLoadImage src={ square02 } id="droppable-square" name='square' />
                    </samp>
                    <samp draggable="true">
                        <LazyLoadImage src={ triangle02 } id="droppable-triangle" name='triangle' />
                    </samp>
                </div>
                { completed && <LazyLoadImage src={ thumbsup } className="thumbsup" /> }
            </Box>
        </Box>
    );
};

export default ShapeMeasured;
