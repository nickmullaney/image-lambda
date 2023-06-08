import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { Response } from 'node-fetch';

export const handler = async (event) => {
  const s3Client = new S3Client({ region: "us-west-2" });
  const params = {
    Key: event.Records[0].s3.object.key,
    fileSize: event.Records[0].s3.object.size,
    Bucket: 'nmullaney-images',
  };

  console.log('new event info', params);

  let data;
  try {
    let s3Results = await s3Client.send(new GetObjectCommand(params));
    const response = new Response(s3Results.Body);
    data = await response.json();
  } catch (e) {
    console.log("Handler Event", JSON.stringify(event, undefined, "  "));
  }

  console.log('this is my data', data);

  // Check if the image already exists in the array based on its name
  const existingImageIndex = data.findIndex(image => image.Key === params.Key);

  if (existingImageIndex !== -1) {
    // If the image is a duplicate name, update the object in the array
    data[existingImageIndex] = params;
  } else {
    // Append the data for this image to the array
    data.push(params);
  }

  // Prepare the updated images.json data (JSON) to be written to the file
  const updatedJson = JSON.stringify(data);

  // Set the parameters for the PutObjectCommand
  const putParams = {
    ...params,
    Key: 'images.json',
    Body: updatedJson,
    ContentType: "application/json"
  };

  // Upload the updated images.json file back to the S3 bucket
  try {
    await s3Client.send(new PutObjectCommand(putParams));
    console.log('images.json file updated successfully');
  } catch (e) {
    console.error('Error updating images.json file:', e);
  }
};
