<script lang="ts">

  type Props = {
    config: SlideFieldInputConfig;
    value: string;
    ref: HTMLInputElement | null;
    onSetFocus?: () => void;
  }

  let { value=$bindable(), config, ref=$bindable<HTMLInputElement>() }: Props = $props();
  
</script>

<input 
  bind:value="{value}"
  placeholder="{config.placeholder}"
  type="{config.formatType}"
  bind:this={ref}
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
  }

</style>