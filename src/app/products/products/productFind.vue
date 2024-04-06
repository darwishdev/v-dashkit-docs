 

<script setup lang="ts">
import DataList from 'v-dashkit/data/DataList';
import type { ProductFindResponse } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/products_products_definitions_pb'
import type { ProductIngredient } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/products_ingredients_definitions_pb'
import type { ProductModifiersView } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/products_views_pb'
import apiClient from '@/api/ApiClient';
import { TableHeaderText, TableHeaderCount, TableHeaderLink, TableHeaderDate, TableHeaderImage, TableHeaderTag } from 'v-dashkit/utils/table';
import { FilterMatchMode } from 'primevue/api';
import { useI18n } from 'vue-i18n'
import type { DataListProps, TableRouter, ITableHeader } from 'v-dashkit/types';
import { useRouter } from 'vue-router';
const { currentRoute } = useRouter();
import ProductModifiers from './productsModifiers.vue'
import ProductIngredients from './productIngredients.vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';


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
        fetchFn: apiClient.productFind({productId : productId}) as any,
        options: {
            title: t('product_ingredients'),
            hideSelectCheckbox: true,
            hideDeleteFilter: true,
            description: t('product_ingredients')
        },
        headers : productIngredientsHeaders
    }
}


// product modifiers table

const modifiersDataKey = "modifierId"
const modifiersViewRouter: TableRouter = {
    name: "modifiers_find",
    paramName: "id",
    paramColumnName: modifiersDataKey
}
const productModifiersHeaders: Record<string, ITableHeader> = {
    'modifierId': new TableHeaderLink('modifierId', {
        sortable: true,
        isGlobalFilter: true,
        router: modifiersViewRouter
    }),
    'modifierName': new TableHeaderText('modifierName', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-4",
                name: "modifierName",
                placeholder: t("modifierName")
            }
        }
    }),
    // 'modifierImage': new TableHeaderImage('modifierImage', {
    //     sortable: false,
    // }),
    'minChoices': new TableHeaderCount('minChoices', {
        sortable: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'number',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-4",
                name: "minChoices",
                placeholder: t("minChoicesMoreThan")
            }
        }
    }),
    'maxChoices': new TableHeaderCount('maxChoices', {
        sortable: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'number',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-4",
                name: "maxChoices",
                placeholder: t("maxChoicesMoreThan")
            }
        }
    }),
}
const modifiersTableProps: DataListProps<ProductFindResponse, ProductModifiersView> = {
    context: {
        title: "product_modifiers",
        dataKey: modifiersDataKey,
        records: item?.modfieirs as any,
        exportable: true,
        viewRouter: modifiersViewRouter,
        paginationOptions: {
            paginator: true
        },
        displayType: "table",
        fetchFn: apiClient.productFind({productId : productId}) as any,
        options: {
            title: t('product_modifiers'),
            hideSelectCheckbox: true,
            hideDeleteFilter: true,
            description: t('product_modifiers')
        },
        headers : productModifiersHeaders
    }
}


</script>
<template>
    <div class="flex align-items-center my-3 p-4 w-full bg-card">
        <app-image :src="item?.productImage" />
        <div class="col-10 flex flex-column py-3 mx-5">
            <div class="flex align-items-center bg-card w-full p-5 border-round">
            <h2 class="font-bold w-2 text-center">{{ item?.productName }}</h2>
                <div class="mx-4 text-sm">
                    <h2 class="font-bold">{{ item?.productPrice.toFixed(2) }} <span class="text-sm">{{ t('currency') }}</span>
                    </h2>
                    <h4>{{ t('productPrice') }}</h4>
                </div>
                <div class="mx-4 text-sm">
                    <h2 class="font-bold">{{ item?.productCost.toFixed(2) }} <span class="text-sm">{{ t('currency') }}</span>
                    </h2>
                    <h4>{{ t('productCost') }}</h4>
                </div>
                <div class="mx-4 text-sm">
                    <h2 class="font-bold" style="color: #0BD18A;" v-if="item?.isFinal">{{ t('yes') }}</h2>
                    <h2 class="font-bold" style="color: #FC6161;" v-else>{{ t('No') }}</h2>
                    <h4>{{ t('isFinal') }}</h4>
                </div>
                <div class="mx-4 text-sm">
                    <h2 class="font-bold">{{ item?.unitBuy }}</h2>
                    <h4>{{ t('unitBuy') }}</h4>
                </div>
                <div class="mx-4 text-sm">
                    <h2 class="font-bold">{{ item?.unitSell }}</h2>
                    <h4>{{ t('unitSell') }}</h4>
                </div>
                <div class="mx-4 text-sm">
                    <h2 class="font-bold">{{ item?.categoryName }}</h2>
                    <h4>{{ t('categoryName') }}</h4>
                </div>
            </div>
        </div>
    </div>
    <div class="my-5">
        <DataTable :value="item?.ingredients" tableStyle="min-width: 50rem" dataKey="ingredientId">
            <template #header>
                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                    <span class="text-xl text-900 font-bold">{{ t('ingredients_list') }}</span>
                </div>
            </template>
            <Column field="ingredientId" :sortable="true" :header="t('ingredientId')"></Column>
            <Column field="ingredientName" :sortable="true" :header="t('ingredientName')">
            </Column>
            <Column :header="t('ingredientImage')">
                <template #body="slotProps">
                    <app-image :src="slotProps.data.ingredientImage" />
                </template>
            </Column>
            <Column field="ingredientCost" :sortable="true" :header="t('ingredientCost')"></Column>
            <Column field="unitBuy" :header="t('unitBuy')">
            </Column>
            <Column field="unitSell" :header="t('unitSell')">
            </Column>
            <Column field="productsCount" :sortable="true" :header="t('productsCount')">
            </Column>
            <template #footer> في المجموع هناك {{ item?.ingredients.length  }} مكونات </template>
        </DataTable>
    </div>
    <div class="my-5">
        <DataTable :value="item?.modfieirs" tableStyle="min-width: 50rem">
            <template #header>
                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                    <span class="text-xl text-900 font-bold">{{ t('modifiers_list') }}</span>
                </div>
            </template>
            <Column field="modifierId" :header="t('modifierId')"></Column>
            <Column field="modifierName" :header="t('modifierName')">
            </Column>
            <Column field="minChoices" :header="t('minChoices')"></Column>
            <Column field="maxChoices" :header="t('maxChoices')">
            </Column>
            <template #footer> في المجموع هناك {{ item?.modfieirs.length  }} معدلات </template>
        </DataTable>
    </div>
    <!-- <DataList id="modifiers" class="sm-column my-5" :context="modifiersTableProps.context">
    </DataList> -->


</template>

<style>

</style> 