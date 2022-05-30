const tpc = require("../wrappers/tpc");
const crypto = require('crypto');
const webHookSecret = "";

const unitWebhook = (paymentId, request) => {
  const signature = request.header("x-unit-signature")
  let hmac = crypto.createHmac('sha1', webHookSecret)
  hmac.update(JSON.stringify(request.body))

  if(hmac.digest('base64') == signature) {
    updateTransactionList(data, athleteId)
  }
  else {
      response.status(500).send("Signatures didn't match!")
  }
}
const updateTransactionList = (savings, investments, spending, athleteId) => {
   const totalPod = savings + investments + spending;
   if(totalPod != 100){
    Promise.reject(`Invalid pod settings ${athleteId}`)
   }
   const podSettings = ({
    SAVINGS: savings,
    INVESTMENTS: investments,
    SPENDING: spending
    });
  return tpc.updatePodSettings(athleteId, podSettings)
}
module.exports.unitWebhook = async (event) => {
  const {data} = event.arguments;
  return unitWebhook(data)
}
//relationships.payment.data.id