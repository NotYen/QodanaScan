const processStyle = {
    flexWrap: 'wrap',
    py: '1rem',
    fontSize: '18px',
    color: 'purple.deep',
    fontWeight: 'bolder',
    justifyContent: 'flex-start',
    'svg': {
        color: 'purple.icon',
        margin: '0px 2px',
        width: '1.5rem',
        height: '1.5rem',
    },
    '.text-content': {
        my: '0.5rem',
        borderRadius: '20px',
        flex: '1',
        textAlign: 'center',
        maxWidth: '35%',
        minWidth: 'max-content',
        bg: 'black.openness',
        padding: '1.5rem 1rem',
        '&[is-selected="true"]': {
            bg: 'purple.base',
            color: 'white',
            boxShadow: '0px 5px 10px 5px #00000040'
        }
    }
};

export default processStyle;
