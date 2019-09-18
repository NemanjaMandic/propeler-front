import moment from 'moment';

export const renderTime = date => {
	const days = moment()
		.startOf('day')
		.diff(moment(date).startOf('day'), 'days');
	if (days <= 0) {
		const hours = moment()
			.startOf('hour')
			.diff(moment(date), 'hours');
		if (hours <= 0) {
			const minutes = moment()
				.startOf('minute')
				.diff(moment(date), 'minutes');
			if (minutes <= 0) {
				return moment(date).format('LT');
			}
			return `${minutes}min ago`;
		}
		return `${hours}h ago`;
	} else if (days >= 7) {
		return moment(date).format('ll');
	}

	return `${days}d ago`;
};
