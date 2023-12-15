import { ModalHeader, ModalBody } from '@chakra-ui/react';
import { LazyLoadImage } from "react-lazy-load-image-component";

/* import `Image` source */
import dinosaur from '../../../assecs/images/source/card/dinosaur.png';

const CompletedModel = () => {
    return (
        <>
            <ModalHeader className='model-header'>
                <samp className='title-text'>哇! 你好棒! 得到一張恐龍卡</samp>
            </ModalHeader>
            <ModalBody className='model-body' mx='auto'>
                <LazyLoadImage src={ dinosaur } />
            </ModalBody>
        </>
    )
};

export default CompletedModel;
