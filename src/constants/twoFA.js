// @flow

export const INITIALIZE = 'INITIALIZE';
export const GENERATE_TWO_FA_URI = (secret: string) =>
	`otpauth://totp/RM:support@realmarket.io?secret=${secret}&issuer=RM&algorithm=SHA1&digits=6&period=30`;
