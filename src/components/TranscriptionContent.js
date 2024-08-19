import React, { useState, useEffect } from 'react';
import { AlertCircle, Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const TranscriptionContent = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transcriptionJobName, setTranscriptionJobName] = useState(null);
  const [transcriptionStatus, setTranscriptionStatus] = useState(null);
  const [transcriptionResult, setTranscriptionResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setTranscriptionResult(null);
    }
  };

  const handleTranscription = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setError(null);
    setTranscriptionResult(null);
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('Sending transcription request to:', `${API_URL}/api/transcribe`);
      const response = await fetch(`${API_URL}/api/transcribe`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Transcription failed');
      }

      const result = await response.json();
      console.log('Transcription job started:', result.jobName);
      setTranscriptionJobName(result.jobName);
      setTranscriptionStatus('IN_PROGRESS');
    } catch (err) {
      setError('An error occurred during transcription. Please try again.');
      console.error('Transcription error:', err);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const checkTranscriptionStatus = async () => {
      if (transcriptionJobName && transcriptionStatus !== 'COMPLETED') {
        try {
          console.log('Checking transcription status for job:', transcriptionJobName);
          const response = await fetch(`${API_URL}/api/transcription/${transcriptionJobName}`);
          const data = await response.json();

          if (data.status) {
            console.log('Transcription status:', data.status);
            setTranscriptionStatus(data.status);
          } else if (data.transcript) {
            console.log('Transcription completed');
            setTranscriptionStatus('COMPLETED');
            setTranscriptionResult(data.transcript);
          }
        } catch (error) {
          console.error('Error checking transcription status:', error);
        }
      }
    };

    const intervalId = setInterval(checkTranscriptionStatus, 5000);
    return () => clearInterval(intervalId);
  }, [transcriptionJobName, transcriptionStatus]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Start New Transcription</CardTitle>
        <CardDescription>Upload your audio or video file to begin transcription</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">MP3, MP4, WAV, or MOV (MAX. 800MB)</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept=".mp3,.mp4,.wav,.mov" />
          </label>
        </div>
        {file && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Selected file: {file.name}
          </p>
        )}
        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              <p>{error}</p>
            </div>
          </div>
        )}
        {transcriptionStatus && transcriptionStatus !== 'COMPLETED' && (
          <div className="mt-4 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg">
            <p>Transcription Status: {transcriptionStatus}</p>
          </div>
        )}
        {transcriptionResult && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Transcription Result:</h3>
            <p className="text-sm whitespace-pre-wrap">{transcriptionResult}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => {
          setFile(null);
          setTranscriptionResult(null);
          setTranscriptionJobName(null);
          setTranscriptionStatus(null);
        }} disabled={uploading}>
          Clear
        </Button>
        <Button onClick={handleTranscription} disabled={!file || uploading || transcriptionStatus === 'IN_PROGRESS'}>
          {uploading ? 'Uploading...' : transcriptionStatus === 'IN_PROGRESS' ? 'Processing...' : 'Start Transcription'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TranscriptionContent;
