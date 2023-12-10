import { buildSchema } from 'graphql';

export default buildSchema(/* GraphQL */ `
    type camelCaseThing {
        id: String!
    }

    type Main {
        camelCaseThing: camelCaseThing
        listTest: [camelCaseThing!]!
    }
`);
