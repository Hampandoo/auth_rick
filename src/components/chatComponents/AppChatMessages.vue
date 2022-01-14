<template>
  <div class="flex-1 p:2 sm:p-6 flex flex-col md:w-2/3 w-full mx-auto">
    <div v-if="messages" class="flex sm:items-center justify-between py-3">
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
        hoho
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

    <app-message-input v-if="messages" />
  </div>
</template>

<script>
import AppMessageInput from "./AppMessageInput.vue";

export default {
  props: ["messages", "searchedUser"],
  components: {
    AppMessageInput,
  },
  computed: {
    getEmailFromStorage() {
      return localStorage.getItem("email");
    },
  },
  methods: {
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
  updated() {
    this.updateScroll();
  },
};
</script>

<style>
.hoho {
  height: 60vh;
}

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