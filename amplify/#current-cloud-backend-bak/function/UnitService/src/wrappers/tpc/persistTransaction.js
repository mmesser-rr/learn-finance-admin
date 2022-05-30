const { print } = require('graphql');
const gql = require('graphql-tag');

const updateTransactionStatement = gql`
  mutation persistRecentTransaction($transactionId: String!, $athleteId: String!, $amount: Float, $status: String, $createdAt: String, $read: Boolean, $direction: String, $podAllocation: PodSettingsInput) {
    createRecentTransaction(input: {amount: $amount, transactionId: $transactionId, athleteId: $athleteId, status: $status, createdAt: $createdAt, read: $read, direction: $direction, podAllocation: $podAllocation }) {
      transactionId
      createdAt
      athleteId
      amount
      status
      direction
      podAllocation{
        SAVINGS
        INVESTMENTS
        SPENDING
      }
    }
  } 
`

const persistTransaction = (axios) => (
 transactionId,
 athleteId, 
 amount, 
 status, 
 createdAt,
 read, 
 direction,
 podAllocation
) => axios.post("/", {
  query: print(updateTransactionStatement),
  variables: {
    transactionId, 
    athleteId,
    amount, 
    status, 
    createdAt,
    read, 
    direction,
    podAllocation
  }
}).then(resultLens);

const resultLens = (res) => res?.data?.errors ? Promise.reject(JSON.stringify(res.data)) : Promise.resolve({ amount: res.data.data.createRecentTransaction.amount,
  transactionId: res.data.data.createRecentTransaction.transactionId, status:res.data.data.createRecentTransaction.status, direction: res.data.data.createRecentTransaction.direction, podAllocation:res.data.data.createRecentTransaction.podAllocation });

module.exports = {
    persistTransaction
}
