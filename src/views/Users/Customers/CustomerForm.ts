import type {
    CustomerCreateRequest , CustomerCreateResponse , CustomerUpdateRequest , CustomerUpdateResponse
} from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/users_customer_definitions_pb'
import type { AppFormProps, AppFormSection } from 'v-dashkit/types';
import type { FormKitSchemaNode } from '@formkit/core';
import apiClient from '@/api/ApiClient';
import supabase from '@/api/Supabase';
import type { AuthResponse } from '@supabase/gotrue-js/dist/module/lib/types';

const getCreateSections = (t: Function): Record<string, AppFormSection | FormKitSchemaNode[]> => {

    return {
        'customer_info': [
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "customerName",
                validation: "required",
                placeholder: t("customerNamePlaceholder"),
                label: t("customerNameLabel")
            },
            {
                $formkit: 'email',
                prefixIcon: "email",
                validation: "required",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "customerEmail",
                placeholder: t("customerEmailPlaceholder"),
                label: t("customerEmailLabel")
            },
            {
                $formkit: 'text',
                prefixIcon: "number",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "customerPhone",
                placeholder: t("customerPhonePlaceholder"),
                label: t("customerPhoneLabel")
            },
            {
                $cmp: 'FormKit',
                props: {
                    outerClass: "col-12 sm:col-6 md:col-2",
                    type: 'image',
                    name: 'customerImage',
                    value: "0.701566374267176.png",
                }
            },
        ],
        'Security': [
            {
                $formkit: 'password',
                outerClass: "col-6",
                name: 'customerPassword',
                label: 'Password',
                placeholder: 'Password',
                validation: 'required|length:8',
            },
            {
                $formkit: 'password',
                outerClass: "col-6",
                name: 'customerPassword_confirm',
                label: 'Confirm Password',
                placeholder: 'Re-enter password',
                validation: 'required|confirm',
                // "validation-label": "Password confirmation"
            },
        ],
    }

}
const getUpdateSections = (t: Function): Record<string, AppFormSection | FormKitSchemaNode[]> => {
    return {
        'customer_info': [
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "customerName",
                validation: "required",
                placeholder: t("customerNamePlaceholder"),
                label: t("customerNameLabel")
            },
            {
                $formkit: 'email',
                prefixIcon: "email",
                validation: "required",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "customerEmail",
                placeholder: t("customerEmailPlaceholder"),
                label: t("customerEmailLabel")
            },
            {
                $formkit: 'text',
                prefixIcon: "number",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "customerPhone",
                placeholder: t("customerPhonePlaceholder"),
                label: t("customerPhoneLabel")
            },
            {
                $cmp: 'FormKit',
                props: {
                    outerClass: "col-12 sm:col-6 md:col-2",
                    type: 'image',
                    name: 'customerImage',
                    value: "0.701566374267176.png",
                    // size: 500
                }
            }
        ],
    }

}

const customerCreate = (req : CustomerCreateRequest): Promise<CustomerCreateResponse> => {
    return new Promise((resolve, reject) => {
        supabase.auth.signUp({email : req.customerEmail , password : req.customerPassword ,
             phone : req.customerPhone}).then((result : AuthResponse) => {
            if (!result.error) {
            req.authUserId = result.data.user!.id
            apiClient.customerCreate(req).then((apiClientResponse : CustomerCreateResponse) => {
                resolve(apiClientResponse)
            }).catch((apiClientError) => {
                reject(apiClientError)
            });
            }
            else{
                reject(new Error(result.error.message))
            }
        }).catch((err) => {
            reject(err)
        });
    })
}

const customerUpdate = (req : CustomerUpdateRequest): Promise<CustomerUpdateResponse> => {
    console.log(req);
    return new Promise((resolve, reject) => {
            apiClient.customerUpdate(req)
            .then((apiClientResponse : CustomerUpdateResponse) => {
                resolve(apiClientResponse)
            }).catch((apiClientError) => {
                reject(apiClientError)
            });
    })    
}

const redirectRoute = 'customers_list'

export const getCustomerFormProps =
    async <T extends 'create' | 'update'>(
        t: Function,
        formType: T
    ): Promise<AppFormProps<T extends 'create' ? CustomerCreateRequest : CustomerUpdateRequest, T extends 'create' ? CustomerCreateResponse : CustomerUpdateResponse>> => {

    if (formType == 'create') {
      const formProps = {
        title: 'customer_create',
        submitHandler: {
          endpoint: customerCreate,
          redirectRoute,
        },
        sections: getCreateSections(t),
      };
      return formProps;
    }
  
    const formProps : any = {
      title: 'customer_update',
      submitHandler: {
        endpoint: customerUpdate,
        redirectRoute,
      },
      sections: getUpdateSections(t),
      findHandler: {
        endpoint: apiClient.customerFindForUpdate,
        requestPropertyName: 'customerId',
      },
    };
    return formProps;
  
  };


