import {range} from '@core/utils';

export function shouldResize(event) {
	return event.target.dataset.resize
}

export function isCell(event) {
	return event.target.dataset.id
}

export function matrix($target, $current) {
	const target = $target.id(true)
	const current = $current.id(true)
	const cols = range(current.col, target.col)
	const rows = range(current.row, target.row)
	return cols.reduce((acc, col) => {
		rows.forEach(row => acc.push(`${row}:${col}`))
		return acc
	}, [])
}

export function nextSelector(key, {col, row}, rowsCount = 20, colsCount = 25) {
	const MIN_VALUE = 0
	const MAX_VALUE = rowsCount - 1
	switch (key) {
		case 'Enter':
		case 'ArrowDown':
			row === MAX_VALUE ? row : row++
			break
		case 'Tab':
		case 'ArrowRight':
			col === colsCount ? col : col++
			break
		case 'ArrowLeft':
			col === MIN_VALUE ? col : col--
			break
		case 'ArrowUp':
			row === MIN_VALUE ? row : row--
			break
	}

	return `[data-id="${row}:${col}"]`
}
