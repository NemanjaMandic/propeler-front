// @flow

import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setStep } from '../../../../state/campaign/actions';
import {
	getShareHolderPhoto,
	reorderShareHolders,
	addShareHolder,
	uploadShareHolderPhoto,
	deleteShareHolderPhoto,
	setShareHolderPosition,
	deleteShareHolder,
	updateShareHolder,
} from '../../../../state/company/actions';
import DraggableCardList from '../partials/DraggableCardList';
import Button from '../../../common/button/Button';
import InvestorCard from '../partials/InvestorCard';
import InvestorCardForm from '../partials/InvestorCardForm';

type PropsT = {
	setShareHolderPosition: Function,
	addShareHolder: Function,
	deleteShareHolder: Function,
	updateShareHolder: Function,
	reorderShareHolders: Function,
	uploadShareHolderPhoto: Function,
	getShareHolderPhoto: Function,
	deleteShareHolderPhoto: Function,
	setStep: Function,
	shareHolders: {
		shareHolders: Array<{
			companyId: number,
			customProfileUrl: string,
			description: string,
			facebookUrl: string,
			id: number,
			investedAmount: 0,
			isAnonymous: boolean,
			linkedinUrl: string,
			location: string,
			name: string,
			orderNumber: number,
			photoUrl: string,
			twitterUrl: string,
		}>,
	},
	step: number,
	modal: boolean,
	closeModal?: Function,
	companyId: number,
	platformCurrency: any,
};

const ShareHolders = (props: PropsT) => {
	const {
		shareHolders: { shareHolders },
		setShareHolderPosition,
		addShareHolder,
		deleteShareHolder,
		updateShareHolder,
		reorderShareHolders,
		uploadShareHolderPhoto,
		getShareHolderPhoto,
		deleteShareHolderPhoto,
		setStep,
		step,
		modal,
		closeModal,
		companyId,
		platformCurrency,
	} = props;

	const saveAndContinue = () => {
		reorderShareHolders({ data: shareHolders.map(value => value.id) });
		if (!modal) {
			setStep(step + 1);
		}
		if (closeModal) {
			closeModal();
		}
	};

	const [t] = useTranslation('translations');

	return (
		<div className={`draggable-list__container ${modal ? 'edit' : ''}`}>
			<DraggableCardList
				listName={t('INVESTOR')}
				items={shareHolders}
				setPosition={setShareHolderPosition}
				addItem={() => addShareHolder({ data: { investedAmount: 0, isAnonymous: true } })}
				removeItem={shareHolderId => deleteShareHolder({ shareHolderId })}
				updateItem={(shareHolderId, data) => updateShareHolder({ shareHolderId, data })}
				getPhoto={id => getShareHolderPhoto({ id, companyId })}
				uploadPhoto={(id, data) => uploadShareHolderPhoto({ id, data })}
				deletePhoto={id => deleteShareHolderPhoto({ id })}
				anonymous
				platformCurrency={platformCurrency}
				CardComponent={InvestorCard}
				FormComponent={InvestorCardForm}
			/>
			{!modal ? (
				<div className={'cards__buttons'}>
					<span onClick={() => setStep(step - 1)}>{t('BACK')}</span>
					<span className={'skip__step'} onClick={() => setStep(step + 1)}>
						{t('SKIP_THIS_STEP')}
					</span>
					<Button
						type={'button'}
						variant={'contained'}
						color={'primary'}
						name={t('SAVE_AND_CONTINUE')}
						onClick={saveAndContinue}
					/>
				</div>
			) : (
				<div className={'cards__buttons edit draggable'}>
					<Button type={'button'} variant={'outlined'} color={'primary'} name={t('CANCEL')} onClick={closeModal} />
					<Button type={'button'} variant={'contained'} color={'primary'} name={t('SAVE')} onClick={saveAndContinue} />
				</div>
			)}
		</div>
	);
};

const mapStateToProps = ({
	company: { shareHolders },
	campaign: {
		info: { companyId },
		createCampaign: { step },
		platformSettings: {
			settings: { platformCurrency },
		},
	},
}) => ({
	shareHolders,
	companyId,
	step,
	platformCurrency,
});

export default connect(
	mapStateToProps,
	{
		setShareHolderPosition,
		addShareHolder,
		deleteShareHolder,
		updateShareHolder,
		reorderShareHolders,
		setStep,
		uploadShareHolderPhoto,
		getShareHolderPhoto,
		deleteShareHolderPhoto,
	},
)(ShareHolders);
