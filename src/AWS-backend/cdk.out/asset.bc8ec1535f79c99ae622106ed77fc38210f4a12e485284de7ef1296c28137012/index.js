"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lambdas/accomadation/imageUpload.ts
var imageUpload_exports = {};
__export(imageUpload_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(imageUpload_exports);
var handler = async (event, context) => {
  try {
    console.log("Event: ", event);
    const body = event.body ? JSON.parse(event.body) : void 0;
    if (!body) {
      return {
        statusCode: 500,
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({ message: "Missing request body" })
      };
    }
    const AWS = require("aws-sdk");
    const s3 = new AWS.S3();
    const bucketName = "restapistack-imagesbucketf1a776cf-rf7scykpp1we";
    const key = body.name;
    const contentType = "image/jpeg";
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: event,
      // the file data (buffer, stream, or string)
      ContentType: contentType
    };
    s3.upload(params, function(err, data) {
      if (err) {
        console.log("Error uploading file:", err);
      } else {
        console.log("File uploaded successfully:", data.Location);
      }
    });
  } catch (error) {
    console.log(JSON.stringify(error));
    return {
      statusCode: 500,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({ error })
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
