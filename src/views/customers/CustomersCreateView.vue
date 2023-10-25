 
<script setup lang="ts">
import AppForm from 'v-dashkit/form/AppForm';
import { useI18n } from 'vue-i18n';
import { getCustomerFormProps } from './CustomerForm'
const { t } = useI18n()

const formProps = await getCustomerFormProps(t, 'create')
</script>
<template>
    <app-form :formProps="formProps" />
</template>