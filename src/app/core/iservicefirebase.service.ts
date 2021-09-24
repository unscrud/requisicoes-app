import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ICrud } from './icrud.interface';
import { Model } from "./model";
import { plainToClass } from 'class-transformer';

export abstract class ServiceFirebase<T extends Model> implements ICrud<T>{
  ref: AngularFirestoreCollection<T>;

  constructor(
    protected type: {new():T;},
    protected firestore: AngularFirestore,
    public path: string
  ){
    this.ref = this.firestore.collection<T>(this.path);
  }

  list(): Observable<T[]> {
    return this.ref.valueChanges();
  }

  delete(id: string): Promise<void>{
    return this.ref.doc(id).delete();
  }

  createOrUpdate(item:T):Promise<any>{
    let id = item.id;
    if (!item)
      return

    let obj = null;

    if (item instanceof this.type)
      obj = item.toObject();
    else
      obj = item;

    if (id)
      return this.ref.doc(id).set(obj);
    else
      return this.ref.add(obj).then(res =>{
        obj.id = res.id;
        this.ref.doc(res.id).set(obj);
      });
  }

  get(id: string): Observable<T> {
    let doc = this.ref.doc<T>(id);
    return doc.get().pipe(map(snapshot => this.docToClass(snapshot)));
  }

  docToClass(snapshotDoc):T{
    let obj = {
      id: snapshotDoc.id,
      ...(snapshotDoc.data() as T)
    }

    let typed = plainToClass(this.type, obj);
    return typed;
  }

}

