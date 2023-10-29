import type {
    UnitCreateRequest , UnitCreateResponse , UnitUpdateRequest , UnitUpdateResponse
} from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/products_units_definitions_pb'
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
                name: "unitBuy",
                validation: "required",
                placeholder: t("unitBuyPlaceholder"),
                label: t("unitBuyLabel")
            },
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "unitSell",
                validation: "required",
                placeholder: t("unitSellPlaceholder"),
                label: t("unitSellLabel")
            },
            {
                $formkit: 'number',
                prefixIcon: "number",
                outerClass: "col-12",
                number : true,
                name: "unitRatio",
                validation: "required",
                placeholder: t("unitRatioPlaceholder"),
                label: t("unitRatioLabel")
            },
        ],
    }

}

const redirectRoute = 'units_list'

export const getUnitFormProps =
    async <T extends 'create' | 'update'>(
        t: Function,
        formType: T
    ): Promise<AppFormProps<T extends 'create' ? UnitCreateRequest : UnitUpdateRequest, T extends 'create' ? UnitCreateResponse : UnitUpdateResponse>> => {

        return new Promise(r => {
            if (formType == 'create') {
                const formProps = {
                    title: "unit_create",
                    submitHandler: {
                        endpoint: apiClient.unitCreate,
                        redirectRoute
                    },
                    sections: getSections(t)
                }
                setTimeout(() => r(formProps), 100)

                return
            }

            const formProps = {
                title: "unit_update",
                submitHandler: {
                    endpoint: apiClient.unitUpdate,
                    redirectRoute
                },
                sections: getSections(t),
                findHandler: {
                    endpoint: apiClient.unitFindForUpdate,
                    requestPropertyName: 'unitId'
                }
            }

            setTimeout(() => r(formProps), 100)
        })
    }


