<template>
  <!-- top design start -->
  <img src="@/assets/images/design.svg" class="img-fluid design-top" alt="" />
  <!-- top design end -->

  <!-- top bar start -->
  <div class="topbar-section">
    <a href="index.html"
      ><img src="@/assets/images/logo.png" class="img-fluid" alt=""
    /></a>
    <a class="skip-cls" href="index.html">SKIP</a>
  </div>
  <!-- top bar end -->

  <!-- login section start -->
  <section class="form-section px-15 top-space section-b-space">
    <h1>Hey, <br />Sign Up</h1>
    <form>
      <div class="form-floating mb-4">
        <input
          type="text"
          v-model="form.name"
          class="form-control"
          id="one"
          placeholder="Name"
        />
        <label for="one">Name</label>
        <div v-if="form.errors.has('name')" v-html="form.errors.get('name')" />
      </div>
      <div class="form-floating mb-4">
        <input
          type="email"
          class="form-control"
          v-model="form.email"
          id="two"
          placeholder="Email/phone"
        />
        <label for="two">Email/phone</label>
        <div v-if="form.errors.has('email')" v-html="form.errors.get('email')" />
      </div>
      <div class="form-floating mb-4">
        <input
          type="password"
          id="txtPassword"
          class="form-control"
          v-model="form.password"
          placeholder="password"
        />
        <label>Password</label>
        <div v-if="form.errors.has('password')" v-html="form.errors.get('password')" />

        <div id="btnToggle" class="password-hs">
          <i id="eyeIcon" class="iconly-Hide icli hide"></i>
        </div>
      </div>
      <div class="form-floating mb-4">
        <input
          type="password"
          id="txtPasswordc"
          class="form-control"
          v-model="form.password_confirmation"
          placeholder="password_confirmation"
        />
        <label for="txtPasswordc">Password Confirmation</label>
        <div id="btnToggle" class="password-hs">
          <i id="eyeIcon" class="iconly-Hide icli hide"></i>
        </div>
      </div>
      <button @click.prevent="register" class="btn btn-solid w-100">Sign UP</button>
    </form>
    <div class="or-divider">
      <span>Or sign in with</span>
    </div>
    <div class="social-auth">
      <ul>
        <li>
          <a href="#"
            ><img src="@/assets/images/social/google.png" class="img-fluid" alt=""
          /></a>
        </li>
        <li>
          <a href="#"
            ><img src="@/assets/images/social/fb.png" class="img-fluid" alt=""
          /></a>
        </li>
        <li>
          <a href="#"
            ><img src="@/assets/images/social/apple.png" class="img-fluid" alt=""
          /></a>
        </li>
      </ul>
    </div>
    <div class="bottom-detail text-center mt-3">
      <h4 class="content-color">
        Already have an Account?
        <a class="title-color text-decoration-underline" href="login.html">Sign In</a>
      </h4>
    </div>
  </section>
  <!-- login section end -->
  <the-footer></the-footer>
</template>
<script>
import { mapStores } from "pinia";
import TheFooter from "@/components/TheFooter.vue";
import { useUserStore } from "../stores/user";
import { toast } from "vue3-toastify";

export default {
  components: {
    TheFooter,
  },
  data() {
    return {
      form: new this.$Form({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      }),
    };
  },
  methods: {
    async register() {
      try {
        const response = await this.form.post("/register");
        const userStore = useUserStore();

        // Assuming a successful registration
        toast.success("Registration Successful");
        setTimeout(() => {
          this.$router.replace({ name: "home" });
          this.$axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.token;
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user",response.data.user);
        userStore.setUser(response.data.user);
        }, 1000);
      } catch (error) {
        // Handle errors
        console.error("Registration failed:", error);
        toast.error("Registration failed. Please try again.");
      }
    },
  },
  setup() {
    const userStore = mapStores(useUserStore);

    return {
      ...userStore,
    };
  },
};
</script>
