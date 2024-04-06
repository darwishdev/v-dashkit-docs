import formKitConfig from './formkit.config'
import en from '@/locales/en.json'
import ar from '@/locales/ar.json'
// import type { UserLoginResponse } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/users_user_definitions_pb'
import type { UserLoginResponse } from '@/api/ApiTypes'
import type { VueDashKitConfig, PermissionsHandler, UploadHandler, LoginHandler } from 'v-dashkit/types'

import apiClient from '@/api/ApiMock'

const loginHandler: LoginHandler<UserLoginResponse> = {
    loginEndpoint: apiClient.userLogin,
    senedOTPEndpoint: apiClient.senedOTPEndpoint,
    // loginImage: "initial/login.webp",
    sendResetLinkEndpoint: apiClient.sendResetLinkEndpoint
}

const permissionsHandler: PermissionsHandler = {
    permissionsListAllEndpoint: apiClient.permissionsList as any
}

// const uploadHandler: UploadHandler = {
//     uploadEndpoint: uploadFile,
// }

const config: VueDashKitConfig<typeof apiClient> = {
    formKitConfig: formKitConfig as any,
    loginHandler,
    // uploadHandler,
    permissionsHandler,
    apiClient,
    baseImportDataUrl: import.meta.env.VITE_BASE_IMPORT_URL,
    fallBackImageUrl: import.meta.env.VITE_FALLBACK_IMG,
    baseImageUrl: import.meta.env.VITE_BASE_IMG,
    translations: <any>{
        en,
        ar,
    },
}
export default config