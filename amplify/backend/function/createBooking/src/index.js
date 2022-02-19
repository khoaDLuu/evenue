const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

const BOOKING_TABLE = "Booking-2u7klnf7oba3lc5r5jvdeirwa4-dev";
const BOOKING_TYPE = "Booking";

const createBooking = async (payload) => {
  const {
    bookingId,
    venueId,
    checkIn,
    checkOut,
    guestCount,
    extras,
    totalCharge,
    paymentCurrency,
    paymentToken,
    sub
  } = payload;
  var params = {
    TableName: BOOKING_TABLE,
    Item: {
      venueId,
      user: sub,
      checkIn,
      checkOut,
      guestCount,
      extras,
      totalCharge,
      paymentCurrency,
      paymentToken,
      status: "CONFIRMED",

      __typename: BOOKING_TYPE,
      id: bookingId,
      owner: sub,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }
  };
  console.log(params);
  await documentClient.put(params).promise();
};

exports.handler = async (event) => {
  try {
    let payload = event.prev.result;
    payload.bookingId = uuidv4();
    await createBooking(payload);
    // TODO: function to email the invoice to the user
    return "CONFIRMED";
  } catch (err) {
    console.log(err);
    return new Error(err);
  }
};
