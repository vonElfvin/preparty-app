import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryFn} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService<Item> {

  constructor(
    private afs: AngularFirestore,
  ) { }

  insert(path: string, item: Item): Promise<any> {
    return this.col(path).add(item);
  }

  upsert(path: string, id: string, data: any): Promise<void> {
    return this.doc(path, id).set(data, {merge: true});
  }

  update(path: string, id: string, item: Item): Promise<void> {
    return this.doc(path, id).update(item);
  }

  get(path: string, id: string): Observable<Item> {
    return this.doc(path, id).valueChanges();
  }

  getItems(path: string, queryFn?: QueryFn): Observable<Item[]> {
    return this.colWithIds(path, queryFn);
  }

  list(path: string, queryFn?: QueryFn): Observable<Item[]> {
    return this.colWithIds(path, queryFn);
  }

  delete(path: string, id: string): Promise<void> {
    return this.doc(path, id).delete();
  }

  doc(path: string, id: string): AngularFirestoreDocument<Item> {
    return this.afs.doc(`${path}/${id}`);
  }

  col(path: string, queryFn?: QueryFn): AngularFirestoreCollection<Item> {
    return this.afs.collection(path, queryFn);
  }

  colWithIds(path: string, queryFn?: QueryFn): Observable<Item[]> {
    return this.col(path, queryFn).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Item;
          data['id'] = a.payload.doc.id;
          return data;
        });
      })
    );
  }
}
