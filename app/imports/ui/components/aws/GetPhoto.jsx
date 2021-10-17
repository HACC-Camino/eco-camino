import React from 'react';
import AWS from 'aws-sdk';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

AWS.config.update({
    accessKeyId: 'AKIAXQXJQCACSUOOK7NL',
    secretAccessKey: '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',
});

const S3_BUCKET = 'lumi-camino-main';
const REGION = 'us-west-1';
const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
});

const GetPhoto = ({ userData }) => {
    let imageKey;
    if (userData === undefined) {
        imageKey = null;
    } else {
        imageKey = userData.photoAWSKey;
    }

    function isThereAPhoto(key) {
        if (!key) {
            return null;
        }
        const params = {
            Bucket: S3_BUCKET,
            Key: key,
        };
        return myBucket.getSignedUrl('getObject', params);
    }

    const something = isThereAPhoto(imageKey);
    if (something !== null) {
        return <Image src={something} alt=""/>;
    }
    return <Image src={'images/no_image_found.jpg'} alt=""/>;
};

GetPhoto.propTypes = {
    userData: PropTypes.object.isRequired,
};

export default GetPhoto;
