 

<script setup lang="ts">
import DataList from 'v-dashkit/data/DataList';
import apiClient from '@/api/ApiClient';
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router';
const { currentRoute } = useRouter();
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';


const { t } = useI18n()

const CategoryId = parseInt(currentRoute.value.params.id as string)
const categoryResponse = await apiClient.categoryFind({categoryId : CategoryId})

</script>
<template>
    <div class="flex align-items-center my-3 p-4 w-full bg-card">
        <app-image :src="categoryResponse?.categoryImage" />
        <div class="col-10 flex flex-column py-3 mx-5">
            <!-- <div class="flex align-items-center bg-card w-full p-5 border-round"> -->
            <h2 class="font-bold text-center">{{ categoryResponse?.categoryName }}</h2>
            <!-- </div> -->
        </div>
    </div>

    <div class="my-5">
        <DataTable :value="categoryResponse?.categoryProducts" tableStyle="min-width: 50rem" dataKey="productId">
            <template #header>
                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                    <span class="text-xl text-900 font-bold">{{ t('products_list') }}</span>
                </div>
            </template>
            <Column field="productId" :sortable="true" :header="t('productId')">
                <template #body="slotProps">
                    <router-link :to="`/products/${slotProps.data.productId}`"><p>{{ slotProps.data.productId }}</p></router-link>
                </template>
            </Column>
            <Column field="productName" :sortable="true" :header="t('productName')">
            </Column>
            <Column :header="t('productImage')">
                <template #body="slotProps">
                    <app-image :src="slotProps.data.productImage" />
                </template>
            </Column>
            <Column field="productPrice" :sortable="true" :header="t('productPrice')">
            </Column>
            <template #footer> في المجموع هناك {{ categoryResponse?.categoryProducts.length  }} منتجات </template>
        </DataTable>
    </div>
    <!-- <DataList id="modifiers" class="sm-column my-5" :context="modifiersTableProps.context">
    </DataList> -->


</template>

<style>

</style> 