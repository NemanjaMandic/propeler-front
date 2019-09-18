// @flow

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import fb from '../../../images/fb.svg';
import tw from '../../../images/tw.svg';
import ln from '../../../images/ln.svg';
import {
	getCompany,
	getCompanyLogo,
	getFeaturedImage,
	uploadCompanyLogo,
	uploadFeaturedImage,
	deleteCompanyLogo,
	deleteFeaturedImage,
} from '../../../state/company/actions';
import { absoluteLink } from '../../../utilities/linkUtils';
import companyAvatarImage from '../../../images/company_avatar.svg';
import companyCoverImage from '../../../images/company_cover.svg';
import UploadPhoto from '../../common/uploadPhoto/UploadPhoto';
import { ROLE_ENTREPRENEUR } from '../../../constants/roles';
import { states } from '../../../constants/campaignStates';

// hero -> company cover
// profilePhoto -> company logo

type PropsT = {
	role: string,
	campaign: {
		companyId: number,
		name: string,
	},
	company: {
		city: string,
		county: string,
		featuredImageUrl: string,
		logoUrl: string,
		name: string,
		website: string,
		linkedinUrl: string,
		facebookUrl: string,
		twitterUrl: string,
		companyCategory: any,
	},
	logo: any,
	featuredImage: any,
	getCompany: Function,
	getCompanyLogo: Function,
	getFeaturedImage: Function,
	uploadCompanyLogo: Function,
	uploadFeaturedImage: Function,
	deleteCompanyLogo: Function,
	deleteFeaturedImage: Function,
	preview: boolean,
};

const Heading = ({
	campaign: { companyId, name, state },
	role,
	company,
	logo,
	featuredImage,
	getCompany,
	getCompanyLogo,
	preview,
	getFeaturedImage,
	uploadCompanyLogo,
	uploadFeaturedImage,
	deleteCompanyLogo,
	deleteFeaturedImage,
}: PropsT) => {
	const editable = role === ROLE_ENTREPRENEUR && (state === states.INITIAL || state === states.REVIEW_READY);

	useEffect(() => {
		if (companyId) {
			getCompany(companyId);
		}
	}, [companyId]);

	useEffect(() => {
		if (company.logoUrl && !logo.fileDto.file) {
			getCompanyLogo(companyId);
		}
		if (company.featuredImageUrl && !featuredImage.fileDto.file) {
			getFeaturedImage(companyId);
		}
	}, [company.logoUrl, company.featuredImageUrl]);

	useEffect(() => {
		if (company.logoUrl) {
			getCompanyLogo(companyId);
		}
		if (company.featuredImageUrl) {
			getFeaturedImage(companyId);
		}
	}, []);

	const companyAvatar = logo.fileDto.file ? `data:image/jpeg;base64,${logo.fileDto.file}` : companyAvatarImage;
	const companyCover = featuredImage.fileDto.file
		? `data:image/jpeg;base64,${featuredImage.fileDto.file}`
		: companyCoverImage;
	const [t] = useTranslation('translations');

	return (
		<section
			className="overview-heading"
			style={!editable || preview ? { backgroundImage: `url(${companyCover})` } : {}}
		>
			{editable && !preview && (
				<div className={'overview-featuredImage'}>
					<UploadPhoto
						name={'companyFeaturedImage'}
						uploadPhoto={files => uploadFeaturedImage({ id: companyId, files })}
						deletePhoto={() => deleteFeaturedImage(companyId)}
						fileDto={featuredImage.fileDto}
						inProgress={featuredImage.inProgress}
						gradient={'rgba(0, 0, 0, 0.25)'}
						size={'lg'}
					/>
				</div>
			)}
			<div className="overview-heading-content">
				{editable && !preview ? (
					<UploadPhoto
						name={'companyLogo'}
						uploadPhoto={files => uploadCompanyLogo({ id: companyId, files })}
						deletePhoto={() => deleteCompanyLogo(companyId)}
						fileDto={logo.fileDto}
						inProgress={logo.inProgress}
					/>
				) : (
					<img src={companyAvatar} alt="Profile" className="overview-heading-content--logo" />
				)}
				<div className="overview-heading-content--title">
					<div className="overview-heading-content--title_name">
						<h1>{name}</h1>
						<button>{t('FOLLOW_CAMPAIGN')}</button>
					</div>
					<div className="overview-heading-content--title_location">
						<p>{`${company.city}, ${company.county}`}</p>
						<span>{company.companyCategory.name}</span>
					</div>
				</div>
				<div className="overview-heading-content--links">
					{company.website && (
						<a href={absoluteLink(company.website)} rel="noreferrer noopener" target="_blank">
							{company.website}
						</a>
					)}
					{company.facebookUrl && (
						<a href={absoluteLink(company.facebookUrl)} rel="noreferrer noopener" target="_blank">
							<img src={fb} alt="Facebook" />
						</a>
					)}
					{company.twitterUrl && (
						<a href={absoluteLink(company.twitterUrl)} rel="noreferrer noopener" target="_blank">
							<img src={tw} alt="Twitter" />
						</a>
					)}
					{company.linkedinUrl && (
						<a href={absoluteLink(company.linkedinUrl)} rel="noreferrer noopener" target="_blank">
							<img src={ln} alt="LinkedIn" />
						</a>
					)}
				</div>
			</div>
		</section>
	);
};

const mapStateToProps = ({
	company: { info, logo, featuredImage },
	auth: {
		authentication: { role },
	},
}) => ({
	company: info,
	role,
	logo,
	featuredImage,
});

export default connect(
	mapStateToProps,
	{
		getCompany,
		getCompanyLogo,
		getFeaturedImage,
		uploadCompanyLogo,
		uploadFeaturedImage,
		deleteCompanyLogo,
		deleteFeaturedImage,
	},
)(Heading);
