import { buildSchema } from 'graphql';

export default buildSchema(/* GraphQL */ `
    scalar Date
    scalar AnyObject

    type Avatar {
        id: ID!
        url: String!
    }

    type User implements WithAvatar {
        id: ID!
        creationDate: Date!
        login: String!
        avatar: Avatar
        status: Status!
        customStatus: ABCStatus
        scalarValue: AnyObject!
        camelCaseThing: camelCaseThing
        unionThing: UnionThing
        prefixedEnum: Prefixed_Enum
        interfaceThing: InterfaceThing!
        circularThing: CircularA!
        nonNullableAvatar: Avatar!
    }

    type ListType {
        listTest1: [Avatar]!
        listTest2: [Avatar!]!
        listTest3: [[[[[Avatar!]!]!]]]!
        listTest4: [[[Avatar!]]!]!

        listTest5: [[String!]!]
        listTest6: [String]
    }

    type CircularA {
        circularB: CircularB!
        circularC: CircularC!
    }

    type CircularB {
        circularA: CircularA!
    }

    type CircularC {
        aCollection: [CircularA!]!
    }

    type CircularD {
        circularA: CircularA!
        circularB: CircularB!
    }

    interface InterfaceThing {
        id: ID!
    }

    type InterfaceA implements InterfaceThing {
        name: String!
    }

    type interfaceB implements InterfaceThing {
        age: Int!
    }

    interface WithAvatar {
        id: ID!
        avatar: Avatar
    }

    type camelCaseThing {
        id: ID!
    }

    type Prefixed_Response {
        ping: String!
    }

    type ABCType {
        abc: String!
    }

    input UpdateUserInput {
        id: ID!
        login: String
        avatar: Avatar
    }

    enum ABCStatus {
        hasXYZStatus
    }

    enum Status {
        ONLINE
        OFFLINE
    }

    enum Prefixed_Enum {
        PREFIXED_VALUE
    }

    union UnionThing = Avatar | camelCaseThing

    type Mutation {
        updateUser(user: UpdateUserInput): User
    }

    type Query {
        user: User!
        prefixed_query: Prefixed_Response!
    }
`);