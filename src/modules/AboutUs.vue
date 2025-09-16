<template>
  <div class="p-6 max-w-5xl mx-auto">
    <!-- Encabezado -->
    <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
      <span class="inline-block w-2 h-8 bg-blue-600 rounded"></span>
      About Us
    </h2>

    <!-- Información principal -->
    <div v-if="aboutUs" class="bg-white p-6 rounded-2xl shadow-md mb-6">
      <form @submit.prevent="updateInfo" class="space-y-4">
        <div>
          <label class="block font-semibold">Título</label>
          <input v-model="form.main_title" type="text" class="w-full border rounded-lg px-3 py-2"/>
        </div>
        <div>
          <label class="block font-semibold">Descripción</label>
          <textarea v-model="form.description" rows="3" class="w-full border rounded-lg px-3 py-2"></textarea>
        </div>
        <div class="flex gap-4">
          <div>
            <label class="block font-semibold">Experiencia</label>
            <input v-model="form.experience" type="text" class="w-full border rounded-lg px-3 py-2"/>
          </div>
          <div>
            <label class="block font-semibold">Número</label>
            <input v-model="form.number_about_us" type="text" class="w-full border rounded-lg px-3 py-2"/>
          </div>
        </div>
        <!-- Imagen -->
        <div>
          <label class="block font-semibold">Imagen</label>
          <div class="flex items-center gap-4">
            <div class="w-32 h-20 border rounded-lg overflow-hidden bg-gray-100">
              <img v-if="form.imgPreview" :src="form.imgPreview" class="w-full h-full object-cover"/>
            </div>
            <input type="file" @change="handleFileChange"/>
          </div>
        </div>
        <button type="submit" class="bg-blue-600 text-white px-5 py-2 rounded-lg">💾 Guardar</button>
      </form>
    </div>

    <!-- Lista dinámica -->
    <div class="bg-white p-6 rounded-2xl shadow-md">
      <h3 class="text-xl font-bold mb-4">Lista</h3>
      <ul class="space-y-2">
        <li v-for="(item, index) in aboutUsList" :key="index" class="flex justify-between items-center border-b pb-2">
          <span>{{ item }}</span>
          <div class="flex gap-2">
            <button @click="editItem(index, item)" class="bg-yellow-500 text-white px-3 py-1 rounded">✏️</button>
            <button @click="deleteItem(index)" class="bg-red-600 text-white px-3 py-1 rounded">🗑</button>
          </div>
        </li>
      </ul>

      <!-- Nuevo item -->
      <div class="mt-4 flex gap-2">
        <input v-model="newItem" placeholder="Nuevo item" class="flex-1 border rounded-lg px-3 py-2"/>
        <button @click="addItem" class="bg-green-600 text-white px-4 py-2 rounded">➕</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getAboutUs, updateAboutUs,
  getAboutUsList, addAboutUsItem, updateAboutUsItem, deleteAboutUsItem
} from "../api/aboutUsService.js";

const aboutUs = ref(null);
const aboutUsList = ref([]);
const newItem = ref("");
const editingIndex = ref(null);

const form = ref({
  id: null,
  main_title: "",
  description: "",
  experience: "",
  number_about_us: "",
  img_about: null,
  imgPreview: null,
});

// 📌 Cargar datos
const fetchData = async () => {
  aboutUs.value = await getAboutUs();
  aboutUsList.value = await getAboutUsList();

  // Llenamos formulario
  form.value = {
    ...aboutUs.value,
    imgPreview: aboutUs.value.img_about,
    img_about: null,
  };
};

// Imagen
const handleFileChange = (e) => {
  const file = e.target.files[0];
  form.value.img_about = file;
  form.value.imgPreview = URL.createObjectURL(file);
};

// Actualizar información principal
const updateInfo = async () => {
  const fd = new FormData();
  fd.append("main_title", form.value.main_title);
  fd.append("description", form.value.description);
  fd.append("experience", form.value.experience);
  fd.append("number_about_us", form.value.number_about_us);
  if (form.value.img_about) fd.append("img_about", form.value.img_about);

  await updateAboutUs(fd);
  await fetchData();
};

// Lista
const addItem = async () => {
  if (!newItem.value) return;
  await addAboutUsItem(newItem.value);
  newItem.value = "";
  await fetchData();
};

const editItem = async (index, item) => {
  const updated = prompt("Editar item:", item);
  if (updated) {
    await updateAboutUsItem(index, updated);
    await fetchData();
  }
};

const deleteItem = async (index) => {
  if (confirm("¿Eliminar este item?")) {
    await deleteAboutUsItem(index);
    await fetchData();
  }
};

onMounted(fetchData);
</script>