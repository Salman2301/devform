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
	errorMessage?: string;
};

type InitialSlideConfig = {
	show?: boolean;
} & BaseSlideConfig;

type FinalSlideConfig = {
	show?: boolean;
} & BaseSlideConfig;

type SlideFieldConfig = SlideFieldShortTextConfig | SlideFieldSelectConfig | SlideFieldLongTextConfig | SlideFieldRateConfig;

type SlideFieldShortTextConfig = FieldShortText & BaseSlideConfig;

type SlideFieldSelectConfig = {
	options: string[];
	defaultSelected?: number[];

	type: 'select';

	multiple?: boolean;
	required?: boolean;
	defaultValue?: string;
} & BaseSlideConfig;

type SlideFieldLongTextConfig = {
	type: 'long-text';
	maxLength?: number;
	placeholder?: string;
} & BaseSlideConfig;


type SlideFieldRateConfig = {
	type: 'rate';
	max?: number;
	icon?: "star" | "heart" | "thumbs-up" | "thumbs-down";
} & BaseSlideConfig;

type FieldShortText =
	| FieldFormatNumber
	| FieldFormatEmail
	| FieldFormatUrl
	| FieldFormatTel
	| FieldFormatText
	| FieldFormatPassword
	| FieldFormatCustom;

type BaseFieldShortText = {
	type: 'short-text';
	defaultValue?: string
	placeholder?: string;
	errorMessage?: string;
};

type FieldFormatNumber = {
	formatType: 'number';
	min?: number;
	max?: number;
	step?: number;
} & BaseFieldShortText;

type FieldFormatEmail = {
	formatType: 'email';
} & BaseFieldShortText;

type FieldFormatUrl = {
	formatType: 'url';
} & BaseFieldShortText;

type FieldFormatTel = {
	formatType: 'tel';
} & BaseFieldShortText;

type FieldFormatText = {
	formatType: 'text';
} & BaseFieldShortText;

type FieldFormatPassword = {
	formatType: 'password';
} & BaseFieldShortText;

type FieldFormatCustom = {
	formatType: 'custom';
	customFormat: ( value: string, config: SlideFieldConfig) => boolean;
} & BaseFieldShortText;


type EventNext = (props: {
	slideConfig: SlideFieldConfig | InitialSlideConfig | FinalSlideConfig;
	config: DevFormConfig;
	index: number;
}) => void;

type EventPrev = (props: {
	slideConfig: SlideFieldConfig | InitialSlideConfig | FinalSlideConfig;
	config: DevFormConfig;
	index: number;
}) => void;