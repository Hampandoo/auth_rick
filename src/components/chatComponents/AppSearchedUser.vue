<template>
  <div
    class="
      rounded
      flex
      text-white
      bg-gray-600
      p-2
      items-center
      my-4
      cursor-pointer
    "
  >
    <img
      class="w-20 h-20 rounded-full object-cover"
      src="https://novy.tv/wp-content/uploads/sites/96/2015/09/shrek.jpg"
      alt="user profile photo"
    />
    <h3 class="align-center ml-2 wrap overflow-hidden">
      {{ searchedUser.email }}
    </h3>
  </div>
</template>

<script>
export default {
  props: ["searchedUser"],
};
</script>

<style>
</style>