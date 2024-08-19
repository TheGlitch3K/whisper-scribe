require('dotenv').config();
const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const path = require('path');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

const upload = multer({ dest: 'uploads/' });

console.log('AWS Configuration:');
console.log('Region:', process.env.AWS_REGION);
console.log('S3 Bucket:', process.env.S3_BUCKET_NAME);

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const transcribeService = new AWS.TranscribeService();
const s3 = new AWS.S3();

app.use(express.static(path.join(__dirname, '../build')));

app.post('/api/transcribe', upload.single('file'), async (req, res) => {
  console.log('Received transcription request');
  if (!req.file) {
    console.log('No file uploaded');
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    console.log('Uploading file to S3');
    const fileContent = await require('fs').promises.readFile(req.file.path);
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `uploads/${Date.now()}-${req.file.originalname}`,
      Body: fileContent
    };
    console.log('S3 upload params:', JSON.stringify(params, null, 2));
    const s3UploadResult = await s3.upload(params).promise();
    console.log('File uploaded to S3:', s3UploadResult.Location);

    console.log('Starting transcription job');
    const transcriptionParams = {
      TranscriptionJobName: `Transcription-${Date.now()}`,
      LanguageCode: 'en-US',
      MediaFormat: path.extname(req.file.originalname).slice(1),
      Media: {
        MediaFileUri: s3UploadResult.Location
      },
      OutputBucketName: process.env.S3_BUCKET_NAME
    };
    console.log('Transcription params:', JSON.stringify(transcriptionParams, null, 2));

    const transcriptionJob = await transcribeService.startTranscriptionJob(transcriptionParams).promise();
    console.log('Transcription job started:', transcriptionJob.TranscriptionJob.TranscriptionJobName);
    res.json({ jobName: transcriptionJob.TranscriptionJob.TranscriptionJobName });
  } catch (error) {
    console.error('Error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: 'Transcription failed', details: error.message, stack: error.stack });
  }
});

app.get('/api/transcription/:jobName', async (req, res) => {
  console.log('Received transcription status request for job:', req.params.jobName);
  try {
    const params = {
      TranscriptionJobName: req.params.jobName
    };

    const data = await transcribeService.getTranscriptionJob(params).promise();
    console.log('Transcription job status:', data.TranscriptionJob.TranscriptionJobStatus);
    if (data.TranscriptionJob.TranscriptionJobStatus === 'COMPLETED') {
      const transcriptFileUri = data.TranscriptionJob.Transcript.TranscriptFileUri;
      const transcriptResponse = await fetch(transcriptFileUri);
      const transcriptData = await transcriptResponse.json();
      res.json({ transcript: transcriptData.results.transcripts[0].transcript });
    } else {
      res.json({ status: data.TranscriptionJob.TranscriptionJobStatus });
    }
  } catch (error) {
    console.error('Error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: 'Failed to get transcription job', details: error.message, stack: error.stack });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});
