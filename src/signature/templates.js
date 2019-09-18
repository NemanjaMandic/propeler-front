/**
 * The template for a JWK encoded private key. All the parts that do not change from
 * one key to another in this system.
 * @param {*} crv Curve name
 */
const template = (crv = 'P-384') => {
	return {
		crv,
		d: '',
		ext: true,
		key_ops: ['sign'],
		kty: 'EC',
		x: '',
		y: '',
	};
};

export { template };
