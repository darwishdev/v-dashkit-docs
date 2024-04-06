import type {
    ProductCreateRequest, ProductCreateResponse, ProductUpdateRequest, ProductUpdateResponse, ProductFindResponse
} from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/products_products_definitions_pb'
import type { ProductIngredient } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/products_ingredients_definitions_pb'
import type { AppFormProps, AppFormSection } from 'v-dashkit/types';
import type { FormKitSchemaNode } from '@formkit/core';
import apiClient from '@/api/ApiClient';

let findResponse: any = {}
let modifiersToDetach: number[] = []
let modifiersToAttach: any = []
let ingredientsToDetach: any = []
let ingredientsToUpdate: any = []
let ingredientsToAttach: any = []

const productModifiers = () => {
    return new Promise<any[]>((resolve) => {
        apiClient.modifiersInputList({}).then(res => resolve(res.options))
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
                number: true,
                validation: "required",
                outerClass: "col-12 sm:col-6 md:col-6",
                name: "productCost",
                placeholder: t("productCostPlaceholder"),
                label: t("productCostLabel")
            },
            {
                $formkit: 'number',
                prefixIcon: "number",
                number: true,
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
                $formkit: 'dropdownCustom',
                prefixIcon: "tools",
                outerClass: "col-12 md:col-6",
                closeOnSelect: true,
                name: 'unitId',
                label: t('Units'),
                placeholder: t('Units'),
                "empty-message": "لا يوجد وحدات",
                alwaysLoadOnOpen: true,
                options: 'unitsInputList',
            },
            {
                $formkit: 'dropdownCustom',
                prefixIcon: "tools",
                outerClass: 'col-12 md:col-6',
                closeOnSelect: true,
                alwaysLoadOnOpen: true,
                name: "categoryId",
                label: t('Categories'),
                placeholder: t('Categories'),
                options: 'categoriesInputList',
                "empty-message": "لا يوجد فئات",
            },
            {
                $formkit: 'autocomplete',
                prefixIcon: "tools",
                outerClass: 'col-12 md:col-6',
                closeOnSelect: false,
                name: "productModifiers",
                onInput: findModifiedModifiers,
                label: t('modifiers_list'),
                placeholder: t('modifiers_list'),
                options: productModifiers,
                multiple: true,
                "empty-message": "لا يوجد معدلات",
            },
            {
                $cmp: 'FormKit',
                props: {
                    outerClass: " mt-5 py-3",
                    type: 'toggle',
                    name: 'isFinal',
                    id: 'isFinal',
                    label: t('isFinal'),
                }
            },
        ],
        'ingredients_list': [
            {
                $formkit: 'repeater',
                name: 'productIngredients',
                if: '$get(isFinal).value != true',
                onInput: handleIngredientChanges,
                outerClass: "w-full col-12 align-items-center",
                children: [
                    {
                        $el: 'div',
                        attrs: {
                            class: 'p-3 w-full flex grid'
                        },
                        children: [
                            {
                                $formkit: 'dropdownCustom',
                                prefixIcon: "tools",
                                outerClass: "col-12 md:col-6",
                                closeOnSelect: true,
                                name: 'ingredientId',
                                label: t('ingredients_list'),
                                placeholder: t('ingredients_list'),
                                "empty-message": "لا يوجد مكونات",
                                alwaysLoadOnOpen: true,
                                options: 'ingredientsInputList',
                            },
                            {
                                $formkit: 'number',
                                prefixIcon: 'number',

                                outerClass: 'col-12 sm:col-6 md:col-6',
                                name: 'increaseLimit',
                                number: 'float',
                                placeholder: t('increaseLimit'),
                                label: t('increaseLimit'),
                            },
                            {
                                $formkit: 'number',
                                prefixIcon: 'dollar',

                                outerClass: 'col-12 sm:col-6 md:col-6',
                                name: 'ingredientPrice',
                                number: 'float',
                                placeholder: t('ingredientPrice'),
                                label: t('ingredientPrice'),
                            },
                            {
                                $formkit: 'number',
                                prefixIcon: 'number',

                                outerClass: 'col-12 sm:col-6 md:col-6',
                                name: 'quantity',
                                number: 'float',
                                placeholder: t('quantity'),
                                label: t('quantity'),
                            },
                            {
                                $cmp: 'FormKit',
                                props: {
                                    outerClass: " mt-5 py-3",
                                    type: 'toggle',
                                    name: 'ingredientRemovable',
                                    id: 'ingredientRemovable',
                                    label: t('ingredientRemovable'),
                                }
                            },
                        ]
                    }
                ],
            }
        ]
    }

}

