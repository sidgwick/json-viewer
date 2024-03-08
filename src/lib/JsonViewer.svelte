<script lang="ts">
  import BasicViewer from "./BasicViewer.svelte";
  import ActionForm from "./ActionForm.svelte";
  import { expandInnerJsonString, clearNonMatchPath } from "@utils/json";

  export let value: any;
  export let keyName: any;
  export let showActionForm: boolean;
  export let path: string[];

  let formatInnerJsonString = false;
  let searchField = "";

  $: xValue = (() => {
    let _value = value;
    if (formatInnerJsonString) {
      _value = expandInnerJsonString(value);
    }

    return clearNonMatchPath(_value, searchField);
  })();

  function searchFieldUpdate(
    e: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    searchField = e.currentTarget.value;
  }

  function formatInnerJsonStringUpdate(
    e: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    formatInnerJsonString = e.currentTarget.checked;
  }
</script>

<div
  class="json-viewer {showActionForm
    ? 'json-viewer-with-action-form'
    : 'json-viewer-without-action-form'}"
>
  {#if showActionForm}
    <ActionForm {searchFieldUpdate} {formatInnerJsonStringUpdate} />
  {/if}

  <BasicViewer value={xValue} {keyName} {path} showComma={false} className="" />
</div>

<style scoped lang="scss">
  .json-viewer {
    display: block;
    position: relative;
    width: 100%;

    &.json-viewer-with-action-form {
      min-height: 130px;
    }

    &.json-viewer-without-action-form {
      min-height: 20px;
    }
  }
</style>
