/* Amplify Params - DO NOT EDIT
	API_EVENUEFS_GRAPHQLAPIIDOUTPUT
	API_EVENUEFS_REVIEWTABLE_ARN
	API_EVENUEFS_REVIEWTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const { v4: uuidv4 } = require("uuid");
const docClient = new AWS.DynamoDB.DocumentClient();
const lambda = new AWS.Lambda();

const sentimentScore = async c => {
  var params = {
    FunctionName: 'sentimentScoringProcessing',
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify({ "comment": c })
  };
  const result = await lambda.invoke(params).promise();
  return parseInt(result.Payload)
}

const dumpRSDataRecord = async rec => {
  const params = {
    TableName : 'rsratings-dev',
    Item: {
      id: uuidv4(),
      user_id: rec.owner,
      venue_id: rec.venueReviewsId,
      rating: rec.rating,
      comment: rec.comment,
      sentiment_score: rec.sentScore,
      created_at: new Date().toISOString(),
    }
  }
  console.log(params);
  try {
    const res = await docClient.put(params).promise()
    console.log(JSON.stringify(res, null, 2))
  }
  catch (err) {
    console.log(err)
  }
}

exports.handler = async event => {
  //eslint-disable-line
  console.log(JSON.stringify(event, null, 2));
  for (const evrec of event.Records) {
    const rec = AWS.DynamoDB.Converter.unmarshall(evrec.dynamodb.NewImage);
    const sentScore = await sentimentScore(rec.comment);
    rec.sentScore = sentScore;
    await dumpRSDataRecord(rec);
  }
  // redundant since we do it async
  return Promise.resolve('Successfully processed DynamoDB record');
};
