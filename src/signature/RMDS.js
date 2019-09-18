/**
 * RMDS - Real Market Digital Signature implementation
 * Based on In-Browser Crypto Prototype:
 * https://bitbucket.org/realmarket/digital-signature-prototype/src/develop/
 */
import { base64DecToArr, base64EncArr } from './b64';
import { encodeToBase, makeWordcoder, stringToBytes, bytesToString } from './utils';
import baselist from './baseList';

/**
 * Uses the normal cryptographic method to generate random n-bytes
 * then uses the base-encoder to create a passphrase.
 * @param {*} normalCrypt Crypto
 * @param {*} n Number of bytes
 */
const genRandomPassphrase = (normalCrypt, n) => {
	const ua = new Uint8Array(n);
	normalCrypt.getRandomValues(ua);
	const coder = makeWordcoder(baselist);
	return encodeToBase(ua, baselist.length, coder);
};

/**
 * Extracts bytes from the raw text representation (this is low-entropy since a
 * letter of english text has only about 1.2 bits of entropy) and derives an
 * AES-GCM 256-bit key using the PBKDF2 algorithm based on 10 000 SHA-256 iterations
 * and the supplied salt.
 * @param {*} c
 * @param {*} pass
 * @param {*} salt
 * @param {*} iterations
 */
const deriveKeyFromPass = async (c, pass, salt, iterations = 10000) => {
	const enc = new TextEncoder();
	const k = await c.importKey('raw', enc.encode(pass), { name: 'PBKDF2' }, false, ['deriveBits', 'deriveKey']);
	const aesk = await c.deriveKey(
		{
			name: 'PBKDF2',
			salt,
			iterations,
			hash: 'SHA-256',
		},
		k,
		{ name: 'AES-GCM', length: 256 },
		true,
		['encrypt', 'decrypt'],
	);
	return aesk;
};

/**
 * Encrypts the given private key using the secret key provided an a self-generated IV
 * that's a random 96 bits in accordance with NIST recommendations. Note that it returns
 * both the ciphertext and the IV since you need both.
 * @param {*} c
 * @param {*} normalCrypt
 * @param {*} key
 * @param {*} priv
 */
const encryptKey = async (c, normalCrypt, key, priv) => {
	const iv = new Uint8Array(12); // NIST AES 8.2.2
	normalCrypt.getRandomValues(iv);
	const encoder = new TextEncoder();
	const plaintext = encoder.encode(JSON.stringify(priv));
	const enc = await c.encrypt(
		{
			name: 'AES-GCM',
			iv,
		},
		key,
		plaintext,
	);
	return {
		ciphertext: new Uint8Array(enc),
		iv,
	};
};

/**
 * Decrypts the private key encoded in the previous.
 * @param {*} c
 * @param {*} key
 * @param {*} ciphertext
 * @param {*} iv
 */
const decryptKey = async (c, key, ciphertext, iv) => {
	const res = await c.decrypt(
		{
			name: 'AES-GCM',
			iv,
		},
		key,
		ciphertext,
	);
	const decoder = new TextDecoder();
	const plaintext = decoder.decode(res);
	return JSON.parse(plaintext);
};

/**
 * Generates a fresdh keypair for signing and verifying signatures.
 * @param {SubtleCrypto} c Instance of SubtleCrypto
 * @param {String} namedCurve Curve to be used. Default value is P-384
 */
const genKey = (c, namedCurve = 'P-384') => {
	const keyPair = c.generateKey(
		{
			name: 'ECDSA',
			namedCurve,
		},
		true,
		['sign', 'verify'],
	);
	return keyPair;
};

/**
 * Extracts the public key of a keypair and exports it as a JSON
 * string in the jwk format.
 * @param {SubtleCrypto} c Instance of SubtleCrypto
 * @param {*} kp Keypair to use
 */
