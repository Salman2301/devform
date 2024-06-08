<script lang="ts">
	import { blurOnEscape } from "../action/blurOnEscape";

  type Props = {
    config: SlideFieldLongTextConfig;
    value: string;
    isFocus: boolean;
    next: ()=>void;
  }

  let { value=$bindable(), config, isFocus, next }: Props = $props();

  let ref: HTMLTextAreaElement | null = $state(null);

  $effect(() => {
    if (isFocus && ref )  {
      setTimeout(() => {
        ref?.focus?.();
      }, 700);
    }
  });

  function handleKeyDown(e: KeyboardEvent) {
		if( e.key === "Enter" && e.metaKey) {
      e.preventDefault();
      next?.();
    }
  }
</script>

<textarea
  placeholder={config.placeholder}
  bind:value="{value}"
  use:blurOnEscape
  bind:this={ref}
  onkeydown={handleKeyDown}
>
</textarea>


<style lang="postcss">
  textarea {
    background-color: transparent;
    border: 1px solid rgb(var(--dev-form-brand-color-rgb));
    border-radius: 12px;
    width: 100%;

    padding: 18px;
    color: rgb(var(--dev-form-font-color-rgb));
    font-size: 18px;
    min-width: 400px;
    height: 180px;
    outline: none;

    &:focus {
      background-color: rgba(var(--dev-form-brand-color-rgb), 0.1);
    }
  }
</style>