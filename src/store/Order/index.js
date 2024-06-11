import AxiosService from "@/services/AxiosService";

export default {
  namespaced: true,
  state: {
    orders: [],
    order: null,
  },
  mutations: {
    setOrders(state, orders) {
      state.orders = orders;
    },
    setOrder(state, order) {
      state.order = order;
    },
    addOrder(state, order) {
      state.orders.push(order);
    },
    updateOrder(state, updatedOrder) {
      const index = state.orders.findIndex(
        (order) => order.id === updatedOrder.id
      );
      if (index !== -1) {
        state.orders.splice(index, 1, updatedOrder);
      }
    },
    deleteOrder(state, orderId) {
      state.orders = state.orders.filter((order) => order.id !== orderId);
    },
  },
  actions: {
    async fetchOrders({ commit }) {
      try {
        const response = await AxiosService.get("/order");
        commit("setOrders", response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    },
    async fetchOrder({ commit }, orderId) {
      try {
        const response = await AxiosService.get(`/order/${orderId}`);
        commit("setOrder", response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    },
    async createOrder({ commit }, orderData) {
      try {
        const response = await AxiosService.post("/order/create", orderData);
        commit("addOrder", response.data);
      } catch (error) {
        console.error("Error creating order:", error);
      }
    },
    async updateOrder({ commit }, orderData) {
      try {
        const response = await AxiosService.post(
          `/order/update/${orderData.data.id}`,
          orderData
        );
        commit("updateOrder", response.data);
      } catch (error) {
        console.error("Error updating order:", error);
      }
    },
    async deleteOrder({ commit }, orderId) {
      try {
        await AxiosService.delete(`/order/${orderId}`);
        commit("deleteOrder", orderId);
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    },
  },
  getters: {
    allOrders: (state) => state.orders.data,
    singleOrder: (state) => state.order.data,
  },
};
