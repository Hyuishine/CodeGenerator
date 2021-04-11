<!--
 * @Author: 黄宇/hyuishine
 * @Date: 2021-02-04 22:28:29
 * @LastEditors: 黄宇/hyuishine
 * @LastEditTime: 2021-02-24 14:44:25
 * @Description:
 * @Email: hyuishine@gmail.com
 * @Company: 3xData
 * @youWant: add you want
-->
<template>
  <!-- 顶部菜单 -->
  <div>
    <transition enter-active-class="fadeInDown animated"
                leave-active-class="fadeOutUp animated">
      <v-card v-if="topBarStatus"
              id="topBar">
        <page-control @openDrawer="toogleMenu"
                      :menuStatus="status"></page-control>
      </v-card>
      <!-- 顶部菜单下的进度条 通过页面中对store中的loading变量赋值 改变进度条状态
          this.$store.state.module.topBar.loading -->
      <v-progress-linear :active="topBarLoading"
                         :indeterminate="topBarLoading"
                         v-if="topBarLoading"
                         absolute
                         bottom
                         color="primary">
      </v-progress-linear>
    </transition>
    <!-- 菜单收拢时 的菜单展开按钮 -->
    <transition enter-active-class="fadeInDown animated"
                leave-active-class="fadeOutUp animated">
      <div v-if="!topBarStatus"
           id="unfold_topBar"
           v-ripple
           @click="topBarStatus = true">
        <Icon type="ChevronDown4Legacy"
              style="color:white;" />
      </div>
    </transition>
  </div>
</template>
<script>
import pageControl from '@/components/topBarControl/index'
export default {
  name: 'topBar',
  components: { pageControl },
  props: {
    menuStatus: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 侧栏菜单是否打开
      status: false,
      // 顶部菜单是否显示，全屏时关闭
      topBarStatus: true,
      clientWidth: 500
    }
  },
  methods: {
    toogleMenu () {
      this.status = !this.status
      this.$emit('toogleMenu', this.status)
    }
  },
  computed: {
    // 属性计算器
    // 接收来自页面向store的loading传的值 向顶栏菜单的进度条赋值状态
    topBarLoading () {
      return this.$store.state.module.topBar.loading
    }
  },
  mounted () {
    this.clientWidth = document.body.clientWidth
    window.addEventListener('resize', () => {
      this.clientWidth = document.body.clientWidth
    })
    // 接收全局的收拢顶部菜单事件
    this.$bus.$on('fold_topBar', () => {
      this.topBarStatus = false
    })
  },
  watch: {
    // 当屏幕宽度小于五百时 关闭顶部菜单
    clientWidth: {
      handler (n) {
        if (n < 500) {
          this.topBarStatus = false
        } else if (n >= 500) {
          this.topBarStatus = true
        }
      },
      deep: true,
      immediate: true
    },
    // 接收来自layOut的菜单切换，主要为接收侧栏菜单的遮罩层点击关闭的值
    menuStatus: {
      handler (n) {
        this.status = n
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#topBar {
  margin-top: 20px;
  width: 90%;
  margin-bottom: 20px;
  display: inline-block;
  position: relative;
  z-index: 998;
  margin-left: 5%;
  //   清除row的左右溢出-12px
  padding: 0 12px;
}

#unfold_topBar {
  width: 50px;
  position: fixed;
  z-index: 998;
  left: calc(50% - 25px);
  height: 40px;
  color: white;
  text-align: center;
  line-height: 50px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
}
</style>
