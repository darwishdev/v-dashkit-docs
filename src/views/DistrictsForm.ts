import type {
    DistrictCreateRequest , DistrictCreateResponse , DistrictUpdateRequest , DistrictUpdateResponse
} from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/places_district_definitions_pb'
import type { AppFormProps, AppFormSection } from 'v-dashkit/types';
import type { FormKitSchemaNode } from '@formkit/core';
import apiClient from '@/api/ApiClient';

const cityOptions = () => {
    return new Promise<any[]>((resolve) => {
        apiClient.citiesInputList({}).then(res => resolve(res.options))  
    })
}

const getSections = (t: Function): Record<string, AppFormSection | FormKitSchemaNode[]> => {
    return {
        '': [
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "districtName",
                validation: "required",
                placeholder: t("districtNamePlaceholder"),
                label: t("districtNameLabel")
            },
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "districtCode",
                placeholder: t("districtCodePlaceholder"),
                label: t("districtCodeLabel")
            },
            {
                $formkit: 'dropdown',
                outerClass: "col-12",
                closeOnSelect: true,
                name: 'cityId',
                label: 'city',
                placeholder: 'Select District City',
                "empty-message": "No Cities found",
                alwaysLoadOnOpen : true,
                options: cityOptions,                
            },
        ],
    }

}

const redirectRoute = 'districts_list'

export const getDistrictFormProps =
    async <T extends 'create' | 'update'>(
        t: Function,
        formType: T
    ): Promise<AppFormProps<T extends 'create' ? DistrictCreateRequest : DistrictUpdateRequest, T extends 'create' ? DistrictCreateResponse : DistrictUpdateResponse>> => {

        return new Promise(r => {
            if (formType == 'create') {
                const formProps = {
                    title: "district_create",
                    submitHandler: {
                        endpoint: apiClient.districtCreate,
                        redirectRoute
                    },
                    sections: getSections(t)
                }
                setTimeout(() => r(formProps), 100)

                return
            }

            const formProps = {
                title: "district_update",
                submitHandler: {
                    endpoint: apiClient.districtUpdate,
                    redirectRoute
                },
                sections: getSections(t),
                findHandler: {
                    endpoint: apiClient.districtFindForUpdate,
                    requestPropertyName: 'districtId'
                }
            }

            setTimeout(() => r(formProps), 100)
        })



    }


