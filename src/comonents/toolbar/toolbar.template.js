function toButton(button) {
	const json = JSON.stringify(button.value)
	const meta = `data-type="button"
				  data-value='${json}'`
	return `
	<div class="button ${button.active ? 'active' : ''}"
	${meta}>
		<i class="material-icons"
		${meta}
		>${button.icon}</i>
	</div>
	`
}


export function createToolbar(s) {
	const buttons = [
		{
			value: {textAlign: 'left'},
			icon: 'format_align_left',
			active: s['textAlign'] === 'left'
		},
		{
			value: {textAlign: 'center'},
			icon: 'format_align_center',
			active: s['textAlign'] === 'center'
		},
		{
			value: {textAlign: 'right'},
			icon: 'format_align_right',
			active: s['textAlign'] === 'right'
		},
		{
			icon: 'format_bold',
			active: s['fontWeight'] === 'bold',
			value: {fontWeight: s['fontWeight'] === 'bold'? 'normal' : 'bold'}
		},
		{
			value: {textDecoration: s['textDecoration'] === 'underline' ?
					'none' : 'underline'},
			icon: 'format_underline',
			active: s['textDecoration'] === 'underline'
		},
		{
			value: {fontStyle: s['fontStyle'] === 'italic' ? 'normal' : 'italic'},
			icon: 'format_italic',
			active: s['fontStyle'] === 'italic'
		}
]

	return buttons.map(toButton).join('')
}

