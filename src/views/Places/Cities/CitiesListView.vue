 

<script setup lang="ts">
import DataList from 'v-dashkit/data/DataList';
import { useNotificationStore } from 'v-dashkit/stores'
import type { CitiesListResponse, CitiesListRow } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/places_city_definitions_pb'
import apiClient from '@/api/ApiClient';
import { TableHeaderText, TableHeaderCount, TableHeaderLink, TableHeaderDate } from 'v-dashkit/utils/table'
import { FilterMatchMode } from 'primevue/api';
import { useI18n } from 'vue-i18n'
import type { DataListProps, TableRouter, ITableHeader } from 'v-dashkit/types';

const no = useNotificationStore()

const { t } = useI18n()

const { records, deletedRecords, options } = await apiClient.citiesList({})
const dataKey = "cityId"
const viewRouter: TableRouter = {
    name: "cities_find",
    paramName: "id",
    paramColumnName: dataKey
}
const headers: Record<string, ITableHeader> = {
    'cityName': new TableHeaderText('cityName', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "cityName",
                placeholder: t("cityName")
            }
        }
    }),
    'districtsCount': new TableHeaderCount('districtsCount', {
        sortable: true,
        filter: {
            matchMode: FilterMatchMode.GREATER_THAN,
            input: {
                $formkit: 'number',
                prefixIcon: "number",
                outerClass: "col-12 sm:col-6 md:col-3",
                number: true,
                name: "districtsCount",
                validationVisibility: "live",
                placeholder: t("districtsCountMoreThan")
            }
        }
    }),
    'cityCode': new TableHeaderText('cityCode', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "cityCode",
                placeholder: t("cityCode")
            }
        }
    }),
    'createdAt': new TableHeaderDate('createdAt', {
        sortable: true,
        filter: {
            matchMode: FilterMatchMode.DATE_AFTER,
            input: {
                $formkit: 'picker',
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "createdAt",
                placeholder: t("createdAt")
            }
        }
    }),
}


const tableProps: DataListProps<CitiesListResponse, CitiesListRow> = {
    title: "city",
    dataKey: dataKey,
    records: records,
    exportable: true,
    deletedRecords: deletedRecords,
    viewRouter: viewRouter,
    displayType: "card",
    fetchFn: apiClient.citiesList as any,
    options: options! as any,
    headers
}


</script>
<template>
    <Suspense timeout="0">
        <template #default>
            <DataList class="sm-column" :displayType="tableProps.displayType" :fetchFn="tableProps.fetchFn"
                :viewRouter="tableProps.viewRouter" :title="tableProps.title" :dataKey="tableProps.dataKey"
                :records="records" :exportable="tableProps.exportable" :options="tableProps.options"
                :deletedRecords="deletedRecords" :headers="tableProps.headers">
                <template #start="{ data }">
                    <div class="Districts">
                        <h3>{{ $t('Districts') }}</h3>
                        <h2>{{ data.districtsCount }}</h2>
                    </div>
                    <div class="users">
                        <h3>{{ $t('Code') }}</h3>
                        <h2>{{ data.cityCode }} </h2>
                    </div>
                </template>
                <template #end="{ data }">
                    <h1 class="mt-2">{{ data.cityName }} </h1>
                    <!-- <h4>{{ $t('createdAt') }} : </h4> -->
                    <!-- <span class="text-center"> {{ data.createdAt }} </span> -->
                </template>
            </DataList>
        </template>
        <template #fallback>
            <h2>loading table component from cities list</h2>
        </template>
    </Suspense>
</template>


<style   lang="scss">
.card-start,
.card-end,
.card-start>div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.card-start {
    background: var(--color-primary);
    gap: 5px;

    & h2,
    h3 {
        color: #fff !important;

    }

    & h2 {
        font-weight: 800;
        font-size: 32px;
    }
}
</style> 