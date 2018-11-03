import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {UploadMetadata} from '@angular/fire/storage/interfaces';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: AngularFireStorage) { }

  // Uploads a file to Firebase storage, folder and name are optional parameters
  uploadFile(file: File, folder?: string, name?: string, metadata?: UploadMetadata): AngularFireUploadTask {
    // If no name parameter provider give the file a name based on timestamp
    if (!name) {
      name = `${new Date().getTime()}${file.name}`;
    }
    // If no foldername parameter specified, place in files, or images if image
    if (!folder) {
      if (file.type.split('/')[0] === 'image') {
        folder = 'images';
      } else {
        folder = 'files';
      }
    }
    const path = `${folder}/${name}`;
    const ref = this.storage.ref(path);
    return ref.put(file, metadata);
  }

  // Delete a file based on the downloadUrl
  deleteFromUrl(url: string): Promise<void> {
    return this.storage.storage.refFromURL(url).delete();
  }

  // Get the downloadUrl from relative path
  getFileFromRef(path: string): Observable<string> {
    return this.storage.ref(path).getDownloadURL();
  }
}
