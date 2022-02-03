#!/bin/sh

export AWS_DEFAULT_PROFILE=evenue
export FUNCTION_NAME=sentimentscoringprocessing

export REGION=$(aws configure get region); echo $REGION
export ACCOUNT_ID=$(aws sts get-caller-identity --output text --query Account); echo $ACCOUNT_ID
export BASE_URI=$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com

# PUBLIC REPO
# aws ecr-public get-login-password --region $REGION | docker login --username AWS --password-stdin public.ecr.aws
# export REPO_URI=$(aws ecr-public describe-repositories --query "repositories[?repositoryName == '$FUNCTION_NAME'].repositoryUri | [0]" --output text)
# if [[ "$REPO_URI" == "None" ]]; then
#     export REPO_URI=$(aws ecr-public create-repository --repository-name $FUNCTION_NAME --region $REGION --query repository.repositoryUri --output text) #--catalog-data file://repositorycatalogdata.json
# fi

# PRIVATE REPO, SINCE LAMBDA CONTAINER DEPLOYMENT REQUIRES THIS
aws ecr get-login-password | docker login --username AWS --password-stdin $BASE_URI
export REPO_URI=$(aws ecr describe-repositories --query "repositories[?repositoryName == '$FUNCTION_NAME'].repositoryUri | [0]" --output text)
if [ "$REPO_URI" = "None" ]; then
    export REPO_URI=$(aws ecr create-repository --repository-name $FUNCTION_NAME --region $REGION --query repository.repositoryUri --output text)
fi
echo $REPO_URI

docker build -t $FUNCTION_NAME .
docker tag $FUNCTION_NAME:latest $REPO_URI
docker push $REPO_URI
