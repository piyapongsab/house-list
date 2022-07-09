<template>
    <v-overlay :value="overlay">
        <v-flex class="text-loading">
            กรุณารอสักครู่
        </v-flex>
        <v-layout justify-center class="mt-3">
            <v-progress-circular :size="65" :width="7" color="primary" indeterminate/>
        </v-layout>
    </v-overlay>
</template>

<script>
export default {
    name: 'Loading',
    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            overlay: false,
        }
    },
    watch: {
        value() {
            if (this.value === true) return this.open()
            this.close()
        },
    },
    created() {
        if (this.value === true) return this.open()
    },
    methods: {
        open() {
            this.overlay = true
        },
        close() {
            setTimeout(() => {
                this.overlay = false
            }, 2000)
        },
    },
}
</script>
