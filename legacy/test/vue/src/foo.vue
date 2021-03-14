
<template>
    <div id="app">
        <h1>My Todo App!</h1>
        <Bar/>
    </div>
</template>

<script>
    import Bar from './bar.vue'

    export default {
        components: {
            Bar
        }
    }
</script>

<style lang="scss">
    *, *::before, *::after {
        box-sizing: border-box;
    }

    #app {
        max-width: 400px;
        margin: 0 auto;
        line-height: 1.4;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