function findModifiedModifiers(req: number[]) {
    if (findResponse.productModifiers) {
        modifiersToAttach = req.filter((modifierId) => !findResponse.productModifiers.includes(modifierId));
        modifiersToDetach = findResponse.productModifiers.filter((modifierId: number) => !req.includes(modifierId));
        console.log(findResponse.productModifiers, 'originalModifiers');
        console.log(modifiersToAttach, 'modifiersToAttach');
        console.log(modifiersToDetach, 'modifiersToDetach');
    }
}

function areIngredientsEqual(ingredientA: any, ingredientB: any) {
    // Compare two ingredients for equality
    return JSON.stringify(ingredientA) === JSON.stringify(ingredientB);
}

function handleIngredientChanges(newIngredients: ProductIngredient[]) {
    if (findResponse.productIngredients) {
        setTimeout(() => {
            const oldIngredients: ProductIngredient[] = findResponse.productIngredients
            console.log(oldIngredients, 'oldIngredients');
            console.log(newIngredients, 'newIngredients');

            // Find detached, updated, and attached ingredients
            const detachedIngredients: ProductIngredient[] = oldIngredients.filter(oldIng => !newIngredients.some(newIng => newIng.ingredientId === oldIng.ingredientId));
            ingredientsToDetach = detachedIngredients.map(ingredient => ingredient.ingredientId);

            ingredientsToUpdate = newIngredients.filter(newIng => {
                const oldIng = oldIngredients.find(old => old.ingredientId === newIng.ingredientId);
                return oldIng && !areIngredientsEqual(oldIng, newIng);
            });

            ingredientsToAttach = newIngredients.filter(newIng => !oldIngredients.some(oldIng => oldIng.ingredientId === newIng.ingredientId));

            console.log(ingredientsToAttach, 'ingredientsToAttach');
            console.log(ingredientsToDetach, 'ingredientsToDetach');
            console.log(ingredientsToUpdate, 'ingredientsToUpdate');
        }, 200);
    }
}

const mapFn = (req: any) => {
    console.log(req, 'map function');
    const productUpdateRequest: ProductUpdateRequest = req
    productUpdateRequest.modifiersToAttach = modifiersToAttach
    productUpdateRequest.modifiersToDetach = modifiersToDetach
    productUpdateRequest.ingredientsToAttach = ingredientsToAttach
    productUpdateRequest.ingredientsToDetach = ingredientsToDetach
    productUpdateRequest.ingredientsToUpdate = ingredientsToUpdate
    return productUpdateRequest
}

function productFind(req: any): Promise<ProductFindResponse> {
    return new Promise((resolve, reject) => {
        console.log(req, 'req');
        apiClient.productFind(req).then((result) => {
            console.log(result);
            findResponse = result.item
            findResponse.productModifiers = []
            findResponse.productIngredients = result.item?.ingredients
            result.item?.modfieirs.forEach(modifier => {
                findResponse.productModifiers.push(modifier.modifierId)
            });
            console.log(findResponse);
            resolve(findResponse)
        }).catch((err) => {
            console.log(err);
        });
    })
}

const redirectRoute = 'products_list'

export const getProductFormProps =
    async <T extends 'create' | 'update'>(
        t: Function,
        formType: T
    ): Promise<AppFormProps<T extends 'create' ? ProductCreateRequest : ProductUpdateRequest, T extends 'create' ? ProductCreateResponse : ProductUpdateResponse>> => {

        if (formType == 'create') {
            const formProps = {
                context: {
                    title: 'product_create',
                    submitHandler: {
                        endpoint: apiClient.productCreate,
                        redirectRoute,
                    },
                    sections: getCreateSections(t),
                }
            };
            return formProps;
        }

        const formProps = {
            context: {
                title: 'product_update',
                submitHandler: {
                    endpoint: apiClient.productUpdate,
                    mapFunction: mapFn,
                    redirectRoute,
                },
                sections: getCreateSections(t),
                findHandler: {
                    endpoint: productFind,
                    requestPropertyName: 'productId',
                },
            }
        };
        return formProps as any;

    };


