import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],

    // Add a new product
    setProduct: (products) => set((state) => ({
        products: products
    })),

    addProduct : (product) => set((state) =>({products : [...state.products,product]})),

    // Delete a product by id
    deleteProduct: (id) => set((state) => ({
        products: state.products.filter((product) => product.id !== id)
    })),

    // Edit a product by id
    editProduct: (id, updatedProduct) => set((state) => ({
        products: state.products.map((product) =>
            product.id == id ? updatedProduct : product
        )
    }))
}));
