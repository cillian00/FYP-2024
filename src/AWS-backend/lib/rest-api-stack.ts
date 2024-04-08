import * as cdk from "aws-cdk-lib";
import * as lambdanode from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as custom from "aws-cdk-lib/custom-resources";
import {Construct} from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import {generateBatch} from "../shared/util";
import {movies, movieCasts} from "../seed/movies";
import * as apig from "aws-cdk-lib/aws-apigateway";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as node from "aws-cdk-lib/aws-lambda-nodejs";
import {AuthApi} from "./auth-api";
import {UserPool} from "aws-cdk-lib/aws-cognito";

export class RestAPIStack extends cdk.Stack {

    constructor(scope: Construct, id: string, props?: cdk.StackProps ) {
        super(scope, id, props);


      const imagesBucket = new s3.Bucket(this, "imagesBucket", {
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
        publicReadAccess: false,
      });


        const userPool = new UserPool(this, "UserPool", {
            signInAliases: { username: true, email: true },
            selfSignUpEnabled: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        });

        const userPoolId = userPool.userPoolId;

        const appClient = userPool.addClient("AppClient", {
            authFlows: { userPassword: true },
        });

        const userPoolClientId = appClient.userPoolClientId;

        new AuthApi(this, 'AuthServiceApi', {
            userPoolId: userPoolId,
            userPoolClientId: userPoolClientId,
        });


        // Tables
        const moviesTable = new dynamodb.Table(this, "MoviesTable", {
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
            partitionKey: {name: "movieId", type: dynamodb.AttributeType.NUMBER},
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            tableName: "Movies",
        });

      const accomadationTable = new dynamodb.Table(this, "AccomadationTable", {
        billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
        partitionKey: {name: "accId", type: dynamodb.AttributeType.NUMBER},
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        tableName: "Accomadation",
      });

      const accommodationPageTable = new dynamodb.Table(this, "AccommodationPageTable", {
        billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
        partitionKey: { name: "accId", type: dynamodb.AttributeType.NUMBER }, // same as accommodationTable
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        tableName: "AccommodationPage"
      });


      const newMovieFn = new lambdanode.NodejsFunction(this, "AddMovieFn", {
            architecture: lambda.Architecture.ARM_64,
            runtime: lambda.Runtime.NODEJS_16_X,
            entry: `${__dirname}/../lambdas/movies/addMovie.ts`,
            timeout: cdk.Duration.seconds(10),
            memorySize: 128,
            environment: {
                TABLE_NAME: moviesTable.tableName,
                REGION: "eu-west-1",
            },
        });

      const newAccomadationFn = new lambdanode.NodejsFunction(this, "AddAccomadationFn", {
        architecture: lambda.Architecture.ARM_64,
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: `${__dirname}/../lambdas/accomadation/addAccomadation.ts`,
        timeout: cdk.Duration.seconds(10),
        memorySize: 128,
        environment: {
          TABLE_NAME: accomadationTable.tableName,
          REGION: "eu-west-1",
        },
      });

      const newAccomadationPageFn = new lambdanode.NodejsFunction(this, "AddAccomadationPageFn", {
        architecture: lambda.Architecture.ARM_64,
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: `${__dirname}/../lambdas/accomadation/addAccomadation.ts`,
        timeout: cdk.Duration.seconds(10),
        memorySize: 128,
        environment: {
          TABLE_NAME: accommodationPageTable.tableName,
          REGION: "eu-west-1",
        },
      });


      const getAllAccomadationFn = new lambdanode.NodejsFunction(
        this,
        "GetAllAccomadationFn",
        {
          architecture: lambda.Architecture.ARM_64,
          runtime: lambda.Runtime.NODEJS_16_X,
          entry: `${__dirname}/../lambdas/accomadation/getAllAccomadation.ts`,
          timeout: cdk.Duration.seconds(10),
          memorySize: 128,
          environment: {
            TABLE_NAME: accomadationTable.tableName,
            REGION: 'eu-west-1',
          },
        }
      );

        const movieCastsTable = new dynamodb.Table(this, "MovieCastTable", {
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
            partitionKey: {name: "movieId", type: dynamodb.AttributeType.NUMBER},
            sortKey: {name: "actorName", type: dynamodb.AttributeType.STRING},
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            tableName: "MovieCast",
        });

        movieCastsTable.addLocalSecondaryIndex({
            indexName: "roleIx",
            sortKey: {name: "roleName", type: dynamodb.AttributeType.STRING},
        });

        const movieReviewsTable = new dynamodb.Table(this, "MovieReviewsTable", {
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
            partitionKey: {name: "movieId", type: dynamodb.AttributeType.NUMBER},
            sortKey: {name: "reviewerName", type: dynamodb.AttributeType.STRING},
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            tableName: "MovieReviews",
        });

        const newReviewFn = new lambdanode.NodejsFunction(this, "newReviewFn", {
            architecture: lambda.Architecture.ARM_64,
            runtime: lambda.Runtime.NODEJS_16_X,
            entry: `${__dirname}/../lambdas/movies/addReview.ts`,
            timeout: cdk.Duration.seconds(10),
            memorySize: 128,
            environment: {
                TABLE_NAME: movieReviewsTable.tableName,
                REGION: "eu-west-1",
            },
        });

        // Functions
        const getMovieByIdFn = new lambdanode.NodejsFunction(
            this,
            "GetMovieByIdFn",
            {
                architecture: lambda.Architecture.ARM_64,
                runtime: lambda.Runtime.NODEJS_16_X,
                entry: `${__dirname}/../lambdas/movies/getMovieById.ts`,
                timeout: cdk.Duration.seconds(10),
                memorySize: 128,
                environment: {
                    TABLE_NAME: moviesTable.tableName,
                    REGION: 'eu-west-1',
                    CAST: ''
                },
            }
        );

      const getAccomadationById = new lambdanode.NodejsFunction(
        this,
        "GetAccomadationByIdFn",
        {
          architecture: lambda.Architecture.ARM_64,
          runtime: lambda.Runtime.NODEJS_16_X,
          entry: `${__dirname}/../lambdas/accomadation/getAccomadationById.ts`,
          timeout: cdk.Duration.seconds(10),
          memorySize: 128,
          environment: {
            TABLE_NAME: accomadationTable.tableName,
            REGION: 'eu-west-1',
          },
        }
      );

      const getAccomadationPageById = new lambdanode.NodejsFunction(
        this,
        "GetAccomadationPageByIdFn",
        {
          architecture: lambda.Architecture.ARM_64,
          runtime: lambda.Runtime.NODEJS_16_X,
          entry: `${__dirname}/../lambdas/accomadation/getAccomadationById.ts`,
          timeout: cdk.Duration.seconds(10),
          memorySize: 128,
          environment: {
            TABLE_NAME: accommodationPageTable.tableName,
            REGION: 'eu-west-1',
          },
        }
      );

        const deleteMovieByIdFn = new lambdanode.NodejsFunction(
            this,
            "deleteMovieByIdFn",
            {
                architecture: lambda.Architecture.ARM_64,
                runtime: lambda.Runtime.NODEJS_16_X,
                entry: `${__dirname}/../lambdas/movies/deleteMovie.ts`,
                timeout: cdk.Duration.seconds(10),
                memorySize: 128,
                environment: {
                    TABLE_NAME: moviesTable.tableName,
                    REGION: 'eu-west-1',
                },
            }
        );

        const getAllMoviesFn = new lambdanode.NodejsFunction(
            this,
            "GetAllMoviesFn",
            {
                architecture: lambda.Architecture.ARM_64,
                runtime: lambda.Runtime.NODEJS_16_X,
                entry: `${__dirname}/../lambdas/movies/getAllMovies.ts`,
                timeout: cdk.Duration.seconds(10),
                memorySize: 128,
                environment: {
                    TABLE_NAME: moviesTable.tableName,
                    REGION: 'eu-west-1',
                },
            }
        );

        const getMovieCastMembersFn = new lambdanode.NodejsFunction(
            this,
            "GetCastMemberFn",
            {
                architecture: lambda.Architecture.ARM_64,
                runtime: lambda.Runtime.NODEJS_16_X,
                entry: `${__dirname}/../lambdas/movies/getMovieCastMember.ts`,
                timeout: cdk.Duration.seconds(10),
                memorySize: 128,
                environment: {
                    TABLE_NAME: movieCastsTable.tableName,
                    REGION: "eu-west-1",
                },
            }
        );

        const getReviewsForMovieFn  = new lambdanode.NodejsFunction(
            this,
            "getReviewsForMovieFn",
            {
                architecture: lambda.Architecture.ARM_64,
                runtime: lambda.Runtime.NODEJS_16_X,
                entry: `${__dirname}/../lambdas/movies/getMovieReview.ts`,
                timeout: cdk.Duration.seconds(10),
                memorySize: 128,
                environment: {
                    TABLE_NAME: movieReviewsTable.tableName,
                    REGION: "eu-west-1",
                },
            }
        );

      const imageUpload = new lambdanode.NodejsFunction(this, "images", {
        architecture: lambda.Architecture.ARM_64,
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: `${__dirname}/../lambdas/accomadation/imageUpload.ts`, // Path to your Lambda function's code
        timeout: cdk.Duration.seconds(10),
        memorySize: 128,
        environment: {
          BUCKET_NAME: 'imagesBucket',
        },
      });

        const getAllReviewsByReviewerName  = new lambdanode.NodejsFunction(
            this,
            "getAllReviewsByReviewerName",
            {
                architecture: lambda.Architecture.ARM_64,
                runtime: lambda.Runtime.NODEJS_16_X,
                entry: `${__dirname}/../lambdas/movies/getAllReviewsByReviewerName.ts`,
                timeout: cdk.Duration.seconds(10),
                memorySize: 128,
                environment: {
                    TABLE_NAME: movieReviewsTable.tableName,
                    REGION: "eu-west-1",
                },
            }
        );

        new custom.AwsCustomResource(this, "moviesddbInitData", {
            onCreate: {
                service: "DynamoDB",
                action: "batchWriteItem",
                parameters: {
                    RequestItems: {
                        [moviesTable.tableName]: generateBatch(movies),
                        [movieCastsTable.tableName]: generateBatch(movieCasts),  // Added
                      //  [movieReviewsTable.tableName]: generateBatch(movieReviews),  // Added
                    },
                },
                physicalResourceId: custom.PhysicalResourceId.of("moviesddbInitData"), //.of(Date.now().toString()),
            },
            policy: custom.AwsCustomResourcePolicy.fromSdkCalls({
                resources: [moviesTable.tableArn, movieCastsTable.tableArn, movieReviewsTable.tableArn, accomadationTable.tableArn],  // Includes movie cast
            }),
        });

        // Permissions
      imagesBucket.grantReadWrite(imageUpload);
      moviesTable.grantReadData(getMovieByIdFn)
        moviesTable.grantReadData(deleteMovieByIdFn)
        moviesTable.grantReadData(getAllMoviesFn)
        moviesTable.grantReadWriteData(newMovieFn)
      accommodationPageTable.grantReadWriteData(newAccomadationPageFn)
      accomadationTable.grantReadWriteData(newAccomadationFn)
      accomadationTable.grantReadData(getAllAccomadationFn)
      movieCastsTable.grantReadData(getMovieCastMembersFn);
        movieReviewsTable.grantReadWriteData(newReviewFn);
        movieReviewsTable.grantReadWriteData(getReviewsForMovieFn);

        movieReviewsTable.grantReadData(getAllReviewsByReviewerName);


        const api = new apig.RestApi(this, "RestAPI", {
            description: "demo api",
            deployOptions: {
                stageName: "dev",
            },
            // 👇 enable CORS
            defaultCorsPreflightOptions: {
                allowHeaders: ["Content-Type", "X-Amz-Date"],
                allowMethods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
                allowCredentials: true,
                allowOrigins: ["*"],
            },
        });

        // ------------------------------
      const accomadationEndPoint = api.root.addResource("accomadation");
      accomadationEndPoint.addMethod("POST", new apig.LambdaIntegration(newAccomadationFn), {
      });
      accomadationEndPoint.addMethod("GET", new apig.LambdaIntegration(getAllAccomadationFn));

      // accomadation/{accId}
      const accomadationIdEndpoint = accomadationEndPoint.addResource("{accId}");
      accomadationIdEndpoint.addMethod("GET", new apig.LambdaIntegration(getAccomadationById))

      const s3UploadEndpoint = api.root.addResource("upload");
      s3UploadEndpoint.addMethod("POST", new apig.LambdaIntegration(imageUpload, { proxy: true }));

      const accomadationPageEndPoint = api.root.addResource("accomadationPage");
      accomadationPageEndPoint.addMethod("POST", new apig.LambdaIntegration(newAccomadationPageFn), {
      });
      accomadationPageEndPoint.addMethod("GET", new apig.LambdaIntegration(getAccomadationPageById), {
      });

      //
        const moviesEndpoint = api.root.addResource("movies");
        moviesEndpoint.addMethod(
            "GET",
            new apig.LambdaIntegration(getAllMoviesFn, {proxy: true})
        );
        moviesEndpoint.addMethod("POST", new apig.LambdaIntegration(newMovieFn), {
            // authorizer: requestAuthorizer,
            // authorizationType: apig.AuthorizationType.CUSTOM,
        });
        moviesEndpoint.addMethod(
            "DELETE",
            new apig.LambdaIntegration(deleteMovieByIdFn, {proxy: true})
        );

        // /movies/reviews
        const reviewsPostEndpoint = moviesEndpoint.addResource("reviews");
        reviewsPostEndpoint.addMethod("POST", new apig.LambdaIntegration(newReviewFn, { proxy: true }));

        // Add GET /movies/reviews/{reviewerName}
        const reviewsByReviewerNameEndpoint = reviewsPostEndpoint.addResource("{reviewerName}");
        reviewsByReviewerNameEndpoint.addMethod("GET", new apig.LambdaIntegration(getAllReviewsByReviewerName, { proxy: true }));


        const movieEndpoint = moviesEndpoint.addResource("{movieId}");
        movieEndpoint.addMethod("GET", new apig.LambdaIntegration(getMovieByIdFn, { proxy: true }));

        // Add GET /movies/{movieId}/reviews/
        const reviewsEndpoint = movieEndpoint.addResource("reviews");
        reviewsEndpoint.addMethod("GET", new apig.LambdaIntegration(getReviewsForMovieFn, { proxy: true }));

         // Add GET /movies/{movieId}/reviews/{reviewerName}
          // Add PUT /movies/{movieId}/reviews/{reviewerName}
        // const reviewerNameReviewsEndpoint = reviewsEndpoint.addResource("{reviewerName}")
        // reviewerNameReviewsEndpoint.addMethod("GET", new apig.LambdaIntegration(getReviewsForMovieByReviewerNameFn, { proxy: true }));
        // reviewerNameReviewsEndpoint.addMethod("PUT", new apig.LambdaIntegration(updateReviewFn, { proxy: true }));

    }
}
