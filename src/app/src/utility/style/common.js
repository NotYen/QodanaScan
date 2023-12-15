const commonStyles = {
    global: {
        '#root': {
            maxWidth: '1024px',
            minWidth: '768px',
            margin: 'auto'
        },
        '.box-container': {
            // overflowY: 'auto',
            padding: '1.5rem',
            // minHeight: 'calc(100vh - 84px)'
        },
        '.position-fixed': {
            position: 'fixed',
            top: '0px',
            left: '0px',
            right: '0px',
            bottom: '0px'
        },
        '.position-container': {
            position: 'relative'
        },
        '.text-center': {
            textAlign: 'center'
        },
        '.flex-center': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        '.direction-column': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        },
        '.title-text': {
            fontSize: '4rem',
            fontWeight: 'bolder'
        },
        '.form-container': {
            '.chakra-form-control': {
                marginBottom: '1rem',
                '&:nth-last-of-type(1)': {
                    marginBottom: '0px'
                }
            },
            '.button-element': {
                textAlign: 'center'
            }
        },
        '.measured-container': {
            mt: '3rem',
            position: 'relative',
            '.thumbsup': {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            },
        },
        '.mask': {
            position: 'absolute',
            top: '0px',
            left: '0px',
            right: '0px',
            bottom: '0px',
            zIndex: '20'
        },
        '.swiper-bit': {
        },
        '.swiper': {
            '.swiper-pagination-bullet': {
                width: '1rem',
                height : '1rem',
                mx: '8px !important',
                bg : 'purple.base',
            },
            '.swiper-title': {
                fontSize: '1.3rem',
                textAlign: 'center',
                mb: '1.5rem',
                px: '2rem'
            },
            '.image-box': {
                textAlign: 'center',
                margin: '2rem 0px'
            }
        }
    }
};

export default commonStyles;
