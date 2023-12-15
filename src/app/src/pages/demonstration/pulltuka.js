import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import { useSelector } from 'react-redux';
import { LazyLoadImage } from "react-lazy-load-image-component";

/* import components from components folder */
import Subject from "../../components/subject";

/* import `Image` source */
import dinosaur from '../../assecs/images/source/source_34.png';
import thumbsup from '../../assecs/images/source/card/thumbsup.png';

const PulltukaMeasured = () => {
    const targetRef = useRef(null);
    const navigate = useNavigate();
    const [completed, setCompleted] = useState(false);
    const [complete, setComplete] = useState([]);
    const { current: { key, question } } = useSelector(state => state.games);
    const instruction = question[key].practise;
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
        if (complete.length === 1) {
            setCompleted(true);
            setTimeout(() => navigate('/games/pulltuka/measured') , 1000);
        }

        document.oncontextmenu = () => {
            window.event.returnValue = false;
        };

        return () => document.oncontextmenu = null;
    }, [ complete ])

    const nextHandleClick = () => {
        setCompleted(true);
        setTimeout(() => navigate('/games/pulltuka/measured'), 1000);
    }

    return (
        <Box layerStyle={ 'pulltuka' }>
            <Subject title='拉取對應圖卡練習' illustrate={ instruction.illustrate } />
            <Box className="measured-container">
                <div ref={ targetRef } id="droppable-container" className="flex-center">
                    <samp name='dinosaur' className="droppable-area" onDrop={ handleDragEnd } onDragOver={handleDragOver}>
                        <LazyLoadImage src={ dinosaur } name='dinosaur' />
                    </samp>
                </div>
                <div id="droppable-element" className="flex-center"  onDragStart={ handleDragStart } onTouchStart={ handleTouchStart } onTouchMove={ handleTouchMove } onTouchEnd={ handleTouchEnd }>
                    <samp draggable="true">
                        <LazyLoadImage src={ dinosaur } id="droppable-dinosaur" name='dinosaur' />
                    </samp>
                </div>
                <Button className="button-next" onClick={ nextHandleClick }>完成</Button>
                { completed && <LazyLoadImage src={ thumbsup } className="thumbsup" /> }
            </Box>
        </Box>
    );
};

export default PulltukaMeasured;
