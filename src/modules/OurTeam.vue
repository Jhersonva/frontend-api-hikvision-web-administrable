<template>
  <div class="p-6">
    <!-- Encabezado -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-3xl font-bold text-gray-800 flex items-center gap-2">
        <span class="inline-block w-2 h-8 bg-blue-600 rounded"></span>
        Nuestro Equipo
      </h2>
      <button
        @click="showCreateForm"
        class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all duration-200"
      >
        ➕ Nuevo Miembro
      </button>
    </div>

    <!-- Formulario -->
    <div v-if="isFormVisible" class="bg-white p-6 rounded-2xl shadow-md border mb-6">
      <h3 class="text-lg font-semibold mb-4">
        {{ isEditing ? "Editar Miembro" : "Agregar Miembro" }}
      </h3>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Nombre -->
        <input
          v-model="form.name_employee"
          type="text"
          placeholder="Nombre del miembro"
          class="w-full border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />

        <!-- Especialidad -->
        <select
          v-model="form.specialty_category_id"
          class="w-full border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="" disabled>Selecciona una especialidad</option>
          <option v-for="cat in specialties" :key="cat.id" :value="cat.id">
            {{ cat.specialty_name }}
          </option>
        </select>

        <!-- Imagen -->
        <!-- Imagen -->
<div>
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

<div v-if="form.img_our_team_url" class="mt-2">
  <img :src="form.img_our_team_url" alt="Imagen actual" class="w-32 h-32 object-cover rounded-lg border" />
</div>

</div>


        <!-- Contactos -->
        <div class="flex gap-4">
          <input
            v-model="form.whatsapp"
            type="text"
            placeholder="WhatsApp"
            class="flex-1 border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <input
            v-model="form.celular"
            type="text"
            placeholder="Celular"
            class="flex-1 border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <!-- Botones -->
        <div class="flex gap-2 justify-end">
          <button
            type="submit"
            class="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow transition-all duration-200"
          >
            {{ isEditing ? "Actualizar" : "Agregar" }}
          </button>
          <button
            type="button"
            @click="cancelForm"
            class="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg shadow transition-all duration-200"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>

    <!-- Tabla -->
    <div class="overflow-x-auto bg-white rounded-2xl shadow-md border">
      <table class="min-w-full text-left border-collapse">
        <thead class="bg-gray-100 text-gray-700 uppercase text-sm">
  <tr>
    <th class="px-6 py-3 border-b">ID</th>
    <th class="px-6 py-3 border-b">Foto</th> <!-- 👈 nueva columna -->
    <th class="px-6 py-3 border-b">Nombre</th>
    <th class="px-6 py-3 border-b">Especialidad</th>
    <th class="px-6 py-3 border-b text-center">Contactos</th>
    <th class="px-6 py-3 border-b text-center">Acciones</th>
  </tr>
</thead>
<tbody>
  <tr v-for="member in team" :key="member.id" class="hover:bg-gray-50 transition-colors">
    <td class="px-6 py-3 border-b">{{ member.id }}</td>
    <td class="px-6 py-3 border-b">
      <img :src="member.img_our_team" alt="Foto" class="w-16 h-16 object-cover rounded-full border" />
    </td>
    <td class="px-6 py-3 border-b font-medium text-gray-800">{{ member.name_employee }}</td>
    <td class="px-6 py-3 border-b">{{ member.specialty_category }}</td>
    <td class="px-6 py-3 border-b text-center space-x-2">
      <a :href="member.contacts.whatsapp.url" target="_blank" class="text-green-500 hover:underline">WhatsApp</a>
      <a :href="member.contacts.celular.url" class="text-blue-500 hover:underline">Celular</a>
    </td>
    <td class="px-6 py-3 border-b text-center space-x-2">
      <button
        @click="editMember(member)"
        class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-lg shadow transition-all duration-200"
      >
        ✏️ Editar
      </button>
      <button
        @click="removeMember(member.id)"
        class="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg shadow transition-all duration-200"
      >
        🗑️ Eliminar
      </button>
    </td>
  </tr>
</tbody>

      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getOurTeam,
  createOurTeamMember,
  updateOurTeamMember,
  deleteOurTeamMember,
} from "../api/ourTeamService.js";
import { getSpecialtyCategories } from "../api/specialtyCategoriesService.js";

const team = ref([]);
const specialties = ref([]);

const form = ref({
  name_employee: "",
  specialty_category_id: "",
  whatsapp: "",
  celular: "",
  img_our_team_file: null, // 👈 archivo
  img_our_team_url: null,  // 👈 url existente o preview
});


const isEditing = ref(false);
const editingId = ref(null);
const isFormVisible = ref(false);

// Fetch inicial
const fetchTeam = async () => {
  team.value = await getOurTeam();
};
const fetchSpecialties = async () => {
  specialties.value = await getSpecialtyCategories();
};

onMounted(() => {
  fetchTeam();
  fetchSpecialties();
});

// Mostrar formulario
const showCreateForm = () => {
  resetForm();
  isFormVisible.value = true;
};

// Manejar archivo
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    form.value.img_our_team_file = file;
    form.value.img_our_team_url = URL.createObjectURL(file); // preview local
  }
};

// Guardar o actualizar
const handleSubmit = async () => {
  const payload = {
    ...form.value,
    img_our_team: form.value.img_our_team_file, // el archivo real
  };

  if (isEditing.value) {
    await updateOurTeamMember(editingId.value, payload);
  } else {
    await createOurTeamMember(payload);
  }

  await fetchTeam();
  cancelForm();
};


// Editar
const editMember = (member) => {
  form.value.name_employee = member.name_employee;
  form.value.specialty_category_id = specialties.value.find(
    (s) => s.specialty_name === member.specialty_category
  )?.id;

  form.value.whatsapp = member.contacts.whatsapp.value || "";
  form.value.celular = member.contacts.celular.value || "";

  // 👇 usar img_our_team (del backend)
  form.value.img_our_team_url = member.img_our_team || null;

  isEditing.value = true;
  editingId.value = member.id;
  isFormVisible.value = true;
};


// Cancelar
const cancelForm = () => {
  resetForm();
  isFormVisible.value = false;
};

// Eliminar
const removeMember = async (id) => {
  if (confirm("¿Seguro que quieres eliminar este miembro?")) {
    await deleteOurTeamMember(id);
    await fetchTeam();
  }
};

// Resetear formulario
const resetForm = () => {
  form.value = {
    name_employee: "",
    specialty_category_id: "",
    whatsapp: "",
    celular: "",
    img_our_team_file: null,
    img_our_team_url: null, 
  };
  isEditing.value = false;
  editingId.value = null;
};


</script>