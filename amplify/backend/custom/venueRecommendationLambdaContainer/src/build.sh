#!/bin/sh

export AWS_DEFAULT_PROFILE=evenue
export FUNCTION_NAME=venuerecommendationprocessing
export REGION=$(aws configure get region); echo $REGION
export ACCOUNT_ID=$(aws sts get-caller-identity --output text --query Account); echo $ACCOUNT_ID
export BASE_URI=$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com

aws ecr get-login-password | docker login --username AWS --password-stdin $BASE_URI
export REPO_URI=$(aws ecr describe-repositories --query "repositories[?repositoryName == '$FUNCTION_NAME'].repositoryUri | [0]" --output text)
if [ "$REPO_URI" = "None" ]; then
    export REPO_URI=$(aws ecr create-repository --repository-name $FUNCTION_NAME --region $REGION --query repository.repositoryUri --output text)
fi
echo $REPO_URI

docker build -t $FUNCTION_NAME .
docker tag $FUNCTION_NAME:latest $REPO_URI
docker push $REPO_URI
