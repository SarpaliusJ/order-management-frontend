<template>
  <div v-if="order" class="order-details-container">
    <h2>Order Details</h2>
    <p>Name: {{ order.item }}</p>
    <p>Amount: {{ order.quantity }}</p>
    <p>Price: {{ order.price }}</p>
    <router-link to="/" class="button back-button">Back to Orders</router-link>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  name: "OrderView",
  setup() {
    const store = useStore();
    const route = useRoute();
    const order = ref(null);

    onMounted(async () => {
      const orderId = route.params.id;
      await store.dispatch("orders/fetchOrder", orderId);
      order.value = store.getters["orders/singleOrder"];
    });

    return {
      order,
    };
  },
};
</script>

<style scoped>
.order-details-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  margin-bottom: 20px;
}

p {
  margin: 5px 0;
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
  margin-top: 20px;
}

.back-button {
  background-color: #007bff;
  color: white;
}
</style>
