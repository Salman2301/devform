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
			backgroundColor: 'aliceblue',
			brandColorRGB: '255, 1, 255',
			fontColorRGB: '0, 0, 0',
			fontFamily: "Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif",
			fontSize: '36px',
			borderRadius: '10rem'
		}
	},
	slides: [
		{
			type: "rate",
			title: 'Select a rating',
			required: true,
			description: 'Use keypad to select and continue',

			max: 10
		},
		{
			type: "long-text",
			title: 'Long text',
			required: true,
			placeholder: "Enter your feedback",
			description: 'Press Escape to focus on the slide, and use Enter to navigate to the next slide or Use <i>cmd / win + Enter</i> to go next',
		},
		{
			type: "select",
			options: ["Some option", "Other option", "Some other option", "This is a long text options and it will be scrollable"],
			title: 'Multiple options',
			description: 'Use keypad 1 to 4 to select multiple options and Enter to continue',
			required: true,
			multiple: true
		},
		{
			type: "select",
			options: ["Some option", "Other option", "Some other option"],
			title: 'Single options',
			description: 'Use keypad to select and continue',
			required: true
		},
		{
			type: "short-text",

			required: true,
			title: 'Form Input',
			description: '',
			formatType: "email",
			placeholder: "Enter your email",
			errorMessage: "Please enter a valid email (Custom error message)"
		}
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
