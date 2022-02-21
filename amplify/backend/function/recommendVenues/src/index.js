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
    const keys = venueIds.map(vid => ({ id: String(vid) }))
    console.log(keys)
    let queryParams = {
        "RequestItems": {
            "Venue-2u7klnf7oba3lc5r5jvdeirwa4-dev": {
                Keys: keys,
                ProjectionExpression: 'id, #name, headline, description, photos, city, pricing, #type, published, #capacity, reviews, #owner',
                ExpressionAttributeNames: {'#name': 'name', '#type': 'type', '#capacity': 'capacity', '#owner': 'owner'}
            }
        }
    };
    console.log(JSON.stringify(queryParams, null, 2))
    const result = await documentClient.batchGet(queryParams).promise();
    return result.Items
}

exports.handler = async (event) => {
    console.log(`Initial event payload: ${JSON.stringify(event)}`);
    const username = event.identity?.username;
    let recVenues = []
    if (username) {
        const recVenueIds = await retrieveRecommendations(username);
        console.log(`recVenueIds: ${JSON.stringify(recVenueIds)}`);
        recVenues = await retrieveVenues(recVenueIds) || [];
    }
    return recVenues;
};
