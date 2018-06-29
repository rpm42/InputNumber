<template>
  <div id="app">
    <InputNumber/>
  </div>
</template>

<script>
import InputNumber from './components/InputNumber'

export default {
  name: 'App',
  components: {
    InputNumber
  }
}
</script>

<style lang="stylus">
body, html
  height: 100%
  width: 100%
body.moving
  cursor: ns-resize
#app
  font-family: 'Roboto', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  display: flex
  align-items: center
  justify-content: center
  height: 100%
  width: 100%
</style>
