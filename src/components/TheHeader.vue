<template>
  <!-- header start -->
  <header >
    <div class="nav-bar">
      <img src="@/assets/svg/bar.svg" class="img-fluid mt-1" alt="" />
    </div>
   
    <div class="header-option mt-1">
      <ul>
        <li>
          <router-link :to="{ name: 'search' }"
            ><i class="iconly-Search icli"></i
          ></router-link>
        </li>
        <li>
          <router-link :to="{ name: 'notifications' }"
            ><i class="iconly-Notification icli"></i
          ></router-link>
        </li>
        <li>
          <router-link :to="{ name: 'wishlist' }"
            ><i class="iconly-Heart icli"></i
          ></router-link>
        </li>
        <li>
          <router-link :to="{ name: 'cart' }"
            ><i class="iconly-Buy icli"></i
          ></router-link>
        </li>
      </ul>
    </div>
  </header>
  <a href="javascript:void(0)" class="overlay-sidebar"></a>
  <div  class="header-sidebar">
    <router-link v-if="userStore.user" :to="{name:'profile'}" class="user-panel">
      <img v-if="userStore.user.image" :src="$uploads+userStore.user?.image" class="img-fluid user-img" alt="" />
      <span>Hello, {{ userStore.user?.name }}</span>
      <i class="iconly-Arrow-Right-2 icli"></i>
    </router-link>
    <div class="sidebar-content">
      <ul class="link-section">
        <li>
          <div>
            <i class="iconly-Setting icli"></i>
            <div class="content toggle-sec w-100">
              <div>
                <h4 class="mb-0">Dark Mode</h4>
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
                <h4 class="mb-0">RTL</h4>
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
          <router-link :to="{ name: 'home' }">
            <i class="iconly-Paper icli"></i>
            <div class="content">
              <h4>Home</h4>
              <h6>Home Page</h6>
            </div>
          </router-link>
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
          <router-link :to="{ name: 'profile' }">
            <i class="iconly-Profile icli"></i>
            <div class="content">
              <h4>Your Account</h4>
              <h6>Profile, Settings, Saved Cards...</h6>
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
        <li v-if="!isAppInstalled">
          <div style="cursor:pointer" id="installApp" @click.prevent="handleInstall">
            <i class="iconly-Setting icli"></i>
            <div class="content">
              <h4>Install App</h4>
              <h6>get latest updates and quick access</h6>
            </div>
          </div>
        </li>
      </ul>
      <div class="divider"></div>
      <ul class="link-section">
        <li>
          <router-link :to="{ name: 'about' }">
            <i class="iconly-Info-Square icli"></i>
            <div class="content">
              <h4>About us</h4>
              <h6>About Kebazaar</h6>
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
  </div>
  <!-- header end -->
</template>
<style scoped></style>
<script setup>
import { onMounted } from "vue";
import {useUserStore} from "../stores/user"
import {getCurrentInstance} from "vue"
const instance = getCurrentInstance()
const {$uploads} = instance.appContext.config.globalProperties;
const userStore = useUserStore()
let deferredPrompt;

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });
});

// Handle installation when the install button is clicked
const handleInstall = () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  }
};

// Check if the app has been installed
const isAppInstalled = window.matchMedia('(display-mode: standalone)').matches; 
onMounted(() => {
  const navBar = document.querySelector(".nav-bar");
  const headerSidebar = document.querySelector(".header-sidebar");
  const overlaySidebar = document.querySelector(".overlay-sidebar");
  const header = document.querySelector("header");

  navBar.addEventListener("click", () => {
    headerSidebar.classList.add("show");
    overlaySidebar.classList.add("show");
    document.body.style.overflow = "hidden";
  });

  overlaySidebar.addEventListener("click", () => {
    headerSidebar.classList.remove("show");
    overlaySidebar.classList.remove("show");
    document.body.style.overflow = "auto";
  });

  window.addEventListener("scroll", () => {
    const scroll = window.pageYOffset || document.documentElement.scrollTop;

    if (scroll >= 15) {
      header.classList.add("darkHeader");
    } else {
      header.classList.remove("darkHeader");
    }
  });
  /*========================
Dark local storage setting js
==========================*/
  document.getElementById("darkButton").addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.add("dark");
      document.getElementById("change-link").setAttribute("href", "assets/css/dark.css");
      localStorage.setItem("body", "dark");
      localStorage.setItem("layoutcss", "assets/css/dark.css");
    } else {
      document.body.classList.remove("dark");
      document.getElementById("change-link").setAttribute("href", "assets/css/style.css");
      localStorage.setItem("body", "");
      localStorage.setItem("layoutcss", "assets/css/style.css");
    }
  });

  document.body.classList.value = localStorage.getItem("body");
  document
    .getElementById("change-link")
    .setAttribute(
      "href",
      localStorage.getItem("layoutcss")
        ? localStorage.getItem("layoutcss")
        : "assets/css/style.css"
    );
  localStorage.getItem("body")
    ? document.getElementById("darkButton").setAttribute("checked", true)
    : "";

  /*========================
RTL local storage setting js
==========================*/
  document.getElementById("rtlButton").addEventListener("change", function () {
    if (this.checked) {
      document.documentElement.setAttribute("dir", "rtl");
      document
        .getElementById("rtl-link")
        .setAttribute("href", "assets/css/vendors/bootstrap.rtl.css");
      localStorage.setItem("rtlcss", "assets/css/vendors/bootstrap.rtl.css");
      localStorage.setItem("dir", "rtl");
    } else {
      document.documentElement.setAttribute("dir", "");
      localStorage.setItem("dir", "");
      document
        .getElementById("rtl-link")
        .setAttribute("href", "assets/css/vendors/bootstrap.css");
      localStorage.setItem("rtlcss", "assets/css/vendors/bootstrap.css");
    }
  });

  document.documentElement.setAttribute("dir", localStorage.getItem("dir"));
  document
    .getElementById("rtl-link")
    .setAttribute(
      "href",
      localStorage.getItem("rtlcss")
        ? localStorage.getItem("rtlcss")
        : "assets/css/vendors/bootstrap.css"
    );
  localStorage.getItem("dir")
    ? document.getElementById("rtlButton").setAttribute("checked", true)
    : "";
});
</script>
