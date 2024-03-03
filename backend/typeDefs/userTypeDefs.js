const userTypeDefs=`#graphql
    type User {
        _id: ID!
        name: String!
        username: String!
        email: String!
        password: String!
        profilePicture: String
        gender: String!
    }

    type Query{
        authUser: User
        user(userId:ID!): User
    }

    type Mutation{
        signUp(input: SignUpInput!): User
        login(input: LoginInput!): User
        logout: LogoutResponse
    }

    input LoginInput{
        email: String!
        password: String!
    }

    input SignUpInput{
        name: String!
        email: String!
        username: String!
        password: String!
        gender: String!
    }

    type LogoutResponse{
        message: String!
    }

`

export default userTypeDefs;