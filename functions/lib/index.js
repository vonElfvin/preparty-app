"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const firestore = admin.firestore();
exports.addMessage = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    return admin.database().ref('/messages').push({ original: original }).then((snapshot) => {
        // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
        return res.redirect(303, snapshot.ref.toString());
    });
});
exports.deleteOldParties = functions.firestore
    .document('party/{partyId}')
    .onCreate((snap, context) => {
    console.log('Deleting parties');
    const now = Date.now();
    const cutoff = now; // - 60 * 60 * 24 * 1000; // 1 day
    const promises = [];
    return firestore.collection('party').where('created', '<=', cutoff)
        .get()
        .then(snapshot => {
        snapshot.forEach(doc => {
            promises.push(doc.ref.delete());
        });
        return Promise.all(promises);
    }).catch(err => {
        console.log('Something went wrong when deleting parties', err);
        return false;
    });
});
/*exports.deleteOldParties = functions.firestore.document('party/{partyId}').onCreate((snap, context) => {
  const now = Date.now();
  const cutoff = now; // - 60 * 60 * 24 * 1000; // 1 day

  const ref = firestore.collection('party');
  const query = ref.where('created', '<=', cutoff);

  return query.get().then(snapshot => {
    const batch = firestore.batch();

    snapshot.forEach(doc => {
      batch.delete(doc.id);
    });

    return batch.commit();
  })
});*/
/*// Nihe aggregate number of questions
exports.aggregateNhieQuestions = functions.firestore
  .document('nhie-questions/{nId}')
  .onCreate(async (snap, context) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    firestore.runTransaction( (transaction: Transaction) => {

    })
    const nhieQuestion = snap.data();
    const aggRef = db.doc('aggregation/nhieQuestions');

    const aggDoc = await aggRef.get();
    const aggData = aggDoc.data();

    const next = {
      count: aggData.count + 1,
    };

    await aggRef.set(next);

    return snap.ref.set({
      number: aggData.count
    }, {merge: true});
  });*/
//# sourceMappingURL=index.js.map