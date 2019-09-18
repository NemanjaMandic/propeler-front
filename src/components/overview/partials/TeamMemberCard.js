// @flow

import React, { useEffect } from 'react';
import fb from '../../../images/fb.svg';
import tw from '../../../images/tw.svg';
import yt from '../../../images/yt.svg';
import ln from '../../../images/ln.svg';
import { absoluteLink } from '../../../utilities/linkUtils';
import companyAvatarImage from '../../../images/company_avatar.svg';

type PropsT = {
	member: {
		customProfileUrl: string,
		description: string,
		facebookUrl: string,
		id: number,
		linkedinUrl: string,
		name: string,
		photoUrl: string,
		title: string,
		twitterUrl: string,
		fileDto: {
			file: string,
			type: string,
		},
	},
	campaignName: string,
	getMemberPhoto: Function,
};

const TeamMemberCard = ({ member, getMemberPhoto, campaignName }: PropsT) => {
	const { id, name, title, facebookUrl, linkedinUrl, twitterUrl, customProfileUrl, fileDto } = member;
	useEffect(() => {
		if (member.photoUrl) {
			getMemberPhoto({ campaignName, id });
		}
	}, []);

	const image = fileDto ? `data:image/jpeg;base64,${fileDto.file}` : companyAvatarImage;
	return (
		<div className="overview-campaignInfo--content-campaign-team--card">
			<img src={image} alt="Placeholder" />
			<h1>{name}</h1>
			<p>{title}</p>
			<div className="overview-campaignInfo--content-campaign-team--card_social">
				{facebookUrl && (
					<a href={absoluteLink(facebookUrl)} rel="noreferrer noopener" target="_blank">
						<img src={fb} alt="Facebook" />
					</a>
				)}
				{twitterUrl && (
					<a href={absoluteLink(twitterUrl)} rel="noreferrer noopener" target="_blank">
						<img src={tw} alt="Twitter" />
					</a>
				)}
				{customProfileUrl && (
					<a href={absoluteLink(customProfileUrl)} rel="noreferrer noopener" target="_blank">
						<img src={yt} alt="Youtube" />
					</a>
				)}
				{linkedinUrl && (
					<a href={absoluteLink(linkedinUrl)} rel="noreferrer noopener" target="_blank">
						<img src={ln} alt="LinkedIn" />
					</a>
				)}
			</div>
		</div>
	);
};

export default TeamMemberCard;
