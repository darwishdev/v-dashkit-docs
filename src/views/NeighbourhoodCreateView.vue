 
<script setup lang="ts">
import AppForm from 'v-dashkit/form/AppForm';
import { useI18n } from 'vue-i18n';
import { getNeighbourhoodFormProps } from './NeighbourhoodForm'
const { t } = useI18n()

const formProps = await getNeighbourhoodFormProps(t, 'create')
</script>
<template>
    <app-form :formProps="formProps" />
</template>
<style>
[data-type='dropdown'] .formkit-inner {
    background-color: var(--fk-bg-input);
}
</style>