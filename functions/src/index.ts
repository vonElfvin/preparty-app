import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
admin.initializeApp();

const firestore = admin.firestore();


exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    return res.redirect(303, snapshot.ref.toString());
  });
});

exports.deleteOldParties = functions.firestore
  .document('party/{partyId}')
  .onCreate((snap, context) => {

  const now = Date.now();
  const cutoff = now - 60 * 60 * 24 * 1000; // deleting 1 day old parties

  const promises = [];

  return firestore.collection('party').where('created', '<=', cutoff)
    .get()
    .then(snapshot => {
      console.log('Deleting parties');
      snapshot.forEach(doc => {
        promises.push(doc.ref.delete());
      });
      return Promise.all(promises);
    }).catch(err => {
      console.log('Something went wrong when deleting parties', err);
      return false;
    })
});

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
