<template>
  <SWUpdatePopup
    ref="SWUpdatePopup"
    v-slot="{ enabled, reload, message, buttonText }"
  >
    <div v-if="enabled" class="sw-update-popup">
      {{ message }}<br />

      <button @click="reload">{{ buttonText }}</button>
    </div>
  </SWUpdatePopup>
</template>

<script>
import SWUpdatePopup from '@vuepress/plugin-pwa/lib/SWUpdatePopup.vue';

export default {
  components: { SWUpdatePopup },
  mounted() {
    if (this.$refs.SWUpdatePopup) {
      this.$refs.SWUpdatePopup.enabled && this.$refs.SWUpdatePopup.reload();
    }
    console.log('mounted',this.$refs.SWUpdatePopup.enabled);
  },
};
</script>

<style>
.sw-update-popup {
  position: fixed;
  right: 1em;
  bottom: 1em;
  padding: 1em;
  border: 1px solid #3eaf7c;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  text-align: center;
  z-index: 3;
}

.sw-update-popup > button {
  margin-top: 0.5em;
  padding: 0.25em 2em;
}

.sw-update-popup-enter-active, .sw-update-popup-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.sw-update-popup-enter, .sw-update-popup-leave-to {
  opacity: 0;
  transform: translate(0, 50%) scale(0.5);
}
</style>
