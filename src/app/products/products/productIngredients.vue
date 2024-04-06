 

<script setup lang="ts">
import DataList from 'v-dashkit/data/DataList';
import type { ProductFindResponse } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/products_products_definitions_pb'
import type { ProductIngredient } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/products_ingredients_definitions_pb'
import apiClient from '@/api/ApiClient';
import { TableHeaderText, TableHeaderCount, TableHeaderLink, TableHeaderImage, TableHeaderTag } from 'v-dashkit/utils/table';
import { FilterMatchMode } from 'primevue/api';
import { useI18n } from 'vue-i18n'
import type { DataListProps, TableRouter, ITableHeader } from 'v-dashkit/types';
import { useRouter } from 'vue-router';
const { currentRoute } = useRouter();
const { t } = useI18n()

const productId = parseInt(currentRoute.value.params.id as string)
const { item } = await apiClient.productFind({productId : productId})



// Product ingredients Table
const ingredientsDataKey = "ingredientId"
const ingredientsViewRouter: TableRouter = {
    name: "ingredients_find",
    paramName: "id",
    paramColumnName: ingredientsDataKey
}
const productIngredientsHeaders: Record<string, ITableHeader> = {
    'ingredientId': new TableHeaderLink('ingredientId', {
        sortable: true,
        isGlobalFilter: true,
        router: ingredientsViewRouter
    }),
    'ingredientName': new TableHeaderText('ingredientName', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-4",
                name: "ingredientName",
                placeholder: t("ingredientName")
            }
        }
    }),
    'ingredientImage': new TableHeaderImage('ingredientImage', {
        sortable: false,
    }),
    'ingredientCost': new TableHeaderCount('ingredientCost', {
        sortable: true,
        filter: {
            matchMode: FilterMatchMode.GREATER_THAN,
            input: {
                $formkit: 'text',
                prefixIcon: "number",
                outerClass: "col-12 sm:col-6 md:col-4",
                name: "ingredientCost",
                placeholder: t("ingredientCostMoreThan")
            }
        }  
    }),
    'unitBuy': new TableHeaderTag('unitBuy', {
        sortable: true,
    }),
    'unitSell': new TableHeaderTag('unitSell', {
        sortable: true,
    }),
    'productsCount': new TableHeaderText('productsCount', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.GREATER_THAN,
            input: {
                $formkit: 'text',
                prefixIcon: "number",
                outerClass: "col-12 sm:col-6 md:col-4",
                name: "productsCount",
                placeholder: t("productsCountMoreThan")
            }
        }  
    }),
}

const ingredientsTableProps: DataListProps<ProductFindResponse, ProductIngredient> = {
    context: {
        title: "product_ingredients",
        dataKey: ingredientsDataKey,
        records: item?.ingredients as any,
        exportable: true,
        viewRouter: ingredientsViewRouter,
        paginationOptions: {
            paginator: true
        },
        displayType: "table",
        // fetchFn: apiClient.productFind({productId : productId}) as any,
        options: {
            title: t('product_ingredients'),
            hideSelectCheckbox: true,
            hideDeleteFilter: true,
            description: t('product_ingredients')
        },
        headers : productIngredientsHeaders
    }
}
</script>
<template>
    <div id="ingredients">
        <DataList id="ingredientss" class="sm-column" :context="ingredientsTableProps.context">
        </DataList>
    </div>
</template>

<style>

</style> 