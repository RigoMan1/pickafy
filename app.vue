<script setup lang="ts">
// const drawer = ref(false);
</script>

<template>
  <v-app class="bg-[#F0F0F2]">
    <v-app-bar class="bg-[#F0F0F2]">
      <div class="container flex h-full items-center px-2 md:px-0">
        <!-- <v-button
          variant="text"
          color="dark"
          icon="i-mdi-menu"
          class="lg:hidden"
          @click="drawer = !drawer"
        /> -->
        <nuxt-link
          class="mx-auto flex items-center gap-2 lg:mx-0"
          to="/"
        >
          <nuxt-img
            src="/images/logo.png"
            alt="Logo"
            class="gap-4 rounded-full border border-primary-100"
            width="40"
            height="40"
          />
          <span class="text-2xl font-bold text-surface-800">Pickafy</span>
        </nuxt-link>
      </div>
    </v-app-bar>

    <!-- <v-navigation-drawer
      v-model="drawer"
      temporary
      width="300"
      class="bg-surface-100 p-4"
    >
      <div></div>
    </v-navigation-drawer> -->

    <v-main>
      <nuxt-page />
    </v-main>

    <v-footer height="auto">
      <div class="flex h-12 items-center justify-center text-sm text-zinc-500">
        <span>
          &copy;
          {{ new Date().getFullYear() }}
          All Rights Reserved
        </span>
      </div>
    </v-footer>
  </v-app>
</template>

<style></style>
