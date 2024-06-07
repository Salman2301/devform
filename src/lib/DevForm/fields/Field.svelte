<script lang="ts">
  import Input from './Input.svelte';

  type Props = {
    config: SlideFieldConfig;
    isFocus: boolean;
  }

  let { config, isFocus }: Props = $props();
  let ref: HTMLInputElement | null = $state(null);

  let value = $state("");


  $effect(() => {
    console.log("hi")
    if (isFocus && ref) {
      ref.focus();
    }
  });

</script>

{#if config.type === "input"}
  <Input {config} bind:value={value} bind:ref={ref} />
{/if}


<style lang="postcss">

</style>