<script lang="ts">
  import * as dataType from "@utils/data-type";
  import { DataType, valueType } from "@utils/data-type";
  import JSONBigFix from "@utils/bignumber-json";

  export let value: any;
  export let keyName: any;
  export let showComma: boolean;
  export let path: string[];
  export let className: string;

  let collapsed = false;

  function rootType(keyName: any): string {
    if (keyName === false) {
      return "";
    }

    if (typeof keyName === "number") {
      return "arrElem";
    }

    return "objProp";
  }

  function escapedString(val: string): string {
    let ss = JSONBigFix.stringify(val);
    return ss.substring(1, ss.length - 1);
  }

  function isHttpLinkString(val: string): boolean {
    if (val[0] === "h" && val.substring(0, 4) === "http") {
      return true;
    }

    return false;
  }

  function isComplexType(val: any): boolean {
    const type = dataType.valueType(val);

    if (type !== DataType.OBJECT && type !== DataType.ARRAY) {
      return false;
    }

    return isNoneZeroSize(val);
  }

  function isNoneZeroSize(val: any): boolean {
    return sizeCounter(val) > 0;
  }

  function sizeCounter(val: any): number {
    let cnt = 0;
    for (const objKey in val) {
      if (!Object.hasOwnProperty.bind(val)(objKey)) {
        continue;
      }

      cnt += 1;
    }

    return cnt;
  }
</script>

<div class="viewer {className}">
  <span class="kvov {rootType(keyName)}">
    <!-- expander -->
    {#if isComplexType(value)}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <span
        class="e {collapsed ? 'collapsed' : ''}"
        on:click={() => {
          collapsed = !collapsed;
        }}
      />
    {/if}

    <!-- object-key -->
    {#if rootType(keyName) === "objProp"}
      <span class="object-key">
        <span class="double-quotation">"</span>
        <span class="k" data-path={path.join(".")}>
          {JSON.stringify(keyName)?.slice(1, -1)}
        </span>
        <span class="double-quotation">":{"\u00A0"}</span>
      </span>
    {/if}

    <!-- object-value -->
    {#if valueType(value) === DataType.NUMBER}
      <!-- number -->
      <span class="n">{value}</span>
    {:else if valueType(value) === DataType.BIGNUMBER}
      <!-- big number -->
      <span class="n">{value.toString(10)}</span>
    {:else if valueType(value) === DataType.NULL}
      <!-- null -->
      <span class="nl">null</span>
    {:else if valueType(value) === DataType.BOOL}
      <!-- bool -->
      <span>
        {#if value}
          <span class="bl">true</span>
        {:else}
          <span class="bl">false</span>
        {/if}
      </span>
    {:else if valueType(value) === DataType.STRING}
      <!-- string -->
      <span class="s">
        <span class="double-quotation">"</span>
        {#if isHttpLinkString(value)}
          <a href={value} target="_blank">
            <span class="string-value">{escapedString(value)}</span>
          </a>
        {:else}
          <span class="string-value">{escapedString(value)}</span>
        {/if}
        <span class="double-quotation">"</span>
      </span>
    {:else if valueType(value) === DataType.OBJECT}
      <!-- object -->
      <span class="object-value">
        <span class="b">{"{"}</span>

        {#if collapsed}
          <span class="ell">...</span>
        {/if}

        {#each Object.keys(value).entries() as [index, name]}
          {@const item = value[name]}

          {#if isNoneZeroSize(value) && !collapsed}
            <svelte:self
              value={item}
              keyName={name}
              path={[...path, name]}
              showComma={index !== sizeCounter(value) - 1}
              className="blockInner"
            />
          {/if}
        {/each}

        <span class="b">{"}"}</span>
      </span>
    {:else if valueType(value) === DataType.ARRAY}
      <!-- array -->
      <span class="object-value">
        <span class="b">[</span>

        {#if collapsed}
          <span class="ell">...</span>
        {/if}

        {#each value as item, index}
          {#if isNoneZeroSize(value) && !collapsed}
            <svelte:self
              value={item}
              keyName={index}
              path={[...path, `[${index}]`]}
              showComma={index !== value.length - 1}
              className=""
            />
          {/if}
        {/each}

        <span class="b">]</span>
      </span>
    {/if}

    {#if showComma}
      <span class="comma">,</span>
    {/if}

    {#if collapsed}
      <span class="ell">
        // {sizeCounter(value)}
        {sizeCounter(value) > 1 ? "items" : "item"}
      </span>
    {/if}
  </span>
</div>

<style lang="scss">
  .viewer {
    color: #444;
    font-family: "Monaco", "Menlo", "Ubuntu Mono", "Consolas", "source-code-pro";
    padding-left: 28px;
    padding-top: 2px;
    position: relative;
    font-size: 0;
  }

  .kvov {
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
    // display: block;
    position: absolute;
    left: 4px;
    top: 2px;
    z-index: 5;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAD1JREFUeNpiYGBgOADE%2F3Hgw0DM4IRHgSsDFOzFInmMAQnY49ONzZRjDFiADT7dMLALiE8y4AGW6LoBAgwAuIkf%2F%2FB7O9sAAAAASUVORK5CYII%3D");
    background-repeat: no-repeat;
    background-position: center center;
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

  span.k,
  span.n,
  span.nl,
  span.bl,
  span.nl,
  span.nl,
  span.nl,
  span.double-quotation,
  span.string-value,
  span.b,
  span.ell,
  span.comma {
    font-size: 0.8rem;
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
