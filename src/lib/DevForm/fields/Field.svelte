<script lang="ts">
	import ShortText from './ShortText.svelte';
	import Select from './Select.svelte';
	import TextArea from './TextArea.svelte';
	import Rate from './Rate.svelte';

	type Props = {
		config: SlideFieldConfig;
		isFocus: boolean;
		next: ()=>void;
		prev: ()=>void;
	};

	let { config, isFocus, next, prev }: Props = $props();

	let value = $state('');

	export function isValid() {
		if (!config.required && !value) return true;
		if (config.required && !value) return false;

		if (config.type === 'short-text') return shortTextIsValid();
		if (config.type === 'select') return selectIsValid();
		if (config.type === 'long-text') return longTextIsValid();
		if (config.type === 'rate') return rateIsValid();

		return false;
	}

	function longTextIsValid() {
		if( config.required && !value ) return false;
		return true;
	}

	function shortTextIsValid() {
    if( config.type !== "short-text" ) return false;
		if( config.required && !value ) return false;

		if (config.formatType === 'email') {
			return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
		}
		if (config.formatType === 'number') {
			return /^\d+$/.test(value);
		}
		if (config.formatType === 'url') {
			return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(
				value
			);
		}
		if (config.formatType === 'custom') {
			return config.customFormat(value, config);
		}
		if (config.formatType === 'text') {
			return true;
		}
		if (config.formatType === 'password') {
			return true;
		}
		if (config.formatType === 'tel') {
			return true;
		}
	}

	function selectIsValid() {
    if( config.type !== "select" ) return false;
		if( config.required && !value ) return false;
		return true;
	}

	function rateIsValid() {
    if( config.type !== "rate" ) return false;
		if( config.required && !value ) return false;
		return true;
	}

  let selected: number[] = $state([]);

  function handleKeyDown(e: KeyboardEvent) {
		if( config.type !== 'select' ) return;
    if( !isFocus ) return;

    const num: number = Number(e.key);
    if( isNaN(num) ) return;
    if( num < 1 || num > config.options.length ) return;

    toggleSelect(num - 1);
    
  }


  function toggleSelect(index: number) {
		if( config.type !== 'select' ) return;
    if( !config.multiple ) {
      selected = [index];
      next?.();
    }
    else if (selected.includes(index)) {
      selected = selected.filter((i) => i !== index);
    } else {
      selected = [...selected, index];
    }
  }


</script>

<svelte:window onkeyup={handleKeyDown} />
{#if config.type === 'short-text'}
	<ShortText {config} bind:value {next} {prev} {isFocus} />
{:else if config.type === 'select'}
	<Select {config} bind:value bind:selected={selected} {next}/>
{:else if config.type === 'long-text'}
	<TextArea {config} bind:value {isFocus} {next} {prev} />
{:else if config.type === 'rate'}
	<Rate {config} bind:value {isFocus} {next} />
{/if}
