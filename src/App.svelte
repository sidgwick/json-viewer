<script lang="ts">
  import { BigNumber } from "bignumber.js";
  import JsonViewer from "./lib/JsonViewer.svelte";

  let data = {
    Hello: "hello",
    word: [1, 2, 3],
    big: new BigNumber("0.13478545645487878"),
    escaped: "[1,2,3, 0.13478545645487878]",
    search: '{"key1": "abc", "status": 1}',
    data: { key1: "abc", status: 1 },
  };
</script>

<main>
  <div id="app">
    <JsonViewer value={data} keyName={false} path={[]} showActionForm={true} />
  </div>
</main>

<style scoped lang="scss">
  #app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
