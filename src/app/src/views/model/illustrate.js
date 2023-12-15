import { ModalHeader, ModalBody, Image } from '@chakra-ui/react';

/* import `Components` form  soucomponents folder */
import Swiper from '../../components/swiper';

/* import `Image` source */
import swiper01 from '../../assecs/images/source/swiper/swiper01.png';
import swiper03 from '../../assecs/images/source/swiper/swiper03.png';
import close from '../../assecs/images/icon/close.png';

const source = [
    {
        title: '步驟1  確認指令',
        image: swiper01
    },
    {
        title: '步驟2  觀察孩子表現後並點選紀錄',
        image: swiper03
    }
];

const IllustrateModel = () => {
    const handleClick = () => {};

    return (
        <>
            <ModalHeader className='model-header'>
                <Image className='close-icon' src={close} onClick={ handleClick } />
                <samp className='title-text'>進階任務說明</samp>
            </ModalHeader>
            <ModalBody className='model-body'>
                <Swiper resource={ source } />
            </ModalBody>
        </>
    )
};

export default IllustrateModel;
