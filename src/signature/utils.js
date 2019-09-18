/** ******************************************************************************* 
  The below is an arbitrary-base encoder which works on arbitrary alphabets of
  arbitrary bases. Somewhat arbitrarily. 
******************************************************************************** */

// Encodes the data (Uint8s) to a given base. It decides how to map block values
// to whatever constitutes the alphabet by using alphaf which is a function that
// takes a block value and returns what it maps to. Note that the output may include
// depending on the base, any number of padding bytes in the end. These are always zero.
// No provision is made to mark them. The correct way to handle this is to store the length
// of the encoded data and to then, when decoding, only operate on that many of bytes from
// the decoded value, ignoring everything else.
const encodeToBase = (arr, base, alphaf) => {
	let n = Math.log2(base);
	n = Math.ceil(n); // The number of bits one symbol encodes. Works with
	// arbitrary bases by, effectively, roudning to the next-higher power of two
	// It is up to the alphaf to solve this. The built-in coders use an escape sequence
	// mechanism.
	let r = 8; // Number of bits in currently processed byte.
	let i = 0; // which byte we are processing
	let w = arr[0]; // the current byte being processed.
	let c = 0; // the block we are extracting
	let output = ''; // output string
	while (i < arr.length) {
		let j = 0; // counter of the bit within a block that we are up to
		while (j < n) {
			if (r <= 0) {
				// loads the next byte
				i += 1;
				r = 8;
				if (i >= arr.length) w = 0;
				else w = arr[i];
			}
			// we use a mask to basically push a bit per bit into the C variable
			// technically, this limits us to bases less than 2 to the 64th power
			// This is not an issue for obvious reasons.
			/* jslint bitwise: true */
			const mask = (((w << (8 - r)) & 0xff & 0x80) >> 7) & 0x01;
			c = (c << 1) | mask;
			r -= 1;
			j += 1;
		}
		output += alphaf(c); // we map the block to an alphabet value
		c = 0;
	}
	return output.trim(); // there may be trailing whitespace.
};

// Utility function which returns a suitable alphaf function which maps blocks
// to an array whose length is equal to the base length. If the base is not a power
// of two, the block values above the length of the array are mapped to a two-letter
// sequence using the last element of the array as an escape character. Similar trick to
// UTF8, in fact.
const makeAlphacoder = arr => {
	return a => {
		if (a >= arr.length - 1) {
			a -= arr.length - 1;
			return `${arr[arr.length - 1]}${arr[a]}`;
		}
		return arr[a];
	};
};

// Decodes a string encoded to an arbitrary base by the above function to an array
// of Uint8s. It takes the string and a decoder object. The decoder object has
// the base value (decoder.base), a separator between coded values (decoder.separator)
// and an alphaf-analogue function in the 'fun' field. This function takes an alphabet
// element and returns a result object. The result object contains the field 'result'
// which contains the decoded block or null and a field called 'more' which is a boolean
// and explains whether we need to load another character to complete the decoding of one
// block or not (this allows for coding schemes with multiple alphabet-elements per block)
const decodeFromBase = (s, decoder) => {
	const { base } = decoder;
	let n = Math.log2(base);
	n = Math.ceil(n);
	const sep = decoder.separator;
	const f = decoder.fun;
	const arr = s.split(sep);
	const oa = []; // The decoding process is two-step with the output of the first step
	// being the output array, OA. OA is used to hold a sequence of block-values which
	// we then concatenate into bytes.
	let c = 0;
	let i = 0;

	for (i = 0; i < arr.length; i++) {
		c = arr[i];
		let r = f(c);
		while (r.more) {
			c += ` ${arr[++i]}`;
			r = f(c);
		}
		oa.push(r.result);
	}
	const output = [];
	let j = 0;
	let w = 0;
	let r = 8;
	i = 0;
	c = 0;
	for (i = 0; i < oa.length; i++) {
		c = oa[i];
		j = 0;
		while (j < n) {
			if (r <= 0) {
				// The current byte is full, so we push it to our output and load a blank one
				output.push(w);
				w = 0;
				r = 8;
			}
			w = (w << 1) & 0xff; // Opening up a spot for a fresh byte while maintaining 8-bitness
			w |= (c & (1 << (n - 1))) >> (n - 1); // We extract the next bit from C and paste it into the opened spot
			c = (c << 1) & ((1 << n) - 1); // we remove the bit we just concatenated from C
			j++;
			r--;
		}
	}
	if (r > 0) {
		output.push(w << (8 - r)); // It may be that we never filled up the last byte.
		// In that case we pad with zeroes and add the last byte.
	}
	return output;
};

// Utility function which makes a suitable-for-use decoder object from an array. It assumes
// that the base is the same as the length of the array and that blocks are treated as numbers
// and mapped to the array values in sequence while using the last value of the array
// as an escape value in cases where the base is not a power of two.
const makeAlphaDecoder = arr => {
	return {
		base: arr.length,
		separator: '', // Character-based encodings do not need a separator
		fun: a => {
			if (a.length == 2) {
				// We've been fed an escape+character and we decode it thus
				return {
					more: false,
					result: arr.length - 1 + arr.indexOf(a[1]),
				};
			} else if (a !== arr[arr.length - 1]) {
				return {
					more: false, // A non-expanded character
					result: arr.indexOf(a),
				};
			}
			return {
				more: true, // We got fed an escape character and need one more to decode a block
				result: null,
			};
		},
	};
};

// Utility function which returns a suitable alphaf function which maps blocks
// to an array whose length is equal to the base length.
// The elements of the array are assumed to be words. If the base is not a power
// of two, the block values above the length of the array are mapped to a two-word
// sequence using the last element of the array as an escape word. Similar trick to
// UTF8, in fact.
const makeWordcoder = arr => {
	return a => {
		if (a >= arr.length - 1) {
			a -= arr.length - 1;
			return `${arr[arr.length - 1]} ${arr[a]} `;
		}
		return `${arr[a]} `; // We use space as a separator. Note that
		// this leaves a trailing whitespace at the end. This is handled by
		// the encoder.
	};
};

// Utility function which makes a suitable-for-use decoder object from an array. It assumes
// that the base is the same as the length of the array and that blocks are treated as numbers
// and mapped to the array values in sequence while using the last value of the array
// as an escape value in cases where the base is not a power of two. Unlike the previous
// similar function, this one works with words and uses a space as a separator.
const makeWordDecoder = arr => {
	return {
		base: arr.length,
		separator: ' ',
		fun: a => {
			if (a.split(' ').length === 2) {
				return {
					more: false,
					result: arr.length - 1 + arr.indexOf(a.split(' ')[1]),
				};
			} else if (a !== arr[arr.length - 1]) {
				return {
					more: false,
					result: arr.indexOf(a),
				};
			}
			return {
				more: true,
				result: null,
			};
		},
	};
};

const bytesToString = bytes => {
	const chars = [];
	for (let i = 0, n = bytes.length; i < n; ) {
		chars.push(((bytes[i++] & 0xff) << 8) | (bytes[i++] & 0xff));
	}
	return String.fromCharCode.apply(null, chars);
};

const stringToBytes = str => {
	const bytes = [];
	for (let i = 0, n = str.length; i < n; i++) {
		const char = str.charCodeAt(i);
		bytes.push(char >>> 8, char & 0xff);
	}
	return bytes;
};

export {
	encodeToBase,
	makeAlphacoder,
	decodeFromBase,
	makeAlphaDecoder,
	makeWordcoder,
	makeWordDecoder,
	bytesToString,
	stringToBytes,
};
