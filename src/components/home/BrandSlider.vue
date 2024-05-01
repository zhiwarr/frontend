<template>
  <!-- brands section start -->
  <section class="brand-section pl-15">
    <h2 class="title">Biggest Deals on Top Brands</h2>
    <div id="brandCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <swiper-container
          :slides-per-view="3"
          :autoplay="true"
          :space-between="10"
          :breakpoints="{
            768: {
              slidesPerView: 3,
            },
          }"
        >
          <swiper-slide v-for="(brand, index) in brands" :key="brand.id">
            <router-link :to="{name:'shop',query:{brand:brand.slug}}" class="brand-box">
              <img
                :src="$uploads + brand.logo"
                class="d-block w-100 img-fluid"
                :alt="brand.name"
              />
            </router-link>
          </swiper-slide>
        </swiper-container>
      </div>
    </div>
  </section>
  <div class="divider"></div>
  <!-- brands section end -->
</template>

<script setup>
import { register } from "swiper/element/bundle";
register();

const props = defineProps(["brands"]);
import { ref, onMounted, getCurrentInstance } from "vue";
const instance = getCurrentInstance();
const { $axios,$uploads } = instance.appContext.config.globalProperties;
import TheFooter from "@/components/TheFooter.vue";

</script>

<style scoped>
/* Limit the height of brand logos */
.brand-image {
  max-height: 100px; /* Adjust as needed */
}
</style>
