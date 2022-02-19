const { CognitoIdentityServiceProvider } = require("aws-sdk");
const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
const USER_POOL_ID = "us-east-1_0UgU6K4E3";
const stripe = require("stripe")("sk_test_51K0pH2BfgvDJN0OCijOFQV5WV1XifummWD2bajGVM0exUaQa0kGFrtEQa1NWfW2XdsARMsEXda5cTNLMS4UK94yr00y30W6E2l");

const getUserEmail = async (event) => {
  const params = {
    UserPoolId: USER_POOL_ID,
    Username: event.identity.claims.sub
  };
  const user = await cognitoIdentityServiceProvider.adminGetUser(params).promise();
  const { Value: email } = user.UserAttributes.find((attr) => {
    if (attr.Name === "email") {
      return attr.Value;
    }
  });
  return email;
};

exports.handler = async (event) => {
  try {
    const {
      venueId,
      checkIn,
      checkOut,
      guestCount,
      extras,
      totalCharge,
      paymentCurrency,
      paymentToken
    } = event.arguments.input;
    const { sub } = event.identity.claims;
    const email = await getUserEmail(event);

    await stripe.charges.create({
      amount: totalCharge * 100, // https://stripe.com/docs/currencies?presentment-currency=GR#zero-decimal
      currency: paymentCurrency,
      source: paymentToken,
      description: `Order ${new Date()} by ${email} - ${sub}`
    });
    return {
      venueId,
      checkIn,
      checkOut,
      guestCount,
      extras,
      totalCharge,
      paymentCurrency,
      paymentToken,
      status: "PENDING",
      sub,
      email
    };
  } catch (err) {
    throw new Error(err + `\nInitial event payload: ${JSON.stringify(event)}`);
  }
};
