<template>
  <div
    class="
      flex-1
      p:2
      sm:p-6
      justify-between
      flex flex-col
      md:w-2/3
      w-full
      mx-auto
    "
  >
    <div class="flex sm:items-center justify-between py-3">
      <div class="text-2xl mt-1 flex items-center mx-4">
        <span class="text-gray-700 mr-3 shadow"
          >to: {{ messages ? searchedUser.email : "" }}</span
        >
      </div>
    </div>

    <div
      id="messages"
      class="
        flex flex-col
        space-y-4
        p-3
        overflow-y-auto
        scrollbar-thumb-blue
        scrollbar-thumb-rounded
        scrollbar-track-blue-lighter
        scrollbar-w-2
        scrolling-touch
        bg-gray-200
        h-96
      "
    >
      <div v-for="message in messages" :key="message.time" class="chat-message">
        <div
          class="flex items-end"
          :class="
            message.email.toLowerCase() === getEmailFromStorage
              ? 'justify-end'
              : ''
          "
        >
          <div
            class="
              flex flex-col
              space-y-2
              text-sm
              mx-2
              order-2
              items-start
              overflow-x-hidden
            "
          >
            <div>
              <h3 class="bg-gray-800 text-white text-lg rounded-tl px-4">
                {{ message.email }}
              </h3>
              <span
                class="
                  px-4
                  py-2
                  inline-block
                  bg-gray-500
                  text-white text-sm
                  leading-tight
                  w-full
                "
                >{{ message.message }}</span
              >
              <span
                class="
                  text-center
                  px-2
                  py-1
                  justify-self-center
                  rounded-lg
                  inline-block
                  rounded-tr-none rounded-tl-none
                  bg-gray-500
                  text-gray-100 text-xs
                  leading-tight
                  w-full
                "
                >{{ message.time ? formatDate(message.time) : "" }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="messages" class="pt-4 mb-2 sm:mb-0">
      <div class="flex">
        <input
          @keypress.enter="sendMessage(newMessage)"
          v-model="newMessage"
          type="text"
          placeholder="Write Something"
          class="
            mx-2
            w-full
            focus:outline-none focus:placeholder-gray-400
            text-gray-600
            placeholder-gray-600
            pl-6
            bg-gray-200
            rounded-full
            py-3
          "
        />

        <button
          @click="sendMessage(newMessage)"
          type="button"
          class="
            mx-2
            inline-flex
            items-center
            justify-center
            rounded-full
            h-12
            w-12
            transition
            duration-500
            ease-in-out
            text-white
            bg-cyan-500
            hover:bg-blue-400
            focus:outline-none
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-6 w-6 transform rotate-90"
          >
            <path
              d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["messages", "searchedUser"],
  data() {
    return {
      newMessage: "",
    };
  },
  computed: {
    getEmailFromStorage() {
      return localStorage.getItem("email");
    },
  },
  methods: {
    ...mapActions({
      send: "chat/sendNewMessage",
    }),
    async sendMessage(newMessage) {
      if (newMessage) {
        await this.send(newMessage);
      }
      this.newMessage = "";
    },
    updateScroll() {
      let chatScroll = document.getElementById("messages");
      chatScroll.scrollTop = chatScroll.scrollHeight;
    },
    formatDate(time) {
      const formatArray = new Date(time).toString().split(" ");
      formatArray[4] = formatArray[4].split(":").slice(0, 2).join(":");
      return `${formatArray[4]} (${formatArray[1]} ${formatArray[2]})`;
    },
  },
  watch: {
    messages() {
      this.updateScroll();
    },
  },
  mounted() {
    this.updateScroll();
  },
};
</script>

<style>
.scrollbar-w-2::-webkit-scrollbar {
  width: 0.25rem;
  height: 0.25rem;
  position: relative;
  bottom: 0;
}

.scrollbar-track-blue-lighter::-webkit-scrollbar-track {
  background-color: #06b6d4;
}

.scrollbar-thumb-blue::-webkit-scrollbar-thumb {
  background-color: #edf2f7;
  background-color: #1f2937;
}

.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
  border-radius: 0.25rem;
}
</style>