import { useTheme } from "@mui/material/styles";

import { createMakeAndWithStyles } from "tss-react";

const { makeStyles, withStyles } = createMakeAndWithStyles({
    useTheme,
});

export { makeStyles as generateStyles, withStyles as withStyleHoc };
