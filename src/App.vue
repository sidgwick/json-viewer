<template>
  <div id="app">
    <JsonViewer
      :value="data"
      :key-name="false"
      :path="[]"
      :show-action-form="true"
    />
  </div>
</template>

<script>
import { BigNumber } from "bignumber.js";
import JsonViewer from "./components/JsonViewer.vue";

export default {
  name: "App",
  components: {
    JsonViewer,
  },
  data: function () {
    return {
      data: {
        Hello: "hello",
        word: [1, 2, 3],
        big: new BigNumber("0.13478545645487878"),
        escaped: "[1,2,3, 0.13478545645487878]",
        search: '{"key1": "abc", "status": 1}',
        data: { key1: "abc", status: 1 },
      },
    };
  },
};
</script>

<style scoped lang="scss">
#app {
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
