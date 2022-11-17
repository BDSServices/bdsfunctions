const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

exports.addMessage = functions.https.onRequest(async (req, res) => {
	const docid = Date.now().toString();
	const result = await admin.firestore().collection('messages').doc(docid).set({msg: req.query.msg});
	res.json({result: `Message with ID: ${docid} added.`});
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.userSignup = functions.auth.user().onCreate(async user => {
	await admin.firestore().collection('messages').doc(Date.now().toString()).set({msg: `User Created: ${user.email}`});
	return await admin.firestore().collection(user.email).doc('profile.prf').set({
		filename: "profile.prf",
		filetype: "prf",
		timestamp: Date.now(),
		Subscriptions: [{ Subscribed: Date.now(), Maxtitles: 10 }]		
	});
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.userRemove = functions.auth.user().onDelete(async user => {
	await admin.firestore().collection('messages').doc(Date.now().toString()).set({msg: `User Deleted: ${user.email}`});
	return await admin.firestore().collection(user.email).doc('profile.prf').delete();
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.addSubscription = functions.https.onRequest(async (req, res) => {
	try {
		await admin.firestore().collection(req.query.email).doc('profile.prf').update({
			filename: "profile.prf",
			filetype: "prf",
			timestamp: Date.now(),
			Subscriptions: admin.firestore.FieldValue.arrayUnion({ Subscribed: Date.now(), Maxtitles: req.query.maxtitles })		
		});
		await admin.firestore().collection('messages').doc(Date.now().toString()).set({msg: `Subscription Updated: ${req.query.email}`});
	}
	catch(e) {
		await admin.firestore().collection('messages').doc(Date.now().toString()).set({msg: `Error Updating Subscription: ${req.query.email}/${req.query.maxtitles}`});
	}

	res.json({email:req.query.email, maxtitles:req.query.maxtitles});
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////
