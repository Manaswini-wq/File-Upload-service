const { Storage } = require('@google-cloud/storage');
const path = require('path');
const config = require('../config/config');

const storage = new Storage({
  projectId: config.gcp.projectId,
  keyFilename: path.join(__dirname, '../../gcp-key.json'),
});

const uploadFile = async (file, bucketName) => {
  const bucket = storage.bucket(bucketName);
  const blob = bucket.file(file.storageName);
  const blobStream = blob.createWriteStream({
    resumable: false,
    metadata: {
      contentType: file.mimeType,
    },
  });

  return new Promise((resolve, reject) => {
    blobStream.on('error', (err) => reject(err));
    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve(publicUrl);
    });
    blobStream.end(file.data);
  });
};

const deleteFile = async (bucketName, fileName) => {
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(fileName);
  return file.delete();
};

module.exports = { uploadFile, deleteFile };
