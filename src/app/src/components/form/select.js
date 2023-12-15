import React, { useEffect, useState } from 'react';
import { Field } from 'formik';
import { FormControl, FormLabel, FormErrorMessage, Select } from '@chakra-ui/react';

/* import option config */
import options from '../../assecs/config/select';

const FormSelect = ({ label, control, values, errors }) => {
	const { name, customOption = [], placeholder = ' ' } = control;
	const [option, setOption] = useState(options[name] || []);

	useEffect(() => {
		if (name === "primary_language")
			setOption(options.language);
		else if (name === "mother_occupation" || name === "father_occupation")
			setOption(options.profession);
		else if (name === "mother_education" || name === "father_education")
			setOption(options.educate);
	}, []);

    const validate = value => {
		value && delete errors[name];
		return errors[name];
	};

    return (
        <FormControl layerStyle={ 'control' } isInvalid={ errors[name] }>
			{ label && <FormLabel className='label-element'>{ label }</FormLabel> }
			<Field className='control-element' validate={ validate } { ...{ name, placeholder } } as={ Select }>
				{
					option.map(({ key, value }) => (
						<option key={ key }>{ value }</option>
					))
				}
			</Field>
			{ errors[name] && <FormErrorMessage>{ errors[name] }</FormErrorMessage> }
        </FormControl>
    );
};

export default React.memo(FormSelect);
