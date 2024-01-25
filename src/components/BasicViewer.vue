<template>
  <div class="viewer">
    <span :class="['kvov', rootType]">
      <!-- expander -->
      <span
        v-if="isComplexType"
        :class="['e', collapsed ? 'collapsed' : '']"
        @click="collapsed = !collapsed"
      />

      <!-- object-key -->
      <span v-if="rootType === 'objProp'">
        <span>"</span>
        <span class="k" :_path="path.join('.')">{{
          JSON.stringify(keyName).slice(1, -1)
        }}</span>
        <span>":{{ "\u00A0" }}</span>
      </span>

      <!-- object-value -->
      <!-- number -->
      <span v-if="isType('number')" class="n">{{ value }}</span>

      <!-- big number -->
      <span v-else-if="isType('big-number')" class="n">{{
        value.toString(10)
      }}</span>

      <!-- null -->
      <span v-else-if="isType('null')" class="nl">null</span>

      <!-- bool -->
      <span v-else-if="isType('bool')">
        <span v-if="value" class="bl">true</span>
        <span v-else class="bl">false</span>
      </span>

      <!-- string -->
      <span v-else-if="isType('string')">
        <span class="s">
          <span>"</span>
          <a v-if="isHttpLinkString" :href="value" target="_blank">
            <span>{{ escapedString }}</span>
          </a>
          <span v-else>{{ escapedString }}</span>
          <span>"</span>
        </span>
      </span>

      <!-- object -->
      <span v-else-if="isType('object')">
        <span class="b">{</span>
        <span v-show="collapsed" class="ell">...</span>
        <BasicViewer
          v-for="(item, name, index) in value"
          v-show="isNoneZeroSize && !collapsed"
          :key="name + index"
          :value="item"
          :key-name="name"
          :path="[...path, name]"
          :show-comma="index !== sizeCounter - 1"
          class="blockInner"
        />
        <span class="b">}</span>
      </span>

      <!-- array -->
      <span v-else-if="isType('array')">
        <span class="b">[</span>
        <span v-show="collapsed" class="ell">...</span>
        <BasicViewer
          v-for="(item, index) in value"
          v-show="isNoneZeroSize && !collapsed"
          :key="`[${index}]` + index"
          :value="item"
          :key-name="index"
          :path="[...path, `[${index}]`]"
          :show-comma="index !== value.length - 1"
        />
        <span class="b">]</span>
      </span>

      <span v-if="showComma">,</span>
      <span v-if="collapsed" class="ell">
        // {{ sizeCounter }} {{ sizeCounter > 1 ? "items" : "item" }}
      </span>
    </span>
  </div>
</template>

<script>
import JSONbig from "json-bigint";
import * as dataType from "@/utils/data-type";

export default {
  name: "BasicViewer",
  props: {
    value: null,
    keyName: null,
    showComma: {
      type: Boolean,
      default: false,
    },
    path: {
      type: Array,
      required: true,
    },
  },
  data: function () {
    return {
      collapsed: false,
    };
  },
  computed: {
    rootType() {
      console.log(this.keyName, this.keyName instanceof Number);
      if (this.keyName === false) {
        return "";
      }

      if (typeof this.keyName === "number") {
        return "arrElem";
      }

      return "objProp";
    },
    escapedString() {
      var ss = JSONbig.stringify(this.value);
      return ss.substring(1, ss.length - 1);
    },
    isHttpLinkString() {
      var value = this.value;

      if (value[0] === "h" && value.substring(0, 4) === "http") {
        return true;
      }

      return false;
    },
    isComplexType() {
      const type = dataType.valueType(this.value);

      if (
        type !== dataType.DataType.OBJECT &&
        type !== dataType.DataType.ARRAY
      ) {
        return false;
      }

      return this.isNoneZeroSize;
    },
    isNoneZeroSize() {
      return this.sizeCounter > 0;
    },
    sizeCounter() {
      const value = this.value;

      var cnt = 0;
      for (const objKey in value) {
        if (!Object.hasOwnProperty.bind(value)(objKey)) {
          continue;
        }

        cnt += 1;
      }

      return cnt;
    },
  },
  methods: {
    isType: function (type) {
      switch (type) {
        case "string":
          return dataType.isString(this.value);
        case "array":
          return dataType.isArray(this.value);
        case "number":
          return dataType.isNumber(this.value);
        case "big-number":
          return dataType.isBigNumber(this.value);
        case "null":
          return dataType.isNull(this.value);
        case "bool":
          return dataType.isBool(this.value);
        case "object":
          return dataType.isObject(this.value);
      }
    },
  },
};
</script>

<style lang="scss">
.viewer {
  color: #444;
  font: 13px/18px monospace;
  padding-left: 28px;
  padding-top: 2px;
  position: relative;
}

.kvov {
  display: block;
  padding-left: 20px;
  margin-left: -20px;
}

.ell {
  margin: 0 4px;
  color: #888;
}

.e {
  width: 20px;
  height: 18px;
  display: block;
  position: absolute;
  left: 4px;
  top: 2px;
  z-index: 5;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAD1JREFUeNpiYGBgOADE%2F3Hgw0DM4IRHgSsDFOzFInmMAQnY49ONzZRjDFiADT7dMLALiE8y4AGW6LoBAgwAuIkf%2F%2FB7O9sAAAAASUVORK5CYII%3D");
  background-repeat: no-repeat;
  background-position: center center;
  display: block;
  opacity: 0.15;

  &.collapsed {
    transform: rotate(-90deg);
    width: 18px;
    height: 20px;

    left: 6px;
    top: 1px;
  }

  &:hover {
    opacity: 0.35;
  }

  &:active {
    opacity: 0.5;
  }
}

.blockInner {
  display: block;
  padding-left: 24px;
  border-left: 1px dotted #bbb;
  margin-left: 2px;
}

.arrElem {
  border-left: 1px dotted #bbb;
}

/* SYNTAX HIGHLIGHTING */
.b /* Bracket/brace */ {
  font-weight: bold;
}

.s {
  color: #0b7500;
  word-wrap: break-word;
}

a:link,
a:visited {
  text-decoration: none;
  color: inherit;
}
a:hover,
a:active {
  text-decoration: underline;
  color: #050;
}

.bl,
.nl,
.n {
  /* bool, null, number */
  font-weight: bold;
  color: #1a01cc;
}

.k {
  /* key */
  color: black;
}
</style>
