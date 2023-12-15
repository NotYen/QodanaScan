import { useEffect, useState } from 'react';
import { Field } from 'formik';
import { FormControl, FormLabel, FormErrorMessage, Input } from '@chakra-ui/react';

/* import custom tools */
import timestamp from '../../assecs/plugin/timestamp';

const FormInput = ({ label, control, errors, isDisabled }) => {
	const { type = 'text', name, placeholder } = control;
	const [scope, setScope] = useState({ min: 0, max: null });
	
	const getMinValue = () => {
		const current = new Date();
		const currentYear = current.getFullYear();
		const minYear = currentYear - 4;

		return `${minYear}-01-01`;
	};
	
	const validate = value => {
		value && delete errors[name];
		return errors[name];
	};

	useEffect(() => {
		if (type === 'date') {
			scope.min = getMinValue();
			scope.max = timestamp.get();

			setScope(scope);
		};
	}, []);

    return (
		<FormControl layerStyle={ 'control' } isInvalid={ errors[name] }>
			{ label && <FormLabel className='label-element'>{ label }</FormLabel> }
			<Field className='control-element' validate={ validate } { ...{ type, name, placeholder } } min={ scope.min } max={ scope.max } disabled={ isDisabled } as={ Input } />
			{ errors[name] && <FormErrorMessage>{ errors[name] }</FormErrorMessage> }
		</FormControl>
    );
};

export default FormInput;
