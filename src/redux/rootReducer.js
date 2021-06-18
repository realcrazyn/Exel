import {
	CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE, APPLY_STYLE, CHANGE_TITLE, LAST_DATE
} from './type';

export function rootReducer(state, action) {
	let field
	let val
	switch (action.type) {
		case TABLE_RESIZE:
			field = action.data.type === 'col' ? 'colState' : 'rowState'
			return {...state, [field]: value(state, field, action)} // id, value
		case CHANGE_TEXT:
			field = 'dataState'
			return {...state, currentText: action.data.value,
				[field]: value(state, field, action)}
		case CHANGE_TITLE:
			return {...state, title: action.data}
		case CHANGE_STYLES:
			return {...state, currentStyles: action.data}
		case LAST_DATE:
			return {...state, lastOpenData: new Date().toJSON()}
		case APPLY_STYLE:
			field = 'stylesState'
			val = state[field] || {}
			action.data.ids.forEach(id => {
				val[id] = {...val[id], ...action.data.value}
			})
			return {
				...state, [field]: val,
				currentStyles: {...state.currentStyles, ...action.data.value}
			}

		default: return state
	}
}

function value(state, field, action) {
	const val = state[field] || {}
	val[action.data.id] = action.data.value
	return val
}
