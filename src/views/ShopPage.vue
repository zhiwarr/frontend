<template>
  <div v-if="!dataLoaded" class="loader">
    <span></span>
    <span></span>
  </div>
  <!-- Header -->
  <header>
    <!-- Back link -->
    <div class="back-links">
      <router-link :to="{ name: 'home' }">
        <i class="iconly-Arrow-Left icli"></i>
        <div class="content">
          <h2>{{ $route.query.category }}</h2>
          <h6>{{ products.length }} Products</h6>
        </div>
      </router-link>
    </div>
    <!-- Header options -->
    <div class="header-option">
      <ul>
        <li>
          <a href="wishlist.html"><i class="iconly-Heart icli"></i></a>
        </li>
        <li>
          <a href="cart.html"><i class="iconly-Buy icli"></i></a>
        </li>
      </ul>
    </div>
  </header>
  <!-- Search panel -->
  <div class="search-panel top-space xl-space px-15">
    <div class="search-bar">
      <input class="form-control form-theme" placeholder="Search" />
      <i class="iconly-Search icli search-icon"></i>
      <i class="iconly-Camera icli camera-icon"></i>
    </div>
    <div class="filter-btn" data-bs-toggle="modal" data-bs-target="#filterModal">
      <i class="iconly-Filter icli"></i>
    </div>
  </div>
  <!-- Products -->
  <section class="px-15 lg-t-space" id="products-section">
    <div class="row gy-3 gx-3">
      <!-- Product Cards -->
      <template v-for="product in products" :key="product.id">
        <div class="col-md-4 col-6">
          <!-- Product Box -->
          <div class="product-box ratio_square">
            <!-- Image Part -->
            <div class="img-part">
              <router-link
                :to="{ name: 'product-detail', params: { product: product.slug } }"
              >
                <img
                  :src="$uploads + product.thumb_image"
                  style="height: 200px; width: 200px"
                  alt=""
                  class="img-fluid bg-img"
                />
              </router-link>
              <div class="wishlist-btn">
                <button class="btn" @click.prevent="toWishlist(product.id)">
                  <i class="iconly-Heart icli"></i>
                  <i class="iconly-Heart icbo"></i>
                  <div class="effect-group">
                    <span class="effect"></span>
                    <span class="effect"></span>
                    <span class="effect"></span>
                    <span class="effect"></span>
                    <span class="effect"></span>
                  </div>
                </button>
              </div>
            </div>
            <!-- Product Content -->
            <div class="product-content">
              <!-- Ratings -->
              <ul class="ratings">
                <li v-for="n in 5" :key="n">
                  <i class="iconly-Star icbo"></i>
                </li>
              </ul>
              <!-- Product Name -->
              <router-link
                :to="{ name: 'product-detail', params: { product: product.slug } }"
              >
                <h4>{{ product.name }}</h4>
              </router-link>
              <!-- Price -->
              <div class="price">
                <h4 v-if="product.offer_price">
                  {{ product.offer_price }} IQD
                  <del v-if="product.offer_price">{{ product.price }} IQD</del>
                  <span v-if="product.offer_price"
                    >%{{
                      calculateDiscountPercent(product.price, product.offer_price)
                    }}</span
                  >
                </h4>
                <h4 v-else>{{ product.price }} IQD</h4>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <!-- Infinite Loading -->
    <InfiniteLoading
      @infinite="load"
      spinner="spiral"
      direction="bottom"
      force-use-infinite-wrapper
    >
      <div slot="no-more">No more items</div>
      <div slot="no-results">No results</div>
    </InfiniteLoading>
  </section>
  <!-- products end -->
  <!--  filter modal start  -->
  <div class="modal filter-modal" id="filterModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Filters</h2>
          <a href="javascript:void(0)" data-bs-dismiss="modal"
            ><img src="@/assets/svg/x-dark.svg" class="img-fluid" alt=""
          /></a>
        </div>
        <div class="modal-body">
          <div class="filter-box">
            <h2 class="filter-title">Sort By:</h2>
            <div class="filter-content">
              <select
                class="form-select form-control form-theme"
                aria-label="Default select example"
              >
                <option selected>Recommended</option>
                <option value="1">Popularity</option>
                <option value="2">What's New</option>
                <option value="3">Price: High to Low</option>
                <option value="4">Price: Low to High</option>
                <option value="5">Customer rating</option>
              </select>
            </div>
          </div>
          <div class="filter-box">
            <h2 class="filter-title">Brand:</h2>
            <div class="filter-content">
              <ul class="row filter-row g-3">
                <li class="col-6">
                  <div class="filter-col">Here & Now</div>
                </li>
                <li class="col-6">
                  <div class="filter-col">Zara</div>
                </li>
                <li class="col-6 active">
                  <div class="filter-col">Mast & harbour</div>
                </li>
                <li class="col-6">
                  <div class="filter-col">Tokyo talkies</div>
                </li>
                <li class="col-6">
                  <div class="filter-col">Vogue</div>
                </li>
                <li class="col-6">
                  <div class="filter-col">gucci</div>
                </li>
              </ul>
            </div>
          </div>
          <div class="filter-box">
            <h2 class="filter-title">Size:</h2>
            <div class="filter-content">
              <ul class="row filter-row g-3">
                <li class="col-4">
                  <div class="filter-col">small</div>
                </li>
                <li class="col-4">
                  <div class="filter-col">Medium</div>
                </li>
                <li class="col-4">
                  <div class="filter-col">large</div>
                </li>
                <li class="col-4">
                  <div class="filter-col">XL</div>
                </li>
                <li class="col-4">
                  <div class="filter-col">2XL</div>
                </li>
              </ul>
            </div>
          </div>
          <div class="filter-box">
            <h2 class="filter-title">Price:</h2>
            <div class="filter-content">
              <div class="range-slider pricing-slider">
                <input type="text" class="js-range-slider" value="" />
              </div>
            </div>
          </div>
          <div class="filter-box">
            <h2 class="filter-title">Occasion:</h2>
            <div class="filter-content">
              <ul class="row filter-row g-3">
                <li class="col-6">
                  <div class="filter-col">Casual</div>
                </li>
                <li class="col-6">
                  <div class="filter-col">sports</div>
                </li>
                <li class="col-6">
                  <div class="filter-col">beach wear</div>
                </li>
                <li class="col-6">
                  <div class="filter-col">lounge wear</div>
                </li>
                <li class="col-6">
                  <div class="filter-col">formal</div>
                </li>
                <li class="col-6">
                  <div class="filter-col">party</div>
                </li>
              </ul>
            </div>
          </div>
          <div class="filter-box">
            <h2 class="filter-title">Colors:</h2>
            <div class="filter-content">
              <ul class="filter-color">
                <li>
                  <div class="color-box light-purple"></div>
                </li>
                <li class="active">
                  <div class="color-box light-grey"></div>
                </li>
                <li>
                  <div class="color-box blue-purple"></div>
                </li>
                <li>
                  <div class="color-box light-orange"></div>
                </li>
                <li>
                  <div class="color-box dark-pink"></div>
                </li>
                <li>
                  <div class="color-box green-blue"></div>
                </li>
                <li>
                  <div class="color-box green"></div>
                </li>
                <li>
                  <div class="color-box blue"></div>
                </li>
                <li>
                  <div class="color-box yellow"></div>
                </li>
                <li>
                  <div class="color-box light-red"></div>
                </li>
                <li>
                  <div class="color-box light-purple2"></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <a href="javascript:void(0)" class="reset-link" data-bs-dismiss="modal"
            >RESET</a
          >
          <a href="javascript:void(0)" class="btn btn-solid" data-bs-dismiss="modal"
            >apply filters</a
          >
        </div>
      </div>
    </div>
  </div>
  <!-- filter modal end -->
  <the-footer></the-footer>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
