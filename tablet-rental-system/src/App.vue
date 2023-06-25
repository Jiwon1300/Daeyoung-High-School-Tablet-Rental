<template>
  <n-config-provider :locale="koKR" :date-locale="dateKoKR" :theme-overrides="themeOverrides">

    <div class="main">
      <div>
        <Header />
      </div>
      <n-message-provider>
        <div>
          <RouterView v-slot="{ Component, route }">
            <Transition name="fade" mode="out-in">

              <component :is="Component" :key="route.name" />

            </Transition>
          </RouterView>
        </div>
      </n-message-provider>
    </div>


  </n-config-provider>
</template>

<script>
import { NConfigProvider, } from 'naive-ui'
import { koKR, dateKoKR } from 'naive-ui'
import Header from './components/Header.vue'

const themeOverrides = {

}

export default {
  components: {
    Header
  },
  data() {
    return {
      dateKoKR,
      koKR,
      themeOverrides
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'NanumSquareRound';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumSquareRound.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

.main {
  user-select: none;
  font-family: 'NanumSquareRound';
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>


