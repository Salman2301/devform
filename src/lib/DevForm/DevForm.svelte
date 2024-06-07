<script lang="ts">
	import BuildSlide from './Slide/BuildSlide.svelte';
	import { defaultConfig } from './constant/defaultConfig';

	type Props = {
		config: DevFormConfig;
	};

	let { config = defaultConfig }: Props = $props();

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
</script>

<svelte:head>
	{#if config.app?.modifyTabTitle}
		<title>{config.initialSlide?.title || 'DevForm'}</title>
	{/if}
</svelte:head>

<svelte:window on:keyup={handleKeyUp} />

<div class="dev-form-contianer" style="background-color: {config.app?.styles?.backgroundColor};">
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
	.dev-form-contianer {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
