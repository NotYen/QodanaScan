const questionBasicStyle = {
    '.question-container': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        '.illustrate': {
            width: '100%',
            padding: '0px .5rem',
            '.title': {
                textAlign: 'center'
            },
            '.stack-content': {
                mt: '1rem',
                flexWrap: 'wrap',
                '.remind': {
                    mt: '1rem',
                    width: '100%',
                    fontSize: '20px'
                }
            }
        },
        '.reaction': {
            width: '80%',
            mt: '1.5rem'
        }
    }
};

export default questionBasicStyle;
