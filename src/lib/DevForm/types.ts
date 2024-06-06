type DevFormConfig = {
	app?: AppConfig;
	slides: SlideConfig[];
	initialSlide?: InitialSlideConfig;
	finalSlide?: FinalSlideConfig;
};

type SlideConfig = {
	title: string;
	description: string;
	fields?: FieldConfig[];
	labelNext?: string;
};

type FieldConfig = {
	name: string;
	type: string;
	label: string;
	placeholder: string;
	required: boolean;
	options?: any;
};

type InitialSlideConfig = {
	show?: boolean;
	title?: string;
	description?: string;
	label?: string;
};

type FinalSlideConfig = {
	show?: boolean;
	title: string;
	description: string;
};

type Layout = {
	type: 'full' | 'half';
};

type PostRequest = {
	httpPostUrl: string;
	method?: 'get' | 'post' | 'put' | 'delete';
	retryFailure?: number;
};

type AppConfig = {
	onSubmit: PostRequest[];
	onChanges?: PostRequest[];
	modifyTabTitle?: boolean;
	styles?: {
		backgroundColor?: string;
		logo?: string;
		brandColor?: string;
		fontColor?: string;
		fontFamily?: string;
		fontSize?: string;
		borderRadius?: string;
	};
	animate?: {
		enable?: boolean;
		type?: 'slide' | 'fade';
	};
};
