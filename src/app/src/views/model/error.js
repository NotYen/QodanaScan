import { ModalHeader, ModalBody } from '@chakra-ui/react';

const ErrorModel = () => {
    return (
        <>
            <ModalHeader className='model-header'>
                <samp className='title-text'>Opos!</samp>
            </ModalHeader>
            <ModalBody className='model-body'>
                <p className='content-text text-center'>發生點錯誤</p>
            </ModalBody>
        </>
    )
};

export default ErrorModel;
