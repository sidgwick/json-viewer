<script lang="ts">
  import JsonViewer from "./example/JsonViewer.svelte";
  import CharacterForm from "./example/CharacterForm.svelte";
</script>

<main>
  <div id="app">
    <JsonViewer />
    <hr style="width:100%; margin: 10px" />
    <CharacterForm />
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
