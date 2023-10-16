<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref, onMounted } from 'vue';
import { useThemeStore, useDialogStore, useNotificationStore, useLanguageStore } from 'v-dashkit/stores'
import { useDialog } from 'primevue/usedialog';
import { useToast } from 'primevue/usetoast';
import DynamicDialog from 'primevue/dynamicdialog';

const dialog = useDialog();
const toast = useToast();

const notificationStore = useNotificationStore()
const languageStore = useLanguageStore()
const loading = ref(true)
const themeStore = useThemeStore()
const dialogStore = useDialogStore()

languageStore.init()
themeStore.init()
notificationStore.init(toast)
dialogStore.init(dialog)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 3000)
})
</script>

<template>
  <RouterView />
  <DynamicDialog />
  <AppNotification />
  <div class="app-loading" v-if="loading">loading</div>
</template>
 