import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/comonents/table/table.template';
import {resize} from '@/comonents/table/resize';

export class Table extends ExcelComponent {
	static className = 'excel__table'

	constructor($root) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown']
		})
	}

	toHTML() {
		return createTable(30)
	}
	onMousedown(event) {
		resize(event, this.$root)
	}
}

