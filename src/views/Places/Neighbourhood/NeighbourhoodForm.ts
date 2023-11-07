import type {
    NeighbourhoodCreateRequest , NeighbourhoodCreateResponse , NeighbourhoodUpdateRequest , NeighbourhoodUpdateResponse
} from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/places_neighbourhood_definitions_pb'
import type { AppFormProps, AppFormSection } from 'v-dashkit/types';
import type { FormKitSchemaNode } from '@formkit/core';
import apiClient from '@/api/ApiClient';

const cityOptions = () => {
    return new Promise<any[]>((resolve) => {
        apiClient.citiesInputList({}).then(res => resolve(res.options))  
    })
}
const districtOptions = () => {
    console.log(document.getElementById('CityId'));
    
    return new Promise<any[]>((resolve) => {
        apiClient.districtsInputList({cityId : 1}).then(res => resolve(res.options))  
    })
}

const getSections = (t: Function): Record<string, AppFormSection | FormKitSchemaNode[]> => {
    return {
        '': [
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "neighbourhoodName",
                validation: "required",
                placeholder: t("neighbourhoodNamePlaceholder"),
                label: t("neighbourhoodNameLabel")
            },
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "neighbourhoodCode",
                placeholder: t("neighbourhoodCodePlaceholder"),
                label: t("neighbourhoodCodeLabel")
            },
            {
                $formkit: 'dropdown',
                outerClass: "col-12",
                closeOnSelect: true,
                name: 'cityId',
                label: 'City',
                placeholder: 'Select a city',
                "empty-message": "No cities found",
                alwaysLoadOnOpen : true,
                validation: 'required',
                id : 'city',
                options: cityOptions,                
            },
            {
                $cmp: 'FormKit',
                if : '$get(city).value',
                props: {
                    outerClass: "w-full p-1",
                    type: 'dropdown',
                    name: 'districtId',
                    id : 'District',
                    label: t('districtLabel'),
                    placeholder: t('districtPlaceholder'),
                    options : districtOptions,
                    validation: 'required',
                    'always-load-on-open' : true
                }
            }
        ],
    }

}

const redirectRoute = 'neighbourhoods_list'

export const getNeighbourhoodFormProps =
    async <T extends 'create' | 'update'>(
        t: Function,
        formType: T
    ): Promise<AppFormProps<T extends 'create' ? NeighbourhoodCreateRequest : NeighbourhoodUpdateRequest, T extends 'create' ? NeighbourhoodCreateResponse : NeighbourhoodUpdateResponse>> => {

        return new Promise(r => {
            if (formType == 'create') {
                const formProps = {
                    title: "neighbourhood_create",
                    submitHandler: {
                        endpoint: apiClient.neighbourhoodCreate,
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
                    endpoint: apiClient.neighbourhoodUpdate,
                    redirectRoute
                },
                sections: getSections(t),
                findHandler: {
                    endpoint: apiClient.neighbourhoodFindForUpdate,
                    requestPropertyName: 'neighbourhoodId'
                }
            }

            setTimeout(() => r(formProps), 100)
        })



    }


