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
    <h1>Hey, <br />Login Now</h1>
    <form>
      <div class="form-floating mb-4">
        <input
          type="text"
          v-model="form.email"
          class="form-control"
          id="one"
          placeholder="Username or Email"
        />
        <label for="one">Username or Email</label>
        <div v-if="form.errors.has('email')" v-html="form.errors.get('email')" />
      </div>
      <div class="form-floating mb-2">
        <input
          type="password"
          v-model="form.password"
          class="form-control"
          id="two"
          placeholder="password"
        />
        <label for="two">Password</label>
        <div v-if="form.errors.has('password')" v-html="form.errors.get('password')" />
      </div>
      <div class="text-end mb-4">
        <a href="forgot-password.html" class="theme-color">Forgot Password ?</a>
      </div>
      <button @click.prevent="login" class="btn btn-solid w-100">Sign in</button>
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
        If you are new,
        <router-link
          class="title-color text-decoration-underline"
          :to="{ name: 'register' }"
          >Create Now</router-link
        >
      </h4>
    </div>
  </section>
  <!-- login section end -->
  <the-footer></the-footer>
</template>

<script>
import { mapStores } from "pinia";
import TheFooter from "@/components/TheFooter.vue";
import { useUserStore } from "../stores/user"
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
  mounted(){

  },
  methods: {
    async login() {
      try {
        const response = await this.form.post("/login");
        const userStore = useUserStore();

        // Assuming a successful login
        toast.success("Login Successful");
     
        setTimeout(() => {
          this.$axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.token;
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user",response.data.user);

        userStore.setUser(response.data.user);
          this.$router.replace({ name: "home" });
        }, 1000);
      } catch (error) {
        // Handle errors, including unmatched password
        if (error.response && error.response.status === 401) {
          // Unauthorized (401) indicates an unsuccessful login
          toast.error("Incorrect email or password. Please try again.");
        } else {
          // Handle other types of errors
          console.error("Login failed:", error);
          toast.error("Login failed. Please try again.");
        }
      }
    },
  },
  computed: {
    ...mapStores({ userStore: useUserStore }), // Make sure useUserStore is imported correctly
  },
};
</script>
