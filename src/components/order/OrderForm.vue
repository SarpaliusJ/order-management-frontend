<template>
  <div class="create-order-container">
    <h2>Create Order</h2>
    <form @submit.prevent="createOrder" class="order-form">
      <div v-for="(item, index) in orderItems" :key="index" class="order-item">
        <div class="input-group">
          <label class="input-label">Item Name</label>
          <input
            v-model="item.item"
            placeholder="Item Name"
            required
            class="input-field"
          />
        </div>
        <div class="input-group">
          <label class="input-label">Item Quantity</label>
          <input
            v-model.number="item.quantity"
            type="number"
            placeholder="Item Quantity"
            required
            class="input-field"
          />
        </div>
        <div class="input-group">
          <label class="input-label">Item Price</label>
          <input
            v-model.number="item.price"
            type="number"
            placeholder="Item Price"
            required
            class="input-field"
            step="0.01"
            inputmode="decimal"
          />
        </div>
        <button
          type="button"
          @click="removeItem(index)"
          class="button remove-button"
        >
          Remove
        </button>
      </div>
      <button type="button" @click="addItem" class="button add-button">
        Add Item
      </button>
      <button type="submit" class="button create-button">Create Order</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "OrderForm",
  setup() {
    const store = useStore();
    const router = useRouter();
    const orderItems = ref([{ item: "", quantity: 0, price: 0 }]);

    const createOrder = async () => {
      const data = orderItems.value.filter(
        (item) => item.quantity > 0 && item.item !== "" && item.price > 0
      );

      if (data.length === 0) {
        alert("Please add at least one item with a valid quantity and price.");
        return;
      }

      await store.dispatch("orders/createOrder", { data });

      orderItems.value = [{ item: "", quantity: 0, price: 0 }];
      router.push("/");
    };

    const addItem = () => {
      orderItems.value.push({ item: "", quantity: 0, price: 0 });
    };

    const removeItem = (index) => {
      if (orderItems.value.length > 1) {
        orderItems.value.splice(index, 1);
      } else {
        alert("At least one item is required.");
      }
    };

    return {
      orderItems,
      createOrder,
      addItem,
      removeItem,
    };
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

.order-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  width: 100%;
  max-width: 1000px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  flex: 1;
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

p {
  margin: 5px 0;
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
  margin-left: 10px;
}

.create-button {
  background-color: #007bff;
  color: white;
  margin-top: 20px;
}

.create-button:hover {
  opacity: 0.8;
}

.add-button {
  background-color: #28a745; /* Bootstrap green */
  color: white;
  margin-top: 20px;
}

.add-button:hover {
  opacity: 0.8;
}

.remove-button {
  background-color: #dc3545; /* Bootstrap red */
  color: white;
  margin-top: 10px;
}

.remove-button:hover {
  opacity: 0.8;
}
</style>
