 

<script setup lang="ts">
import DataList from 'v-dashkit/data/DataList';
import { useNotificationStore } from 'v-dashkit/stores'
import type { BranchesListResponse , BranchesListRow } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/products_branches_definitions_pb'
import apiClient from '@/api/ApiClient';
import { TableHeaderText, TableHeaderCount, TableHeaderLink, TableHeaderDate } from 'v-dashkit/utils/table'
import { FilterMatchMode } from 'primevue/api';
import { useI18n } from 'vue-i18n'
import type { DataListProps, TableRouter, ITableHeader } from 'v-dashkit/types';

const { t } = useI18n()

const { records, deletedRecords, options } = await apiClient.branchesList({})
const dataKey = "branchId"
const viewRouter: TableRouter = {
    name: "branches_find",
    paramName: "id",
    paramColumnName: dataKey
}
const headers: Record<string, ITableHeader> = {
    'branchId': new TableHeaderLink('branchId', {
        sortable: true,
        isGlobalFilter: true,
        router: viewRouter
    }),
    'branchName': new TableHeaderText('branchName', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "branchName",
                placeholder: t("branchName")
            }
        }
    }),
    'warehousesCount': new TableHeaderCount('warehousesCount', {
        sortable: true,
        filter: {
            matchMode: FilterMatchMode.GREATER_THAN,
            input: {
                $formkit: 'number',
                prefixIcon: "number",
                outerClass: "col-12 sm:col-6 md:col-3",
                number: true,
                name: "warehousesCount",
                validationVisibility: "live",
                placeholder: t("warehousesMoreThan")
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


const tableProps: DataListProps<BranchesListResponse, BranchesListRow> = {
    title: "branches",
    dataKey: "branchId",
    records: records,
    exportable: true,
    deletedRecords: deletedRecords,
    viewRouter: viewRouter,
    displayType: "card",
    fetchFn: apiClient.branchesList as any,
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
                    <div class="flex flex-column justify-content-center align-items-center">
                        <h4>{{ $t('warehouses') }} </h4>
                        <span class="text-center font-bold"> {{ data.warehousesCount }} </span>
                    </div>
                </template>
                <template #end="{ data }">
                    <div class="mt-2 w-full" style="margin: auto; display: flex; justify-content: center;">
                        <h1>{{ data.branchName }} </h1>
                    </div>
                    <h4>{{ $t('createdAt') }} </h4>
                    <span class="text-center"> {{ new Date(data.createdAt).toDateString() }} </span>
                </template>
            </DataList>
        </template>
        <template #fallback>
            <h2>loading table component from roles list</h2>
        </template>
    </Suspense>
</template>

<style lang="scss">

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