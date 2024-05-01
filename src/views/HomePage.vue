<template>
  <!-- Loader -->
  <div v-if="!dataLoaded" class="loader">
    <span></span>
    <span></span>
  </div>

  <!-- Other components -->
  <div v-else>
    <the-header></the-header>
    <category-list :categories="categories"></category-list>
    <home-slider :slides="slides"></home-slider>
    <deals-product :products="products"></deals-product>
    <monthly-product
      :products="products"
      :typeBasedProduct="typeBasedProduct"
    ></monthly-product>
    <flash-sale :flashSaleDate="flashSaleDate"></flash-sale>
    <brand-slider :brands="brands"></brand-slider>
    <category-product :categoryProducts="categoryProducts"></category-product>
    <the-footer></the-footer>
  <!-- pwa install app popup start -->
  <div class="offcanvas offcanvas-bottom addtohome-popup" tabindex="-1" id="offcanvas">
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    <div class="offcanvas-body small">
      <div class="app-info">
        <div class="content">
          <h3>Multikart App</h3>
          <a href="#">www.multikart-app.com</a>
        </div>
      </div>
      <a href="javascript:void(0)" class="btn btn-solid install-app" id="installApp" @click="handleInstall">add to home screen</a>
    </div>
  </div>
  
  <!-- pwa install app popup end -->
  </div>
</template>
<script setup>
import { useUserStore } from "../stores/user";
import CategoryList from "@/components/home/CategoryList.vue";
import HomeSlider from "@/components/home/HomeSlider.vue";
import DealsProduct from "@/components/home/DealsProduct.vue";
import MonthlyProduct from "@/components/home/MonthlyProduct.vue";
import FlashSale from "@/components/home/FlashSale.vue";
import BrandSlider from "@/components/home/BrandSlider.vue";
import CategoryProduct from "@/components/home/CategoryProduct.vue";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import { onMounted, ref, getCurrentInstance } from "vue";

const dataLoaded = ref(false);
const userStore = useUserStore();
const typeBasedProduct = ref([]);
const slides = ref([]);
const flashSaleDate = ref([]);
const flashSaleItems = ref([]);
const brands = ref([]);
const products = ref([]);
const categories = ref([]);
const flashSaleProducts = ref([]);
const categoryProducts = ref([]);

const instance = getCurrentInstance();
const { $axios } = instance.appContext.config.globalProperties;


onMounted(async () => {


  // Fetch data from the server
  try {
    const response = await $axios.get("");
    slides.value = response.data.sliders.data;
    flashSaleDate.value = response.data.flashSaleDate;
    flashSaleItems.value = response.data.flashSaleItems;
    products.value = response.data.products;
    typeBasedProduct.value = response.data.typeBasedProducts;
    categoryProducts.value = response.data.categoryProducts;
    categories.value = response.data.categories;
    brands.value = response.data.brands;
    flashSaleProducts.value = response.data.flashSaleProducts.filter((product) =>
      flashSaleItems.value.includes(product.id)
    );

    dataLoaded.value = true;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});


</script>


<style scoped>
.loader {
  /* Add your loader styles here */
}
</style>
