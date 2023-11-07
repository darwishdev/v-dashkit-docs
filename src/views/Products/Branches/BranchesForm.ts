import type {
    BranchCreateRequest , BranchCreateResponse , BranchUpdateRequest , BranchUpdateResponse
} from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/products_branches_definitions_pb'
import type { AppFormProps, AppFormSection } from 'v-dashkit/types';
import type { FormKitSchemaNode } from '@formkit/core';
import apiClient from '@/api/ApiClient';

const warehousesOptions = () => {
    return new Promise<any[]>((resolve) => {
        apiClient.warehousesInputList({}).then(res => resolve(res.options))  
    })
}

const getSections = (t: Function): Record<string, AppFormSection | FormKitSchemaNode[]> => {
    return {
        '': [
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12",
                name: "branchName",
                validation: "required",
                placeholder: t("branchNamePlaceholder"),
                label: t("branchNameLabel")
            },
            {
                $formkit: 'dropdown',
                outerClass: "col-12",
                closeOnSelect: false,
                name: 'warehouses',
                label: 'Warehouses',
                placeholder: 'Select warehouses',
                "empty-message": "No warehouses found",
                alwaysLoadOnOpen : true,
                multiple : true,
                options: warehousesOptions,                
            },
        ],
    }

}

const redirectRoute = 'branches_list'

export const getBranchFormProps =
    async <T extends 'create' | 'update'>(
        t: Function,
        formType: T
    ): Promise<AppFormProps<T extends 'create' ? BranchCreateRequest : BranchUpdateRequest, T extends 'create' ? BranchCreateResponse : BranchUpdateResponse>> => {

        return new Promise(r => {
            if (formType == 'create') {
                const formProps = {
                    title: "branch_create",
                    submitHandler: {
                        endpoint: apiClient.branchCreate,
                        redirectRoute
                    },
                    sections: getSections(t)
                }
                setTimeout(() => r(formProps), 100)

                return
            }

            const formProps = {
                title: "branch_update",
                submitHandler: {
                    endpoint: apiClient.branchUpdate,
                    redirectRoute
                },
                sections: getSections(t),
                findHandler: {
                    endpoint: apiClient.branchFindForUpdate,
                    requestPropertyName: 'branchId'
                }
            }

            setTimeout(() => r(formProps), 100)
        })



    }


