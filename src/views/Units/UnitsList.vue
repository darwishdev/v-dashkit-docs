 

<script setup lang="ts">
import DataList from 'v-dashkit/data/DataList';
import { useNotificationStore } from 'v-dashkit/stores'
import type { UnitsListResponse, UnitsListRow } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/products_units_definitions_pb'
import apiClient from '@/api/ApiClient';
import { TableHeaderText, TableHeaderCount, TableHeaderLink, TableHeaderDate } from 'v-dashkit/utils/table'
import { FilterMatchMode } from 'primevue/api';
import { useI18n } from 'vue-i18n'
import type { DataListProps, TableRouter, ITableHeader } from 'v-dashkit/types';


const { t } = useI18n()

const { records, deletedRecords, options } = await apiClient.unitsList({})
const dataKey = "unitId"
const viewRouter: TableRouter = {
    name: "units_find",
    paramName: "id",
    paramColumnName: dataKey
}
const headers: Record<string, ITableHeader> = {
    'unitId': new TableHeaderLink('unitId', {
        sortable: true,
        isGlobalFilter: true,
        router: viewRouter
    }),
    'unitBuy': new TableHeaderText('unitBuy', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "unitBuy",
                placeholder: t("unitBuy")
            }
        }
    }),
    'unitSell': new TableHeaderText('unitSell', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "unitSell",
                placeholder: t("unitSell")
            }
        }
    }),
    'unitRatio': new TableHeaderCount('unitRatio', {
        sortable: true,
    }),
    'productsCount': new TableHeaderCount('productsCount', {
        sortable: true,
        filter: {
            matchMode: FilterMatchMode.GREATER_THAN,
            input: {
                $formkit: 'number',
                prefixIcon: "number",
                outerClass: "col-12 sm:col-6 md:col-3",
                number: true,
                name: "productsCount",
                validationVisibility: "live",
                placeholder: t("permissionsCountMoreThan")
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


const tableProps: DataListProps<UnitsListResponse, UnitsListRow> = {
    title: "units",
    dataKey: "unitId",
    records: records,
    exportable: true,
    deletedRecords: deletedRecords,
    viewRouter: viewRouter,
    displayType: "table",
    fetchFn: apiClient.unitsList as any,
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
            </DataList>
        </template>
        <template #fallback>
            <h2>loading table component from roles list</h2>
        </template>
    </Suspense>
</template>

<style>
.app-table.table-card tbody.p-datatable-tbody tr:not(.p-datatable-emptymessage) td.card-start {
    padding: 0;
}
.categoryImage img {
  width: 100%;
  height: 100%;
  max-width: 150px;
  min-width: 100px;
  border-radius: 6px 0 0 6px;
  background: none;
}
</style> 