import { gql } from "@apollo/client";
// import { GET_TRANSACTIONS } from "./transactionQuery";

export const GET_TRANSACTIONS = gql`
    query GetTransactions {
        getTransactions {
            _id
            description
            paymentType
            category
            amount
            location
            date
        }
    }
`;

export const GET_TRANSACTION = gql`
    query GetTransaction($id: ID!) {
        transaction(transactionId: $id) {
            _id
            description
            paymentType
            category
            amount
            location
            date
        }
    }
`;
