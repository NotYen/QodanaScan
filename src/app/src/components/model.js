import { Modal, ModalOverlay, ModalContent, ModalFooter, Button } from '@chakra-ui/react';

/* import context function */
import { useModelContext } from '../context/ModelContext';

/* Model config */
const _config = {
	isCentered: true,
	scrollBehavior: 'inside'
};

const ContentContainer = ({ content, config, handleClick }) => {
	return (
		<ModalContent layerStyle='model'>
			{ content }
			<ModalFooter className='model-footer'>
				<Button colorScheme='main' onClick={ handleClick }>{ config.buttonText }</Button>
			</ModalFooter>
		</ModalContent>
	)
};

const ModelView = () => {
	const { status, content, config, actions } = useModelContext();
	const clickHandler = config?.clickFunction || actions.resetModel;

	return (
		<Modal size={ 'xl' } isOpen={ status } { ..._config } >
			<ModalOverlay bg='overlay' style={{width:'100%',height:'100%'}} />
			<ContentContainer content={ content } config={ config } handleClick={ clickHandler } />
		</Modal>
	)
};

export default ModelView;
