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

<div
  class="select-container"
  class:wrap={config.wrap}
>
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
    min-width: max-content;
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
    height: 100%;
    display: flex;
    column-gap: 32px;
    row-gap: 16px;
    flex-direction: column;
    width: min-content;

    &.wrap {
      flex-wrap: wrap;
      flex-direction: row;
      width: 100%;
    }
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
    margin-left: 4px;
  }
</style>