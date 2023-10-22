 

<script setup lang="ts">
import DataList from 'v-dashkit/data/DataList';
import { useNotificationStore } from 'v-dashkit/stores'
import type { NeighbourhoodsListResponse , NeighbourhoodsListRow } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/places_neighbourhood_definitions_pb'
import apiClient from '@/api/ApiClient';
import { TableHeaderText, TableHeaderCount, TableHeaderLink, TableHeaderDate } from 'v-dashkit/utils/table'
import { FilterMatchMode } from 'primevue/api';
import { useI18n } from 'vue-i18n'
import type { DataListProps, TableRouter, ITableHeader } from 'v-dashkit/types';


const { t } = useI18n()

const { records, deletedRecords, options } = await apiClient.neighbourhoodsList({})
const dataKey = "neighbourhoodId"
const viewRouter: TableRouter = {
    name: "neighbourhoods_find",
    paramName: "id",
    paramColumnName: dataKey
}
const headers: Record<string, ITableHeader> = {
    'neighbourhoodId': new TableHeaderLink('neighbourhoodId', {
        sortable: true,
        isGlobalFilter: true,
        router: viewRouter
    }),
    'neighbourhoodName': new TableHeaderText('neighbourhoodName', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "neighbourhoodName",
                placeholder: t("neighbourhoodName")
            }
        }
    }),
    'neighbourhoodCode': new TableHeaderCount('neighbourhoodCode', {
        sortable: true,
        filter: {
            matchMode: FilterMatchMode.GREATER_THAN,
            input: {
                $formkit: 'number',
                prefixIcon: "number",
                outerClass: "col-12 sm:col-6 md:col-3",
                number: true,
                name: "neighbourhoodCode",
                validationVisibility: "live",
                placeholder: t("neighbourhoodCode")
            }
        }
    }),
    'cityName': new TableHeaderLink('cityName', {
        sortable: true,
        router : {
            name: "cities_find",
            paramName: "id",
            paramColumnName: 'cityId'
        },
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
    'cityCode': new TableHeaderCount('cityCode', {
        sortable: true,
    }),
    'districtName': new TableHeaderLink('districtName', {
        sortable: true,
        router : {
            name: "districts_find",
            paramName: "id",
            paramColumnName: 'districtId'
        }
    }),
    'neighbourhoodsCount': new TableHeaderCount('neighbourhoodsCount', {
        sortable: true,
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


const tableProps: DataListProps<NeighbourhoodsListResponse, NeighbourhoodsListRow> = {
    title: "neighbourhoods",
    dataKey: dataKey,
    records: records,
    exportable: true,
    deletedRecords: deletedRecords,
    viewRouter: viewRouter,
    displayType: "table",
    fetchFn: apiClient.neighbourhoodsList,
    options: options!,
    headers
}

</script>

<template>
    <Suspense timeout="0">
        <template #default>
            <DataList :displayType="tableProps.displayType" :fetchFn="tableProps.fetchFn"
                :viewRouter="tableProps.viewRouter" :title="tableProps.title" :dataKey="tableProps.dataKey"
                :records="records" :exportable="tableProps.exportable" :options="tableProps.options"
                :deletedRecords="deletedRecords" :headers="tableProps.headers">
            </DataList>
        </template>
        <template #fallback>
            <h2>loading table component from neighborhoods list</h2>
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