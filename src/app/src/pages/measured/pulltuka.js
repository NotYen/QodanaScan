import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from "react-lazy-load-image-component";

/* import components from components folder */
import Subject from "../../components/subject";

/* import `Image` source */
import car01 from '../../assecs/images/source/source_45.png';
import car02 from '../../assecs/images/source/source_39.png';
import car from '../../assecs/images/source/source_16.png';
import boxs from '../../assecs/images/source/source_40.png';
import dinosaur from '../../assecs/images/source/source_35.png';
import thumbsup from '../../assecs/images/source/card/thumbsup.png';

/* import function from store folder */
import { setStatus, setCorrect } from '../../store/gamesSlice';
import { setPersist } from "../../services/persist";

const PulltukaMeasured = () => {
    const targetRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

                    if (key === 'pull-car')
                        event.target.src = car;

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
        if (complete.length === 1) {
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
            setTimeout(() => navigate('/games/pulltuka') , 1000);
        }

        document.oncontextmenu = () => {
            window.event.returnValue = false;
        };

        return () => document.oncontextmenu = null;
    }, [ complete ])

    return (
        <Box layerStyle={ 'pulltuka' }>
            <Subject title='拉取對應圖卡' illustrate={ instruction.illustrate } />
            <Box className="measured-container">
                <div id="droppable-container" className="flex-center">
                    <samp name='dinosaur' className="droppable-area">
                        <LazyLoadImage src={ dinosaur } name='dinosaur' />
                    </samp>
                    <div ref={ targetRef } className="droppable-right">
                        <samp name='car' className="droppable-area" onDrop={ handleDragEnd } onDragOver={handleDragOver}>
                            <LazyLoadImage src={ key === 'pull-car' ? car02 : car } name='car' />
                        </samp>
                        <samp name='boxs' className="droppable-area" onDrop={ handleDragEnd } onDragOver={handleDragOver}>
                            <LazyLoadImage src={ boxs } name='boxs' />
                        </samp>
                    </div>
                </div>
                <div id="droppable-element" className="flex-center" onDragStart={ handleDragStart } onTouchStart={ handleTouchStart } onTouchMove={ handleTouchMove } onTouchEnd={ handleTouchEnd }>
                    <samp draggable="true" >
                        <LazyLoadImage src={ key === 'pull-car' ? car01 : boxs  } id="droppable-boxs" name={  key === 'pull-car' ? 'car' : 'boxs' } />
                    </samp>
                </div>
                { completed && <LazyLoadImage src={ thumbsup } className="thumbsup" /> }
            </Box>
        </Box>
    );
};

export default PulltukaMeasured;
