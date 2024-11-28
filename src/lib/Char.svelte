<script lang="ts">
  import { IsPrint } from "@/utils/char";
  import { sprintf } from "sprintf-js";

  export let char: String = "";
  export let showCode: Boolean = false;

  const code = char.charCodeAt(0);
  const isPrintable = IsPrint(code);
</script>

<div class="char">
  {#if isPrintable}
    {char}
  {:else if showCode}
    <span class="code-point">U+{sprintf("%04X", code)}</span>
  {:else}
    <span class="red-dot">•</span>
  {/if}
</div>

<style scoped lang="scss">
  .char {
    display: inline-flex;
    min-width: 20px;
    min-height: 1.5em;
    line-height: 1.5em;
    vertical-align: middle;
    flex-direction: column;
    text-align: center;
    margin: 3px 0;
    border: 1px dashed #ececec;

    .red-dot {
      display: inline-block;
    }

    .code-point {
      display: inline-block;
    }

    .code-point,
    .red-dot {
      padding: 0 5px;
      background-color: #ececec;
      color: red;
      font-weight: 900;
      font-size: 1em;
      min-height: 1.5em;
      line-height: 1.5em;
    }
  }
</style>
