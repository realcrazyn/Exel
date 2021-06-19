/**
 * @jest-environment jsdom
 */


import {Router} from './Router';
import {Page} from '../Page';

class DashboardPage extends Page {
	getRoot() {
		const root = document.createElement('div')
		root.innerHTML = 'dashboard'
		return root
	}
}
class ExcelPage extends Page {}

describe('Router:', () => {
	let router
	let $root

	beforeEach(() => {
		$root = document.createElement('div')
		router = new Router($root, {
			dashboard: DashboardPage,
			excel: ExcelPage
		})
	})

	test('router should be defined', () => {
		expect(router).toBeDefined()
	})

	test('router should render dashboard page', () => {
		router.changePageHandler()
		expect($root.innerHTML).toBe('<div>dashboard</div>')
	})
})
