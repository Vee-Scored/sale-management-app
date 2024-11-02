import { create } from "zustand";

export const useRecordStore = create((set)=>({
    records : [],
    resetRecord: ()=> set({records : []}) ,
    addRecord : (record) => set((state) => ({records : [...state.records,record]})),
    removeRecord: (id) => {
        set((state) => ({
          records: state.records.filter((record) => record.product_id != id),
        }))},
        changeQty: (id, num) => set((state) => ({
            records: state.records.map(r => {
              if (r.product_id === id) {
                const newQuantity = r.quantity + num
                const costPerUnit = r.cost / r.quantity
                const newCost = costPerUnit * newQuantity
                return { ...r, quantity: newQuantity, cost: newCost }
              }
              return r
            })
          }))
}))