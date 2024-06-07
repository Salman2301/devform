<script lang="ts">
	import Input from './Input.svelte';
	import Select from './Select.svelte';

	type Props = {
		config: SlideFieldConfig;
		isFocus: boolean;
	};

	let { config, isFocus }: Props = $props();
	let ref: HTMLInputElement | null = $state(null);

	let value = $state('');

	$effect(() => {
		if (isFocus && ref) ref.focus();
	});

	export function isValid() {
		if (!config.required && !value) return true;
		if (config.required && !value) return false;

		if (config.type === 'short-text') return shortTextIsValid();
		if (config.type === 'select') return selectIsValid();

		return false;
	}

	function shortTextIsValid() {
    if( config.type !== "short-text" ) return false;
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
    if (selected.includes(index)) {
      selected = selected.filter((i) => i !== index);
    } else {
      selected = [...selected, index];
    }
  }


</script>

<svelte:window onkeydown={handleKeyDown} />
{#if config.type === 'short-text'}
	<Input {config} bind:value bind:ref />
{:else if config.type === 'select'}
	<Select {config} bind:value bind:selected={selected} />
{/if}
