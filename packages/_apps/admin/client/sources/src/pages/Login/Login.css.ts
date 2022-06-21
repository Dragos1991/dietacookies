import { css, Theme, SerializedStyles } from "@dietacookies/ui-libs";
import loginImage from "./assets/loginImage.jpg";

type ValidKeys =
    | "alignSelf"
    | "root"
    | "leftSection"
    | "logo"
    | "title"
    | "rightWrap"
    | "rightContainer";

export type ILoginStyles = {
    [key in ValidKeys]: {
        className?: string;
        css: SerializedStyles;
    };
};

export const useStyles = (theme: Theme): ILoginStyles => {
    return {
        alignSelf: {
            css: css({
                alignSelf: "center",
            }),
        },
        root: {
            className: "root",
            css: css({
                height: "100%",
                marginTop: 0,
                backgroundColor: theme.palette.primary.light,
            }),
        },
        logo: {
            css: css({
                width: 100,
                borderRadius: theme.spacing(6),
                marginBottom: theme.spacing(2),
            }),
        },
        leftSection: {
            css: css({
                backgroundImage: `url(${loginImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
            }),
        },
        title: {
            css: css({
                textAlign: "center",
                paddingBottom: theme.spacing(4),
                color: theme.palette.primary.main,
            }),
        },
        rightWrap: {
            css: css({
                height: "100%",
            }),
        },
        rightContainer: {
            css: css({
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
                padding: theme.spacing(2),
            }),
        },
    };
};
