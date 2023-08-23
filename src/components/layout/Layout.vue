<template>
  <v-container
    v-if="!mobile"
    class="h-screen"
    style="overflow-wrap: break-word"
  >
    <v-row
      align="center"
      justify="center"
      class="h-100"
    >
      <v-col
        cols="11"
        sm="9"
        md="7"
        lg="5"
        xl="4"
        class="text-center"
      >
        <v-card
          class="pt-10 px-10 pb-9"
          variant="text"
          rounded
          border
          :loading="loading"
        >
          <Logo />
          <slot />
        </v-card>
        <LinkButtons class="mt-2" />
      </v-col>
    </v-row>
    <v-footer
      app
      padless
      color="surface"
      class="d-flex justify-end px-4"
    >
      <span class="grey--text text--darken-1 font-weight-light"> Version: {{ version }} </span>
    </v-footer>
  </v-container>
  <div
    v-else
    class="text-center"
    style="overflow-wrap: break-word"
  >
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      location="top"
    ></v-progress-linear>
    <Logo class="mt-6 mb-4" />
    <slot />
    <v-footer
      app
      color="surface"
      class="px-1 py-1"
    >
      <LinkButtons />
    </v-footer>
  </div>
</template>

<script setup lang="ts">
import LinkButtons from '@/components/layout/LinkButtons.vue'
import Logo from '@/components/layout/Logo.vue'

import packageJson from '@/../package.json'
import { useDisplay } from 'vuetify'
import { useLoading } from '@/composables/loading'

const { mobile } = useDisplay()
const version = packageJson.version
const { loading } = useLoading()
</script>
