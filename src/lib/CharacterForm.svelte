<svelte:options customElement="character-form" />

<script lang="ts">
  import Char from "./Char.svelte";

  $: showCode = false;
  $: input = "";

  let testCode: HTMLElement;

  const copyTest = () => {
    input = testCode.innerText;
  };

  const toggleShowCode = () => {
    showCode = !showCode;
  };
</script>

<div class="main">
  <div class="tips">
    可以使用下面的文本来体验功能:

    <button on:click={copyTest}>点我试试</button>

    <pre><code bind:this={testCode}
        >#豹5 ⍅ #电⑕:驱越野·悦己宜家 #豹8  #国货旗舰·智勇双全
58同行，车展​顶流，人气豹棚\n广州广交会展馆2.1馆 方程豹展台 a</code
      ></pre>
  </div>

  <div class="form">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="form-label">待检测文本</label>
    <textarea
      class="form-control"
      name="example-textarea-input"
      rows="12"
      cols="80"
      bind:value={input}
      placeholder="Content.."
    ></textarea>
  </div>

  <div>
    <button on:click={toggleShowCode}>
      {showCode ? "显示红点" : "显示码点"}
    </button>

    <div class="result">
      {#each { length: input.length } as _, i}
        <Char char={input[i]} {showCode} />
      {/each}
    </div>
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
    }

    pre {
      background-color: #ececec;
      border: 1px solid black;
    }
  }
</style>
