import { Box, Tab, Tabs, useTheme } from '@dietacookies/ui-libs';
import type { FunctionComponent, SyntheticEvent } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';

import { useStyles } from './Profile.css';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

interface IProfile {
    currentUser: any;
}

const ProfileB: FunctionComponent<IProfile> = ({ currentUser }) => {
    const theme = useTheme();
    const { root, tabPanelRoot, boxWrap } = useStyles(theme);

    const [value, setValue] = useState(0);

    const handleChange = (_event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const { email, firstName, lastName, age, role } = currentUser;

    return (
        <Box css={root.css}>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Profile" />
                <Tab label="Personal details" />
                <Tab label="Change password" />
            </Tabs>
            <div css={tabPanelRoot.css}>
                <TabPanel value={value} index={0}>
                    <div css={boxWrap.css}>
                        <div>
                            <strong>Nume: </strong>
                            {firstName} {lastName}
                        </div>
                        <div>
                            <strong>Varsta: </strong>
                            {age}
                        </div>
                        <div>
                            <strong>Email: </strong>
                            {email}
                        </div>
                        <div>
                            <strong>Role: </strong>
                            {role}
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div css={boxWrap.css}>Personal Details</div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <div css={boxWrap.css}>Change password</div>
                </TabPanel>
            </div>
        </Box>
    );
};

export const Profile = connect((state: any) => {
    return {
        currentUser: state.auth.currentUser,
    };
})(ProfileB);
