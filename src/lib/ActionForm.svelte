<script lang="ts">
  import type { ChangeEventHandler } from "svelte/elements";

  export let searchFieldUpdate: ChangeEventHandler<HTMLInputElement>;
  export let formatInnerJsonStringUpdate: ChangeEventHandler<HTMLInputElement>;
</script>

<div class="action-form">
  <div class="input-block">
    <input placeholder="搜索字段" on:input={searchFieldUpdate} />
    <i class="suffix-icon"></i>
  </div>

  <div class="switch-block" aria-checked="false">
    <label class="switch">
      <input type="checkbox" on:change={formatInnerJsonStringUpdate} />
      <span class="slider"></span>
    </label>
    <span class="label" aria-hidden="true"> 格式化内部JSON </span>
  </div>
</div>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .action-form {
    position: absolute;
    z-index: 10;
    right: 70px;
    display: flex;
    flex-direction: column;

    > div {
      margin: 5px;
    }
  }

  .input-block {
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
      mask-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBkPSJNNDE2IDIwOGMwIDQ1LjktMTQuOSA4OC4zLTQwIDEyMi43TDUwMi42IDQ1Ny40YzEyLjUgMTIuNSAxMi41IDMyLjggMCA0NS4zcy0zMi44IDEyLjUtNDUuMyAwTDMzMC43IDM3NmMtMzQuNCAyNS4yLTc2LjggNDAtMTIyLjcgNDBDOTMuMSA0MTYgMCAzMjIuOSAwIDIwOFM5My4xIDAgMjA4IDBTNDE2IDkzLjEgNDE2IDIwOHpNMjA4IDM1MmExNDQgMTQ0IDAgMSAwIDAtMjg4IDE0NCAxNDQgMCAxIDAgMCAyODh6Ii8+PC9zdmc+");
    }
  }

  .switch-block {
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

    > span.label {
      font-size: 12px;
      margin-left: 5px;
    }
  }
</style>
