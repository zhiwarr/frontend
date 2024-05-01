<template>
  <!-- timer banner start -->
  <section class="banner-timer">
    <div class="banner-bg">
      <div class="banner-content">
        <div>
          <h6>Flash Sale</h6>
          <h2>Sales Ends Check it Quickly</h2>
          <div class="title-timer" id="clockdiv">
            <div class="counter">
              <span class="days">{{ time.days }}</span>
              <p>days</p>
            </div>
            <div class="counter">
              <span class="hours">{{ time.hours }}</span>
              <p>Hours</p>
            </div>
            <div class="counter">
              <span class="minutes">{{ time.minutes }}</span>
              <p>Minutes</p>
            </div>
            <div class="counter">
              <span class="seconds">{{ time.seconds }}</span>
              <p>Seconds</p>
            </div>
          </div>
          <a href="shop.html">explore now</a>
        </div>
      </div>
      <div class="banner-img">
        <img src="@/assets/images/banner-image.png" class="img-fluid" alt="" />
      </div>
    </div>
  </section>
  <!-- timer banner end -->
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineProps } from 'vue'

const props = defineProps(['flashSaleDate'])

const time = ref(getTimeRemaining(props.flashSaleDate.end_date))

function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.now()
  const seconds = Math.floor((total / 1000) % 60)
  const minutes = Math.floor((total / 1000 / 60) % 60)
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const days = Math.floor(total / (1000 * 60 * 60 * 24))

  return {
    days,
    hours,
    minutes,
    seconds
  }
}

function updateClock() {
  time.value = getTimeRemaining(props.flashSaleDate.end_date)
}

onMounted(() => {
  updateClock()
  setInterval(updateClock, 1000)
 
  console.log(Date.parse(props.flashSaleDate.end_date));
})

onBeforeUnmount(() => {
  clearInterval()
})
</script>

<style scoped>
/* Add your scoped styles here */
</style>
