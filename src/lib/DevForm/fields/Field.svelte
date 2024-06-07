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
    if (isFocus && ref) ref.focus();
  });

  export function isValid() {
    if( !config.required && !value) return true;
    if (config.required && !value) return false;

    if (config.formatType === "email") {
      return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
    }
    if (config.formatType === "number") {
      return /^\d+$/.test(value);
    }
    if (config.formatType === "url") {
      return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(value);
    }
    if (config.formatType === "custom") {
      return config.customFormat(value, config);
    }
    if( config.formatType === "text") {
      return true;
    }
    if( config.formatType === "password") {
      return true;
    }
    if( config.formatType === "tel") {
      return true;
    }

    

    return false;
  }

</script>

{#if config.type === "input"}
  <Input {config} bind:value={value} bind:ref={ref} />
{/if}
