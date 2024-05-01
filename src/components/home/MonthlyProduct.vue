<template>
  <!-- tab section start -->
  <section class="pt-0 tab-section">
    <div class="title-section px-15">
      <h2>Find your Style</h2>
      <h3>Super Summer Sale</h3>
    </div>
    <div class="tab-section">
      <ul class="nav nav-tabs theme-tab pl-15">
        <li class="nav-item">
          <button
            class="nav-link active"
            data-bs-toggle="tab"
            data-bs-target="#new_arrival"
            type="button"
          >
            new_arrival
          </button>
        </li>
        <li class="nav-item">
          <button
            class="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#featured_product"
            type="button"
          >
            featured_product
          </button>
        </li>

        <li class="nav-item">
          <button
            class="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#top_product"
            type="button"
          >
            top_product
          </button>
        </li>
        <li class="nav-item">
          <button
            class="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#best_product"
            type="button"
          >
            best_product
          </button>
        </li>
      </ul>
      <div class="tab-content px-15">
        <div class="tab-pane fade show active" id="new_arrival">
          <div class="row gy-3 gx-3">
            <template v-for="product in typeBasedProduct.new_arrival" :key="product.id">
              <div class="col-md-4 col-6">
                <div class="product-box ratio_square">
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
                  <div class="product-content">
                    <ul class="ratings">
                      <li v-for="n in 5" :key="n">
                        <i class="iconly-Star icbo"></i>
                      </li>
                    </ul>
                    <router-link
                      :to="{ name: 'product-detail', params: { product: product.slug } }"
                    >
                      <h4>{{ product.name }}</h4>
                    </router-link>
                    <div class="price">
                      <h4 v-if="product.offer_price">
                        {{ product.offer_price }} IQD
                        <del v-if="product.offer_price">{{ product.price }} IQD</del>
                        <span v-if="product.offer_price">
                          %{{
                            calculateDiscountPercent(product.price, product.offer_price)
                          }}
                        </span>
                      </h4>
                      <h4 v-else>{{ product.price }} IQD</h4>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="tab-pane fade" id="featured_product">
          <div class="row gy-3 gx-3">
            <template
              v-for="product in typeBasedProduct.featured_product"
              :key="product.id"
            >
              <div class="col-md-4 col-6">
                <div class="product-box ratio_square">
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
                  <div class="product-content">
                    <ul class="ratings">
                      <li v-for="n in 5" :key="n">
                        <i class="iconly-Star icbo"></i>
                      </li>
                    </ul>
                    <router-link
                      :to="{ name: 'product-detail', params: { product: product.slug } }"
                    >
                      <h4>{{ product.name }}</h4>
                    </router-link>
                    <div class="price">
                      <h4 v-if="product.offer_price">
                        {{ product.offer_price }} IQD
                        <del v-if="product.offer_price">{{ product.price }} IQD</del>
                        <span v-if="product.offer_price">
                          %{{
                            calculateDiscountPercent(product.price, product.offer_price)
                          }}
                        </span>
                      </h4>
                      <h4 v-else>{{ product.price }} IQD</h4>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="tab-pane fade" id="top_product">
          <div class="row gy-3 gx-3">
            <template v-for="product in typeBasedProduct.top_product" :key="product.id">
              <div class="col-md-4 col-6">
                <div class="product-box ratio_square">
                  <div class="img-part">
                    <a :href="'product/' + product.id">
                      <img
                        :src="$uploads + product.thumb_image"
                        style="height: 200px; width: 200px"
                        alt=""
                        class="img-fluid bg-img"
                      />
                    </a>
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
                  <div class="product-content">
                    <ul class="ratings">
                      <li v-for="n in 5" :key="n">
                        <i class="iconly-Star icbo"></i>
                      </li>
                    </ul>
                    <router-link
                      :to="{ name: 'product-detail', params: { product: product.slug } }"
                    >
                      <h4>{{ product.name }}</h4>
                    </router-link>
                    <div class="price">
                      <h4 v-if="product.offer_price">
                        {{ product.offer_price }} IQD
                        <del v-if="product.offer_price">{{ product.price }} IQD</del>
                        <span v-if="product.offer_price">
                          %{{
                            calculateDiscountPercent(product.price, product.offer_price)
                          }}
                        </span>
                      </h4>
                      <h4 v-else>{{ product.price }} IQD</h4>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="tab-pane fade" id="best_product">
          <div class="row gy-3 gx-3">
            <template v-for="product in typeBasedProduct.best_product" :key="product.id">
              <div class="col-md-4 col-6">
                <div class="product-box ratio_square">
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
                  <div class="product-content">
                    <ul class="ratings">
                      <li v-for="n in 5" :key="n">
                        <i class="iconly-Star icbo"></i>
                      </li>
                    </ul>
                    <router-link
                      :to="{ name: 'product-detail', params: { product: product.slug } }"
                    >
                      <h4>{{ product.name }}</h4>
                    </router-link>
                    <div class="price">
                      <h4 v-if="product.offer_price">
                        {{ product.offer_price }} IQD
                        <del v-if="product.offer_price">{{ product.price }} IQD</del>
                        <span v-if="product.offer_price">
                          %{{
                            calculateDiscountPercent(product.price, product.offer_price)
                          }}
                        </span>
                      </h4>
                      <h4 v-else>{{ product.price }} IQD</h4>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- tab section end -->
</template>
<script setup>
defineProps(["products", "typeBasedProduct"]);
import { useUserStore } from "../../stores/user";
import { calculateDiscountPercent } from "@/helpers.js";
import { getCurrentInstance } from "vue";
import { toast } from "vue3-toastify";
const userStore = useUserStore();
const instance = getCurrentInstance();
const { $axios, $uploads } = instance.appContext.config.globalProperties;
calculateDiscountPercent();

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
