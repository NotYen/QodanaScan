import { ModalHeader, ModalBody } from '@chakra-ui/react';

const RemindModel = () => {
    return (
        <>
            <ModalHeader className='model-header'>
                <samp className='title-text'>語音題提示</samp>
            </ModalHeader>
            <ModalBody className='model-body'>
                <p className='content-text voice-content'>1.接下來的題目請孩子自行講出圖卡的名稱或動作</p>
                <p className='content-text voice-content'>2.請在安靜環境下施測</p>
                <p className='content-text voice-content'>3.讓孩子自行回答，不要有太多提示或干擾</p>
            </ModalBody>
        </>
    )
};

export default RemindModel;
