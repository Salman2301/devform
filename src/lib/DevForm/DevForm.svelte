<script lang="ts">
	import BuildSlide from './Slide/BuildSlide.svelte';
	import { defaultConfig } from './constant/defaultConfig';

	type Props = {
		config: DevFormConfig;
	};

	let currentIndex = $state(0);
	let { config = defaultConfig }: Props = $props();

	function handleKeyUp(e: KeyboardEvent) {
		if (e.key === 'Escape') {
		}
		if (e.key === 'Enter') {
			// Shift + Enter
			if (e.shiftKey) handlePrev();
			else handleNext();
		}
	}

	function handlePrev() {
		currentIndex = currentIndex - 1;
	}
	function handleNext() {
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
			{#if currentIndex === index - 1}
				<BuildSlide
					{slideConfig}
					{config}
					index={index + 1}
					onNext={handleNext}
				/>
			{/if}
		{/each}
		{#if currentIndex === config.slides.length + 1}
			<BuildSlide
				slideConfig={config.finalSlide!}
				{config}
				index={config.slides.length + 1}
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
