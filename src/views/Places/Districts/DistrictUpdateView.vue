 
<script setup lang="ts">
import AppForm from 'v-dashkit/form/AppForm';
import { useI18n } from 'vue-i18n';
import { getDistrictFormProps } from './DistrictsForm'
const { t } = useI18n()

const formProps = await getDistrictFormProps(t, 'update')
</script>
<template>
    <app-form :formProps="formProps" />
</template>

<style>
[data-type='dropdown'] .formkit-inner {
    background-color: var(--fk-bg-input);
}
[data-family='dropdown'] .formkit-option{
}
</style>