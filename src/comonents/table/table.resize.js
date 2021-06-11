import {$} from '@core/dom';

export function resizeHandler($root, event) {
		return new Promise(resolve => {
			const $resizer = $(event.target)
			const $parent = $resizer.closest('[data-type]')
			const cords = $parent.getCoords()
			const type = $parent.data.type
			let value
			const sideProp = type === 'col'? 'bottom' : 'right'
			$resizer.css({
				opacity: '1',
				[sideProp]: '-3000px'
			})
			document.onmousemove = e => {
				if (type === 'col') {
					const delta = e.pageX - cords.right
					value = cords.width + delta
					$resizer.css({right: -delta + 'px'})
				} else {
					const delta = e.pageY - cords.bottom
					value = cords.height + delta
					$resizer.css({bottom: -delta + 'px'})
				}
			}
			document.onmouseup = () => {
				document.onmousemove = null
				document.onmouseup = null
				if (type === 'col') {
					$parent.css({width: value + 'px'})
					$root
						.findAll(`[data-col='${$parent.data.col}']`)
						.forEach(e => e.style.width = value + 'px')
				} else {
					$parent.css({height: value + 'px'})
				}

				resolve({
					value,
					id: type === 'col' ? $parent.data.col : null
				})

				$resizer.css({bottom: '0', opacity: '0', right: '0'})
			}
		})
}
