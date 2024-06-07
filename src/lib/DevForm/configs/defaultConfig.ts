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
			backgroundColor: 'white',
			brandColorRGB: '0, 123, 255',
			fontColorRGB: '0, 0, 0',
			fontFamily: "Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif",
			fontSize: '36px',
			borderRadius: '10rem'
		}
	},
	slides: [
		{
			type: "select",
			options: ["Option 1", "Option 2", "Option 3"],
			title: 'Form Input',
			description: '',
			required: true,
			placeholder: "Enter your email",
		}
		// {
		// 	type: "short-text",

		// 	title: 'Form Input',
		// 	description: '',
		// 	formatType: "email",
		// 	placeholder: "Enter your email",
		// }
	],
	initialSlide: {
		show: true,
		title: 'Initial Slide',
		description:
			'Describe what this form about here... Navigate the form through Enter or Arrow keys to back and forth',
		labelNext: 'Start'
	},
	finalSlide: {
		title: 'Thank you for your submission',
		description: "That's all you can close this window now!",
		labelNext: 'Submit'
	}
};
