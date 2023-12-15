import { ModalHeader, ModalBody } from '@chakra-ui/react';

const RemindModel = () => {
    return (
        <>
            <ModalHeader className='model-header'>
                <samp className='title-text'>Oops!</samp>
            </ModalHeader>
            <ModalBody className='model-body'>
                <p className='content-text qualified-content text-center'>感謝您的填寫，我們已收到您的資料囉 !</p>
                <p className='content-text qualified-content text-center'>但因目前年齡不符 (1歲半-3歲半)，若資格符合時我們</p>
                <p className='content-text qualified-content text-center'>會立即 Email 通知您，謝謝您。</p>
            </ModalBody>
        </>
    )
};

export default RemindModel;
