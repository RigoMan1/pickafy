<script setup lang="ts"></script>

<template>
  <v-app class="bg-surface-200/55">
    <v-app-bar
      class="flex items-center"
      height="96"
    >
      <nuxt-link
        class="container flex items-center gap-2"
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
    </v-app-bar>

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
