import { ModalHeader, ModalBody } from '@chakra-ui/react';
import { LazyLoadImage } from "react-lazy-load-image-component";

/* import `Image` source */
import rabbit from '../../../assecs/images/source/card/rabbit.png';

const CompletedModel = () => {
    return (
        <>
            <ModalHeader className='model-header'>
                <samp className='title-text'>哇！你好棒！得到一張兔子卡</samp>
            </ModalHeader>
            <ModalBody className='model-body' mx='auto'>
                <LazyLoadImage src={ rabbit } />
            </ModalBody>
        </>
    )
};

export default CompletedModel;
