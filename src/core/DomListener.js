import {capitalise} from '@core/utils';

export class DomListener {
	constructor($root, listners = []) {
		if (!$root) {
			throw new Error('No #root provided for DomListener!')
		}
		this.$root = $root
		this.listeners = listners
	}
	initDOMListners() {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener)
			if (!this[method]) {
				const name = this.name || ''
				throw new Error(
					`Method ${method} is not implemented in ${name} Component`)
			}
			// Тоже самое что и AddEventLIstner но на root его повесить невозможно
			// потому что это не наттивный??? элемент и метода такого у него нет
			// а если в Дом создать метод on и там сделать AddEventLIstner все ок
			this[method] = this[method].bind(this)
			this.$root.on(listener, this[method])
		})
	}
	removeDOMListners() {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener)
			this.$root.on(listener, this[method])
		})
	}
}
// inpit => onInput
function getMethodName(eventName) {
	return 'on' + capitalise(eventName)
}

