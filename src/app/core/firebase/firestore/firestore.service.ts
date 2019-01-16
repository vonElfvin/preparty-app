import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryFn} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

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

  update(path: string, id: string, item): Promise<void> {
    return this.doc(path, id).update(item);
  }

  get(path: string, id: string): Observable<Item> {
    return this.doc(path, id).valueChanges().pipe(
      map(item => {
        item['id'] = id;
        return item;
      })
    );
  }

  list(path: string, queryFn?: QueryFn): Observable<Item[]> {
    return this.colWithIds(path, queryFn);
  }

  check(path: string, key: string, value: any): Promise<boolean> {
    if (!value) {
      throw new Error('No value provided.');
    }
    return this.col(path, ref => ref.where(key, '==', value)).snapshotChanges().pipe(
      take(1),
      map(items => items.length > 0)
    ).toPromise();
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
        return actions.map(action => {
          const item = action.payload.doc.data() as Item;
          item['id'] = action.payload.doc.id;
          return item;
        });
      })
    );
  }
}
