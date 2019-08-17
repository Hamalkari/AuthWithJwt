<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-header(elevated)
      q-toolbar
        q-toolbar-title
          router-link(:to="{ name: 'Home' }").link.text-white MY app 
        .row.items-center(v-if="!loggedIn")
          router-link(:to="{ name: 'Login' }").link.text-white.q-mr-md Вход
          router-link(:to="{ name: 'Register' }").link.text-white.q-mr-md Регистрация
        .row.items-center(v-else)
          router-link(:to="{ name: 'Profile' }").link.text-white.q-mr-md Профиль
          q-btn(color="color" flat @click='logout' label="Выйти")
    q-page-container
      router-view
</template>

<script>
import { openURL } from 'quasar';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MyLayout',
  data() {
    return {};
  },
  computed: {
    ...mapGetters('auth', ['loggedIn']),
  },
  methods: {
    openURL,
    ...mapActions('auth', ['logout']),
  },
};
</script>

<style></style>
