const subjectStyle = {
    textAlign: 'center',
    fontWeight: 'bolder',
    '.title': {
        color: 'purple.deep',
        fontSize: '40px',
        marginBottom: '.5rem',
    },
    '.stack-content': {        
        display: 'flex',
        padding: '1.5rem 1rem',
        bg: 'lavender.deep',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: '20px',
        justifyContent: 'flex-start',
        '.text-container': {
            display: 'flex',
            padding: '0px 1rem',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            '.label': {
                mb: '.5rem',
                textAlign: 'left'
            },
            '.text-bubble': {
                display: 'flex',
                flexDirection: 'row',
            },
            '.img-bubble': {
                width: '1rem',
                height: '0.8rem',
                mt: '10px',
            },
            '.text': {
                color: 'white',
                bg: 'purple.base',
                padding: '.3rem 1.2rem',
                textAlign: 'center',
                borderRadius: '10px'
            }
        }
    }
};

export default subjectStyle;
