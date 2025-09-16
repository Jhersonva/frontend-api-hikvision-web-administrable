<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-5xl mx-auto">
      <!-- Encabezado -->
      <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span class="inline-block w-2 h-8 bg-blue-600 rounded"></span>
        ¿Por qué elegirnos?
      </h2>

      <!-- Formulario principal -->
      <form @submit.prevent="handleUpdate" class="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">

        <!-- Icono e imagen principal -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Icono -->
          <div class="flex flex-col items-center">
            <label class="block text-gray-700 font-semibold mb-2">Icono</label>
            <div class="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50 mb-2">
              <img v-if="previewIcon" :src="previewIcon" alt="icono" class="w-full h-full object-cover" />
              <span v-else class="text-gray-400 text-sm">Sin icono</span>
            </div>
            <input
              type="file"
              @change="handleIconChange"
              class="block w-full text-sm text-gray-600
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-600
                     hover:file:bg-blue-100 cursor-pointer"
            />
          </div>

          <!-- Imagen principal -->
          <div class="flex flex-col items-center">
            <label class="block text-gray-700 font-semibold mb-2">Imagen principal</label>
            <div class="w-80 h-40 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50 mb-2">
              <img v-if="previewImg" :src="previewImg" alt="imagen principal" class="w-full h-full object-cover" />
              <span v-else class="text-gray-400 text-sm">Sin imagen</span>
            </div>
            <input
              type="file"
              @change="handleImgChange"
              class="block w-full text-sm text-gray-600
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-600
                     hover:file:bg-blue-100 cursor-pointer"
            />
          </div>
        </div>

        <!-- Inputs -->
        <div class="space-y-4">
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Título principal</label>
            <input
              v-model="form.main_title"
              type="text"
              placeholder="Título principal"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            />
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-2">Descripción</label>
            <textarea
              v-model="form.description"
              rows="5"
              placeholder="Descripción de la sección"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-none"
            ></textarea>
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-2">Nota principal</label>
            <input
              v-model="form.note"
              type="text"
              placeholder="Ej: Nota importante"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            />
          </div>
        </div>

        <!-- Botón de actualización -->
        <div class="text-right mt-4">
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-md transition-all duration-200"
          >
            💾 Guardar cambios
          </button>
        </div>
      </form>

      <!-- Lista Choose Us -->
      <div class="mt-8">
        <h3 class="text-2xl font-semibold mb-4 text-gray-800">Lista de beneficios</h3>
        <div class="space-y-4">
          <div
            v-for="(item, index) in listChooseUs"
            :key="index"
            class="flex justify-between items-center bg-gray-50 p-4 rounded-xl shadow hover:bg-gray-100 transition"
          >
            <span>{{ item }}</span>
            <div class="flex gap-2">
              <button @click="editListItem(index)" class="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg transition">Editar</button>
              <button @click="deleteListItem(index)" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition">Eliminar</button>
            </div>
          </div>
          <div class="flex gap-2 mt-2">
            <input
              v-model="newListItem"
              type="text"
              placeholder="Nuevo beneficio"
              class="flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button @click="addListItem" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">Agregar</button>
          </div>
        </div>
      </div>

      <!-- Lista de notas -->
      <div class="mt-8">
        <h3 class="text-2xl font-semibold mb-4 text-gray-800">Notas</h3>
        <div class="space-y-4">
          <div
            v-for="(item, index) in noteList"
            :key="index"
            class="flex justify-between items-center bg-gray-50 p-4 rounded-xl shadow hover:bg-gray-100 transition"
          >
            <span>{{ item }}</span>
            <div class="flex gap-2">
              <button @click="editNoteItem(index)" class="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg transition">Editar</button>
              <button @click="deleteNoteItem(index)" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition">Eliminar</button>
            </div>
          </div>
          <div class="flex gap-2 mt-2">
            <input
              v-model="newNoteItem"
              type="text"
              placeholder="Nueva nota"
              class="flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button @click="addNoteItem" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">Agregar</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import chooseUsService from "../api/chooseUsService";

const form = ref({
  main_title: "",
  description: "",
  icon_img_choose_us: null,
  img_choose_us: null,
  note: "",
  list_choose_us: [],
  note_list: [],
});

const listChooseUs = ref([]);
const noteList = ref([]);
const newListItem = ref("");
const newNoteItem = ref("");
const previewIcon = ref(null);
const previewImg = ref(null);

const fetchInfo = async () => {
  try {
    const data = await chooseUsService.getInfo();
    form.value = { ...data };
    listChooseUs.value = data.list_choose_us || [];
    noteList.value = data.note_list || [];
    previewIcon.value = data.icon_img_choose_us;
    previewImg.value = data.img_choose_us;
  } catch (err) {
    console.error("Error al cargar Choose Us", err);
  }
};

onMounted(fetchInfo);

const handleIconChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    form.value.icon_img_choose_us = file;
    previewIcon.value = URL.createObjectURL(file);
  }
};

const handleImgChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    form.value.img_choose_us = file;
    previewImg.value = URL.createObjectURL(file);
  }
};

const handleUpdate = async () => {
  try {
    await chooseUsService.update(form.value);
    alert("Información actualizada correctamente");
    fetchInfo();
  } catch (err) {
    console.error("Error al actualizar Choose Us", err);
  }
};

// Lista CRUD
const addListItem = async () => {
  if (!newListItem.value) return;
  try {
    listChooseUs.value = await chooseUsService.addListItem(newListItem.value);
    newListItem.value = "";
  } catch (err) {
    console.error(err);
  }
};

const editListItem = async (index) => {
  const updatedItem = prompt("Editar item", listChooseUs.value[index]);
  if (!updatedItem) return;
  try {
    listChooseUs.value = await chooseUsService.updateListItem(index, updatedItem);
  } catch (err) {
    console.error(err);
  }
};

const deleteListItem = async (index) => {
  if (!confirm("¿Eliminar este item?")) return;
  try {
    listChooseUs.value = await chooseUsService.deleteListItem(index);
  } catch (err) {
    console.error(err);
  }
};

// Nota lista CRUD
const addNoteItem = async () => {
  if (!newNoteItem.value) return;
  try {
    noteList.value = await chooseUsService.addNoteItem(newNoteItem.value);
    newNoteItem.value = "";
  } catch (err) {
    console.error(err);
  }
};

const editNoteItem = async (index) => {
  const updatedItem = prompt("Editar nota", noteList.value[index]);
  if (!updatedItem) return;
  try {
    noteList.value = await chooseUsService.updateNoteItem(index, updatedItem);
  } catch (err) {
    console.error(err);
  }
};

const deleteNoteItem = async (index) => {
  if (!confirm("¿Eliminar esta nota?")) return;
  try {
    noteList.value = await chooseUsService.deleteNoteItem(index);
  } catch (err) {
    console.error(err);
  }
};
</script>
