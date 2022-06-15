import { GraphQLGateway } from "../graphql-gateway";
import { HttpRequest } from "../http-request";

const grahpQlUrl = "/*_*/api";
const httpRequest = new HttpRequest();

const graphQlClient = new GraphQLGateway(grahpQlUrl, httpRequest);

export { graphQlClient };
