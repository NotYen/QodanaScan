import { ModalHeader, ModalBody, Image } from '@chakra-ui/react';

/* import `Image` source */
import swiper from '../../assecs/images/source/swiper/swiper02.png';
import close from '../../assecs/images/icon/close.png';

const IllustrateModel = () => {
    const handleClick = () => {};

    return (
        <>
            <ModalHeader className='model-header'>
                <Image className='close-icon' src={close} onClick={ handleClick } />
                <samp className='title-text'>進階任務說明</samp>
            </ModalHeader>
            <ModalBody className='model-body'>
                <p className='content-text video-content'>攝影鏡頭從孩子正前上方拍攝，將孩子面對於「拍攝框內」錄影，並執行指令</p>
                <Image className='video-img' src={ swiper } />
            </ModalBody>
        </>
    )
};

export default IllustrateModel;
