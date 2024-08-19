// Simulated transcription service
export const transcribeFile = async (file, onProgress) => {
  // Simulate file upload
  for (let i = 0; i <= 100; i += 10) {
    await new Promise(resolve => setTimeout(resolve, 500));
    onProgress(i);
  }

  // Simulate transcription process
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Return simulated transcription result
  return `This is a simulated transcription of the file "${file.name}".\n\n` +
         `In a real application, this would be the actual transcribed text from the audio or video file.\n\n` +
         `File details:\n` +
         `- Name: ${file.name}\n` +
         `- Size: ${(file.size / 1024 / 1024).toFixed(2)} MB\n` +
         `- Type: ${file.type}`;
};
