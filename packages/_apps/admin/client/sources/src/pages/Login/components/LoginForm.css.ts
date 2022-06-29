import { css, Theme, SerializedStyles } from "@dietacookies/ui-libs";

type ValidKeys = "root";

export type ILoginFormStyles = {
    [key in ValidKeys]: {
        className?: string;
        css: SerializedStyles;
    };
};

export const useStyles = (theme: Theme): ILoginFormStyles => {
    return {
        root: {
            css: css({
                alignSelf: "center",
                maxWidth: "400px",
            }),
        },
    };
};
