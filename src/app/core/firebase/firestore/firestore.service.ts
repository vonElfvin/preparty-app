import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/firestore';
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

  update(path: string, id: string, item: Item) {
    return this.doc(path, id).update(item);
  }

  get(path: string, id: string) {
    return this.doc(path, id).valueChanges();
  }

  list(path: string, queryFn?: QueryFn): Observable<Item[]> {
    return this.colWithIds(path, queryFn);
  }

  delete(path: string, id: string) {
    return this.doc(path, id).delete();
  }

  doc(path: string, id: string) {
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
