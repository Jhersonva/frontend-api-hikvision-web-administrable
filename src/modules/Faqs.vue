<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-5xl mx-auto">
      <!-- Título -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <span class="inline-block w-2 h-8 bg-blue-600 rounded"></span>
          Preguntas Frecuentes (FAQs)
        </h2>

        <!-- Botón abrir formulario -->
        <button
          v-if="!showForm"
          @click="showForm = true"
          class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-200"
        >
          ➕ Agregar FAQ
        </button>
      </div>

      <!-- Formulario -->
      <form
        v-if="showForm"
        @submit.prevent="handleSubmit"
        class="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mb-6 transition-all duration-300"
      >
        <!-- Pregunta -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Pregunta</label>
          <input
            v-model="form.question"
            type="text"
            placeholder="Escribe la pregunta"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <!-- Respuesta -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Respuesta</label>
          <textarea
            v-model="form.response"
            rows="4"
            placeholder="Escribe la respuesta"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            required
          ></textarea>
        </div>

        <!-- Botones -->
        <div class="flex justify-end gap-2">
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-md transition-all duration-200"
          >
            {{ form.id ? "💾 Actualizar" : "💾 Crear" }}
          </button>
          <button
            type="button"
            @click="cancelForm"
            class="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-2.5 rounded-lg shadow-md transition-all duration-200"
          >
            ❌ Cancelar
          </button>
        </div>
      </form>

      <!-- Lista de FAQs -->
      <div class="mt-8 space-y-4">
        <h3 class="text-2xl font-semibold mb-4 text-gray-800">FAQs Registradas</h3>

        <div
          v-for="faq in faqs"
          :key="faq.id"
          class="p-5 bg-white rounded-xl shadow hover:shadow-md border border-gray-200 transition"
        >
          <div class="flex justify-between items-start">
            <div class="max-w-2xl">
              <h4 class="font-semibold text-lg text-gray-800">
                ❓ {{ faq.question }}
              </h4>
              <p class="text-gray-600 mt-2 whitespace-pre-line">
                {{ faq.response }}
              </p>
            </div>
            <div class="flex gap-2 self-start">
              <button
                @click="editFaq(faq)"
                class="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg transition"
              >
                ✏️ Editar
              </button>
              <button
                @click="removeFaq(faq.id)"
                class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
              >
                🗑 Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getFaqs, createFaq, updateFaq, deleteFaq } from "../api/faqsService.js";

const faqs = ref([]);
const form = ref({ id: null, question: "", response: "" });
const showForm = ref(false);

const fetchFaqs = async () => {
  faqs.value = await getFaqs();
};

const handleSubmit = async () => {
  if (form.value.id) {
    await updateFaq(form.value.id, form.value);
  } else {
    await createFaq(form.value);
  }
  await fetchFaqs();
  resetForm();
  showForm.value = false;
};

const editFaq = (faq) => {
  form.value = { ...faq };
  showForm.value = true;
};

const removeFaq = async (id) => {
  if (!confirm("¿Eliminar esta FAQ?")) return;
  await deleteFaq(id);
  await fetchFaqs();
};

const resetForm = () => {
  form.value = { id: null, question: "", response: "" };
};

const cancelForm = () => {
  resetForm();
  showForm.value = false;
};

onMounted(fetchFaqs);
</script>