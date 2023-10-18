<script setup>


</script>

<template>
    <div>
        <h1 class="text-center my-5">AppBtn Component</h1>
        <h3 class="w-8 m-auto text-center">The Button component is a reusable button component that renders a button with customizable label, 
            disabled state, and icon. It utilizes the PrimeVue library's Button component.</h3>
        <h2 class="my-4">Props</h2>
        <div>
            <ul class="bg-card p-4">
                <li><h3>label (type: string, default: '') : <span class="text-sm mx-2">The label or text to be displayed on the button.</span></h3></li>
                <li><h3>disabled (type: boolean, default: false) : <span class="text-sm mx-2">Determines whether the button is disabled or not.</span></h3></li>
                <li><h3>icon (type: string, default: '') : <span class="text-sm mx-2">The name of the icon to be displayed on the button. It uses the PrimeIcons library, where the icon name is prefixed with pi pi-. For example, icon: 'pi pi-check' will display the "check" icon.</span></h3></li>
            </ul>
        </div>
        <h2 class="my-4">Example Usage</h2>
        <div class="bg-card p-4 my-3">
            <div >
                <appBtn label="Submit" class="my-2 w-2" :disabled="false" icon="check" />
                <appBtn label="Cancel" class="my-2 w-2" :disabled="true" icon="times" />
            </div>
            <h3 class="text-white my-5">
                In this example, two buttons are rendered. The first button has the label "Submit", is enabled
                 (:disabled="false"), and displays the "check" icon. The second button has the label "Cancel",
                  is disabled (:disabled="true"), and displays the "times" icon.

            </h3>
        </div>

        <h1 class="my-5 text-center">AppImage Component</h1>
        <h3 class="w-9 m-auto text-center">The AppImage component is a custom image component that renders an image with customizable source and it
             retrieve the required Base images URL from the package configuration, size, and fallback image. It utilizes the PrimeVue library's Image component.</h3>
        <h2 class="my-4">Props</h2>
        <div>
            <ul class="bg-card p-4">
                <li><h3>src (type: string, default: '') : <span class="text-sm mx-2">The source URL of the image to be displayed.</span></h3></li>
                <li><h3>size (type: number | SizeObj, default: undefined) : <span class="text-sm mx-2">The size of the image. It can be either a numeric value representing the width in pixels or an object of type SizeObj containing the width and height properties.</span></h3></li>
                <li><h3>alt (type: string, default: '') : <span class="text-sm mx-2">The alternative text for the image, used for accessibility purposes.</span></h3></li>
            </ul>
            <h3 class="my-4" >By customizing the props of the AppImage component, you can display images with different sources, sizes, and alternative text based on your application's requirements. </h3>
        </div>

        <h1 class="text-center my-5">ThemeToggler Component</h1>
        <h3 class="w-10 m-auto text-center"> the ThemeToggler component is used to render a button that toggles the theme. When the button is clicked,
        the onClick event handler triggers the changeTheme method from the themeStore.</h3>
        <h2 class="my-3">Example Usage :</h2>
        <!-- <div>
            <ThemeToggler />
        </div>     -->
    </div>
</template>