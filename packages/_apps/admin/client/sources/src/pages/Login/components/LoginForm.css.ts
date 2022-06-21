import { css, Theme, SerializedStyles } from "@dietacookies/ui-libs";
import loginImage from "./assets/loginImage.jpg";

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
                maxWidth: "300px",
            }),
        },
    };
};
