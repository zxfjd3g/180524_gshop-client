<template>
  <div>
    B1组件
  </div>
</template>
<script>
  export default {
    /*mounted () {
      this.intervalId = setInterval(() => {
        console.log('做些事件...')
      }, 1000)
    },

    beforeDestroy() {
      clearInterval(this.intervalId)
    },*/

    // 当前组件对象将要更新前调用, 可以访问this
    beforeRouteEnter (to, from, next) {
      next(component => {
        component.intervalId = setInterval(() => {
          console.log('做些事件...')
        }, 1000)
      })
    },
    // 在当前组件离开前调用, 可以访问this
    beforeRouteLeave (to, from, next) {
      clearInterval(this.intervalId)
      next()
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>