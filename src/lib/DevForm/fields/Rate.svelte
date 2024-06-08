<script lang="ts">
  type Props = {
    config: SlideFieldRateConfig;
    value: string | null;
    isFocus: boolean;
    next: ()=>void;
  }
  
  let { config, value=$bindable(), isFocus, next }: Props = $props();

  let max: number = config.max || 5;
  let lastHoverIndex: number | null = $state(null)

  function setValue(valueNum: number) {
    let newValue = String(valueNum);
    if( valueNum > max ) return;
    if( newValue === value ) {
      value = null
      return;
    }

    value = newValue;
    next();
  }

  function minSelected( index: number ) {
    if( value === null ) return false;
    if( value === '' || value === '0' ) return false;

    return index <= Number(value) - 1;
  }

  function minHover(index: number) {
    if( lastHoverIndex === null ) return false;
    return index <= lastHoverIndex;
  }

  let waitForSecKey = false;
  let lastSecKey: number | null = null;
  let clearTimeoutId: number | null = null;
  function handleKeydown(e: KeyboardEvent) {
    if( !config || !isFocus || isNaN(Number(e.key)) ) return;
    let newValue = Number(e.key);
    if( newValue > max || (newValue < 1 && !waitForSecKey) ) return;

    if( waitForSecKey && lastSecKey ) {
      const append = String(lastSecKey) + String(newValue);
      setValue(Number(append));
      waitForSecKey = false;
      lastSecKey = null;
      clearTimeoutId && clearInterval(clearTimeoutId);
      return;
    }
    if( newValue === 1 ) {
      waitForSecKey = true;
      lastSecKey = newValue;
      clearTimeoutId = setTimeout(()=>{
        waitForSecKey = false;
        setValue(newValue);
      }, 1000);
    }
    else {
      setValue(newValue);
    }
  }

</script>

<svelte:window onkeydown={handleKeydown} />
<div class="rate-container">
  {#each Array(max) as _, i}
    <button
      class="rate-item"
      data-value={value}
      data-hover={lastHoverIndex}

      class:hover={minHover(i)}
      class:rate={minSelected(i)}

      onclick={()=>setValue(i+1)}
      onmouseover={()=>lastHoverIndex = i}
      onmouseout={()=>lastHoverIndex = null} 
      onfocus={()=>lastHoverIndex = i} 
      onblur={()=>lastHoverIndex = null}
    >
      <div class="rate-icon">{(i+1)}</div>
    </button>
  {/each}
</div>

<style lang="postcss">

  .rate-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
  }

  .rate-item {
    width: 46px;
    height: 46px;
    min-width: 46px;
    min-height: 46px;

    border: 1px solid rgb(var(--dev-form-brand-color-rgb));
    border-radius: var(--dev-form-border-radius);
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    color: rgb(var(--dev-form-font-color-rgb));

    background-color: transparent;
    &.hover {
      background-color: rgba(var(--dev-form-brand-color-rgb), 0.4);
      text-decoration: underline;
    }
    &.rate {
      background-color: rgba(var(--dev-form-brand-color-rgb), 1);
      color: white;
      &.hover {
        text-decoration: underline;
      }
    }
  }
</style>