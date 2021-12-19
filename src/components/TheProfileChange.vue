<template>
  <div class="mt-8">
            <Form 
        class="mt-10" 
        @submit="changeData"
        >
          <label
            for="username"
            class="block text-xs font-semibold text-gray-600 uppercase"
            >Username</label
          >
          <Field
            id="username"
            type="username"
            name="username"
            placeholder="Username"
            autocomplete="username"
            class="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
          />

          <label
            for="another"
            class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >Something another</label
          >
          <Field
            id="another"
            type="another"
            name="another"
            placeholder="Another"
            class="block w-full py-3 px-1 mt-2 mb-4 text-gray-800 appearance-none border-b-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200"
          />

          <button
            type="submit"
            class="w-full py-3 bg-cyan-500 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none"
          >
            Change
          </button>
        </Form>
  </div>
</template>

<script>
import { Form, Field } from "vee-validate";
import { mapActions } from "vuex"

export default {
  components: {
    Form,
    Field,
  },
  methods: {
    ...mapActions({
      changeProfile: "user/changeProfile"
    }),
    changeData(user) {
      this.changeProfile(user)
    }
  }
}
</script>

<style>

</style>