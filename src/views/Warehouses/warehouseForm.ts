import type {
    WarehouseCreateRequest , WarehouseCreateResponse , WarehouseUpdateRequest , WarehouseUpdateResponse
} from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/products_warehouses_definitions_pb'
import type { AppFormProps, AppFormSection } from 'v-dashkit/types';
import type { FormKitSchemaNode } from '@formkit/core';
import apiClient from '@/api/ApiClient';

const getSections = (t: Function): Record<string, AppFormSection | FormKitSchemaNode[]> => {
    return {
        '': [
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12",
                name: "warehouseName",
                validation: "required",
                placeholder: t("warehouseNamePlaceholder"),
                label: t("warehouseNameLabel")
            },
        ],
    }

}

const redirectRoute = 'warehouses_list'

export const getWarehouseFormProps =
    async <T extends 'create' | 'update'>(
        t: Function,
        formType: T
    ): Promise<AppFormProps<T extends 'create' ? WarehouseCreateRequest : WarehouseUpdateRequest, T extends 'create' ? WarehouseCreateResponse : WarehouseUpdateResponse>> => {

        return new Promise(r => {
            if (formType == 'create') {
                const formProps = {
                    title: "warehouse_create",
                    submitHandler: {
                        endpoint: apiClient.warehouseCreate,
                        redirectRoute
                    },
                    sections: getSections(t)
                }
                setTimeout(() => r(formProps), 100)

                return
            }

            const formProps = {
                title: "warehouse_update",
                submitHandler: {
                    endpoint: apiClient.warehouseUpdate,
                    redirectRoute
                },
                sections: getSections(t),
                findHandler: {
                    endpoint: apiClient.warehouseFindForUpdate,
                    requestPropertyName: 'warehouseId'
                }
            }

            setTimeout(() => r(formProps), 100)
        })



    }


