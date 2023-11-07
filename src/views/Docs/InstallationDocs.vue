<script setup lang="ts">

</script>

<template>
    <div>
        <h1 class="text-center">VueDashkit Setup Guide</h1>
        <h2>Step 1: Installation</h2>
        <div class="bg-card p-4 my-5 border-round">
           <p>To start using VueDashkit, you need to install the package using npm or yarn.</p>
           <h2 class="bg-card p-2 my-2 w-5 text-center">npm install v-dashkit</h2>
        </div>
        <h2>Step 2: Configuration</h2>
        <div class="bg-card p-4 my-5 border-round">
           <p>In your main.ts file, import the necessary dependencies and configure VueDashkit.</p>
           <h3 class="bg-card p-2 my-2 w-6">import { createApp } from 'vue';<br>
            import dashkitConfig from '@/plugins/vuedashkit.config';<br>
            import VueDashkit from 'v-dashkit';<br>
            import 'v-dashkit/style';<br>
            
            const app = createApp(App);<br>
            
            app.use(router)<br>
              .use(VueDashkit, dashkitConfig);
            </h3>
        </div>
        <h2>Step 3: VueDashkit Configuration File</h2>
        <div class="bg-card p-4 my-5 border-round">
           <p>Create a configuration file for VueDashkit (vuedashkit.config.ts) and specify your custom settings.</p>
           <h2 class=" my-2 ">Import Dependencies:</h2>
           <h4 class="bg-card p-4 text-white">
            import formKitConfig from './formkit.config';<br>
            import en from '@/locales/en.json';<br>
            import ar from '@/locales/ar.json';<br>
           </h4>
           <h2 class=" my-5 ">Import Types:</h2>
           <ul>
                <li><h3>UserLoginResponse : This is a type that represents the response structure for user login.</h3></li>
                <li><h3>VueDashKitConfig, PermissionsHandler, UploadHandler, and LoginHandler : These are types imported from the v-dashkit/types module. They define the configuration structure for VueDashkit.</h3></li>
           </ul>
           <h2 class=" my-5 ">Login Handler Configuration: </h2>
           <ul>
                <li><h3>loginHandler : <span class="text-sm mx-2">An object that defines the login-related endpoints and functions.</span></h3></li>
                <li><h3>loginEndpoint : <span class="text-sm mx-2">Specifies the function to handle the login endpoint, which is signInWithPassword in this example.</span></h3></li>
                <li><h3>senedOTPEndpoint : <span class="text-sm mx-2">Specifies the function to handle sending OTP (One-Time Password) for email.</span></h3></li>
                <li><h3>sendResetLinkEndpoint : <span class="text-sm mx-2">Specifies the function to handle sending a reset password link for email.</span></h3></li>
           </ul>
           <h2 class=" my-5 ">Permissions Handler Configuration:</h2>
           <ul>
            <li><h3>permissionsHandler : <span class="text-sm mx-2">An object that defines the permissions-related endpoints and functions.</span></h3></li>
            <li><h3>permissionsListAllEndpoint : <span class="text-sm mx-2"> Specifies the function to fetch the list of permissions. In this example, it uses apiClient.permissionsList.
            </span></h3></li>
            </ul>
           <h2 class=" my-5 ">Upload Handler Configuration:</h2>
           <ul>
            <li><h3>uploadHandler : <span class="text-sm mx-2">An object that defines the upload-related endpoints and functions.</span></h3></li>
            <li><h3>uploadEndpoint : <span class="text-sm mx-2"> Specifies the function to handle file uploads.In this example, it uses the uploadFile function in the Supabase API.</span></h3></li>
            </ul>
            <h3 class="my-5 text-center text-white">This configuration file allows you to customize various aspects of VueDashkit,
                such as login handling, permissions handling, file uploads, form settings, and localization. By modifying
                these settings, you can tailor VueDashkit to fit your specific application requirements.</h3>
        </div>
        <h2>Step 4: Router Configuration</h2>
        <div class="bg-card p-4 my-5 border-round">
           <p>In your router file, import the AppLayout and LoginForm views from VueDashkit to use the ready-made features.</p>
           <h3 class="bg-card p-2 my-2 w-6">import { createRouter, createWebHistory } from 'vue-router';<br>
            import AppLayout from 'v-dashkit/theme/AppLayout';<br>
            import LoginForm from 'v-dashkit/form/LoginForm';<br>
            
            const routes = [<br>
              {
                path: '/',
                name: 'Home',
                component: AppLayout,
              },<br>
              {
                path: '/login',
                name: 'Login',
                component: LoginForm,
              },<br>
              // Other routes...<br>
            ];
        </h3>
        <h2 class="my-4">authMiddleware Function</h2>
        <div class="bg-card p-4">
            <h4 class="text-white">The authMiddleware function is used as a navigation guard in the router file to authorize users before
                accessing certain routes. It checks if the user is authenticated and has the necessary permissions to proceed.
                If the user is authorized, the function allows navigation to the requested route. Otherwise, it redirects the user to the login page.
            </h4>
        </div>
        <h3 class="my-4">Parameters</h3>
        <ul class="bg-card p-4">
            <li><h3>to : <span class="text-sm mx-2">Represents the target route that the user is trying to navigate to.</span></h3></li>
            <li><h3>from : <span class="text-sm mx-2">Represents the current route that the user is navigating from.</span></h3></li>
            <li><h3>next : <span class="text-sm mx-2">A function that needs to be called to proceed to the target route.</span></h3></li>
        </ul>
        <h3 class="my-4">Usage in Router Configuration</h3>
        <h4 class="text-white">The authMiddleware function can be used as a beforeEnter guard for specific routes in the router configuration.
            Here's an example:</h4>
        <div class="bg-card p-4 my-2">
            <h3>
                const router = createRouter({ <br>
                    history: createWebHistory(import.meta.env.BASE_URL),<br>
                    routes: [<br>
                      {<br>
                        path: '/',<br>
                        component: AppLayout,<br>
                        beforeEnter: authMiddleware,<br>
                      },<br>
                      // Other routes...<br>
                    ],<br>
                  });                  
            </h3>
        </div>
        <h4 class="text-white my-3">By adding beforeEnter: authMiddleware to a route configuration, the authMiddleware function will
            be executed before accessing that specific route. It ensures that only authorized users can access the protected
            routes and redirects others to the login page if necessary.
        </h4>
        <h4 class="text-white my-3">Note: Make sure to import the necessary dependencies (NavigationGuard, RouteLocationNormalized,
             NavigationGuardNext) from the appropriate router module.
        </h4>
            
        </div>
    </div>
</template>