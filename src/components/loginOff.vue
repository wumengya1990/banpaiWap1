<template>
    <div class="LoginOff"></div>
</template>

<script>
export default {
    name: "ConnectPage",
    data() {
        return {
            formData: []
        };
    },
    mounted() {
        window.localStorage.setItem("Token", "");
        window.localStorage.setItem("userRole", "");
        this.$router.push("login");
    }
};
</script>