const instance = getCurrentInstance();
const { $axios } = instance.appContext.config.globalProperties;
import { useRoute } from "vue-router";
import InfiniteLoading from "v3-infinite-loading";
import { calculateDiscountPercent } from "@/helpers.js";
import TheFooter from "@/components/TheFooter.vue";
const route = useRoute();
const products = ref([]);
const dataLoaded = ref(false);
let page = 1;
let query = route.query;
let { category, subcategory, childcategory,vendor,brand } = query;
const load = async ($state) => {
  try {
    const name = category
      ? "category"
      : subcategory
      ? "subcategory"
      : childcategory
      ? "childcategory"
      : vendor 
      ?"vendor"
      :brand
      ?'brand'
      : "";
    const value = category || subcategory || childcategory || vendor||brand|| "";
    const response = await $axios.get(`products?${name}=${value}&page=${page}`);

    const json = await response.data.products.data;
    if (page > response.data.products.last_page) $state.complete();
    else {
      products.value.push(...json);
      $state.loaded();
      dataLoaded.value = true;
    }
    page++;
  } catch (error) {
    $state.error();
  }
};
import { useUserStore } from "../stores/user";
import { toast } from "vue3-toastify";
const userStore = useUserStore();

const toWishlist = async (id) => {
  const product_id = id;
  console.log(product_id);
  try {
    const response = await $axios.post("wishlist/add-product", {
      id: product_id,
      user_id: userStore.id,
    });
    if (response.data.status === "success") {
      // Product added to wishlist successfully
      toast.success(response.data.message);
      // You can update the count of wishlist items here if needed
    } else {
      // Some error occurred
      toast.error(response.data.message);
    }
  } catch (error) {
    // Handle error if request fails
    console.error("Error:", error);
  }
};
</script>
