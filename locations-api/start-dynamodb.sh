#!/bin/sh
jar=DynamoDBLocal.jar
lib=DynamoDBLocal_lib
dynamodir=./dynamodb-local
java -Djava.library.path=$dynamodir/$lib -jar $dynamodir/$jar -sharedDb