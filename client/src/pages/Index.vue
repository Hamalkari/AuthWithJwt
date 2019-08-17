<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg" />
    <q-btn label="Получить страницу" @click="getPage" />
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  methods: {
    async getPage() {
      const response = await this.$axios.get('http://localhost:3000/auth/test');
      console.log(response);
    },
  },
};
</script>
