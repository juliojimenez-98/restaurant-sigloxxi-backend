const WebpayPlus = require("transbank-sdk").WebpayPlus; // CommonJS
const {
  Options,
  IntegrationApiKeys,
  Environment,
  IntegrationCommerceCodes,
} = require("transbank-sdk"); // CommonJS



const pagar = async (req, res = response) => {
    const { buy_order, session_id, amount, return_url } = req.body;
  const tx = new WebpayPlus.Transaction(
    new Options(
      IntegrationCommerceCodes.WEBPAY_PLUS,
      IntegrationApiKeys.WEBPAY,
      Environment.Integration
    )
  );
  const response = await tx.create(buy_order, session_id, amount, return_url); 
  console.log(response.token)

//   const tex = new WebpayPlus.Transaction(
//     new Options(
//       IntegrationCommerceCodes.WEBPAY_PLUS,
//       IntegrationApiKeys.WEBPAY,
//       Environment.Integration
//     )
//   );
//   const respuesta = await tex.commit(response.token);

  res.json({
    response,
  });
};

module.exports = {
  pagar,
};
