<template>
  <div class="d-flex justify-center py-0">
    <v-item-group
      style="
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 4px;
        justify-items: center;
        flex-grow: 1;
        max-width: 80vw;
      "
    >
      <v-item
        v-for="n in total"
        :key="n"
      >
        <v-btn
          icon
          aria-current="false"
          variant="text"
          :rounded="4"
          :active="n === id"
          :color="n < id ? 'blue' : 'black'"
          @click="router.push(`/question/${n}`)"
        >
          {{ n }}
        </v-btn>
      </v-item>
    </v-item-group>
  </div>

  <v-card-text class="d-flex justify-center pt-2 pb-0">
    <v-btn
      color="secondary"
      variant="flat"
      @click="onSubmit"
    >
      交卷
    </v-btn>
  </v-card-text>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router/auto'
import { useRouteParams } from '@vueuse/router'
import { computed } from 'vue'
const router = useRouter()
const idParam = useRouteParams('id')
const id = computed(() => Number(idParam.value))

const total = 20

const onSubmit = () => {
  router.push('/question/3')
}
</script>
