<template>
  <!--<div>-->
    <transition :name="mergedOption.transition">
      <div
      :id="mergedOption.id"
      class="et-wrapper"
      :class="clazz"
      :transition="mergedOption.transition"
      v-show="showing"
      >
      <span class="et-content" v-html="mergedOption.msg"></span>
      </div>
    </transition>
  <!--</div>-->
</template>
<style>
  .et-wrapper {
    color: white;
    z-index: 9999;
    width:100%;
  }
  .et-wrapper {
    position: fixed;
    top: 80%;
  }
  .et-content {
    display:inline-block;
    max-width: 720px;    
    background-color: rgba(48, 45, 55, 0.7);
    border-radius: 10px;
    padding: 20px 30px;
  }
  .et-wrapper.et-left {
      right: auto;
      left: 0;
  }
  .et-wrapper.et-right {
      left: auto;
      right: 0;
  }
  .et-wrapper.et-center {
      /*left: 50%;
      transform: translateX(-50%);*/
      text-align:center;
  }
  .et-wrapper.et-top {
      top: 0;
      bottom: auto;
  }
  .et-wrapper.et-bottom {
      top: auto;
      bottom: 0;
  }
  .et-wrapper.et-middle{
      top:50%;
      transform: translateY(-50%);
  }
  .et-wrapper.et-center-middle{
      top:45%;
      transform: translate(0,-50%);
      text-align:center;
  }
  .et-wrapper.et-alert {
    background-color: rgba(189, 19, 19, 0.7);
  }
  .et-wrapper.et-warn {
    background-color: rgba(250, 180 ,90 ,0.9);
  }
  .et-wrapper.et-info {
    background-color: rgba(32, 83, 201, 0.7);
  }
  .fade-enter-active,
  .fade-leave-active,
  .fade-transition {
    -webkit-transition: opacity .3s ease;
    transition: opacity .3s ease;
  }
  .fade-enter,
  .fade-leave,
  .fade-leave-active {
    opacity: 0;
  }
  .slide-down-enter-active,
  .slide-down-leave-active,
  .slide-down-transition {
    -webkit-transition: opacity .3s ease, top .3s ease-in;
    transition: opacity .3s ease, top .3s ease-in;
  }
  .slide-down-leave-active,
  .slide-down-enter,
  .slide-down-leave {
    opacity: 0;
    top: -10% !important;
  }
  .slide-up-enter-active,
  .slide-up-leave-active,
  .slide-up-transition {
    -webkit-transition: opacity .3s ease, top .3s ease-in;
    transition: opacity .3s ease, top .3s ease-in;
  }
  .slide-up-leave-active,
  .slide-up-enter,
  .slide-up-leave {
    opacity: 0;
    top: 110% !important;
  }
  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-left-transition {
    -webkit-transition: opacity .3s ease, left .3s ease-in;
    transition: opacity .3s ease, left .3s ease-in;
  }
  .slide-left-leave-active,
  .slide-left-enter,
  .slide-left-leave {
    opacity: 0;
    left: 110% !important;
  }
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-right-transition {
    -webkit-transition: opacity .3s ease, left .3s ease;
    transition: opacity .3s ease, left .3s ease;
  }
  .slide-right-leave-active,
  .slide-right-enter,
  .slide-right-leave {
    opacity: 0;
    left: -1000px !important;
  }
</style>
<script>
  const Vue = window.Vue
  const suppressWarn = Vue && Vue.version.indexOf('1.') === 0 ? { 'transition': { template: '<div><slot></slot></div>' } } : null
  const DEFAULT_OPT = {
    id: 'easy-toast-default',
    className: '',
    horizontalPosition: 'center',
    verticalPosition: 'middle',
    parent: 'body',
    transition: 'fade',
    duration: 2000,
    msg: '',
    callback:''
  }
  export default {
    DEFAULT_OPT: DEFAULT_OPT,
    data() {
      return {
        queue: [],
        option: {},
        showing: false,
      }
    },
    components: suppressWarn,
    computed: {
      mergedOption: function() {
        return Object.assign({}, DEFAULT_OPT, this.option)
      },
      msg:function(){
        return this.mergedOption.msg;
      },
      clazz: function() {
        let clazz = []
        let className = this.option.className
        let horizontalPosition = this.mergedOption.horizontalPosition
        let verticalPosition = this.mergedOption.verticalPosition

        if(className){
            if(typeof className === 'string'){
                clazz.push(className)
            }

            if(Array.isArray(className)){
                clazz = clazz.concat(className)
            }
        }
        if(horizontalPosition == 'center' && verticalPosition == 'middle'){
            clazz.push('et-center-middle');
        }
        else{
            if(horizontalPosition){
                clazz.push(`et-${horizontalPosition}`)
            }

            if(verticalPosition){
                clazz.push(`et-${verticalPosition}`)
            }
        }

        return clazz.join(' ')
      }
    },
    watch: {
      queue: function() {
        let pending = this.queue.length
        if (pending === 0) {
          return
        }
        this.showing = true
        this.option = this.queue[0]

        if ((!this.option.mode || this.option.mode === 'override') && pending > 1) {
          clearTimeout(this.timeoutId)
          this.showing = false
          this.timeoutId = null
          this.timeoutId = setTimeout(() => this.queue.shift())
        } else {
          this.timeoutId = setTimeout(() => {
            this.showing = false
            this.timeoutId = null
            setTimeout(() => this.queue.shift())
          }, this.mergedOption.duration * pending)
        }
      },
      showing:function(val){
        if(!val && this.mergedOption.callback){
          this.mergedOption.callback();
        }
      }
    }
  }
</script>
