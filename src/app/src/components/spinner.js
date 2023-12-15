import { chakra, Spinner } from '@chakra-ui/react'

const LoadingElement = () => {
    return (
        <chakra.div className='position-fixed flex-center' layerStyle={ 'spinner' }>
            <Spinner color='main' thickness='8px' speed='.5s'>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </chakra.div>
    );
};

export default LoadingElement;
