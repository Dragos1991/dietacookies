import { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { IAppModuleState, IAppState } from "../app/types";

const Index = ({ color }: IAppState) => {
    const [state, setState] = useState<any>(null);
    const doFetch = async () => {
        const response = await axios.get("http://localhost:3082");
        setState(response.data);
    };
    useEffect(() => {
        doFetch();
    }, []);

    return (
        <>
            <div>
                {state && state.connection
                    ? `Admin server connection established.`
                    : "Loading"}
            </div>
            <div>{color ? "Redux running. " : "Redux Loading"}</div>
        </>
    );
};

export default connect((state: IAppModuleState) => {
    return {
        color: state.app.color,
    };
}, null)(Index);
