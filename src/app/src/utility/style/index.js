import { extendTheme } from '@chakra-ui/react';

/* import `Custom Style` config */
import colors from './colors';
import common from './common';
import layers from './layers';
import semantic from './semantic';
import components from './components';

const theme = extendTheme({
    colors: colors,
    styles: common,
    layerStyles: layers,
    components: components,
    semanticTokens: semantic
});

export default theme;