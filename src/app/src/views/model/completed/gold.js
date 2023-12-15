import { ModalHeader, ModalBody } from '@chakra-ui/react';
import { LazyLoadImage } from "react-lazy-load-image-component";

/* import `Image` source */
import gold from '../../../assecs/images/source/card/gold.png';

const CompletedModel = () => {
    return (
        <>
            <ModalHeader className='model-header'>
                <samp className='title-text'>好棒! 恭喜過關得到一枚金幣!</samp>
            </ModalHeader>
            <ModalBody className='model-body' mx='auto'>
                <LazyLoadImage src={ gold } />
            </ModalBody>
        </>
    )
};

export default CompletedModel;
