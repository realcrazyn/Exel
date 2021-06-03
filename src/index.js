import {Excel} from '@/comonents/excel/Excel';
import {Header} from '@/comonents/header/Header';
import {Toolbar} from '@/comonents/toolbar/Toolbar';
import {Formula} from '@/comonents/formula/Formula';
import {Table} from '@/comonents/table/Table';
import './scss/index.scss'


const excel = new Excel('#app', {
	components: [Header, Toolbar, Formula, Table]
})

excel.render()
