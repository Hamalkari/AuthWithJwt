<template>
  <q-page padding>
    <div class="q-pa-md q-mx-auto auth">
      <h2 class="text-h4 text-center">Вход в систему</h2>
      <q-form @submit="onSubmit">
        <q-input
          ref="email"
          label="Email"
          v-model="email"
          lazy-rules
          :rules="[
            val => !!val || 'Это обязательное поле',
            val => isValidEmail || 'Введите валидный Email',
          ]"
        />
        <q-input
          ref="password"
          label="Пароль"
          v-model="password"
          :type="isPass ? 'password' : 'text'"
          lazy-rules
          :rules="[val => !!val || 'Это обязательное поле']"
        >
          <template v-slot:append>
            <q-icon
              @click="isPass = !isPass"
              :name="isPass ? 'visibility_off' : 'visibility'"
            />
          </template>
        </q-input>
        <q-btn
          label="Войти"
          type="submit"
          color="primary"
          class="full-width q-mt-md"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: null,
      password: null,
      isPass: true,
    };
  },
  methods: {
    async onSubmit() {
      const data = {
        email: this.email,
        password: this.password,
      };
      try {
        await this.$store.dispatch('auth/login', data);
      } catch (error) {
        this.$q.notify({
          color: 'red',
          message: error.message,
        });
      }
    },
  },
  computed: {
    isValidEmail() {
      // eslint-disable-next-line
      const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return reg.test(this.email);
    },
  },
};
</script>

<style lang="stylus">
.auth
	max-width 600px
</style>
