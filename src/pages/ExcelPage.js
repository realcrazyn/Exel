import {Page} from '@core/Page';
import {createStore} from '@core/store/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {normalizeInitialState} from '@/redux/initialState';
import {debounce, storage} from '@core/utils';
import {Header} from '@/comonents/header/Header';
import {Toolbar} from '@/comonents/toolbar/Toolbar';
import {Formula} from '@/comonents/formula/Formula';
import {Table} from '@/comonents/table/Table';
import {Excel} from '@/comonents/excel/Excel';

function storageName(param) {
	return `excel:` + param
}

export class ExcelPage extends Page {
	getRoot() {
		const params = this.params ? this.params : Date.now().toString()
		const state = storage(storageName(params))
		const inicialState = normalizeInitialState(state)
		const store = createStore(rootReducer, inicialState)
		const stateListener = debounce(state => {
			storage(storageName(params), state)
		}, 300)

		store.subscribe(stateListener)


		this.excel = new Excel( {
			components: [Header, Toolbar, Formula, Table],
			store
		})

		return this.excel.getRoot()
	}

	afterRender() {
		this.excel.init()
	}

	destroy() {
		this.excel.destroy()
	}
}
