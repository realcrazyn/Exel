import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/comonents/table/table.template';
import {resizeHandler} from '@/comonents/table/table.resize';
import {isCell, nextSelector, shouldResize}
	from '@/comonents/table/table.functions';
import {matrix} from '@/comonents/table/table.functions';
import {TableSelection} from '@/comonents/table/TableSelection';
import {$} from '@core/dom';
import * as actions from '@/redux/actions';

const rowsCount = 30;

export class Table extends ExcelComponent {
	static className = 'excel__table'

	constructor($root, options) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
			...options
		})
	}
	prepare() {
		this.selection = new TableSelection()
	}

	init() {
		super.init()
		const $cell = this.$root.find('[data-id="0:0"]')
		this.selectCell($cell)
		this.$on('formula:input', text => {
			this.selection.current.text(text)
		})
		this.$on('formula:done', () => {
			this.selection.current.focus()
		})
	}

	selectCell($cell) {
		this.selection.select($cell)
		this.$emit('table:select', $cell)
	}

	toHTML() {
		return createTable(rowsCount, this.store.getState())
	}

	async resizeTable(event) {
		try {
			const data = await resizeHandler(this.$root, event)
			this.$dispatch(actions.tableResize(data))
		} catch (e) {
			console.warn('Resize error ', e.message)
		}
	}

	onMousedown(event) {
		if (shouldResize(event)) {
			this.resizeTable(event)
		} else if (isCell(event)) {
			const $target = $(event.target)
			if (event.shiftKey) {
				const $cells = matrix($target, this.selection.current)
					.map(id => this.$root.find(`[data-id="${id}"]`))
				this.selection.selectGroup($cells)
			} else {
				this.selectCell($target)
			}
		}
	}
	onKeydown(event) {
		const keys = [
			'Enter',
			'Tab',
			'ArrowLeft',
			'ArrowRight',
			'ArrowUp',
			'ArrowDown']
		const {key} = event
		if (keys.includes(key) && !event.shiftKey) {
			event.preventDefault()
			const id = this.selection.current.id(true)
			const $next = this.$root.find(nextSelector(key, id, rowsCount))
			this.selectCell($next)
		}
	}
	onInput(event) {
		this.$emit('table:input', $(event.target))
	}
}


