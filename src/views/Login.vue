<template>
  <div class="flex flex-col h-screen bg-gray-100">
    <div class="grid place-items-center mx-2 my-20 sm:my-auto">
      <div
        class="
          w-11/12
          p-12
          sm:w-8/12
          md:w-6/12
          lg:w-5/12
          2xl:w-4/12
          px-6
          py-10
          sm:px-10 sm:py-6
          bg-white
          rounded-lg
          shadow-md
          lg:shadow-lg
          border border-cyan-500
        "
      >
        <h2
          class="text-center font-semibold text-3xl lg:text-4xl text-gray-800"
        >
          Login
        </h2>

        <Form class="mt-10" @submit="pushLogin" :validation-schema="schema">
          <div class="mb-2" v-if="message">
            <h3 class="text-red-600">{{ message }}</h3>
          </div>
          <label
            for="email"
            class="block text-xs font-semibold text-gray-600 uppercase"
            >E-mail</label
          >
          <Field
            id="email"
            type="email"
            name="email"
            placeholder="e-mail address"
            autocomplete="email"
            class="
              block
              w-full
              py-3
              px-1
              mt-2
              text-gray-800
              appearance-none
              border-b-2 border-gray-100
              focus:text-gray-500 focus:outline-none focus:border-gray-200
            "
            required
          />
          <ErrorMessage name="email" class="text-red-600" />

          <label
            for="password"
            class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >Password</label
          >
          <Field
            id="password"
            type="password"
            name="password"
            placeholder="password"
            autocomplete="current-password"
            class="
              block
              w-full
              py-3
              px-1
              mt-2
              mb-4
              text-gray-800
              appearance-none
              border-b-2 border-gray-100
              focus:text-gray-500 focus:outline-none focus:border-gray-200
            "
            required
          />
          <ErrorMessage name="password" class="text-red-600" />

          <button
            type="submit"
            class="
              w-full
              py-3
              mt-10
              bg-cyan-500
              rounded-sm
              font-medium
              text-white
              uppercase
              focus:outline-none
              hover:bg-gray-700 hover:shadow-none
            "
          >
            Login
          </button>

          <div class="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
            <router-link to="/register" class="flex-2 underline">
              Create an Account
            </router-link>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { mapActions } from "vuex";
import router from "../router";
import { error } from "../utils/error";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup
        .string()
        .trim()
        .required("Enter your email")
        .email("Email is invalid")
        .max(40, "Email can't be so long"),
      password: yup
        .string()
        .trim()
        .required("Enter your password")
        .min(6, "Password must be longer")
        .max(22, "Password can't be so long"),
    });

    return {
      schema,
      loading: false,
      message: null,
    };
  },
  methods: {
    ...mapActions({
      login: "auth/login",
    }),
    async pushLogin(userData) {
      try {
        await this.login(userData);
        router.push("/");
      } catch (e) {
        this.message = e;
      }
    },
  },
  mounted() {
    if (this.$route.query.message) {
      this.message = error(this.$route.query.message);
    }
  },
};
</script>

<style></style>
