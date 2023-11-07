<script  lang="ts">
function mockLoad() {
    return new Promise(r => setTimeout(r, 3000))
}
</script>
<script setup lang="ts">
await mockLoad()
</script>
<template>
    <div>
       <h1>District Find</h1>
    </div>
</template>