const exportPublic = async (c, kp) => {
	const exported = await c.exportKey('jwk', kp.publicKey);
	return JSON.stringify(exported, null, ' ');
};

/**
 * Extracts the private key of a keypair and exports it as a JSON
 * string in the jwk format.
 * @param {SubtleCrypto} c Instance of SubtleCrypto
 * @param {*} kp Keypair to use
 */
const exportPrivate = async (c, kp) => {
	const exported = await c.exportKey('jwk', kp.privateKey);
	return JSON.stringify(exported, null, ' ');
};

/**
 * Takes a SubtleCrypto instance and a public and private key in the form of
 * JWK objects. Returns a keypair consisting of those two keys imported into the
 * SubtleCrypto form.
 * @param {SubtleCrypto} c Instance of SubtleCrypto
 * @param {*} pub Public key
 * @param {*} priv Private key
 */
const jwksToKeypair = async (c, pub, priv) => {
	try {
		const pubkey = await c.importKey(
			'jwk',
			pub,
			{
				name: 'ECDSA',
				namedCurve: 'P-384',
			},
			true,
			['verify'],
		);
		const privkey = await c.importKey(
			'jwk',
			priv,
			{
				name: 'ECDSA',
				namedCurve: 'P-384',
			},
			true,
			['sign'],
		);

		return {
			privateKey: privkey,
			publicKey: pubkey,
		};
	} catch (e) {
		console.log(e.message);
	}
	return null;
};

/**
 * Uses SHA-384 to compute a message digest (that's what we have)
 * and ECDSA to sign it.
 * @param {SubtleCrypto} c Instance of SubtleCrypto
 * @param {String} msg Message
 * @param {*} key Private key
 */
const signMessage = async (c, msg, key) => {
	const enc = new TextEncoder();
	const encoded = enc.encode(msg);
	const signature = await c.sign(
		{
			name: 'ECDSA',
			hash: { name: 'SHA-384' },
		},
		key,
		encoded,
	);
	return signature;
};

/**
 * Verifies the signature of the message.
 * @param {SubtleCrypto} c Instance of SubtleCrypto
 * @param {String} msg Message
 * @param {*} key Public key
 * @param {*} signature Signature as an array of bytes
 */
const verifyMessage = async (c, msg, key, signature) => {
	const enc = new TextEncoder();
	const encoded = enc.encode(msg);
	const result = await c.verify(
		{
			name: 'ECDSA',
			hash: { name: 'SHA-384' },
		},
		key,
		signature,
		encoded,
	);
	return result;
};

const getKPPayload = async passphrase => {
	const c = window.crypto.subtle;
	const kp = await genKey(c);
	const pub = JSON.parse(await exportPublic(c, kp));
	const priv = JSON.parse(await exportPrivate(c, kp));
	const salt = new Uint8Array(32);
	window.crypto.getRandomValues(salt);
	const aes = await deriveKeyFromPass(c, passphrase, salt);
	const cyp = await encryptKey(c, window.crypto, aes, priv);
	return base64EncPayload(pub, cyp.ciphertext, cyp.iv, salt, 6);
};

/**
 * Returns payload to be sent to server.
 * @param {*} pub
 * @param {*} privEnc
 * @param {*} iv
 * @param {*} salt
 * @param {*} passLength
 */
const base64EncPayload = (pub, privEnc, iv, salt, passLength) => {
	const encoder = new TextEncoder();
	return {
		publicKey: base64EncArr(encoder.encode(JSON.stringify(pub))),
		encryptedPrivateKey: base64EncArr(privEnc),
		initialVector: base64EncArr(iv),
		salt: base64EncArr(salt),
		passLength,
	};
};

/**
 * @param {*} payload
 */
const base64DecPayload = payload => {
	const d = new TextDecoder();
	const publicKey = JSON.parse(d.decode(base64DecToArr(payload.publicKey)));
	const initialVector = base64DecToArr(payload.initialVector);
	const salt = base64DecToArr(payload.salt);
	const passLength = payload.salt;
	return {
		publicKey,
		encryptedPrivateKey: payload.encryptedPrivateKey ? base64DecToArr(payload.encryptedPrivateKey) : undefined,
		initialVector,
		salt,
		passLength,
	};
};

