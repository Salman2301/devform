export let defaultConfig: DevFormConfig = {
	app: {
		onSubmit: [
			{
				httpPostUrl: '',
				retryFailure: 0
			}
		],
		onChanges: [
			{
				httpPostUrl: '',
				retryFailure: 0
			}
		],
		styles: {
			backgroundColor: '#fff',
			brandColor: '#007bff',
			fontColor: '#000',
			fontFamily: "'Fira Sans', sans-serif",
			fontSize: '16px',
			borderRadius: '5px'
		}
	},
	slides: [],
	initialSlide: {
		show: true,
		title: 'Form Title',
		description: 'Form description',
		label: 'Start!'
	},
	finalSlide: {
		title: 'Thank you for your submission',
		description: "That's all you can close this window now!"
	}
};
