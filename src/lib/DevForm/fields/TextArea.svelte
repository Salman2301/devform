<script lang="ts">
	import { blurOnEscape } from "../action/blurOnEscape";


  type Props = {
    config: SlideFieldLongTextConfig;
    value: string;
    isFocus: boolean;
  }

  let { value=$bindable(), config, isFocus }: Props = $props();

  let ref: HTMLTextAreaElement | null = $state(null);

  $effect(() => {
    if (isFocus && ref) ref?.focus?.();
  });
</script>

<textarea
  placeholder={config.placeholder}
  bind:value="{value}"
  use:blurOnEscape
  bind:this={ref}
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
  }
</style>