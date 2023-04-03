import {
  Firestore,
  WithFieldValue,
  DocumentData,
} from "firebase-admin/firestore";
export class firebaseService {
  db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
  }

  async GetOne<T>(collection: string, doc: string): Promise<T | undefined> {
    const getDoc = this.db.collection(collection).doc(doc);
    const document = await getDoc.get();

    if(document.exists === false) {
      return undefined
    }
    return document.data() as T;
  }

  async ListMany<T>(collection: string): Promise<T> {
    const listDocs = this.db.collection(collection);
    const documents = await listDocs.get();

    return documents as T;
  }

  async ListByQuery<T>(
    collection: string,
    key: string,
    value: string
  ): Promise<T> {
    const firestoreCollection = this.db.collection(collection);
    const listByQuery = await firestoreCollection.where(key, "==", value).get();

    return listByQuery as T;
  }

  async AddOne<T>(
    collection: string,
    doc: string,
    data: WithFieldValue<DocumentData>
  ): Promise<T> {
    const response = await this.db.collection(collection).doc(doc).set(data);

    return response as T;
  }
}
