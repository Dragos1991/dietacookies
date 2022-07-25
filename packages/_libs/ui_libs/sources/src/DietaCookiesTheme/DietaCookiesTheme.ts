import { createTheme } from '@mui/material/styles';

import type { ITheme } from '../types';
// project imports
import { componentStyleOverrides } from './ComponentStyleOverride';
import { themePalette } from './Pallete';
// assets
import { themeColors } from './ThemeVariables';
import { themeTypography } from './Typography';

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const DietaCookiesTheme = (): ITheme => {
    const color = themeColors;

    const themeOption = {
        colors: color,
        heading: color.grey900,
        paper: color.paper,
        backgroundDefault: color.paper,
        background: color.primaryLight,
        darkTextPrimary: color.grey700,
        darkTextSecondary: color.grey500,
        textDark: color.grey900,
        menuSelected: color.secondaryDark,
        menuSelectedBack: color.secondaryLight,
        divider: color.grey200,
        fontFamily: 'Open Sans',
    };

    const themeOptions = {
        palette: themePalette(themeOption),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px',
                },
            },
        },
        typography: themeTypography(themeOption),
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const themes = createTheme(themeOptions) as ITheme;
    themes.components = componentStyleOverrides(themeOption);

    return themes;
};

export default DietaCookiesTheme;
