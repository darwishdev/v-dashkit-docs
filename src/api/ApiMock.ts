import type { ProductsListResponse, PermissionsListResponse, UserLoginResponse, UserLoginRequest, ApiClient } from './ApiTypes'

export const productListResponse: ProductsListResponse = {
    records: [
        {
            productId: 1,
            productName: "Cheese burger",
            productImage: "items/beef/Whopper.webp",
            productCategory: "beef",
            ingredientsCount: 6,
            modifiersCount: 5,
            isFinal: false,
            productDescription: "Melon cheese burger"
        },
        {
            productId: 2,
            productName: "whopper tripple burger",
            productImage: "items/beef/BBQ Bacon Whopper Jr..webp",
            productCategory: "burger",
            ingredientsCount: 8,
            modifiersCount: 4,
            isFinal: false,
            productDescription: "Melon whopper"
        },
    ],
    deletedRecords: [],
    options: {
        title: 'Products List',
        description: 'Products Description',
        createHandler: {
            title: 'Create',
            redirectRoute: 'products/create',
            routeName: 'products_create',
        },
        updateHandler: {
            title: 'Update',
            redirectRoute: 'products/:id/update',
            routeName: 'products_update',
        },

    }
};




export const permissionsListResponse: PermissionsListResponse = {
    permissions: [
        {
            permissions: [
                {
                    permissionId: 1,
                    permissionName: "view dashboard",
                    permissionFunction: "DashboardView",
                    permissionDescription: "permission to view the dashboard page inside backoffice application"
                }
            ],
            permissionGroup: "dashboard"
        },
        {
            permissions: [
                {
                    permissionId: 104,
                    permissionName: "delete/restore stock transaction initial balance",
                    permissionFunction: "ProductCreate",
                    permissionDescription: "Permission to create a product"
                },
                {
                    permissionId: 105,
                    permissionName: "create session ",
                    permissionFunction: "ProductUpdate",
                    permissionDescription: "Permission to update a product"
                },
                {
                    permissionId: 106,
                    permissionName: "",
                    permissionFunction: "ProductsList",
                    permissionDescription: "Permission to list products"
                },
                {
                    permissionId: 107,
                    permissionName: "",
                    permissionFunction: "ProductFind",
                    permissionDescription: "Permission to find a product"
                },
                {
                    permissionId: 108,
                    permissionName: "",
                    permissionFunction: "ProductDeleteRestore",
                    permissionDescription: "Permission to delete or restore a product"
                }
            ],
            permissionGroup: "products"
        }
        // Add more permission groups here...
    ]
};


