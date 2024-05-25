import { v4 as uuidv4 } from 'uuid';
export const changeImageName = (filename: string): string => {  
  const extension = filename.split('.').pop()?.toLowerCase(); // Get the extension and convert to lowercase
  const uniqueFilename = `${uuidv4( )}.png`; 
  return uniqueFilename;
}
