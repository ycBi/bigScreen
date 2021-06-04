<template>
  <div>
    <svg-icon class-name="swiper-icon" icon-class="swiper" @click="click"/>
  </div>
</template>

<script>
    export default {
        name: "HeaderSwiper",

        computed: {
            visitedViews() {
                return this.$store.state.tagsView.visitedViews
            },
            routes() {
                return this.$store.state.permission.routes
            }
        },
        data() {
            return {
                flag: false,
            }
        },
        methods: {
            click() {
                this.flag = !this.flag
                console.log(this.visitedViews)
                console.log(this.visitedViews.length)
                this.goToNewPage(0, this.visitedViews)

            },

            goToNewPage(index, routes) {
                if (this.flag) {
                    if (index < routes.length)
                        setTimeout(() => {
                            this.$router.replace({name: routes[index].name})
                            index++
                            this.goToNewPage(index, routes)
                        }, 3000)
                    else
                        this.goToNewPage(0, routes)
                }
            }
        }
    }
</script>

<style scoped>

</style>
