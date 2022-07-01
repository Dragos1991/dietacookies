import { Theme } from "@mui/material";
import { Typography } from "@mui/material/styles/createTypography";
import { string } from "yup";

export interface ITheme extends Theme {
    typography: ITypography;
}

export interface ITypography extends Typography {
    mainContent: {
        backgroundColor: string;
        width: string | number;
        minHeight: string | number;
        flexGrow: number;
        padding: string | number;
        marginTop: string | number;
        marginRight: string | number;
        borderRadius: string | number;
    };
    commonAvatar: {
        cursor: string;
        borderRadius: string | number;
    };
    smallAvatar: {
        width: string | number;
        height: string | number;
        fontSize: string;
    };
    mediumAvatar: {
        width: string | number;
        height: string | number;
        fontSize: string | number;
    };
    largeAvatar: {
        width: string | number;
        height: string | number;
        fontSize: string | number;
    };
}
