<script lang="ts">
	import BuildSlide from './Slide/BuildSlide.svelte';
	import { defaultConfig } from './constant/defaultConfig';

	type Props = {
		config: DevFormConfig;
	};

	let { config = defaultConfig }: Props = $props();
	let styleVar: string = $derived(genConfigStyleVar())

	let currentIndex: number = $state(0);
	let hasInitialSlide: boolean = $derived(!!config.initialSlide?.show);
	let totalSlide: number = $derived(config.slides.length + ( hasInitialSlide ? 1 : 0 )) ;

	function handleKeyUp(e: KeyboardEvent) {
		if (e.key === 'Escape') {
		}
		if (e.key === 'Enter') {
			if (e.shiftKey) handlePrev();
			else handleNext();
		}
	}

	function handlePrev() {
		if( currentIndex === 0) return;
		currentIndex = currentIndex - 1;
	}
	function handleNext() {
		if (currentIndex === totalSlide) return;
		currentIndex = currentIndex + 1;
	}


	function genConfigStyleVar(): string {
		let styleVar: Record<string, string> = {};
		if (config.app?.styles?.backgroundColor)
			styleVar["--dev-form-background-color"] = config.app?.styles?.backgroundColor;
		if (config.app?.styles?.fontColorRGB)
			styleVar["--dev-form-font-color-rgb"] = config.app?.styles?.fontColorRGB;
		if (config.app?.styles?.fontFamily)
			styleVar["--dev-form-font-family"] = config.app?.styles?.fontFamily;
		if (config.app?.styles?.borderRadius)
			styleVar["--dev-form-border-radius"] = config.app?.styles?.borderRadius;
		if (config.app?.styles?.brandColorRGB)
			styleVar["--dev-form-brand-color-rgb"] = config.app?.styles?.brandColorRGB;
		if (config.app?.styles?.fontSize)
			styleVar["--dev-form-font-size"] = config.app?.styles?.fontSize;

		return Object.entries(styleVar).map(([key, value]) => `${key}: ${value};`).join('');
	}
</script>

<svelte:head>
	{#if config.app?.modifyTabTitle}
		<title>{config.initialSlide?.title || 'DevForm'}</title>
	{/if}
</svelte:head>

<svelte:window on:keyup={handleKeyUp} />

<div
	class="dev-form-container"
	style="{styleVar}"
>
	<div class="content">
		{#if currentIndex === 0}
			<BuildSlide
				slideConfig={config.initialSlide!}
				{config}
				index={0}
				onNext={handleNext}
			/>
		{/if}
		{#each config.slides as slideConfig, index}
			{#if currentIndex === index - (hasInitialSlide ? 1 : 0)}
				<BuildSlide
					{slideConfig}
					{config}
					index={index + 1}
					onNext={handleNext}
				/>
			{/if}
		{/each}
		{#if currentIndex === totalSlide}
			<BuildSlide
				slideConfig={config.finalSlide!}
				{config}
				index={totalSlide}
				onNext={handleNext}
			/>
		{/if}
	</div>
</div>

<style lang="postcss">
	.dev-form-container {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	:global(.dev-form-container  * ) {
		font-family: var(--dev-form-font-family);
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
