import { useEffect, useState } from 'react'
import { Formik } from 'formik';

/* import context function */
import { FormikContext } from '../context/FormikContext';

/* import `Message` file */
import errorMessage from '../assecs/json/error/formik.json';

/* import `Components` file */
import FormComponent from '../components/form';

const FormikView = ({ field, submitText = '送出', submitHandle }) => {
    const [initialValues, setValues] = useState(null);
    const contextValues = { field, submitText };

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return regex.test(password);
      }

    /* Verification information */
    const validate = values => {
        const errors = {};

        field.filter(({ name, required }) => {
            const message = errorMessage[name] || errorMessage.default;

            // if (name === 'dueDate')
            //     return !!!values[name] && values.weeks_of_birth < 37 && (errors[name] = message);

            if (name === 'password' || name === 'password_new') {
                let result = validatePassword(values[name])
                console.log('values[name]', values[name], result)
                return !result && (errors[name] = '密碼至少8個字元，且至少包含一個英文字母和一個數字');
            }

            if (name === 'password_confirm') {
                let result = validatePassword(values[name])
                if (!result) {
                    return (errors[name] = '密碼至少8個字元，且至少包含一個英文字母和一個數字');
                }
                if (values[name] !== values['password_new']) {
                    return errors[name] = '密碼不一致'
                }
            }

            return !!!values[name] && required && (errors[name] = message);
        })

        return errors;
    }

    /* Submit Form */
    const onSubmit = (values, actions) => {
        const errors = validate(values);

        if (!Object.keys(errors).length)
            submitHandle(values, actions);
        else {
            actions.setErrors(errors);
            actions.setSubmitting(false);
        }
    };

    /* Initialization */
    const initial = () => {
        const _initialValues = {};

        field.map(({ name, _default }) =>
            _initialValues[name] = (_default || '')
        );

        setValues(_initialValues);
    };

    useEffect(() => { initial(); }, []);

    return (
        initialValues &&
        <FormikContext.Provider value={ contextValues }>
            <Formik component={ FormComponent } { ...{ initialValues, onSubmit } } />
        </FormikContext.Provider>
    )
};

export default FormikView;
