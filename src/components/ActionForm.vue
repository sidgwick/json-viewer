<template>
  <div class="action-form">
    <div role="input">
      <input @input="searchFieldUpdate" placeholder="搜索字段" />
      <i class="suffix-icon"></i>
    </div>

    <div role="switch">
      <label class="switch">
        <input
          type="checkbox"
          @change="formatInnerJsonStringUpdate($event)"
          true-value="true"
          false-value="false"
        />
        <span class="slider"></span>
      </label>
      <span class="label" aria-hidden="true"> 格式化内部JSON </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActionForm",
  components: {},
  props: {
    searchFieldUpdate: {
      type: Function,
      default: () => {},
    },
    formatInnerJsonStringUpdate: {
      type: Function,
      default: () => {},
    },
  },
  data: function () {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import url("//fonts.googleapis.com/icon?family=Material+Icons");

[role="input"] {
  display: flex;
  flex-direction: row;
  align-items: center;

  input {
    width: 100%;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    outline: 0;
    padding: 10px 35px 10px 10px;
  }

  .suffix-icon {
    content: "A";
    width: 18px;
    height: 18px;
    background-color: #c0c4cc;
    text-align: center;
    margin-left: -28px;
    mask-image: url("~@/assets/search.svg");
  }
}

[role="switch"] {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  .switch {
    position: relative;
    display: inline-block;
    font-size: 14px;
    width: 40px;
    line-height: 20px;
    height: 20px;
    margin-right: 5px;

    input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: 0.4s;
      border-radius: 14px;

      &:before {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        top: 2px;
        left: 3px;
        bottom: 2px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
      }
    }
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    transform: translateX(18px);
  }

  .slider {
    &.round {
      border-radius: 14px;
    }
    &.round:before {
      border-radius: 50%;
    }
  }

  .label {
    font-size: 12px;
  }
}
</style>
