// @flow

import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import investorAvatar from '../../../images/team-investor_avatar.svg';
import anonymousAvatar from '../../../images/anonymous_avatar.svg';
import { countries } from '../../../constants/countries';
import { openUserPreviewDialog } from '../../../state/modals/actions';

const formatUser = (person, country, image) => ({
	firstName: person.name,
	shortBiography: person.description,
	countryOfResidence: country,
	photo: image && image.file,
	...person,
});

const InvestorCard = (props: {
	person: {
		photoUrl: string,
		name: string,
		investedAmount: number,
		description: string,
		facebookUrl: string,
		twitterUrl: string,
		linkedinUrl: string,
		isCompany: boolean,
		companyIdentificationNumber?: string,
		customProfileUrl: string,
		location: string,
		fileDto: {
			file: string,
			type: string,
		},
		company: boolean,
		companyNumber?: string,
	},
	getShareHolderPhoto: Function,
	openUserPreviewDialog: Function,
	preview: boolean,
	platformCurrency?: any,
}) => {
	const { person, preview, getShareHolderPhoto, openUserPreviewDialog, platformCurrency } = props;
	const { photoUrl, fileDto, investedAmount, name, location } = person;
	const country = countries.find(c => c.value === location);
	const { symbol } = platformCurrency;

	useEffect(() => {
		if (photoUrl) {
			getShareHolderPhoto();
		}
	}, [photoUrl]);

	const imageUrl = !name ? anonymousAvatar : fileDto ? `data:image/jpeg;base64,${fileDto.file}` : investorAvatar;
	return (
		<Fragment>
			<div className="overview-campaignInfo--content-investors--card">
				<img
					src={imageUrl}
					style={{
						width: 120,
						height: 120,
						backgroundColor: 'rgba(241, 241, 241, 0.8)',
					}}
					alt=""
				/>
				<div className="overview-campaignInfo--content-investors--card_description">
					<h1>{name || 'Anonymous'}</h1>
					<p>
						{investedAmount} {symbol}
					</p>
					<span>{country ? country.label : location}</span>
					{!preview && name && (
						<span
							onClick={() => openUserPreviewDialog(formatUser(person, country ? country.label : location, fileDto))}
							className="overview-campaignInfo--content-investors--card_description_link"
						>
							See full profile
						</span>
					)}
				</div>
			</div>
		</Fragment>
	);
};

export default connect(
	null,
	{ openUserPreviewDialog },
)(InvestorCard);
