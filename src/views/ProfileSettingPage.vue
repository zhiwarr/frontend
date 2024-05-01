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
          <h2>Profile Setting</h2>
        </div>
      </router-link>
    </div>
  </header>
  <!-- header end -->

  <!-- user avtar section -->
  <form enctype="multipart/form-data" @submit.prevent="updateData">
    <section class="user-avtar-section top-space pt-0 px-15">
      <img
        v-if="!previewImage"
        :src="url + image"
        class="img-fluid"
        @click="openFileInput"
        alt=""
      />
      <input
        type="file"
        @change="handleFileChange"
        accept="image/*"
        style="display: none"
        ref="fileInput"
      />
      <!-- Add image preview here -->
      <div v-if="previewImage">
        <img :src="previewImage" class="img-fluid" alt="Selected Image" />
      </div>
      <!-- Rest of your template -->
      <span class="edit-icon mb-4 mx-3" @click="openFileInput"
        ><i class="iconly-Edit-Square icli"></i
      ></span>
      <h2>{{ role }}</h2>
      <h3>{{ status }}</h3>
    </section>
    <!-- user avtar end -->

    <!-- detail form start -->
    <section class="detail-form-section px-15">
      <h2 class="page-title mb-4">Personal Details</h2>

      <div class="form-floating mb-4">
        <input
          type="text"
          class="form-control"
          v-model="email"
          id="seven"
          placeholder="Last Name"
        />
        <label for="seven">email</label>
        <span class="text-red" v-if="errors?.email">{{ errors.email[0] }}</span>
      </div>
      <div class="form-floating mb-4">
        <input
          v-model="name"
          type="text"
          class="form-control"
          name="name"
          id="one"
          placeholder="First Name"
        />
        <label for="one">Name</label>
        <span class="text-red" v-if="errors?.name">{{ errors.name[0] }}</span>
      </div>
      <div class="form-floating mb-4">
        <input
          type="text"
          class="form-control"
          v-model="username"
          id="five"
          placeholder="Last Name"
        />
        <label for="five">Username</label>
        <span class="text-red" v-if="errors?.username">{{ errors.username[0] }}</span>
      </div>
      <div class="form-floating mb-4">
        <input
          type="number"
          class="form-control"
          id="six"
          v-model="phone"
          placeholder="Mobile Number"
        />
        <label for="six">Mobile Number</label>
        <span class="text-red" v-if="errors?.phone">{{ errors.phone[0] }}</span>
      </div>
      <div class="form-floating mb-4">
        <button type="submit" class="btn btn-secondary mx-1 text-white">update</button>
      </div>
    </section>
  </form>
  <div class="divider"></div>
  <section class="detail-form-section pt-0 px-15">
    <form @submit.prevent="updatePassword">
      <div class="form-floating mb-4">
        <input
          type="password"
          class="form-control"
          id="current_password"
          v-model="current_password"
          placeholder="Current Password"
        />
        <label for="current_password">Current Password</label>

        <a class="change-btn" href="#"><i class="fa fa-eye"></i></a>
        <span class="text-red" v-if="errors?.current_password">{{
          errors.current_password[0]
        }}</span>
      </div>
      <div class="form-floating mb-4">
        <input
          type="password"
          class="form-control"
          id="eight"
          v-model="password"
          placeholder="New Password"
        />
        <label for="eight">New Password</label>
        <a class="change-btn" @click="changeType" href="#"><i class="fa fa-eye"></i></a>
        <span class="text-red" v-if="errors?.password">{{ errors.password[0] }}</span>
      </div>
      <div class="form-floating mb-4">
        <input
          type="password"
          class="form-control"
          id="nine"
          v-model="password_confirmation"
          placeholder="confirm Password"
        />
        <label for="nine">Confirm Password</label>
        <a class="change-btn" href="#"><i class="fa fa-eye"></i></a>
        <span class="text-red" v-if="errors?.password_confirmation">{{
          errors.password_confirmation[0]
        }}</span>
      </div>
      <div class="form-floating mb-4">
        <button type="submit" class="btn btn-secondary mx-1 text-white">
          Change Password
        </button>
      </div>
    </form>
  </section>
  <!-- detail form end -->
</template>
<script setup>
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { ref, onMounted, getCurrentInstance } from "vue";
const instance = getCurrentInstance();
const { $axios } = instance.appContext.config.globalProperties;
const errors = ref({});
const loading = ref(true);
const name = ref("");
const username = ref("");
const email = ref("");
const phone = ref("");
const role = ref("");
const status = ref("");
const image = ref("");
const current_password = ref("");
const password = ref("");
const password_confirmation = ref("");
const url = 'https://kebazaar.xyz/'
const fetchData = () => {
  $axios.get(`profile/profile-settings`).then((response) => {
    name.value = response.data.user.name;
    username.value = response.data.user.username;
    email.value = response.data.user.email;
    phone.value = response.data.user.phone;
    role.value = response.data.user.role;
    status.value = response.data.user.status;
    image.value = response.data.user.image;
    loading.value = false;
  });
};

fetchData();
const fileInput = ref(null);
const openFileInput = () => {
  // Trigger the file input when edit icon is clicked
  fileInput.value.click();
};
const previewImage = ref("");
const handleFileChange = (event) => {
  const file = event.target.files[0];
  image.value = file.name;
  // Use FileReader to read the selected file and set it as image preview
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const updateData = () => {
  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("username", username.value);
  formData.append("email", email.value);
  formData.append("phone", phone.value);
  // Append the file data to the FormData object
  if (fileInput.value.files.length > 0) {
    formData.append("image", fileInput.value.files[0]);
  }
  $axios
    .post(`profile/profile-settings?_method=put`, formData)
    .then(() => {
      fetchData();
      toast.success("Profile settings updated");
    })
    .catch((error) => {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    });
};
const updatePassword = () => {
  const formData = new FormData();
  formData.append("current_password", current_password.value);
  formData.append("password", password.value);
  formData.append("password_confirmation", password_confirmation.value);
  $axios
    .post(`profile/profile-settings`, formData)
    .then(() => {
      fetchData();
      //   formData = "";
      toast.success("Password updated");
    })
    .catch((error) => {
      console.log(error);
      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    });
};
</script>
