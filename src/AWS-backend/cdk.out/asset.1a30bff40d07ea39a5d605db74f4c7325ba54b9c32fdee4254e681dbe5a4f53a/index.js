"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lambdas/accomadation/imageUpload.ts
var imageUpload_exports = {};
__export(imageUpload_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(imageUpload_exports);
var AWS = __toESM(require("aws-sdk"));
var handler = async (event) => {
  console.log("Received headers:", event.headers);
  console.log("Is base64 encoded:", event.isBase64Encoded);
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing or invalid request body" })
    };
  }
  try {
    const s3 = new AWS.S3();
    const bucketName = "restapistack-imagesbucketf1a776cf-rf7scykpp1we";
    const key = `image_${Date.now()}.jpg`;
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: event.body,
      ContentType: "image/jpeg"
    };
    const data = await s3.upload(params).promise();
    console.log("File uploaded successfully:", data.Location);
    return {
      statusCode: 200,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({ message: "File uploaded successfully", location: data.Location })
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error", error })
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
