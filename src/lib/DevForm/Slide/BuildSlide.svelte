<script lang="ts">
	type Props = {
		slideConfig: SlideConfig | InitialSlideConfig | FinalSlideConfig;
		config: DevFormConfig;
		index: number;
	};
	let { slideConfig, config, index }: Props = $props();
</script>

<div class="slide-container">
	{#if slideConfig?.title}
		<h1>{slideConfig?.title}</h1>
	{/if}
	{#if slideConfig?.description}
		<p>{slideConfig?.description}</p>
	{/if}
</div>

<style lang="postcss">
	.slide-container {
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.5);
		position: absolute;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	h1 {
		font-size: 36px;
	}
</style>
