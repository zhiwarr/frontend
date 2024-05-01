<template>
  <!-- loader strat -->
  <div class="loader" v-if="loading">
    <span></span>
    <span></span>
  </div>
  <!-- loader end -->

  <!-- header start -->
  <header>
    <div class="back-links">
      <router-link :to="{ name: 'profile' }">
        <i class="iconly-Arrow-Left icli"></i>
        <div class="content">
          <h2>saved address</h2>
        </div>
      </router-link>
    </div>
  </header>
  <!-- header end -->

  <!-- delivery option section start -->
  <section class="top-space px-15 pt-0">
    <div class="delivery-option-section">
      <ul>
        <li v-for="address in addresses" :key="address.id">
          <div class="check-box">
            <div class="form-check d-flex ps-0">
              <input
                class="radio_animated"
                type="radio"
                name="flexRadioDefault"
                :id="address.id"
              />
              <label class="form-check-label" :for="address.id"></label>
              <div>
                <h4 class="name">{{ address.name }}</h4>
                <div class="addess">
                  <h4>{{ address.country }}</h4>
                  <h4>{{ address.state }}</h4>
                  <h4>{{ address.city }}</h4>
                  <h4>{{ "(" + address.zip + ")" + address.address }}</h4>
                </div>
                <h4>Phone No: {{ address.phone }}</h4>
                <h6 class="label">Location</h6>
              </div>
            </div>
          </div>
          <div class="buttons mt-3 l-15">
            <button @click.prevent="deleteData(address.id)" class="btn">Remove</button>
            <router-link
              class="btn mx-3 mt-1"
              :to="{ name: 'edit-address', params: { id: address.id } }"
              >edit</router-link
            >
          </div>
        </li>
      </ul>
      <router-link
        :to="{ name: 'new-address' }"
        class="btn btn-outline text-capitalize w-100 mt-3"
        >add New address</router-link
      >
    </div>
  </section>
  <!-- delivery option section end -->

  <!-- panel space start -->
  <section class="panel-space"></section>
  <!-- panel space end -->
</template>
<script setup>
import { ref, getCurrentInstance, onMounted } from "vue";
import { toast } from "vue3-toastify";
import { useRoute, useRouter } from "vue-router";
const instance = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const Address = route.params;
const { $axios, $uploads } = instance.appContext.config.globalProperties;
const addresses = ref([]);
const loading = ref(true);

// Fetch wishlist data
const fetchData = async () => {
  try {
    const response = await $axios.get("address");
    addresses.value = response.data.data;
    loading.value = false;
    console.log(addresses.value);
  } catch (error) {
    console.error("Error fetching address data:", error);
    loading.value = false;
  }
};
const deleteData = async (id) => {
  try {
    const response = await $axios.delete("address/" + id);
    fetchData();
    loading.value = false;
    console.log(response);
  } catch (error) {
    console.error("Error deleting address data:", error);
    loading.value = false;
  }
};
fetchData();

</script>
