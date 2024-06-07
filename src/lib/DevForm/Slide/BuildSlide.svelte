<script lang="ts">
	import ArrowBarRight from "../icons/ArrowBarRight.svelte";
  import ArrowReturnLeft from "../icons/ArrowReturnLeft.svelte";
	import ArrowRightShort from "../icons/ArrowRightShort.svelte";

	type Props = {
		slideConfig: SlideConfig | InitialSlideConfig | FinalSlideConfig;
		config: DevFormConfig;
    isFocus?: boolean;
		index: number;
    onNext?: (props: { slideConfig: SlideConfig | InitialSlideConfig | FinalSlideConfig; config: DevFormConfig; index: number }) => void;
	};
	let { slideConfig, config, index, onNext,isFocus }: Props = $props();
</script>

<div class="slide-container" inert={!isFocus}>
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
        <p class="description">{slideConfig?.description}</p>
      {/if}
      <div class="action">
        <button
          class="btn-submit"
          onclick={() => onNext?.({ slideConfig, config, index })}
        >
          {slideConfig?.labelNext || "Next"}
          <span class="btn-submit-icon"><ArrowRightShort /></span>
        </button>
        <span class="label-next">Press <span>Enter</span>  <ArrowReturnLeft /> </span>
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
    font-weight: semibold;
  }

  .slide-body {
    max-width: 700px;
    display: flex;
  }

  .slide-content {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    width: 700px;
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

  :global(.btn-submit svg) {
    scale: 1.1;
  }


  :global(.arrow-index  svg) {
    scale: 1.1;
  }


</style>
