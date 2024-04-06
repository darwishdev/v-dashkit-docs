// permissions

export interface PermissionsListRequest { }

export interface Permission {
    permissionId: number;
    permissionName: string;
    permissionFunction: string;
    permissionDescription: string;
}

export interface PermissionsGroup {
    permissions: Permission[];
    permissionGroup: string;
}

export interface PermissionsListResponse {
    permissions: PermissionsGroup[];
}



// products
export interface ProductsListRow {
    productId: number;
    productName: string;
    productImage: string;
    productDescription: string;
    productCategory: string;
    ingredientsCount: number;
    modifiersCount: number;
    isFinal: boolean;
}

export interface Handler {
    title: string;
    redirectRoute: string;
    routeName: string;
}

export interface ListDataOptions {
    title: string;
    description: string;
    createHandler?: Handler;
    updateHandler?: Handler;
    deleteRestoreHandler?: any;
    importHandler?: any;
}

export interface ProductsListResponse {
    records: ProductsListRow[];
    deletedRecords: ProductsListRow[];
    options: ListDataOptions;
}

// login
// Request for UserLogin
export interface UserLoginRequest {
    email: string;
    password: string;
}

// Request for UserAuthorize
export interface UserAuthorizeRequest {
    // This request is empty, so no fields are needed
}

// Response for UserLogin and UserAuthorize
export interface UserLoginResponse {
    sideBar: SidebarItem[];
    userId: number;
    userName: string;
    userImage: string;
    userEmail: string;
    userPhone: string;
    createdAt: string; // You might want to use a proper Date type here instead of string
    updatedAt: string; // You might want to use a proper Date type here instead of string
    sessionId: number;
    entityId: number;
    loginInfo: {
        accessToken: string;
        accessTokenExpiresAt: string; // You might want to use a proper Date type here instead of string
    };
}

// Sidebar Item Type
export interface SidebarItem {
    key: string;
    label: string;
    icon: string;
    to: string;
    items: SidebarItem[]; // Nested Sidebar Items
}


export interface ApiClient {
    productsList: () => Promise<ProductsListResponse>
    permissionsList: () => Promise<PermissionsListResponse>
    userLogin: (req: UserLoginRequest) => Promise<UserLoginResponse>
    senedOTPEndpoint: (req: { email: string }) => Promise<void>
    sendResetLinkEndpoint: (req: { email: string }) => Promise<void>
    userAuthorize: () => Promise<UserLoginResponse>
    // productCreate: async (req: ProductCreateRequest): Promise<ProductCreateResponse> => {
    productCreate: (req: any) => Promise<any>
}