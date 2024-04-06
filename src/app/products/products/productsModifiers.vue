 

<script setup lang="ts">
import DataList from 'v-dashkit/data/DataList';
import type { ProductFindResponse } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/products_products_definitions_pb'
import type { ProductModifiersView } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/products_views_pb'
import apiClient from '@/api/ApiClient';
import { TableHeaderText, TableHeaderCount, TableHeaderLink } from 'v-dashkit/utils/table';
import { FilterMatchMode } from 'primevue/api';
import { useI18n } from 'vue-i18n'
import type { DataListProps, TableRouter, ITableHeader } from 'v-dashkit/types';
import { useRouter } from 'vue-router';
const { currentRoute } = useRouter();
const { t } = useI18n()

const productId = parseInt(currentRoute.value.params.id as string)
const { item } = await apiClient.productFind({productId : productId})

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
        // fetchFn: apiClient.productFind({productId : productId}) as any,
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
    <div id="modifiers">
        <DataList class="sm-column my-5" id="modfierss" :context="modifiersTableProps.context">
        </DataList>
    </div>
</template>

<style>

</style> 