import {defaultStyles, defaultTitle} from '@/constants';
import {clone} from '@core/utils';

export const defaultState = {
	title: defaultTitle,
	rowState: {},
	colState: {},
	dataState: {},
	lastOpenData: new Date().toJSON(),
	stylesState: {},
	currentText: '',
	currentStyles: defaultStyles
}

const normalize = state => ({
	...state,
	currentStyles: defaultStyles,
	currentText: ''
})

export function normalizeInitialState(state) {
	return state ? normalize(state) : clone(defaultState)
}
