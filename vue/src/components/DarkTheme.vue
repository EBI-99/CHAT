<script setup lang="ts">
const isDArk = useDark()
const toggle = useToggle(isDArk)
</script>

<template>
  <div>
    <button i-carbon-sun dark:i-carbon-moon @click="toggle()" />
  </div>
</template>
