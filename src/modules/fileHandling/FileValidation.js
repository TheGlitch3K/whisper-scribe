export const isValidFile = (file) => {
  const validTypes = ['audio/mpeg', 'video/mp4', 'audio/wav', 'video/quicktime'];
  const maxSize = 800 * 1024 * 1024; // 800MB
  return validTypes.includes(file.type) && file.size <= maxSize;
};
