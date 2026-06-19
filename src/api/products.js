const BASE_URL = 'https://dummyjson.com';

/**
 * Fetch all products with optional pagination.
 * @param {number} limit - Number of products to fetch (0 = all)
 * @param {number} skip - Number of products to skip
 * @returns {Promise<{products: Array, total: number, skip: number, limit: number}>}
 */
export async function fetchProducts(limit = 0, skip = 0) {
  const url = `${BASE_URL}/products?limit=${limit}&skip=${skip}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetch all product categories.
 * @returns {Promise<Array<{slug: string, name: string, url: string}>>}
 */
export async function fetchCategories() {
  const url = `${BASE_URL}/products/categories`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetch products by category slug.
 * @param {string} categorySlug - The category slug
 * @returns {Promise<{products: Array, total: number, skip: number, limit: number}>}
 */
export async function fetchProductsByCategory(categorySlug) {
  const url = `${BASE_URL}/products/category/${categorySlug}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch products for category "${categorySlug}": ${response.status} ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetch a single product by ID.
 * @param {number|string} id - The product ID
 * @returns {Promise<Object>}
 */
export async function fetchProductById(id) {
  const url = `${BASE_URL}/products/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch product #${id}: ${response.status} ${response.statusText}`);
  }
  return response.json();
}
