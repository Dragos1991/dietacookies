import { ApplicationConfig } from "./ApplicationConfig";

export const loadConfig = async (): Promise<ApplicationConfig> => {
    const config = new ApplicationConfig({
        port: 3082,
        corsOptions: {
            origin: [
                "http://dietacookies.com:3001",
                "https://studio.apollographql.com",
            ],
            credentials: true,
        },
    });

    return config;
};
