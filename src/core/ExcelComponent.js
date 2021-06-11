import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
	constructor($root, options = {}) {
		super($root, options.listeners)
		this.name = options.name || ''
		this.emitter = options.emitter
		this.store = options.store
		this.unsubscribers = []
		this.storeSub = null

		this.prepare()
	}
	// Настравивает компонент до Init()
	prepare() {}
	//	Возвращает шаблон компонента
	toHTML() {
		return ''
	}
	// уведомляем слушателей события event
	$emit(event, ...args) {
		this.emitter.emit(event, ...args)
	}
	// подписываемся на события event
	$on(event, fn) {
		const unsub = this.emitter.subscribe(event, fn)
		this.unsubscribers.push(unsub)
	}
	// Инициализируем компонент добавляем ДОМ слушателей
	init() {
		this.initDOMListners()
	}
	$dispatch(action) {
		this.store.dispatch(action)
	}

	$subscribe(fn) {
		this.storeSub = this.store.subscribe(fn)
	}
	// Удаляем компонент чистим слушателей
	destroy() {
		this.removeDOMListners()
		this.unsubscribers.forEach(unsub => unsub())
		this.storeSub.unsubscribe()
	}
}
