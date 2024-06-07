<script lang="ts">
	import BuildSlide from './BuildSlide.svelte';
	import { defaultConfig } from './configs/defaultConfig';

	type Props = {
		config: DevFormConfig;
	};

	let { config = defaultConfig }: Props = $props();
	let styleVar: string = $derived(genConfigStyleVar());

	let currentIndex: number = $state(0);
	let hasInitialSlide: boolean = $derived(!!config.initialSlide?.show);
	let totalSlide: number = $derived(config.slides.length + (hasInitialSlide ? 1 : 0));
	let percent: number = $state(0);

	let buildSlideFieldRefs: Array<BuildSlide> = $state([]);
	let currentFieldIndex = $derived(currentIndex - (hasInitialSlide ? 1 : 0));

	$effect(() => {
		percent = ((currentIndex + 1) / (totalSlide + 1)) * 100;
	});

	function handlePrev() {
		if (currentIndex === 0) return;
		currentIndex = currentIndex - 1;
		goto();
	}

	async function handleNext(checkValidation?: boolean) {
		if (currentIndex === totalSlide) return;
		setTimeout(async ()=>{
			if (checkValidation) {
				const buildSlideFieldRef = buildSlideFieldRefs[currentFieldIndex];
				if(buildSlideFieldRef?.beforeNext) {
					const isValid = await buildSlideFieldRef?.beforeNext?.();
					if(!isValid) return;
				}
			}
			currentIndex = currentIndex + 1;

			goto();
		}, 300)
	}

	function goto() {
		setTimeout(() => {
			let content = document.querySelector('.content');
			if (!content) return;
			let slideContianer = content.children[currentIndex];
			slideContianer.scrollIntoView();
		}, 120); // without setTimeout smooth scrolling is not working when using button click ( Next )
	}

	function genConfigStyleVar(): string {
		let styleVar: Record<string, string> = {};
		if (config.app?.styles?.backgroundColor)
			styleVar['--dev-form-background-color'] = config.app?.styles?.backgroundColor;
		if (config.app?.styles?.fontColorRGB)
			styleVar['--dev-form-font-color-rgb'] = config.app?.styles?.fontColorRGB;
		if (config.app?.styles?.fontFamily)
			styleVar['--dev-form-font-family'] = config.app?.styles?.fontFamily;
		if (config.app?.styles?.borderRadius)
			styleVar['--dev-form-border-radius'] = config.app?.styles?.borderRadius;
		if (config.app?.styles?.brandColorRGB)
			styleVar['--dev-form-brand-color-rgb'] = config.app?.styles?.brandColorRGB;
		if (config.app?.styles?.fontSize)
			styleVar['--dev-form-font-size'] = config.app?.styles?.fontSize;

		return Object.entries(styleVar)
			.map(([key, value]) => `${key}: ${value};`)
			.join('');
	}

	function handleKeyDown(e: KeyboardEvent) {
		if( e.target && (e.target as HTMLButtonElement).tagName === 'BUTTON' && e.key === 'Escape' )
			return (e.target as HTMLButtonElement)?.blur?.();

		if( e.target && (e.target as any).tagName !== "BODY" ) return;

		if (e.key.startsWith('Arrow')) {
			e.preventDefault();
			const key = e.key;
			if (key === "ArrowLeft" || key === "ArrowUp") handlePrev();
			if (key === "ArrowRight" || key === "ArrowDown") handleNext();
		}
		if (e.key === 'Enter' || e.key === ' ') {
			// if( e.target )
			if(e.key === ' ') e.preventDefault();
			if (e.shiftKey) handlePrev();
			else handleNext(true);
		}
	}

</script>

<svelte:head>
	{#if config.app?.modifyTabTitle}
		<title>{config.initialSlide?.title || 'DevForm'}</title>
	{/if}
</svelte:head>

<svelte:window on:keydown={handleKeyDown} />

<div class="dev-form-container" style={styleVar}>
	<div
		class="loader"
		style="width:{percent}%"
		data-start={currentIndex}
		data-total-slide={totalSlide}
	></div>
	<div class="content">
		{#if config.initialSlide?.show}
			<BuildSlide
				slideConfig={config.initialSlide!}
				{config}
				index={0}
				next={()=>handleNext()}
				isFocus={currentIndex === 0}
			/>
		{/if}
		{#each config.slides as slideConfig, index}
			<BuildSlide
				{slideConfig}
				{config}
				index={index + 1}
				next={()=>handleNext(true)}
				prev={()=>handlePrev()}
				bind:this={buildSlideFieldRefs[index]}
				isFocus={currentIndex === (index + (hasInitialSlide ? 1 : 0))}
			/>
		{/each}
		<BuildSlide
			slideConfig={config.finalSlide!}
			{config}
			index={totalSlide}
			next={()=>handleNext()}
			isFocus={currentIndex === totalSlide}
		/>
	</div>
</div>

<style lang="postcss">
	:global(.dev-form-container *) {
		font-family: var(--dev-form-font-family);
	}

	:global(.dev-form-container ::selection) {
		color: white;
		background: rgb(var(--dev-form-brand-color-rgb));
	}

	.dev-form-container {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.loader {
		height: 4px;
		background-color: rgb(var(--dev-form-brand-color-rgb));
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
		width: 0%;

		transition: width 0.5s ease-in-out;
	}

	.content {
		width: 100%;
		height: 100%;

		overflow: clip;
		overflow-y: hidden;
		scroll-behavior: smooth;
		scroll-snap-type: y mandatory;
	}
</style>
