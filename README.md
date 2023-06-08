# AWS S3 and Lambda Image Uploader

### Author: Nick Mullaney

This project allows users to upload images to an AWS S3 bucket and update a dictionary of all uploaded images. The image upload triggers a Lambda function that performs the following tasks:

1. Download the "images.json" file from the S3 bucket (if it exists).
2. Create an array of image objects in the "images.json" file. If the file is not present, an empty array will be created.
3. Create metadata for the uploaded image, including its name, size, and type.
4. Append the image data to the array in the "images.json" file. If an image with the same name already exists, the object in the array will be updated instead of adding a duplicate entry.
5. Upload the updated "images.json" file back to the S3 bucket.

## Prerequisites

Before running the project, make sure you have completed the following steps:

1. Create an S3 bucket with "open" read permissions, allowing anyone to view the images/files in their browser.

## Installation

To install and configure the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/nickmullaney/image-lambda
   ```

2. Navigate to the project directory:

   ```bash
   cd aws-image-lambda
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure AWS credentials by either setting environment variables or using AWS CLI:

   - **Environment variables**: Set the following environment variables with your AWS credentials:

     - `AWS_ACCESS_KEY_ID`: Your AWS access key ID.
     - `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key.
     - `AWS_REGION`: The AWS region where your S3 bucket is located.

   - **AWS CLI**: Configure AWS CLI using the following command and provide your AWS credentials when prompted:

     ```bash
     aws configure
     ```

## Usage

To use the image uploader, follow these steps:

1. Upload an image to your S3 bucket using any desired method or AWS SDK.
2. The image upload will trigger the Lambda function automatically.
3. The Lambda function will download the "images.json" file from the S3 bucket and update it with the metadata of the uploaded image.
4. The updated "images.json" file will be uploaded back to the S3 bucket.

## Directory Structure

The project's directory structure is as follows:

```
aws-image-lambda/
├── index.mjs
├── package.json
└── README.md
```

## Configuration

No specific configuration is required for the project. However, ensure that you have provided the correct AWS credentials (either through environment variables or AWS CLI configuration) to access your S3 bucket.

## License

This project is licensed under the [MIT License](LICENSE).

---

**Note**: The above README assumes that the AWS SDK and necessary dependencies are properly installed and configured. Make sure you have fulfilled the prerequisites and set up your AWS environment before using the project.