import instance from "./api";

const ProductsService = {
  // GET: listar productos
  async getAll() {
    const response = await instance.get("/products");
    return response.data;
  },

  // POST: crear producto
async create(productData) {
  const formData = new FormData();

  Object.keys(productData).forEach((key) => {
    if (productData[key] !== null && productData[key] !== undefined) {
      if (Array.isArray(productData[key])) {
        productData[key].forEach((item, i) => {
          formData.append(`${key}[${i}]`, item);
        });
      } else {
        formData.append(key, productData[key]);
      }
    }
  });

  const response = await instance.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
},

// PUT: actualizar producto (con soporte para _method y formData para imágenes)
async update(id, productData) {
  const formData = new FormData();

  Object.keys(productData).forEach((key) => {
    const value = productData[key];

    // no enviar si está vacío/null y no es 0
    if (value !== null && value !== undefined && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((item, i) => {
          formData.append(`${key}[${i}]`, item);
        });
      } else {
        formData.append(key, value);
      }
    }
  });

  formData.append("_method", "PUT");

  const response = await instance.post(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
},

  // DELETE: eliminar producto
  async delete(id) {
    const response = await instance.delete(`/products/${id}`);
    return response.data;
  },
};

export default ProductsService;