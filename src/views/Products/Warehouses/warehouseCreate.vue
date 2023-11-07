 
<script setup lang="ts">
import AppForm from 'v-dashkit/form/AppForm';
import { useI18n } from 'vue-i18n';
import { getWarehouseFormProps } from './warehouseForm'
const { t } = useI18n()

const formProps = await getWarehouseFormProps(t, 'create')
</script>
<template>
    <app-form :formProps="formProps" />
</template>