import { css, ITheme, SerializedStyles, theme } from "@dietacookies/ui-libs";

type ValidKeys = "root";

export type IFullPageLoaderStyles = {
    [key in ValidKeys]: {
        className?: string;
        css: SerializedStyles;
    };
};

export const useStyles = (_theme?: ITheme): IFullPageLoaderStyles => {
    return {
        root: {
            css: css({
                position: "absolute" as "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                height: "100%",
                bgcolor: "background.paper",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                p: 4,
            }),
        },
    };
};
