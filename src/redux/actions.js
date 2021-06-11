import {TABLE_RESIZE} from '@/redux/type';


// Action creator
export function tableResize(data) {
	return {
		type: TABLE_RESIZE,
		data
	}
}
