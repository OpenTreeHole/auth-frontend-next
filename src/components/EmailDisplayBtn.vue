<template>
  <v-btn
    variant="outlined"
    rounded
    size="small"
    style="letter-spacing: initial; border: thin solid lightgrey"
    class="mt-2"
  >
    <div class="d-flex justify-center align-center">
      <span style="font-family: 'Open Sans', serif; font-size: 14px">
        <slot />
      </span>
      <svg
        style="width: 24px; height: 24px"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
        />
      </svg>
    </div>
  </v-btn>
</template>