export const loginResponse = {
    sideBar: [
        {
            items: [
                {
                    items: [],
                    key: "503",
                    label: "products_list",
                    icon: "set_meal",
                    to: "products"
                }
            ],
            key: "products",
            label: "Products",
            icon: "fastfood",
            to: ""
        }
    ],
    userId: 25,
    userName: "Kareem Ayman",
    userImage: "0.701566374267176.png",
    userEmail: "kareem@breiwview.com",
    userPhone: "01118614247",
    createdAt: "",
    updatedAt: "",
    sessionId: 0,
    entityId: 0,
    loginInfo: {
        accessToken: "v2.local.9uYshqrpJGwUPrHTL1axfuRUDPgZ8PRHJNbXy-KeyE_NSQs4VVGBcBUCyqyVQmLjI9ZjzxfkSquaaNA-miOjpQfKcoaB78C9GjN36iBcU1nJTOZxMUynHG2baRx9TUuXajFIQ0NYZqep1eaUiKmpJHzlU-zWK0_GERGYkTsbni5zucrcGN-ZhZTuAjA_xV07V8jVZL_Uj1xw-UDITy6a0suC6A2dFD89SrPG3-WRn7q1_DPXpXyHoYuuB4jlB6Ja3hhZ14hJvdWJ_deWzrFbMSy_RY5lCGsDamGUCjTS1PX70UziThesgcPLX4YPEo_of5m4ecjbWtnsqUKS_GuQZcrHAuzB4MYojFGN86xHNnMhR_4ULJBfcmXOkr0uIMMsqqJ9S01s1wryrLHN0Bug4nPaO7e0Sd495s3uPTwQM-qqF4nqqm2MHMppuYTX7c7VIOxmR7c2ezvsOttejkZrU3jweRtDtr-BczAC1roZ4fZAoyyhCji4BA57iXLUh2Sj_kOZAPr5BLb6mhFcrUBwfPfmgi12XXR0RsXd7MqXLGW5gqKQkLf6XbpX0oefioN-3PnghCy3tlVoOl9jmfsGLvNamx9EaXq-NdTeXs0lN25FvGLsJS-a8vzcV1A9rqRoRv9OrsBugCj3PyRSqP3CH0c5o-_m7h3gTL9tc-HXSJ842mkBqburESzOxXp9t1UZSNJiFCwJlGs3cfe-kOvgmhMg3ADKaN4bmk7vDYGy2FYz32VLfnq6iHuIBV5PHRRbYRkJgLFh4Mbr6DFujMsHumJhi7OQALYUEzCPU4Upbco9CoAanggMorhuRoaB-996js3wYoipqAJNXoyCIHH6bLxTIzHkWKUftC9HWNdytuSAAE5Zt31okQQLxzXX0jBXQ-tdCXQ72jUMnYykqhoV1ojy1maIledBJC0m6tRa6hMrHXED-BYxqdTdIjf90OCJHYjlRzlmW116D59rNRAoSgOLxCAqc5cYNFsQ2UsJOJ6-XD7GkL5o3xMJJUJQ9JbkJ5KeQJef0cqwoBK4ZN_deVIi9z9SRlWnwWrvV6NX7QdSyiN_RP6Nry5IYzeZHOVw_xInfVx803K0TE5GRYemLAYOstyzD5DoJMRm9N32Su5B2lSYLzSvz4UO1k2m5M_n9wFgliahhoWAuiOVw0rdoWOWqV9vXqG_6ux3pF4TyBPtTj8D_k9m9H6p-Q4kJossXYyaQt6_NWgww9WrGT0xZ5lXhtxoOP6iRu2oVsReRzf2NMzCdEM4wX8-n_5knd4xS2vk3wFjue4qnO8-9xq5XcbUhwDtIfZfLU9EMIeUVWABdfscwNGg5I-zZS70V-oxtxAB3JMAT9A6ofPjFzeNeM63KWmSYzy_o93JijKEQPpCa_WCJ5hwFmSfkpvCVh9TnN-Nw2lrkXl8X41nlhzpVrtzfwFNeYJ07ec5GhL3M0LmkVBGpeaqHhoUcXKk5HDSMUZ6rR12LFYociVbqkk88_TXof3IqwIRXuVSIsI0TTJ57sTnjoJWh8Q60AJl346PEWV7E3IrtZQ2zkTsuF7pHXGjHpmN1IZJeBF1449W5m8-1TMqY8KogD3ZSlmcM5gDuhkw0qSrGOm6.bnVsbA",
        accessTokenExpiresAt: "2024-04-16 09:34:37"
    }
}

const apiClient: ApiClient = {
    productsList: async (): Promise<ProductsListResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return productListResponse;
    },
    permissionsList: async (): Promise<PermissionsListResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return permissionsListResponse;
    },
    userLogin: async (req: UserLoginRequest): Promise<UserLoginResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (req.email == "invalid") {
            throw new Error('Invalid user email or code');

        }
        return loginResponse;
    },
    userAuthorize: async (): Promise<UserLoginResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // if (req.userEmailOrCode == "invalid") {
        //     throw new Error('Invalid user email or code');

        // }
        return loginResponse;
    },
    senedOTPEndpoint: async (req: { email: string }) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return

    },
    sendResetLinkEndpoint: async (req: { email: string }) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return
    },
    productCreate: async (req: any): Promise<any> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {}
    }
}

export default apiClient;
