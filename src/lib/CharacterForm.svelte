<script lang="ts">
  import { IsPrint } from "@/utils/char";
  import Char from "./Char.svelte";

  export let input: String = "";
</script>

<div class="main">
  <div class="form">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="form-label">待检测文本</label>
    <textarea
      class="form-control"
      name="example-textarea-input"
      rows="12"
      cols="80"
      placeholder="Content..">{input}</textarea
    >
  </div>

  <div class="result">
    {#each { length: input.length } as _, i}
      <Char char={input[i]} />
    {/each}
  </div>
</div>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .main {
    .form-label {
      display: block;
      font-weight: 500;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
    }

    .result {
      margin-top: 20px;
      max-width: 600px;
      word-wrap: normal;

      .red-dot {
        color: red;
      }
    }
  }
</style>
