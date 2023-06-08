import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { response } from 'express';
import { Response } from 'node-fetch';

const s3Client = new S3Client({ region: "us-west-2" });

export const handler = async (event) => {
  let name = event.Records[0].s3.object.key;
  let size = event.Records[0].s3.object.size;
  let type = '.jpg';
  let newImageDetails = { name, size, type }
  console.log('new image details', newImageDetails);

  let params = {
    Bucket: 'nmullaney-images',
    Key: 'images.json',
  };

  let imageDetails;
  try {
    let results = await s3Client.send(new GetObjectCommand(params));
    let response = new Response(results.Body); //satisfies the result "promise"
    let retrievedImageDetails = await response.json(); // converts response into usable array
    imageDetails = retrievedImageDetails; // At this point we have the array if JSON exists
  } catch (e) {
    imageDetails = 'goal: populate this';
    console.log('get object error ', e);
    imageDetails = [];
  }

  imageDetails.push(newImageDetails);
  console.log('Our image details array ', imageDetails)

  let stringifiedDetails = JSON.stringify(imageDetails);
  let putParams = {
    ...params,
    Body: stringifiedDetails,
    ContentType: 'application/json' //For JSON it's always this
  }

  try {
    await s3Client.send(new PutObjectCommand(putParams));
  } catch (e) {
    console.warn('failed to put ', e);
  }

  return response;
}