<template>
  <router-link :to="to" class="block">
    <div class="p-5 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 bg-white border border-gray-200">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-gray-800">{{ title }}</h3>
          <p v-if="subtitle" class="text-sm text-gray-500 mt-1">{{ subtitle }}</p>
        </div>

        <!-- icon circle -->
        <div :class="['w-12 h-12 flex items-center justify-center rounded-full', iconBg]">
          <slot name="icon">
            <span class="text-white font-bold text-lg">{{ short }}</span>
          </slot>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
const props = defineProps({
  to: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  iconBg: { type: String, default: "bg-gray-300" }
});

const short = props.title.split(" ").map(w => w[0]).slice(0,2).join("").toUpperCase();
</script>
