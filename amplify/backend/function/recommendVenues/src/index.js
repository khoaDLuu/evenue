const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();
const documentClient = new AWS.DynamoDB.DocumentClient();

const retrieveRecommendations = async (user) => {
    var params = {
        FunctionName: 'venueRecommendationProcessing',
        InvocationType: 'RequestResponse',
        Payload: JSON.stringify({ user })
    };
    const result = await lambda.invoke(params).promise();
    return JSON.parse(result.Payload) // list of venueId's
}

const retrieveVenues = async (venueIds) => {
    let queryParams = {
        "RequestItems": {
            "Venue-zcfpgzto5veatbqkwb4cskchiu-dev": {
                Keys: venueIds.map(vid => ({ 'id': vid })),
                ProjectionExpression: 'id, name, headline, description, photos, city, pricing, type, published, capacity, reviews, owner'
            }
        }
    };
    console.log(queryParams)
    const result = documentClient.batchGet(queryParams).promise();
    return result.Items
}

exports.handler = async (event) => {
    console.log(`Initial event payload: ${JSON.stringify(event)}`)
    const { sub } = event.identity.claims;
    const recVenueIds = await retrieveRecommendations(sub);
    console.log(`recVenueIds: ${JSON.stringify(recVenueIds)}`)
    const recVenues = await retrieveVenues(recVenueIds)
    return recVenues;
};
