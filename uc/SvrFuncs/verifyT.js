// @ts-nocheck
require("dotenv").config();
const Flutterwave = require('flutterwave-node-v3');
const { DateTime } = require("luxon");
const sendEmailAdmin = require("./notify");
const sendd = require("./mailSender");
// const { updateFlid } = require("@/Collections/FlutterwaveIds");

async function vet(ref, transactionId, ID, user,productInfo) {
    // Validate input parameters
    if (!ref || !transactionId || !ID || !user) {
        console.error('Missing required parameters:', { ref, transactionId, ID, user });
        throw new Error('Invalid parameters for transaction verification');
    }

    console.log('Starting verification for:', { transactionId, ref, user });

    const flw = new Flutterwave(
        process.env.FLW_PUBLIC_KEY, 
        process.env.FLW_SECRET_KEY
    );

    try {
        // Verify transaction with Flutterwave
        const response = await flw.Transaction.verify({ id: transactionId });
        console.log('Verification response:', response);

        // Validate transaction
        if (response.data.status === "successful" &&
            response.data.currency === "NGN" &&
            response.data.tx_ref === ref &&
            response.data.customer.email===user) {
  console.log(JSON.parse(response.data.meta.order));
      await fetch('https://expert-memory-9774x9pr545ghvx5-3000.app.github.dev/order', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    productInfo:JSON.parse(response.data.meta.order).productInfo.current,
    address:JSON.parse(response.data.meta.order).address,
    state:JSON.parse(response.data.meta.order).state,
    user,
    phone:response.data.customer.phone_number
  })
})
.catch(error => console.error('Error:', error));
            return "success"
        } 
        else {
            console.warn('Transaction verification failed:', response.data);
            await sendd(
                "igwebuikea626@gmail.com",
                `order FAILED for user ${user}`,undefined,"order failed maybe due to incorrect transaction"
            );
            
            return
        }
    }
     catch (error) {
        console.log("Error was caught in the verifyT module",error)
        await sendd(
            "igwebuikea626@gmail.com",
            `order ERROR for user ${user}`,undefined,"order failure"
        );
        return
    }
}
module.exports = vet;