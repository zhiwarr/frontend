<template>
  <!-- Bootstrap Carousel -->
  <section class="pt-0 home-section ratio_55">
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button
          v-for="(slide, index) in props.slides"
          :key="index"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          :data-bs-slide-to="index"
          :class="{ active: index === 0 }"
          aria-current="true"
          aria-label="Slide {{ index }}"
        ></button>
      </div>
      <div class="carousel-inner">
        <div
          v-for="(slide, index) in props.slides"
          :key="slide.id"
          :class="{ 'carousel-item': true, active: index === 0 }"
        >
          <div class="slider-box">
            <img :src="url + slide.banner" class="img-fluid bg-img" alt="" />
            <div class="slider-content">
              <div>
                <h2>{{ slide.type }}</h2>
                <h1>{{ slide.starting_price }} IQD</h1>
                <h6>{{ slide.title }}</h6>
                <router-link :to="slide.btn_url" class="btn btn-solid">SHOP NOW</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </section>
  <!-- Bootstrap Carousel End -->
</template>

<script setup>
import { onMounted, defineProps } from 'vue'
import * as bootstrap from 'bootstrap'
const url = "https://kebazaar.xyz/";
const props = defineProps(['slides'])

onMounted(() => {
  const carousel = new bootstrap.Carousel('#carouselExampleIndicators')
})
</script>
