import {Excel} from '@/comonents/excel/Excel';
import {Header} from '@/comonents/header/Header';
import {Toolbar} from '@/comonents/toolbar/Toolbar';
import {Formula} from '@/comonents/formula/Formula';
import {Table} from '@/comonents/table/Table';
import './scss/index.scss'
import {createStore} from '@core/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {storage, debounce} from '@core/utils';
import {initialState} from '@/redux/initialState';

const store = createStore(rootReducer, initialState)

const stateListener = debounce(state => {
	storage('excel-state', state)
	console.log('app satate', state)
}, 300)

store.subscribe(stateListener)


const excel = new Excel('#app', {
	components: [Header, Toolbar, Formula, Table],
	store
})

excel.render()
