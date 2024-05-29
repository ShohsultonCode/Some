import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class ImageService {
  async deleteImage(imageName: string): Promise<void> {
    if (imageName === 'profile.jpg') {
      // console.log(`Skipping deletion of '${imageName}'.`);

      return;
    }

    const imagePath = `./uploads/${imageName}`;
    try {
      const fileExists: boolean = await fs.promises.access(imagePath, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false);

      if (fileExists) {
        await fs.promises.unlink(imagePath);
        // console.log('File deleted successfully');
      } else {
        // console.log(`File '${imageName}' not found. Unable to delete.`);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }
}
