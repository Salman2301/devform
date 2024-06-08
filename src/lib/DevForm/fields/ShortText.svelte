<script lang="ts">
	import { blurOnEscape } from "../action/blurOnEscape";


  type Props = {
    config: SlideFieldShortTextConfig;
    value: string;
    isFocus: boolean;
    next: ()=>void;
    prev: ()=>void;
  }

  let { value=$bindable(), config, next, prev, isFocus }: Props = $props();

  let ref: HTMLInputElement | null = $state(null);
  
  $effect(() => {
    if (isFocus && ref )  {
      setTimeout(() => {
        ref?.focus?.();
      }, 700);
    }
  });

  function handleKeyDown(e: KeyboardEvent) {
		if( e.key === "Enter") {
      if(e.shiftKey) prev?.();
      else next?.();
    }
  }

</script>

<input 
  bind:value="{value}"
  placeholder="{config.placeholder}"
  type="{config.formatType}"
  bind:this={ref}
  onkeydown={handleKeyDown}
  use:blurOnEscape
/>

<style lang="postcss">

  input {
    background-color: transparent;
    border: 1px solid rgb(var(--dev-form-brand-color-rgb));
    border-radius: var(--dev-form-border-radius);
    padding: 18px;
    color: rgb(var(--dev-form-font-color-rgb));
    font-size: 18px;
    min-width: 400px;
    height: 46px;
    outline: none;
    
    &:focus {
      background-color: rgba(var(--dev-form-brand-color-rgb), 0.1);
    }
  }

</style>