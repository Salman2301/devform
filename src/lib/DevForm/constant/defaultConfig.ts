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
			backgroundColor: 'black',
			brandColorRGB: '255, 123, 255',
			fontColorRGB: '255, 255, 255',
			fontFamily: "Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif",
			fontSize: '36px',
			borderRadius: '10rem'
		}
	},
	slides: [],
	initialSlide: {
		show: true,
		title: 'Form Title',
		description: 'Form description',
		labelNext: 'Start'
	},
	finalSlide: {
		title: 'Thank you for your submission',
		description: "That's all you can close this window now!",
		labelNext: 'Submit'
	}
};
