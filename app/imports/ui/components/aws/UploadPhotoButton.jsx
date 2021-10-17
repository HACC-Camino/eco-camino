import React, { useState } from 'react';
import AWS from 'aws-sdk';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Container, Form, FormGroup, FormLabel, InputGroup, ProgressBar } from 'react-bootstrap';

const BUCKET_NAME = 'eco-camino-main';
const REGION_NAME = 'us-west-1';

AWS.config.update({
   accessKeyId: 'AKIAXQXJQCACSUOOK7NL',
   secretAccessKey: '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',
});

const my_s3_bucket = new AWS.S3({
   params: { Bucket: BUCKET_NAME },
   region: REGION_NAME,
});

const UploadPhotoButton = ({ parentCallback2 }) => {
   const [selectedFile, setSelectedFile] = useState(null);
   const [progress, setProgress] = useState(0);

   const handleFileInput = (e) => {
      setSelectedFile(e.target.files[0]);
   };

   const uploadFile = (file) => {

      const makeId = (length) => {
         let result = '';
         const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
         const charactersLength = characters.length;
         for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
         }
         return result;
      };

      const filetype = file.name.split('.')[1];
      let filename = makeId(25);
      filename = `${filename}.${filetype}`;

      const params = {
         Bucket: BUCKET_NAME,
         Key: filename,
         Body: file,
         ACL: 'public-read',
      };

      my_s3_bucket.putObject(params).on('httpUploadProgress', (evt) => {
         setProgress(Math.round((evt.loaded / evt.total) * 100));
      }).send((err) => {
         // eslint-disable-next-line no-console
         if (err) console.log(err);
         // console.log(file.name);
         // console.log(file);
         // console.log(makeId(25));
      });

      parentCallback2(filename);
   };

   function validateImage(file) {
      const filename = file.name;
      const idxDot = filename.lastIndexOf('.') + 1;
      const extension = filename.substr(idxDot, filename.length).toLowerCase();
      if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
         uploadFile(file);
      } else {
         // eslint-disable-next-line no-console
         console.log('Only jpg/jpeg and png files are allowed');
      }
   }

   return (
      <Container>
         <FormGroup>
            <FormLabel>Upload image</FormLabel>
            <InputGroup className='mb-3'>
               <Form.Control size='md' type='file' onChange={handleFileInput}/>
               <Button size='md' onClick={() => validateImage(selectedFile)}> Upload </Button>
            </InputGroup>
            <ProgressBar animated now={progress}/>
         </FormGroup>
      </Container>
   );
};

UploadPhotoButton.propTypes = {
   parentCallback2: PropTypes.func.isRequired,
};

export default UploadPhotoButton;
