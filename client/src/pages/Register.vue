<template>
  <q-page padding>
    <div class="q-pa-md q-mx-auto" style="max-width:600px">
      <h2 class="text-h4 text-center">
        Регистрация
      </h2>
      <q-form @reset="onReset" @submit="onSubmit">
        <q-input
          ref="first_name"
          label="Ваше имя"
          lazy-rules
          v-model="form.first_name"
          filled
          :rules="[val => !!val || 'Это обязательное поле']"
        />
        <q-input
          ref="second_name"
          label="Ваша фамилия"
          lazy-rules
          v-model="form.second_name"
          filled
          :rules="[val => !!val || 'Это обязательное поле']"
        />
        <q-input
          ref="email"
          label="Ваш Email"
          lazy-rules
          v-model="form.email"
          filled
          :rules="[
            val => !!val || 'Это обязательное поле',
            val => isValidEmail || 'Введите валидные Email',
          ]"
        />
        <q-input
          ref="phone_number"
          label="Ваш номер телефона"
          lazy-rules
          v-model="form.phone_number"
          mask="(#) ### ### ## ##"
          fill-mask
          filled
          :rules="[val => !!val || 'Это обязательное поле']"
        />
        <q-input
          ref="password"
          label="Ваш пароль"
          lazy-rules
          v-model="form.password"
          :type="isPass1 ? 'password' : 'text'"
          filled
          :rules="[val => !!val || 'Это обязательное поле']"
        >
          <template v-slot:append>
            <q-icon
              class="cursor-pointer"
              @click="isPass1 = !isPass1"
              :name="isPass1 ? 'visibility_off' : 'visibility'"
            />
          </template>
        </q-input>
        <q-input
          ref="repeatPassword"
          label="Повторите пароль"
          lazy-rules
          v-model="form.repeatPassword"
          :type="isPass2 ? 'password' : 'text'"
          filled
          :rules="[
            val => !!val || 'Это обязательное поле',
            val => isEqualPassword || 'Пароль должны совпадать',
          ]"
        >
          <template v-slot:append>
            <q-icon
              class="cursor-pointer"
              @click="isPass2 = !isPass2"
              :name="isPass2 ? 'visibility_off' : 'visibility'"
            />
          </template>
        </q-input>
        <div class="btn-actions">
          <q-btn label="Зарегистрироваться" type="submit" color="primary" />
          <q-btn
            label="Сбросить"
            type="reset"
            color="primary"
            class="q-ml-md"
            flat
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      form: {
        first_name: null,
        second_name: null,
        email: null,
        phone_number: null,
        password: null,
        repeatPassword: null,
      },
      isPass1: true,
      isPass2: true,
    };
  },
  methods: {
    onReset() {
      this.form.first_name = null;
      this.form.second_name = null;
      this.form.email = null;
      this.form.phone_number = null;
      this.form.password = null;
      this.form.repeatPassword = null;
    },
    async onSubmit() {
      const data = {
        first_name: this.form.first_name,
        second_name: this.form.second_name,
        email: this.form.email,
        phone_number: this.form.phone_number.replace(/[() ]/g, ''),
        password: this.form.password,
      };
      try {
        const res = await this.$store.dispatch('auth/register', data);
        this.$q.notify({
          message: res.data.message,
          color: 'green',
        });
        this.onReset();
      } catch (error) {
        this.$q.notify({
          message: error.message,
          color: 'red',
        });
      }
    },
  },
  computed: {
    isValidEmail() {
      // eslint-disable-next-line
      const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return reg.test(this.form.email);
    },
    isEqualPassword() {
      return this.form.password === this.form.repeatPassword;
    },
  },
};
</script>
