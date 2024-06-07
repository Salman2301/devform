type DevFormConfig = {
	app?: AppConfig;
	slides: SlideFieldConfig[];
	initialSlide?: InitialSlideConfig;
	finalSlide?: FinalSlideConfig;
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
		brandColorRGB?: string;
		fontColorRGB?: string;
		fontFamily?: string;
		fontSize?: string;
		borderRadius?: string;
	};
	animate?: {
		enable?: boolean;
		type?: 'slide' | 'fade';
	};
};

type BaseSlideConfig = {
	title?: string;
	description?: string;
	labelNext?: string;
	required?: boolean;
	validate?: () => Promise<boolean>;
};

type InitialSlideConfig = {
	show?: boolean;
} & BaseSlideConfig;

type FinalSlideConfig = {
	show?: boolean;
} & BaseSlideConfig;

type SlideFieldConfig = SlideFieldInputConfig;

type SlideFieldInputConfig = FieldInput & BaseSlideConfig;

type FieldInput =
	| FieldFormatNumber
	| FieldFormatEmail
	| FieldFormatUrl
	| FieldFormatTel
	| FieldFormatText
	| FieldFormatPassword
	| FieldFormatCustom;

type BaseFieldInput = {
	type: 'input';
	defaultValue?: string
	placeholder?: string;
	errorMessage?: string;
};

type FieldFormatNumber = {
	formatType: 'number';
	min?: number;
	max?: number;
	step?: number;
} & BaseFieldInput;

type FieldFormatEmail = {
	formatType: 'email';
} & BaseFieldInput;

type FieldFormatUrl = {
	formatType: 'url';
} & BaseFieldInput;

type FieldFormatTel = {
	formatType: 'tel';
} & BaseFieldInput;

type FieldFormatText = {
	formatType: 'text';
} & BaseFieldInput;

type FieldFormatPassword = {
	formatType: 'password';
} & BaseFieldInput;

type FieldFormatCustom = {
	formatType: 'custom';
	customFormat: ( value: string, config: SlideFieldConfig) => boolean;
} & BaseFieldInput;
