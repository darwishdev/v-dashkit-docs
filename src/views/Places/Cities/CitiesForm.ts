import type {
    CityCreateRequest , CityCreateResponse , CityUpdateRequest , CityUpdateResponse
} from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/places_city_definitions_pb'
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
                name: "cityName",
                validation: "required",
                placeholder: t("cityNamePlaceholder"),
                label: t("cityNameLabel")
            },
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "cityCode",
                placeholder: t("cityCodePlaceholder"),
                label: t("cityCodeLabel")
            },
        ],
    }

}

const redirectRoute = 'cities_list'

export const getCityFormProps =
    async <T extends 'create' | 'update'>(
        t: Function,
        formType: T
    ): Promise<AppFormProps<T extends 'create' ? CityCreateRequest : CityUpdateRequest, T extends 'create' ? CityCreateResponse : CityUpdateResponse>> => {

        return new Promise(r => {
            if (formType == 'create') {
                const formProps = {
                    title: "city_create",
                    submitHandler: {
                        endpoint: apiClient.cityCreate,
                        redirectRoute
                    },
                    sections: getSections(t)
                }
                setTimeout(() => r(formProps), 100)

                return
            }

            const formProps = {
                title: "city_update",
                submitHandler: {
                    endpoint: apiClient.cityUpdate,
                    redirectRoute
                },
                sections: getSections(t),
                findHandler: {
                    endpoint: apiClient.cityFindForUpdate,
                    requestPropertyName: 'cityId'
                }
            }

            setTimeout(() => r(formProps), 100)
        })



    }


