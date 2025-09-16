<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-5xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <span class="inline-block w-2 h-8 bg-blue-600 rounded"></span>
            Testimonios
        </h2>
        <!-- Solo abrir formulario -->
        <button
            v-if="!showForm"
            @click="showForm = true"
            class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-200"
        >
            ➕ Agregar Testimonio
        </button>
      </div>

      <!-- Formulario para crear o editar -->
      <form
        v-if="showForm"
        @submit.prevent="handleSubmit"
        class="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mb-6 transition-all duration-300"
      >
        <!-- Imagen del testimonial -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Imagen</label>
          <div class="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50 mb-2">
            <img v-if="previewImage" :src="previewImage" alt="testimonial" class="w-full h-full object-cover" />
            <span v-else class="text-gray-400 text-sm">Sin imagen</span>
          </div>
          <input
            type="file"
            @change="handleFileChange"
            class="block w-full text-sm text-gray-600
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-600
                   hover:file:bg-blue-100 cursor-pointer"
          />
        </div>

        <!-- Nombre -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Nombre</label>
          <input
            v-model="form.name_testimonials"
            type="text"
            placeholder="Nombre"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <!-- Tipo -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Tipo</label>
          <input
            v-model="form.type_testimonials"
            type="text"
            placeholder="Ej: socio, cliente"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <!-- Comentario -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Comentario</label>
          <textarea
            v-model="form.coment_testimonials"
            rows="4"
            placeholder="Comentario"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            required
          ></textarea>
        </div>

        <!-- Calificación -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">Calificación</label>
          <input
            v-model.number="form.qualification"
            type="number"
            min="1"
            max="5"
            placeholder="1-5"
            class="w-24 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <!-- Botón -->
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

      <!-- Lista de testimonios -->
      <div class="mt-8 space-y-4">
        <h3 class="text-2xl font-semibold mb-4 text-gray-800">Testimonios registrados</h3>
        <div v-for="testimonial in testimonials" :key="testimonial.id" class="flex justify-between items-start p-4 bg-gray-50 rounded-xl shadow hover:bg-gray-100 transition">
            <div class="flex items-start gap-4">
                <img :src="testimonial.img_testimonial" alt="testimonial" class="w-16 h-16 object-cover rounded-full border border-gray-300"/>
                <div class="max-w-xs"> <!-- Limitar ancho -->
                <h4 class="font-semibold">{{ testimonial.name_testimonials }} - <span class="text-gray-500">{{ testimonial.type_testimonials }}</span></h4>
                <p class="break-words whitespace-pre-line">{{ testimonial.coment_testimonials }}</p>
                <p class="text-yellow-500">⭐ {{ testimonial.qualification }}</p>
                </div>
            </div>
            <div class="flex gap-2 self-start"> <!-- Para alinear botones arriba -->
                <button @click="editTestimonial(testimonial)" class="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg transition">Editar</button>
                <button @click="removeTestimonial(testimonial.id)" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition">Eliminar</button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from "../api/testimonialsService.js";

const form = ref({
  id: null,
  img_testimonial: "",
  name_testimonials: "",
  type_testimonials: "",
  coment_testimonials: "",
  qualification: 1,
});

const testimonials = ref([]);
const previewImage = ref(null);
const showForm = ref(false);

const fetchTestimonials = async () => {
  testimonials.value = await getTestimonials();
};

const toggleForm = () => {
  showForm.value = !showForm.value;
  if (!showForm.value) resetForm();
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    form.value.img_testimonial = file;
    previewImage.value = URL.createObjectURL(file);
  }
};

const handleSubmit = async () => {
  const formData = new FormData();
  formData.append("name_testimonials", form.value.name_testimonials);
  formData.append("type_testimonials", form.value.type_testimonials);
  formData.append("coment_testimonials", form.value.coment_testimonials);
  formData.append("qualification", form.value.qualification);
  if (form.value.img_testimonial instanceof File) {
    formData.append("img_testimonial", form.value.img_testimonial);
  }

  if (form.value.id) {
    await updateTestimonial(form.value.id, formData);
  } else {
    await createTestimonial(formData);
  }

  resetForm();
  await fetchTestimonials();
  showForm.value = false;
};

const editTestimonial = (testimonial) => {
  form.value = { ...testimonial };
  previewImage.value = testimonial.img_testimonial;
  showForm.value = true;
};

const removeTestimonial = async (id) => {
  if (!confirm("¿Eliminar este testimonio?")) return;
  await deleteTestimonial(id);
  await fetchTestimonials();
};

const resetForm = () => {
  form.value = { id: null, img_testimonial: "", name_testimonials: "", type_testimonials: "", coment_testimonials: "", qualification: 1 };
  previewImage.value = null;
};

onMounted(fetchTestimonials);

const cancelForm = () => {
  resetForm();
  showForm.value = false;
};

</script>
