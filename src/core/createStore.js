
export function createStore(rootReducer, inintialState = {}) {
	let state = rootReducer({...inintialState}, {type: '__INIT__'})
	let listeners = []

	return {
		subscribe(fn) {
			listeners.push(fn)
				return {
					unsubscribe() {
						listeners = listeners.filter(l => l !== fn)
					}
			}
		},
		dispatch(action) {
				state = rootReducer(state, action)
				listeners.forEach(listener => listener(state))
		},
		getState() {
			return state
		}
	}
}
//
// class CreateStor {
// 	constructor(rootReducer, inintialState = {}) {
// 		this.rootReducer = rootReducer
// 		this.state = rootReducer({...inintialState}, {type: '__INIT__'})
// 		this.listeners = []
// 	}
// 	subscribe(fn) {
// 		this.listeners.push(fn)
// 		return {
// 			unsubscribe() {
// 				this.listeners = this.listeners.filter(l => l !== fn)
// 			}
// 		}
// 	}
// 	dispatch(action) {
// 		this.state = this.rootReducer(this.state, action)
// 		this.listeners.forEach(listener => listener(this.state))
// 	}
// 	getState()	{
// 		return this.state
// 	}
// }
//
// const stor = new CreateStor(rootReducer)
// console.log(stor.subscribe())
