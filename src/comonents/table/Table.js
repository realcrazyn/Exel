import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/comonents/table/table.template';
import {resizeHandler} from '@/comonents/table/table.resize';
import {shouldResize} from '@/comonents/table/table.functions';

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
		if (shouldResize(event)) {
			resizeHandler(this.$root, event)
		}
	}
}

