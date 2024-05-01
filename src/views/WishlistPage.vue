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
          <h2>Your Wishlist ({{ wishlists.length }})</h2>
        </div>
      </router-link>
    </div>
    <div class="header-option">
      <ul>
        <li>
          <a href="cart.html"><i class="iconly-Buy icli"></i></a>
        </li>
      </ul>
    </div>
  </header>
  <!-- header end -->
  <!-- cart items start -->
  <section class="cart-section pt-0 top-space section-b-space">
    <template v-for="wishlist in wishlists" :key="wishlist.id">
      <div class="cart-box px-15">
        <a href="product.html" class="cart-img">
          <img :src="$uploads + wishlist.product.thumb_image" class="img-fluid" alt="" />
        </a>
        <div class="cart-content">
          <a href="product.html">
            <h4>{{ wishlist.product.name }}</h4>
          </a>
          <h5 class="content-color">by {{ wishlist.product.vendor.shop_name }}</h5>

          <div class="price">
            <h4 v-if="wishlist.product.offer_price">
              {{ wishlist.product.offer_price }} IQD
              <del v-if="wishlist.product.offer_price"
                >{{ wishlist.product.price }} IQD</del
              >
              <span v-if="wishlist.product.offer_price">
                %{{
                  calculateDiscountPercent(
                    wishlist.product.price,
                    wishlist.product.offer_price
                  )
                }}
              </span>
            </h4>
            <h4 v-else>{{ wishlist.product.price }} IQD</h4>
          </div>
          <div class="cart-option">
            <h5 data-bs-toggle="offcanvas" :data-bs-target="'#removecart' + wishlist.id">
              <i class="iconly-Buy icli"></i> Add to Cart
            </h5>
            <span class="divider-cls">|</span>
            <!-- Add click handler to the Remove button -->
            <h5 data-bs-toggle="offcanvas" :data-bs-target="'#removecart' + wishlist.id">
              <i class="iconly-Delete icli"></i> Remove
            </h5>
          </div>
        </div>
      </div>
      <div class="divider"></div>
    </template>
  </section>
  <!-- cart items end -->
  <!-- remove item canvas start -->
  <div
    v-for="wishlist in wishlists"
    :key="'removecart' + wishlist.id"
    class="offcanvas offcanvas-bottom h-auto removecart-canvas"
    :id="'removecart' + wishlist.id"
  >
    <div class="offcanvas-body small">
      <div class="content">
        <h4>Remove Item:</h4>
        <p>Are you sure you want to remove or move this item from the cart?</p>
      </div>
      <div class="bottom-cart-panel">
        <div class="row">
          <div class="col-7">
            <button data-bs-toggle="offcanvas" class="title-color btn">Cancel</button>
          </div>
          <div class="col-5">
            <button @click="removeFromWishlist(wishlist.id)" class="btn theme-color">
              REMOVE
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- remove item canvas end -->
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import { calculateDiscountPercent } from "@/helpers.js";
import { toast } from "vue3-toastify";
const instance = getCurrentInstance();
const wishlists = ref([]);
const loading = ref(true);
const { $axios, $uploads } = instance.appContext.config.globalProperties;

// Function to remove item from wishlist
const removeFromWishlist = async (wishlistId) => {
  try {
    await $axios.delete(`wishlist/remove-product/${wishlistId}`);
    // Remove the item from the wishlists array
    const index = wishlists.value.findIndex((wishlist) => wishlist.id === wishlistId);
    if (index !== -1) {
      wishlists.value.splice(index, 1);
    }
    toast.success("wishlist product removed successfully");
  } catch (error) {
    console.error("Error removing item from wishlist:", error);
    // Optionally, you can show an error message or perform any other action if removal fails
  }
};

// Fetch wishlist data
const fetchData = async () => {
  try {
    const response = await $axios.get("wishlists");
    wishlists.value = response.data.data;
    loading.value = false;
  } catch (error) {
    console.error("Error fetching wishlist data:", error);
    loading.value = false;
  }
};

fetchData();
</script>
