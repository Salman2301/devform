<script lang="ts">
	import Field from './fields/Field.svelte';
	import ArrowBarRight from './icons/ArrowBarRight.svelte';
	import ArrowReturnLeft from './icons/ArrowReturnLeft.svelte';
	import ArrowRightShort from './icons/ArrowRightShort.svelte';
	import Command from './icons/Command.svelte';

	type Props = {
		slideConfig: SlideFieldConfig | InitialSlideConfig | FinalSlideConfig;
		config: DevFormConfig;
		isFocus?: boolean;
		index: number;
		next?: EventNext;
		prev?: EventPrev;
		beforeNext?: (props: {
			slideConfig: SlideFieldConfig | InitialSlideConfig | FinalSlideConfig;
			config: DevFormConfig;
			index: number;
		}) => boolean;
	};

	let { slideConfig, config, index, next, prev, isFocus }: Props = $props();

	let showError = $state(false);
	let errorMessage = $state((slideConfig as SlideFieldConfig).errorMessage);

	let fieldRef: Field | null = $state(null);
	export async function beforeNext() {
		showError = false;
		if (!fieldRef) return false;
		const isValid = await fieldRef.isValid();
		// console.log({ isValid })
		if(!isValid) {
			showError = true;
			return false;
		};
		showError = false;
		return true;
	}

</script>

<div class="slide-container" inert={isFocus ? null : true}>
	<div class="slide-body">
		<div class="slide-number">
			<span class="index">{index + 1}</span>
			<span class="arrow-index"><ArrowBarRight /></span>
		</div>
		<div class="slide-content">
			{#if slideConfig?.title}
				<h1>{slideConfig?.title}</h1>
			{/if}
			{#if slideConfig?.description}
				<p class="description">{@html slideConfig?.description}</p>
			{/if}
			{#if !!(slideConfig as SlideFieldConfig).type}
				<Field
					isFocus={!!isFocus}
					config={slideConfig as SlideFieldConfig}
					bind:this={fieldRef}
					next={()=>next?.({ slideConfig, config, index })}
					prev={()=>prev?.({ slideConfig, config, index })}
				/>
      {/if}

			{#if showError}
				<p class="error-message">{errorMessage || "Please check the input and try again"}</p>
			{/if}
			<div class="action">
				<button class="btn-submit"  onclick={() => next?.({ slideConfig, config, index })}>
					{slideConfig?.labelNext || 'Next'}
					<span class="btn-submit-icon"><ArrowRightShort /></span>
				</button>
				<span class="label-next">Press <span class="label-next-icon">
					{#if (slideConfig as SlideFieldConfig).type === "long-text"}
						<Command /> +
					{/if}
					Enter
				</span> <ArrowReturnLeft /> </span>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.slide-container {
		width: 100%;
		height: 100%;
		background-color: var(--dev-form-background-color);

		display: flex;
		align-items: center;
		justify-content: center;

		scroll-snap-align: start;
		padding: 0px 20px;
	}
	.slide-number {
		padding-top: 6px;
		font-size: 24px;

		display: flex;
		gap: 4px;
		color: rgb(var(--dev-form-font-color-rgb));
	}

	h1 {
		margin-bottom: 12px;
		font-size: var(--dev-form-font-size);
		color: rgb(var(--dev-form-font-color-rgb));
	}

	.description {
		color: #a3a3a3;
		font-weight: bold;
		margin-bottom: 24px;
	}

	.slide-body {
		width: 100%;
		max-width: 700px;
		display: flex;
	}

	.slide-content {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: start;
		max-width: 700px;
		width: 100%;
		color: var(--dev-form-font-color);
	}


	.action {
		padding-top: 40px;
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.btn-submit {
		height: 46px;
		min-width: 140px;
		border-radius: var(--dev-form-border-radius);
		border: 1px solid;
		border-color: rgb(var(--dev-form-brand-color-rgb));
		background-color: rgba(var(--dev-form-brand-color-rgb), 0.7);
		color: white;

		font-size: 22px;

		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;

		cursor: pointer;

		&:hover {
			background-color: rgb(var(--dev-form-brand-color-rgb));

			.btn-submit-icon {
				translate: 4px;
			}
		}

		.btn-submit-icon {
			scale: 1.4;
			transition: all 0.2s ease-in-out;
		}
	}
	.label-next {
		display: flex;
		align-items: center;
		color: rgb(var(--dev-form-font-color-rgb));

		font-size: 14px;
		span {
			font-weight: bold;
			margin: 0px 8px;
		}
	}

	.label-next-icon {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.error-message { 
		color: #ff4a4a;
		font-weight: bold;
		margin-top: 24px;
	}
	:global(.btn-submit svg) {
		scale: 1.1;
	}

	:global(.arrow-index svg) {
		scale: 1.1;
	}
</style>
