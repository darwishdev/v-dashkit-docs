 
<script setup lang="ts">
import AppForm from 'v-dashkit/form/AppForm';
import { useI18n } from 'vue-i18n';
import { getUnitFormProps } from './UnitForm'
const { t } = useI18n()

const formProps = await getUnitFormProps(t, 'update')
</script>
<template>
    <app-form :formProps="formProps" />
</template>