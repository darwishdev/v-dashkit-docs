import type {
    ProductCreateRequest , ProductCreateResponse , ProductUpdateRequest , ProductUpdateResponse
} from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/products_products_definitions_pb'
import type { AppFormProps, AppFormSection } from 'v-dashkit/types';
import type { FormKitSchemaNode } from '@formkit/core';
import apiClient from '@/api/ApiClient';

const categoriesOptions = () => {
    return new Promise<any[]>((resolve) => {
        apiClient.categoriesInputList({}).then(res => resolve(res.options))  
    })
}
const unitsOptions = () => {
    return new Promise<any[]>((resolve) => {
        apiClient.unitsInputList({}).then(res => resolve(res.options))  
    })
}

const getCreateSections = (t: Function): Record<string, AppFormSection | FormKitSchemaNode[]> => {

    return {
        '': [
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "productName",
                validation: "required",
                placeholder: t("productNamePlaceholder"),
                label: t("productNameLabel")
            },
            {
                $formkit: 'textarea',
                prefixIcon: "text",
                validation: "required",
                outerClass: "col-12 sm:col-8 md:col-7",
                name: "productDescription",
                placeholder: t("productDescriptionPlaceholder"),
                label: t("productDescriptionLabel")
            },
            {
                $formkit: 'text',
                prefixIcon: "tools",
                validation: "required",
                outerClass: "col-12 sm:col-6 md:col-6",
                name: "productCode",
                placeholder: t("productCodePlaceholder"),
                label: t("productCodeLabel")
            },
            {
                $formkit: 'number',
                prefixIcon: "number",
                number : true,
                validation: "required",
                outerClass: "col-12 sm:col-6 md:col-6",
                name: "productCost",
                placeholder: t("productCostPlaceholder"),
                label: t("productCostLabel")
            },
            {
                $formkit: 'number',
                prefixIcon: "number",
                number : true,
                validation: "required",
                outerClass: "col-12 sm:col-6 md:col-6",
                name: "productPrice",
                placeholder: t("productPricePlaceholder"),
                label: t("productPriceLabel")
            },
            {
                $cmp: 'FormKit',
                props: {
                    outerClass: "col-4 sm:col-6 md:col-4",
                    type: 'image',
                    name: 'productImage',
                    value: "0.701566374267176.png",
                }
            },
            {
                $formkit: 'dropdown',
                outerClass: "col-12 md:col-6",
                closeOnSelect: true,
                name: 'categoryId',
                label: t('Categories'),
                placeholder: 'Select Categories',
                "empty-message": "No Categories found",
                alwaysLoadOnOpen : true,
                options: categoriesOptions,                
            },
            {
                $formkit: 'dropdown',
                outerClass: "col-12 md:col-6",
                closeOnSelect: true,
                name: 'unitId',
                label: t('Units'),
                placeholder: 'Select Units',
                "empty-message": "No Units found",
                alwaysLoadOnOpen : true,
                options: unitsOptions,                
            },
            {
                $cmp: 'FormKit',
                props: {
                    outerClass: " mt-5 py-3",
                    type: 'toggle',
                    name: 'isFinal',
                    id : 'isFinal',
                    label: t('isFinal'),
                }
            },
        ],
        // 'Security': [
        //     {
        //         $formkit: 'password',
        //         outerClass: "col-6",
        //         name: 'customerPassword',
        //         label: 'Password',
        //         placeholder: 'Password',
        //         validation: 'required|length:8',
        //     },
        //     {
        //         $formkit: 'password',
        //         outerClass: "col-6",
        //         name: 'customerPassword_confirm',
        //         label: 'Confirm Password',
        //         placeholder: 'Re-enter password',
        //         validation: 'required|confirm',
        //         // "validation-label": "Password confirmation"
        //     },
        // ],
    }

}

const redirectRoute = 'products_list'

export const getProductFormProps =
    async <T extends 'create' | 'update'>(
        t: Function,
        formType: T
    ): Promise<AppFormProps<T extends 'create' ? ProductCreateRequest : ProductUpdateRequest, T extends 'create' ? ProductCreateResponse : ProductUpdateResponse>> => {

    if (formType == 'create') {
      const formProps = {
        title: 'product_create',
        submitHandler: {
          endpoint: apiClient.productCreate,
          redirectRoute,
        },
        sections: getCreateSections(t),
      };
      return formProps;
    }
  
    const formProps = {
      title: 'product_update',
      submitHandler: {
        endpoint: apiClient.productUpdate,
        redirectRoute,
      },
      sections: getCreateSections(t),
      findHandler: {
        endpoint: apiClient.productFindForUpdate,
        requestPropertyName: 'productId',
      },
    };

    return formProps;
  };


