
<script lang="ts">
const mockAwait = () => {
    setTimeout(() => {
        return new Promise((r: any) => {
            r(null)
        })
    }, 2000)

}
</script>
<script setup lang="ts">
// import AppTable from 'v-dashkit/types';
// import apiClient from '@/api/ApiClient';
import { ref } from 'vue';
import { RoleCreateRequest } from "@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/users_role_definitions_pb"
import type { ConnectError } from "@connectrpc/connect";
import apiClient from '@/api/ApiClient';
// import { TableHeaderText, TableHeaderImage, TableHeaderPrice, TableHeaderTag, TableHeaderLink } from '@/utils/table/TableHeader'
await mockAwait()
// const data = await apiClient.ingredientsList({})
const submitted = ref(false)
const submitHandler = async (req: any) => {
    // Let's pretend this is an ajax request:
    await new Promise((r) => {
        console.log(req)
        const request: RoleCreateRequest = new RoleCreateRequest()
        request.roleName = req.roleName
        request.roleDescription = req.roleDescription
        request.permissions = [1000]
        console.log(request.roleName)
        apiClient.roleCreate(request).then((res: any) => {
            console.log(res)
            submitted.value = true
            r(null)
        }).catch((e: ConnectError) => {
            // console.log("error", e.findDetails())
            console.log("error", e.rawMessage)
            r(null)
        })
    })
}


</script>
<template>
    <div>
        <h4 class="form-label">Creating the form</h4>
    </div>
    <h1>New Character</h1>

    <FormKit type="form" @submit="submitHandler">
        <FormKit type="text" name="roleName" id="name" validation="required" label="Name"
            help="Enter your character's full name" placeholder="“Scarlet Sword”" />
        <FormKit type="text" name="roleDescription" id="description" validation="required" label="description"
            help="Enter your character's full description" placeholder="“Scarlet Sword”" />

    </FormKit>
</template>