 

<script setup lang="ts">
import DataList from 'v-dashkit/data/DataList';
import { useNotificationStore } from 'v-dashkit/stores'
import type { CustomersListResponse , CustomersListRow } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/users_customer_definitions_pb'
import apiClient from '@/api/ApiClient';
import { TableHeaderText, TableHeaderCount, TableHeaderLink, TableHeaderDate } from 'v-dashkit/utils/table'
import { FilterMatchMode } from 'primevue/api';
import { useI18n } from 'vue-i18n'
import type { DataListProps, TableRouter, ITableHeader } from 'v-dashkit/types';


const { t } = useI18n()

const { records, deletedRecords, options } = await apiClient.customersList({})
const dataKey = "customerId"
const viewRouter: TableRouter = {
    name: "customers_find",
    paramName: "id",
    paramColumnName: dataKey
}
const headers: Record<string, ITableHeader> = {
    'customerId': new TableHeaderLink('customerId', {
        sortable: true,
        isGlobalFilter: true,
        router: viewRouter
    }),
    'customerName': new TableHeaderText('customerName', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "customerName",
                placeholder: t("customerName")
            }
        }
    }),
    'customerEmail': new TableHeaderText('customerEmail', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "Email",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "customerEmail",
                placeholder: t("customerEmail")
            }
        }
    }),
    'customerPhone': new TableHeaderText('customerPhone', {
        sortable: true,
        filter: {
            matchMode: FilterMatchMode.STARTS_WITH,
            input: {
                $formkit: 'text',
                prefixIcon: "number",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "customerPhone",
                placeholder: t("customerPhone")
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


const tableProps: DataListProps<CustomersListResponse, CustomersListRow> = {
    title: "customers",
    dataKey: "customerId",
    records: records,
    exportable: true,
    deletedRecords: deletedRecords,
    viewRouter: viewRouter,
    displayType: "card",
    fetchFn: apiClient.customersList,
    options: options!,
    headers
}


</script>
<template>
    <Suspense timeout="0">
        <template #default>
            <DataList class=" customersList" :displayType="tableProps.displayType" :fetchFn="tableProps.fetchFn"
                :viewRouter="tableProps.viewRouter" :title="tableProps.title" :dataKey="tableProps.dataKey"
                :records="records" :exportable="tableProps.exportable" :options="tableProps.options"
                :deletedRecords="deletedRecords" :headers="tableProps.headers">
                <template #start="{ data }">
                    <div class="w-full h-full customerImage customerimg">
                            <app-image :src="data.customerImage" class="customerimg" />
                    </div>
                </template>
                <template #end="{ data }">
                    <div class="flex flex-column justiy-content-center mt-2">
                        <h1>{{ data.customerName.split(" ")[0] }} </h1>
                        <h3 class="hidden md:flex my-1 text-overflow-ellipsiss">{{ data.customerEmail }}</h3>
                        <div class="flex">
                            <h4 class="mx-2">{{ $t('createdAt') }} </h4>
                            <span class="text-center">: {{ new Date(data.createdAt).toLocaleDateString() }} </span>
                        </div>
                        <!-- <h4 class="mt-2">{{ data.customerPhone }}</h4> -->
                    </div>
                </template>
            </DataList>
        </template>
        <template #fallback>
            <h2>loading table component from customers list</h2>
        </template>
    </Suspense>
</template>


<style>
.text-overflow-ellipsiss {
    max-width: 16rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.app-table.table-card tbody.p-datatable-tbody tr:not(.p-datatable-emptymessage) td.card-start {
    padding: 0;
}
.customerimg img {
  width: 100%;
  height: 100%;
  max-width: 150px;
  min-width: 100px;
  border-radius: 6px 0 0 6px;
  background: none;
}
</style> 