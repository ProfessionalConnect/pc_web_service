import AWS from 'aws-sdk'
import moment from 'moment-timezone';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_ACCESS_KEY
})

const myBucket = new AWS.S3({
  params: { Bucket: process.env.REACT_APP_BUCKET_NAME },
  region: process.env.REACT_APP_REGION,
})

export const uploadFile = (file) => {
  return new Promise((resolve, reject) => {
    var timestamp = moment().valueOf().toString();
    var filename = `${timestamp}_${file.name}`
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: filename
    };

    myBucket.putObject(params)
      .send((err) => {
        if (err) {
          reject(err)
        } else {
          resolve(process.env.REACT_APP_S3_URL + filename)
        }
      })
  })
}
