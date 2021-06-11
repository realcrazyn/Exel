import {Excel} from '@/comonents/excel/Excel';
import {Header} from '@/comonents/header/Header';
import {Toolbar} from '@/comonents/toolbar/Toolbar';
import {Formula} from '@/comonents/formula/Formula';
import {Table} from '@/comonents/table/Table';
import './scss/index.scss'
import {createStore} from '@core/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {storage} from '@core/utils';

const store = createStore(rootReducer, storage('excel-state'))

store.subscribe(state => {
	console.log('App state ', state)
	storage('excel-state', state)
})


const excel = new Excel('#app', {
	components: [Header, Toolbar, Formula, Table],
	store
})

excel.render()