const sign = async (doc, passphrase, kpBody) => {
	const c = window.crypto.subtle;
	const fileBase64 = doc.content;
	const encoder = new TextEncoder();
	const fileEncoded = encoder.encode(fileBase64);
	const hashBuffer = await c.digest('SHA-384', fileEncoded);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
	const kp = base64DecPayload(kpBody);
	const { publicKey, salt, initialVector } = kp;
	let aes = await deriveKeyFromPass(c, passphrase, salt);
	const key = await decryptKey(c, aes, kp.encryptedPrivateKey, initialVector);
	let toKeyPair = await jwksToKeypair(c, publicKey, key);
	// TODO: normalize proof
	const document = {
		fileURL: doc.fileURL,
		hash: {
			value: hashHex,
			name: 'SHA-384',
		},
	};
	const signed = await signMessage(c, base64EncArr(encoder.encode(JSON.stringify(document))), toKeyPair.privateKey);
	const controller = {
		type: 'ECDSA',
		id: 'https://propeler.com/api/digitalSignatures/1/1',
		controller: 'https://propeler.com/api/digitalSignatures/1',
		publicKeyBase64: base64EncArr(encoder.encode(JSON.stringify(publicKey))),
	};
	const signature = {
		type: 'ECDSA',
		signatureValue: base64EncArr(new Uint8Array(signed)),
	};
	aes = null;
	toKeyPair = null;
	return {
		controller,
		document,
		signature,
	};
};

const verify = async (c, doc, signedDocument, key) => {
	const { signature } = signedDocument;
	const fileBase64 = doc.content;
	const encoder = new TextEncoder();
	const fileEncoded = encoder.encode(fileBase64);
	const hashBuffer = await c.digest('SHA-384', fileEncoded);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
	const document = {
		fileURL: doc.fileURL,
		hash: {
			value: hashHex,
			name: 'SHA-384',
		},
	};
	const signatureDec = base64DecToArr(signature);
	const res = await verifyMessage(c, JSON.stringify(base64EncArr(document)), key, signatureDec);
	return res;
};

const signJSON = async (document, passphrase, kpBody) => {
	const encoder = new TextEncoder();
	const c = window.crypto.subtle;
	const kp = base64DecPayload(kpBody);
	const { publicKey, salt, initialVector } = kp;
	let aes = await deriveKeyFromPass(c, passphrase, salt);
	const key = await decryptKey(c, aes, kp.encryptedPrivateKey, initialVector);
	let toKeyPair = await jwksToKeypair(c, publicKey, key);
	// TODO: normalize document
	const signed = await signMessage(c, base64EncArr(encoder.encode(JSON.stringify(document))), toKeyPair.privateKey);
	const controller = {
		type: 'ECDSA',
		id: 'https://propeler.com/api/digitalSignatures/1/1',
		controller: 'https://propeler.com/api/digitalSignatures/1',
		publicKeyBase64: base64EncArr(encoder.encode(JSON.stringify(publicKey))),
	};
	const signature = {
		type: 'ECDSA',
		signatureValue: base64EncArr(new Uint8Array(signed)),
	};
	aes = null;
	toKeyPair = null;
	return {
		controller,
		document,
		signature,
	};
};

export {
	genKey,
	genRandomPassphrase,
	deriveKeyFromPass,
	encryptKey,
	decryptKey,
	jwksToKeypair,
	signMessage,
	verifyMessage,
	base64EncArr,
	base64DecToArr,
	exportPublic,
	exportPrivate,
	base64EncPayload,
	base64DecPayload,
	getKPPayload,
	stringToBytes,
	bytesToString,
	sign,
	verify,
};
