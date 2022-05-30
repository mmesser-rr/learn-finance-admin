const { print } = require('graphql');
const gql = require('graphql-tag');

const updateTransacttatement = gql`
  mutation updateRecentTransaction($transactionId: ID!, $amount: Float, $status: String, $createdAt: String, $read: Boolean, $direction: String, $podAllocation: PodSettingsInput) {
    updateRecentTransaction(input: {amount: $amount, id: $transactionId, status: $status, createdAt: $createdAt, read: $read, direction: $direction, podAllocation: $podAllocation }) {
      createdAt
      amount
      status
      direction
      podAllocation{
        SAVINGS
        INVESTMENTS
        SPENDING
      }
      id
    }
  } 
`

const updateTransaction = (axios) => (
 transactionId, 
 status, 
 read
) => axios.post("/", {
  query: print(updateTransacttatement),
  variables: {
    transactionId, 
    status, 
    read
  }
}).then(resultLens);

const resultLens = (res) => res?.data?.errors ? Promise.reject(JSON.stringify(res.data)) : Promise.resolve(res.data.data.updateRecentTransaction);

module.exports = {
    updateTransaction
}
