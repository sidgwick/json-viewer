<script lang="ts">
  import { IsPrint } from "@/utils/char";
  import { sprintf } from "sprintf-js";

  export let char: String = "";

  const code = char.charCodeAt(0);
  const isPrintable = IsPrint(code);
  const codeNum = code.toString(16);
</script>

<div class="char">
  {#if isPrintable}
    {char}
  {:else}
    <span class="red-dot">•</span>
    <!-- <span class="code-point">U+{sprintf("%04X", code)}</span> -->
  {/if}
</div>

<style scoped lang="scss">
  .char {
    display: inline-flex;
    flex-direction: column;
    text-align: center;
    margin: 3px 0;
    // line-height: 1.9em;

    .red-dot {
      display: inline-block;
      padding: 0 5px;
      background-color: #ececec;
      color: red;
      font-weight: 900;
      font-size: 1em;
    }

    .code-point {
      display: inline-block;
      padding: 0 5px;
      background-color: #ececec;
      color: red;
      font-weight: 900;
      font-size: 1em;
    }
  }
</style>
