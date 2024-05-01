<template>
  <!-- loader strat -->
  <!-- <div class="loader">
            <span></span>
            <span></span>
        </div> -->
  <!-- loader end -->
  <!-- header start -->
  <header>
    <div class="back-links">
      <button  @click="$router.go(-1)" class="btn d-flex">
        <i class="iconly-Arrow-Left icli mt-1 mx-2"></i>
        <div class="content">
          <h2 v-if="route.params.id">Update Address</h2>
          <h2 v-else>Add a new address</h2>
        </div>
      </button>
    </div>
  </header>
  <!-- header end -->
  <!-- address details start -->
  <section class="top-space pt-2">
    <div class="address-form-section px-15">
      <div class="form-floating mb-4">
        <input
          type="text"
          v-model="userAddress.country"
          class="form-control"
          id="floatingSelect"
          placeholder="Full Name"
        />
        <label for="floatingSelect">Country/Region</label>
      </div>
      <div class="form-floating mb-4">
        <input
          type="text"
          v-model="userAddress.name"
          class="form-control"
          id="one"
          placeholder="Full Name"
        />
        <label for="one">Full Name</label>
      </div>
      <div class="form-floating mb-4">
        <input
          type="email"
          v-model="userAddress.email"
          class="form-control"
          id="email"
          placeholder="Email Address"
        />
        <label for="email">Email Address</label>
      </div>
      <div class="form-floating mb-4">
        <input
          type="text"
          v-model="userAddress.phone"
          class="form-control"
          id="two"
          placeholder="Mobile Number"
        />
        <label for="two">Mobile Number</label>
      </div>
      <div class="form-floating mb-4">
        <input
          type="number"
          v-model="userAddress.zip"
          class="form-control"
          id="three"
          placeholder="Pin Code"
        />
        <label for="three">Pin Code</label>
      </div>
      <div class="form-floating mb-4">
        <input
          type="text"
          class="form-control"
          id="four"
          v-model="userAddress.address"
          placeholder="flat, house No., building.."
        />
        <label for="four">flat, house No., building..</label>
      </div>
      <div class="form-floating mb-4">
        <input
          type="text"
          class="form-control"
          id="five"
          v-model="userAddress.city"
          placeholder="area, colony, street"
        />
        <label for="five">area</label>
      </div>
      <div class="form-floating mb-4">
        <input
          type="text"
          v-model="userAddress.state"
          class="form-control"
          id="six"
          placeholder="landmark"
        />
        <label for="six">State</label>
      </div>
    </div>
    <div class="divider"></div>
  </section>
  <!-- address details end -->
  <!-- panel space start -->
  <section class="panel-space"></section>
  <!-- panel space end -->
  <!-- bottom panel start -->
  <div class="cart-bottom row m-0">
    <div>
      <div class="left-content col-5">
        <router-link :to="{ name: 'saved-address' }" class="title-color btn btn-light"
          >Cancel</router-link
        >
      </div>
      <button
        v-if="route.params.id"
        @click.prevent="updateData"
        class="title-color btn btn-light"
      >
        Update Address
      </button>
      <button v-else @click.prevent="storeData" class="title-color btn btn-light">
        Add Address
      </button>
    </div>
  </div>
  <!-- bottom panel end -->
</template>
<script setup>
import { ref, getCurrentInstance, reactive } from "vue";
const instance = getCurrentInstance();
const { $axios, $uploads } = instance.appContext.config.globalProperties;
import { toast } from "vue3-toastify";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const userAddress = reactive({
  name: "",
  email: "",
  phone: "",
  country: "",
  state: "",
  zip: "",
  city: "",
  address: "",
});
const resetForm = () => {
  userAddress.value = {
    name: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    zip: "",
    city: "",
    address: "",
  };
};
const route = useRoute();
if (route.params.id) {
  $axios.get("address/" + route.params.id + "/edit").then((response) => {
    userAddress.name = response.data.data.name;
    userAddress.email = response.data.data.email;
    userAddress.phone = response.data.data.phone;
    userAddress.country = response.data.data.country;
    userAddress.state = response.data.data.state;
    userAddress.zip = response.data.data.zip;
    userAddress.city = response.data.data.city;
    userAddress.address = response.data.data.address;
  });
}
const storeData = () => {
  $axios.post("address", userAddress).then((response) => {
    toast.success(response.data.message);
    router.go(-1);
  });
};
const updateData = () => {
  $axios
    .put("address/" + route.params.id, {
      name: userAddress.name,
      email: userAddress.email,
      phone: userAddress.phone,
      country: userAddress.country,
      state: userAddress.state,
      zip: userAddress.zip,
      city: userAddress.city,
      address: userAddress.address,
    })
    .then((response) => {
      toast("address updated");
      router.go(-1);
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>
