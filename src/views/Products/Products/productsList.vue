 

<script setup lang="ts">
import DataList from 'v-dashkit/data/DataList';
import type { ProductsListResponse , ProductsListRow } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/products_products_definitions_pb'
import apiClient from '@/api/ApiClient';
import { TableHeaderText, TableHeaderCount, TableHeaderLink, TableHeaderDate, TableHeaderImage, TableHeaderTag } from 'v-dashkit/utils/table';
import { FilterMatchMode } from 'primevue/api';
import { useI18n } from 'vue-i18n'
import type { DataListProps, TableRouter, ITableHeader } from 'v-dashkit/types';


const { t } = useI18n()

const { records, deletedRecords, options } = await apiClient.productsList({})
const dataKey = "productId"
const viewRouter: TableRouter = {
    name: "products_find",
    paramName: "id",
    paramColumnName: dataKey
}
const headers: Record<string, ITableHeader> = {
    'productId': new TableHeaderLink('productId', {
        sortable: true,
        isGlobalFilter: true,
        router: viewRouter
    }),
    'productName': new TableHeaderText('productName', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "productName",
                placeholder: t("productName")
            }
        }
    }),
    'productCode': new TableHeaderText('productCode', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "productCode",
                placeholder: t("productCode")
            }
        }
    }),
    'productImage': new TableHeaderImage('productImage', {
        sortable: false,
    }),
    // 'productDescription': new TableHeaderText('productDescription', {
    //     sortable: false,
    // }),
    'isFinal': new TableHeaderTag('isFinal', {
        sortable: true,
    }),
    'categoryName': new TableHeaderLink('categoryName', {
        sortable: true,
        isGlobalFilter: true,
        router: {
            name: "categories_find",
            paramName: "id",
            paramColumnName: 'categoryId'
        },
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "categoryName",
                placeholder: t("categoryName")
            }
        }  
    }),
    'unitName': new TableHeaderLink('unitName', {
        sortable: true,
        isGlobalFilter: true,
        router: {
            name: "units_find",
            paramName: "id",
            paramColumnName: 'unitId'
        },
    }),
    'productCost': new TableHeaderCount('productCost', {
        sortable: true,
        filter: {
            matchMode: FilterMatchMode.GREATER_THAN,
            input: {
                $formkit: 'number',
                prefixIcon: "number",
                outerClass: "col-12 sm:col-6 md:col-3",
                number: true,
                name: "productCost",
                validationVisibility: "live",
                placeholder: t("productCostMoreThan")
            }
        }
    }),
    'productPrice': new TableHeaderCount('productPrice', {
        sortable: true,
        filter: {
            matchMode: FilterMatchMode.GREATER_THAN,
            input: {
                $formkit: 'number',
                prefixIcon: "number",
                outerClass: "col-12 sm:col-6 md:col-3",
                number: true,
                name: "productPrice",
                validationVisibility: "live",
                placeholder: t("productPriceMoreThan")
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


const tableProps: DataListProps<ProductsListResponse, ProductsListRow> = {
    title: "products",
    dataKey: "productId",
    records: records,
    exportable: true,
    deletedRecords: deletedRecords,
    viewRouter: viewRouter,
    displayType: "table",
    fetchFn: apiClient.productsList as any,
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