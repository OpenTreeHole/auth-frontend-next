<template>
  <v-container
    v-if="!mobile"
    class="h-screen"
    style="overflow-wrap: break-word"
  >
    <div class="d-flex flex-column justify-center align-center h-100">
      <v-row
        justify="center"
        style="width: 100%; flex-grow: 0"
      >
        <v-col
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
        <v-col :style="sideColStyle">
          <v-card
            class="px-2 py-3"
            variant="text"
            rounded
            border
          >
            <slot name="side" />
          </v-card>
        </v-col>
      </v-row>
    </div>
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
    <div :style="{ opacity: `${sideColOutputOpacityMobile}%` }">
      <v-divider class="my-4" />
      <slot name="side" />
    </div>

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
import { computed } from 'vue'
import { TransitionPresets, useTransition } from '@vueuse/core'
import { useSide } from '@/composables/side'
import { createEasingFunction } from '@/utils/animation'

const { mobile } = useDisplay()
const version = packageJson.version
const { loading } = useLoading()
const { side } = useSide()

// Animation
const sideColWidth = computed(() => (side.value ? 25 : 0))
const sideColOpacity = computed(() => (side.value ? 100 : 0))

const easing = createEasingFunction(TransitionPresets.easeOutSine)
const easingWidth = (t: number) => {
  if (t <= 0.625) return easing(t / 0.625)
  return 1
}
const easingOpacity = (t: number) => {
  if (t <= 0.625) return 0
  return easing((t - 0.625) / 0.375)
}
const sideColOutputWidth = useTransition(sideColWidth, {
  duration: 500,
  transition: (t) => {
    if (side.value) return easingWidth(t)
    return 1 - easingWidth(1 - t)
  }
})
const sideColOutputOpacity = useTransition(sideColOpacity, {
  duration: 800,
  transition: (t) => {
    if (side.value) return easingOpacity(t)
    return 1
  }
})
const sideColOutputOpacityMobile = useTransition(sideColOpacity, {
  duration: 200,
  transition: (t) => {
    if (side.value) return easing(t)
    return 1 - easing(1 - t)
  }
})
const sideColStyle = computed(() => ({
  flexBasis: `${sideColOutputWidth.value}%`,
  maxWidth: `${sideColOutputWidth.value}%`,
  opacity: `${sideColOutputOpacity.value}%`
}))
</script>
