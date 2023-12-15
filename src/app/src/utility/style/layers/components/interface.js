const interfaceStyle = {
    mb: '1.5rem',
    padding: '1.5rem',
    borderRadius: '20px',
    bg: 'lavender.openness',
    '&:nth-of-type(even)': {
        bg: 'lavender.deep',
        '.stack-content': {
            '.text-container': {
                '.text': {
                    bg: 'blue.base'
                }
            }
        },
        '.chakra-checkbox': {
            bg: 'purple.even',
        },
    },
    '.stack-content': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        '.text-container': {
            display: 'flex',
            padding: '0px 1rem',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            maxWidth: '75%',
            fontSize: '18px',
            '.label': {
                mb: '.5rem',
                fontWeight: 'bolder',
                color: 'purple.deep',
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
                borderRadius: '10px'
            }
        }
    },
    '.chakra-checkbox': {
        bg: 'black.openness',
        padding: '5px 10px',
        borderRadius: '10px',
        '.chakra-checkbox__control': {
            bg: 'white',
            borderRadius: '5px',
            border: '1px solid #423D80;',
            '&[data-checked]': {
                bg: 'purple.deep',
                borderColor: 'purple.deep'
            }
        },
    },
    '.title': {
        fontSize: '25px',
        color: 'purple.base',
        fontWeight: 'bolder'
    }
};

export default interfaceStyle;
