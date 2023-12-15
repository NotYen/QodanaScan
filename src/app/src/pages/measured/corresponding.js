import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from "react-lazy-load-image-component";

/* import components from components folder */
import Subject from "../../components/subject";

/* import `Image` source */
import cat01 from '../../assecs/images/source/source_25.png';
import cat02 from '../../assecs/images/source/source_26.png';
import rabbit01 from '../../assecs/images/source/source_27.png';
import rabbit02 from '../../assecs/images/source/source_28.png';
import dinosaur01 from '../../assecs/images/source/source_29.png';
import dinosaur02 from '../../assecs/images/source/source_30.png';
import thumbsup from '../../assecs/images/source/card/thumbsup.png';

/* import function from store folder */
import { setStatus, setCorrect } from '../../store/gamesSlice';
import { setPersist } from "../../services/persist";

const CorrespondingMeasured = () => {
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
            setTimeout(() => navigate('/games/corresponding') , 1000);
        }

        document.oncontextmenu = () => {
            window.event.returnValue = false;
        };

        return () => document.oncontextmenu = null;
    }, [ complete ])

    return (
        <Box layerStyle={ 'corresponding' }>
            <Subject title='恐龍對應圖卡' illustrate={ instruction.illustrate } />
            <Box className="measured-container">
                <div ref={ targetRef } id="droppable-container" className="flex-center">
                    <samp name='cat' className="droppable-area" onDrop={ handleDragEnd } onDragOver={handleDragOver}>
                        <LazyLoadImage src={ cat01 } name='cat' />
                    </samp>
                    <samp name='rabbit' className="droppable-area" onDrop={ handleDragEnd } onDragOver={handleDragOver}>
                        <LazyLoadImage src={ rabbit01 } name='rabbit' />
                    </samp>
                    <samp name='dinosaur' className="droppable-area" onDrop={ handleDragEnd } onDragOver={handleDragOver}>
                        <LazyLoadImage src={ dinosaur01 } name='dinosaur' />
                    </samp>
                </div>
                <div id="droppable-element" className="flex-center" onDragStart={ handleDragStart } onTouchStart={ handleTouchStart } onTouchMove={ handleTouchMove } onTouchEnd={ handleTouchEnd }>
                    <samp draggable="true" >
                        <LazyLoadImage src={ cat02 } id="droppable-cat" name='cat' />
                    </samp>
                    <samp draggable="true">
                        <LazyLoadImage src={ rabbit02 } id="droppable-rabbit" name='rabbit' />
                    </samp>
                    <samp draggable="true">
                        <LazyLoadImage src={ dinosaur02 } id="droppable-dinosaur" name='dinosaur' />
                    </samp>
                </div>
                { completed && <LazyLoadImage src={ thumbsup } className="thumbsup" /> }
            </Box>
        </Box>
    );
};

export default CorrespondingMeasured;
