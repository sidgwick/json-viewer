<template>
  <div
    :class="[
      'json-viewer',
      showActionForm
        ? 'json-viewer-with-action-form'
        : 'json-viewer-without-action-form',
    ]"
  >
    <div v-if="showActionForm" class="action-form">
      <div class="el-input">
        <input
          type="text"
          autocomplete="off"
          v-model="searchField"
          placeholder="搜索字段"
        />
      </div>
      <div role="switch" class="el-switch">
        <input v-model="formatInnerJsonString" type="checkbox" />
        <span class="label">格式化内部JSON</span>
      </div>
    </div>

    <BasicViewer
      class="viewer"
      :value="xValue"
      :key-name="keyName"
      :path="path"
    />
  </div>
</template>

<script>
import BasicViewer from "./BasicViewer.vue";
import { expandInnerJsonString, clearNonMatchPath } from "@/utils/json";

export default {
  name: "JsonViewer",
  components: {
    BasicViewer,
  },
  props: {
    value: {
      type: Object,
      required: false,
      default: null,
    },
    keyName: {
      type: Boolean,
      required: false,
      default: false,
    },
    showActionForm: {
      type: Boolean,
      required: false,
      default: false,
    },
    path: {
      type: Array,
      required: true,
    },
  },
  data: function () {
    return {
      formatInnerJsonString: false,
      showSource: false,
      searchField: "",
    };
  },
  computed: {
    xValue: function () {
      let value = this.value;
      if (this.formatInnerJsonString) {
        value = expandInnerJsonString(this.value);
      }

      return clearNonMatchPath(value, this.searchField);
    },
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.json-viewer {
  position: relative;
  width: 100%;

  &.json-viewer-with-action-form {
    min-height: 130px;
  }

  &.json-viewer-without-action-form {
    min-height: 20px;
  }

  .action-form {
    position: absolute;
    z-index: 10;
    right: 70px;
    display: flex;
    flex-direction: column;

    > div {
      margin: 5px;
    }

    .el-input {
      > input {
        padding: 0 15px;
        background-color: #fff;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        color: #606266;
        height: 40px;
        line-height: 40px;
        width: 100%;
      }
    }

    .el-switch {
      > span.label {
        margin-left: 5px;
      }
    }
  }

  .viewer {
  }
}
</style>
