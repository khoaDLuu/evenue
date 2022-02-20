/* Amplify Params - DO NOT EDIT
	API_EVENUEFS_GRAPHQLAPIIDOUTPUT
	API_EVENUEFS_REVIEWTABLE_ARN
	API_EVENUEFS_REVIEWTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();

const startmodelBuilding = async (event) => {
  var params = {
    FunctionName: 'modelBuildingProcessing',
    InvocationType: 'Event',
    Payload: JSON.stringify(event)
  };
  console.log(params);
  lambda.invoke(params).promise()
    .then(res => {
      console.log("Successfully started Evenue RS model building")
      console.log(res)
    })
    .catch(err => {
      console.log("Failed to start Evenue RS model building")
      console.log(err)
    });
}

exports.handler = async event => {
  //eslint-disable-line
  console.log(JSON.stringify(event, null, 2));
  startmodelBuilding(event);
  return Promise.resolve('Exited successfully');
};
