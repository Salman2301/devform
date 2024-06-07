<script lang="ts">

  type Props = {
    config: SlideFieldSelectConfig;
    value: string;
    selected: number[];
    next?: ()=>void;
  }

  let { config, value=$bindable(''), selected=$bindable([]), next }: Props = $props();

  config.options

  $effect(()=>{
    value = selected.join(",")
  });

  function toggleSelect(index: number) {
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

<div class="select-container">  
  {#each config.options as value, index}
    <button
      class="option"
      class:selected={selected.includes(index)}
      onclick={()=> toggleSelect(index)}
    >
      {value} <span class="kbd">{index + 1}</span>
    </button>
  {/each}
</div>

<style lang="postcss">
  button.option {
    padding: 8px 16px;
    border-radius: var(--dev-form-border-radius);
    background-color: rgba(var(--dev-form-brand-color-rgb), 0.4);
    border: 1px solid;
    border-color: rgb(var(--dev-form-brand-color-rgb));
    color: white;
    font-size: 18px;
    cursor: pointer;

    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 180px;
    height: 46px;

    &:hover {
      background-color: rgba(var(--dev-form-brand-color-rgb), 0.6);
      text-decoration: underline;
    }

    &.selected {
      background-color: rgb(var(--dev-form-brand-color-rgb));
    }
  }

  .select-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
  }
  .kbd {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.6);
    background-color: rgba(255, 255, 255, 0.3);
    font-size: 12px;
  }
</style>