import { useEffect } from 'react';
import { Form } from 'formik';
import { Button, Grid, GridItem } from '@chakra-ui/react';

/* import custom tools */
import calculate from '../../assecs/plugin/calculate';

/* import context function */
import { useFormikContext } from '../../context/FormikContext';

/* import `Form controi` components */
import FormInput from './control';
import FormSelect from './select';

const FormComponent = ({ isSubmitting, values, errors, setValues }) => {
    const { field, submitText } = useFormikContext();

    const handleChanger = ({ target }) => {
        const name = target.name;
        const _values = { ...values };

        _values[name] = target.value;

        setValues(_values);
    };

    useEffect(() => {
        const checkDate = values.dueDate || values.birthday;
        const birthday = checkDate?.split('-');

        if (values.birthday) {
            const { age, month } = calculate.age(birthday);
            const _values = { ...values };

            _values.age = `${age}歲 ${month}月`;

            setValues(_values);
        }
    }, [ values.birthday, values.dueDate ])
    
    return (
        <Form className='form-container' onChange={ handleChanger }>
            <Grid templateColumns='repeat(6, 1fr)' gap={ field.length } mb={ 4 }>
            {
                field.map(({ label, type, name, placeholder, colspan = 6 }) => (
                    <GridItem key={ name } colSpan={ colspan }>
                    {
                        type === 'select' ?
                        <FormSelect label={ label } control={{ name, placeholder }} values={ values } errors={ errors } /> :
                        <FormInput label={ label } control={{ type, name, placeholder }} errors={ errors } isDisabled={ name === 'dueDate' && (values.weeks_of_birth.length === 0 || values.weeks_of_birth >= 37) }/>
                    }
                    </GridItem>
                ))
            }
            </Grid>
            <div className="button-element">
                <Button type='submit' isLoading={ isSubmitting }>{ submitText }</Button>
            </div>
        </Form>
    );
};

export default FormComponent;
