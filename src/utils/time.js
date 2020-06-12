import moment from 'moment'

export function timeFix() {
	const time = new Date()
	const hour = time.getHours()
	return hour < 9
		? 'Good morning'
		: hour <= 11
		? 'Good morning'
		: hour <= 13
		? 'Good noon'
		: hour < 20
		? 'Good afternoon'
		: 'Good night'
}

export function getCurrent(key) {
	const current = moment()
	return [
		current[key](current[key]()).startOf(key),
		current[key](current[key]()).endOf(key)
	]
}
