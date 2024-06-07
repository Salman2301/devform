<script lang="ts">
	import ArrowBarRight from "../icons/ArrowBarRight.svelte";
  import ArrowReturnLeft from "../icons/ArrowReturnLeft.svelte";

	type Props = {
		slideConfig: SlideConfig | InitialSlideConfig | FinalSlideConfig;
		config: DevFormConfig;
		index: number;
    onNext?: (props: { slideConfig: SlideConfig | InitialSlideConfig | FinalSlideConfig; config: DevFormConfig; index: number }) => void;
	};
	let { slideConfig, config, index, onNext }: Props = $props();
</script>

<div class="slide-container">
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
          <ArrowReturnLeft />
        </button>
      </div>
    </div>

  </div>
</div>

<style lang="postcss">
	.slide-container {
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.5);
		position: absolute;

		display: flex;
		align-items: center;
		justify-content: center;
	}
  .slide-number {
    padding-top: 6px;
    font-size: 24px;

    display: flex;
    gap: 4px;
  }

	h1 {
		font-size: 36px;
	}

  .description {
    color: #a3a3a3;
    font-weight: semibold;
  }

  .slide-body {
    width: 700px;
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
  }

  .btn-submit {  
    height: 40px;
    width: 120px;
    border-radius: 40px;
    border: 1px solid;
    border-color: #007bff;
    background-color: rgb(0, 123, 255, 0.5);
    color: white;

    font-size: 18px;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    cursor: pointer;

    &:hover {
      background-color: rgb(0, 123, 255);
    }
  }

  :global(.btn-submit svg) {
    scale: 1.1;
  }


  :global(.arrow-index  svg) {
    scale: 1.1;
  }


</style>
