<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-header(elevated)
      q-toolbar
        q-toolbar-title
          router-link(:to="{ name: 'Home' }").link.text-white MY app
        .row.items-center
          router-link(:to="{ name: 'Login' }").link.text-white.q-mr-md Вход
          router-link(:to="{ name: 'Register' }").link.text-white.q-mr-md Регистрация
    q-page-container
      router-view
</template>

<script>
import { openURL } from 'quasar';

export default {
  name: 'MyLayout',
  data() {
    return {};
  },
  methods: {
    openURL,
  },
};
</script>

<style></style>
