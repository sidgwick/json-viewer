<svelte:options customElement="json-viewer" />

<script lang="ts">
  import BasicViewer from "./BasicViewer.svelte";
  import ActionForm from "./ActionForm.svelte";
  import { expandInnerJsonString, clearNonMatchPath } from "@utils/json";
  import JSONBigFix from "@/utils/bignumber-json";

  export let value: any;
  export let keyName: any;
  export let showActionForm: boolean;
  export let path: string[];

  let formatterRender = true;
  let formatInnerJsonString = false;
  let searchField = "";

  $: xValue = (() => {
    let _value = value;
    if (formatInnerJsonString) {
      _value = expandInnerJsonString(value);
    }

    return clearNonMatchPath(_value, searchField);
  })();

  function searchFieldUpdate(e: InputChangeEvent) {
    searchField = e.currentTarget.value;
  }

  function formatInnerJsonStringUpdate(e: InputChangeEvent) {
    formatInnerJsonString = e.currentTarget.checked;
  }

  function onRawClick(e: ButtonClickEvent) {
    formatterRender = !formatterRender;
  }

  function onCopyClick(e: ButtonClickEvent) {
    const val = JSONBigFix.stringify(xValue, null, 2);
    navigator.clipboard.writeText(val);
  }

  function onDownloadClick(e: ButtonClickEvent) {
    const val = JSONBigFix.stringify(xValue, null, 2);
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(val);

    var downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "download.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
</script>

<div
  class="json-viewer {showActionForm
    ? 'json-viewer-with-action-form'
    : 'json-viewer-without-action-form'}"
>
  {#if showActionForm}
    <ActionForm
      {searchFieldUpdate}
      {formatInnerJsonStringUpdate}
      {onRawClick}
      {onCopyClick}
      {onDownloadClick}
    />
  {/if}

  {#if formatterRender}
    <BasicViewer
      value={xValue}
      {keyName}
      {path}
      showComma={false}
      className=""
    />
  {:else}
    <pre>{JSONBigFix.stringify(xValue, null, 2)}</pre>
  {/if}
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
