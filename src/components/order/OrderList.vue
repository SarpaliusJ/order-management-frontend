<template>
  <div class="order-list">
    <h2>Orders list</h2>
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>
            <router-link :to="{ name: 'OrderView', params: { id: order.id } }">
              {{ order.item }}
            </router-link>
          </td>
          <td>
            <router-link
              :to="{ name: 'OrderEdit', params: { id: order.id } }"
              class="button edit-button"
            >
              Edit
            </router-link>
            <button @click="deleteOrder(order.id)" class="button delete-button">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <router-link to="/new" class="button create-button"
      >Create New Order</router-link
    >
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "OrderList",
  setup() {
    const store = useStore();
    const orders = ref([]);

    const fetchOrders = async () => {
      await store.dispatch("orders/fetchOrders");
      orders.value = store.getters["orders/allOrders"];
    };

    onMounted(fetchOrders);

    const deleteOrder = async (orderId) => {
      await store.dispatch("orders/deleteOrder", orderId);
      await fetchOrders();
    };

    return {
      orders,
      deleteOrder,
    };
  },
};
</script>

<style scoped>
.order-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
table {
  width: 400px;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

.button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  font-size: 14px;
}

.create-button {
  margin-top: 20px;
  background-color: #007bff;
  color: white;
}

.edit-button {
  background-color: #ffc107;
  color: white;
}

.delete-button {
  background-color: #dc3545;
  color: white;
  margin-left: 10px;
}

.edit-button:hover,
.delete-button:hover {
  opacity: 0.8;
}
</style>
