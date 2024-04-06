import type {
    CategoryCreateRequest , CategoryCreateResponse , CategoryUpdateRequest , CategoryUpdateResponse
} from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/products_categories_definitions_pb'
import type { AppFormProps, AppFormSection } from 'v-dashkit/types';
import type { FormKitSchemaNode } from '@formkit/core';
import apiClient from '@/api/ApiClient';

const getSections = (t: Function): Record<string, AppFormSection | FormKitSchemaNode[]> => {
    return {
        '': [
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "categoryName",
                validation: "required",
                placeholder: t("categoryNamePlaceholder"),
                label: t("categoryNameLabel")
            },
            {
                $cmp: 'FormKit',
                props: {
                    outerClass: "col-12 sm:col-6 md:col-2",
                    type: 'image',
                    name: 'categoryImage',
                    value: "0.701566374267176.png",
                    // size: 500
                }
            },
        ],
    }

}

const redirectRoute = 'categories_list'

export const getCategoryFormProps =
    async <T extends 'create' | 'update'>(
        t: Function,
        formType: T
    ): Promise<AppFormProps<T extends 'create' ? CategoryCreateRequest : CategoryUpdateRequest, T extends 'create' ? CategoryCreateResponse : CategoryUpdateResponse>> => {

        return new Promise(r => {
            if (formType == 'create') {
                const formProps = {
                context : {
                    title: "category_create",
                    submitHandler: {
                        endpoint: apiClient.categoryCreate,
                        redirectRoute
                    },
                    sections: getSections(t)
                }
                }
                setTimeout(() => r(formProps), 100)

                return
            }

            const formProps = {
                context : {
                    title: "category_update",
                    submitHandler: {
                        endpoint: apiClient.categoryUpdate,
                        redirectRoute
                    },
                    sections: getSections(t),
                    findHandler: {
                        endpoint: apiClient.categoryFindForUpdate,
                        requestPropertyName: 'categoryId'
                    }
                }
            }

            setTimeout(() => r(formProps), 100)
        })



    }


