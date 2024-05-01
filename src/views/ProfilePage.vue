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
      <router-link :to="{ name: 'home' }">
        <i class="iconly-Arrow-Left icli"></i>
        <div class="content">
          <h2>Profile</h2>
        </div>
      </router-link>
    </div>
  </header>
  <!-- header end -->

  <!-- profile section start -->
  <section class="top-space pt-0">
    <div class="profile-detail">
      <div class="media">
        <img :src="url + me.image" class="img-fluid" alt="" />
        <div class="media-body">
          <h2>{{ me.name }}</h2>
          <h6>{{ me.email }}</h6>
          <router-link :to="{ name: 'profile-setting' }" class="edit-btn"
            >Edit</router-link
          >
        </div>
      </div>
    </div>
  </section>
  <!-- profile section end -->
  <!-- link section start -->
  <div class="sidebar-content">
    <ul class="link-section">
      <li>
        <div>
          <i class="iconly-Setting icli"></i>
          <div class="content toggle-sec w-100">
            <div>
              <h4>Dark Mode</h4>
            </div>
            <div class="button toggle-btn ms-auto">
              <input id="darkButton" type="checkbox" class="checkbox" />
              <div class="knobs">
                <span></span>
              </div>
              <div class="layer"></div>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div>
          <i class="iconly-Setting icli"></i>
          <div class="content toggle-sec w-100">
            <div>
              <h4>RTL</h4>
            </div>
            <div class="button toggle-btn ms-auto">
              <input id="rtlButton" type="checkbox" class="checkbox" />
              <div class="knobs">
                <span></span>
              </div>
              <div class="layer"></div>
            </div>
          </div>
        </div>
      </li>
      <li>
        <router-link :to="{ name: 'orders' }">
          <i class="iconly-Document icli"></i>
          <div class="content">
            <h4>Orders</h4>
            <h6>Ongoing Orders, Recent Orders..</h6>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'wishlist' }">
          <i class="iconly-Heart icli"></i>
          <div class="content">
            <h4>Your Wishlist</h4>
            <h6>Your Save Products</h6>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'saved-address' }">
          <i class="iconly-Location icli"></i>
          <div class="content">
            <h4>Saved Address</h4>
            <h6>Home, office..</h6>
          </div>
        </router-link>
      </li>
      <li>
        <a href="#">
          <img src="@/assets/images/flag.png" class="img-fluid" alt="" />
          <div class="content">
            <h4>Langauge</h4>
            <h6>Select your Language here..</h6>
          </div>
        </a>
      </li>
      <li>
        <router-link :to="{ name: 'notifications' }">
          <i class="iconly-Notification icli"></i>
          <div class="content">
            <h4>Notification</h4>
            <h6>Offers, Order tracking messages..</h6>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'settings' }">
          <i class="iconly-Setting icli"></i>
          <div class="content">
            <h4>Settings</h4>
            <h6>Dark mode, RTL, Notification</h6>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'profile-setting' }">
          <i class="iconly-Password icli"></i>
          <div class="content">
            <h4>Profile setting</h4>
            <h6>Full Name, Password..</h6>
          </div>
        </router-link>
      </li>
    </ul>
    <div class="divider"></div>
    <ul class="link-section">
      <li>
        <router-link :to="{ name: 'terms-condition' }">
          <i class="iconly-Info-Square icli"></i>
          <div class="content">
            <h4>Terms & Conditions</h4>
            <h6>T&C for use of Platform</h6>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'contact' }">
          <i class="iconly-Call icli"></i>
          <div class="content">
            <h4>Help/Customer Care</h4>
            <h6>Customer Support, FAQs</h6>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
  <div class="px-15">
    <button @click.prevent="logout" class="btn btn-outline w-100 content-color">
      LOG OUT
    </button>
  </div>
  <!-- link section end -->

  <!-- panel space start -->
  <section class="panel-space"></section>
  <!-- panel space end -->
  <the-footer></the-footer>
</template>
<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const instance = getCurrentInstance();
const { $axios } = instance.appContext.config.globalProperties;
let loading = ref(true);
import TheFooter from "@/components/TheFooter.vue";
const me = ref([]);
const url = "https://kebazaar.xyz/";
const fetchData = async () => {
  await $axios.get(`profile`).then((response) => {
    me.value = response.data.user;
    loading.value = false;
  });
};
fetchData();
// Function to handle logout
const logout = () => {
  // Remove token from local storage
  localStorage.removeItem("token");
  // Redirect to login page
  router.push({ name: "login" });
};
</script>
