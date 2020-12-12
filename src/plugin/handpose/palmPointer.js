/**
 * Move a pointer with your palm
 */
import { TweenMax } from 'gsap/all'

export default {
  models: 'handpose',

  // The pointer element
  $pointer: null,

  // Pointers position
  pointer: { x: 0, y: 0 },

  // Used to smoothen out the pointer
  tween: {
    x: 0,
    y: 0,
    positionList: []
  },

  config: {
    offset: {
      x: 0,
      y: -0.75
    },

    speed: {
      x: 1.5,
      y: 1.5
    }
  },

  /**
   * Create a pointer for each user
   */
  onUse () {
    if (!this.$pointer) {
      const $pointer = document.createElement('div')
      $pointer.classList.add('handsfree-pointer', 'handsfree-pointer-finger', 'handsfree-hide-when-started-without-handpose')
      document.body.appendChild($pointer)
      this.$pointer = $pointer
    }

    this.pointer = { x: 0, y: 0 }
  },

  onEnable () {
    this.onUse()
  },

  onFrame (data) {
    TweenMax.to(this.tween, 1, {
      x: this.handsfree.normalize(data.annotations.palmBase[0][0], this.handsfree.debug.$canvas.width * .85) * (window.outerWidth * this.config.speed.x) + this.config.offset.x,
      y: this.handsfree.normalize(this.handsfree.debug.$canvas.height * .85 - data.annotations.palmBase[0][1], this.handsfree.debug.$canvas.height * .85) * (window.outerHeight * this.config.speed.y) + (window.outerHeight * this.config.offset.y),
      overwrite: true,
      ease: 'linear.easeNone',
      immediate: true
    })

    this.$pointer.style.left = `${this.tween.x}px`
    this.$pointer.style.top = `${this.tween.y}px`
    
    data.pointer = {
      x: this.tween.x,
      y: this.tween.y
    }
  },

  /**
   * Toggle pointer
   */
  onDisable() {
    this.$pointer.classList.add('handsfree-hidden')
  },

  onEnable() {
    this.$pointer.classList.remove('handsfree-hidden')
  }
}
