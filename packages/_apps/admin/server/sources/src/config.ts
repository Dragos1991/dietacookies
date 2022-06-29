import { ApplicationConfig } from "./ApplicationConfig";

export const loadConfig = async (): Promise<ApplicationConfig> => {
    const config = new ApplicationConfig({
        port: 3082,
        corsOptions: {
            origin: [
                "http://dietacookies.com",
                "http://localhost:3082",
                "https://studio.apollographql.com",
            ],
            credentials: true,
        },
    });

    return config;
};
