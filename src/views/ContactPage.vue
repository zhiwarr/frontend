<template>
  <!-- header start -->
  <header>
    <div class="back-links">
      <router-link :to="{ name: 'home' }">
        <i class="iconly-Arrow-Left icli"></i>
        <div class="content">
          <h2>help center</h2>
        </div>
      </router-link>
    </div>
  </header>
  <!-- header end -->

  <!-- section start -->
  <section class="px-15 top-space pt-0">
    <div class="help-img">
      <img src="@/assets/images/help.jpg" class="img-fluid rounded-1 w-100" alt="" />
    </div>
    <div class="faq-section section-t-space section-b-space">
      <div>
        <h2 class="page-title pb-2">Help Center</h2>
        <div class="form-floating mb-4">
          <input
            type="text"
            v-model="formData.name"
            class="form-control"
            id="one"
            placeholder="Full Name"
          />
          <label for="one">Full Name</label>
        </div>
        <div class="form-floating mb-4">
          <input
            type="email"
            v-model="formData.email"
            class="form-control"
            id="two"
            placeholder="Full Name"
          />
          <label for="two">Email Address</label>
        </div>
        <div class="form-floating mb-4">
          <input
            type="text"
            v-model="formData.subject"
            class="form-control"
            id="three"
            placeholder="Full Name"
          />
          <label for="three">Subject</label>
        </div>
        <div class="form-floating mb-4">
          <textarea
            name=""
            v-model="formData.message"
            class="form-control"
            id="one1"
            cols="30"
            rows="10"
          ></textarea>
          <label for="one1">Message</label>
        </div>
        <div class="form-floating mb-4">
          <button class="form-control btn btn-dark" @click.prevent="sendMessage">
            Send
          </button>
        </div>
      </div>
      <h4 class="fw-bold mb-3">What issues are you facing?</h4>
      <div class="accordion accordion-flush" id="accordionFlushExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
            >
              I want to track my order
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body content-color">
              The standard chunk of Lorem Ipsum used since the 1500s is reproduced below
              for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum
              et Malorum" by Cicero are also reproduced in their exact original form,
              accompanied by English versions from the 1914 translation by H. Rackham.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              I want to manage my order
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body content-color">
              The standard chunk of Lorem Ipsum used since the 1500s is reproduced below
              for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum
              et Malorum" by Cicero are also reproduced in their exact original form,
              accompanied by English versions from the 1914 translation by H. Rackham.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
            >
              I did not receive Instant Cashback
            </button>
          </h2>
          <div
            id="flush-collapseThree"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body content-color">
              The standard chunk of Lorem Ipsum used since the 1500s is reproduced below
              for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum
              et Malorum" by Cicero are also reproduced in their exact original form,
              accompanied by English versions from the 1914 translation by H. Rackham.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseFour"
            >
              I want help with other issues
            </button>
          </h2>
          <div
            id="flush-collapseFour"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body content-color">
              The standard chunk of Lorem Ipsum used since the 1500s is reproduced below
              for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum
              et Malorum" by Cicero are also reproduced in their exact original form,
              accompanied by English versions from the 1914 translation by H. Rackham.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseFive"
            >
              I am unable to pay using wallet
            </button>
          </h2>
          <div
            id="flush-collapseFive"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body content-color">
              The standard chunk of Lorem Ipsum used since the 1500s is reproduced below
              for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum
              et Malorum" by Cicero are also reproduced in their exact original form,
              accompanied by English versions from the 1914 translation by H. Rackham.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseSix"
            >
              I want to unsubscribe from promotional emails and SMS
            </button>
          </h2>
          <div
            id="flush-collapseSix"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body content-color">
              The standard chunk of Lorem Ipsum used since the 1500s is reproduced below
              for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum
              et Malorum" by Cicero are also reproduced in their exact original form,
              accompanied by English versions from the 1914 translation by H. Rackham.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseSeven"
            >
              I want help with returns & refunds
            </button>
          </h2>
          <div
            id="flush-collapseSeven"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body content-color">
              The standard chunk of Lorem Ipsum used since the 1500s is reproduced below
              for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum
              et Malorum" by Cicero are also reproduced in their exact original form,
              accompanied by English versions from the 1914 translation by H. Rackham.
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- section end -->
</template>
<script setup>
import { toast } from "vue3-toastify";
import { ref, getCurrentInstance, reactive } from "vue";
const loading = ref(true);
const instance = getCurrentInstance();
const { $axios } = instance.appContext.config.globalProperties;
const formData = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const sendMessage = () => {
  toast.success("mail sent successfully");
  $axios
    .post("contact", formData)
    .then((res) => {
      formData.name = "";
      formData.email = "";
      formData.subject = "";
      formData.message = "";
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
