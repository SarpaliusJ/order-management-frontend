<template>
  <div class="create-order-container">
    <h2>Edit Order</h2>
    <form @submit.prevent="updateOrder" class="order-form">
      <div class="input-group">
        <label class="input-label">Item Name</label>
        <input
          v-model="order.item"
          placeholder="Item Name"
          required
          class="input-field"
        />
      </div>
      <div class="input-group">
        <label class="input-label">Item Quantity</label>
        <input
          v-model.number="order.quantity"
          type="number"
          placeholder="Item Quantity"
          required
          class="input-field"
        />
      </div>
      <div class="input-group">
        <label class="input-label">Item Price</label>
        <input
          v-model.number="order.price"
          type="number"
          placeholder="Item Price"
          required
          class="input-field"
          step="0.01"
          inputmode="decimal"
        />
      </div>
      <button type="submit" class="button update-button">Update Order</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "OrderEdit",
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const order = ref({ item: "", quantity: 0, price: 0 });

    const fetchOrder = async () => {
      const orderId = route.params.id;
      await store.dispatch("orders/fetchOrder", orderId);
      order.value = store.getters["orders/singleOrder"];
    };

    const updateOrder = async () => {
      await store.dispatch("orders/updateOrder", { data: order.value });
      router.push("/");
    };

    return {
      order,
      fetchOrder,
      updateOrder,
    };
  },
  mounted() {
    this.fetchOrder();
  },
};
</script>

<style scoped>
.create-order-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  margin-bottom: 20px;
}

.order-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
}

.input-label {
  margin-bottom: 5px;
  font-weight: bold;
}

.input-field {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  font-size: 16px;
}

.update-button {
  background-color: #28a745; /* Bootstrap green */
  color: white;
}

.update-button:hover {
  opacity: 0.8;
}
</style>
