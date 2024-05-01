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
      <button  @click="$router.go(-1)" class="btn d-flex">
        <i class="iconly-Arrow-Left icli mt-1 mx-2"></i>
        <div class="content">
          <h2>Product Detail</h2>
        </div>
      </button>
    </div>
    <div class="header-option">
      <ul>
        <li>
          <a href="#"><img src="@/assets/svg/share-2.svg" class="img-fluid" alt="" /></a>
        </li>
        <li>
          <router-link :to="{name:'wishlist'}"><i class="iconly-Heart icli"></i></router-link>
        </li>
        <li>
          <router-link :to="{name:'cart'}"><i class="iconly-Buy icli"></i></router-link>
        </li>
      </ul>
    </div>
  </header>
  <!-- header end -->
  <!-- slider start -->
  <section class="product-page-section top-space pt-0">
    <div class="home-slider slick-default theme-dots ratio_asos overflow-hidden">
      <div>
        <div class="home-img">
          <img :src="$uploads + product.thumb_image" class="img-fluid bg-img" alt="" />
        </div>
      </div>
      <template v-if="productimagegallery">
        <div v-for="images in productimagegallery" :key="images.id">
          <div class="home-img">
            <img :src="$uploads + images.image" class="img-fluid bg-img" alt="" />
          </div>
        </div>
      </template>
    </div>
    <div class="product-detail-box px-15 pt-2">
      <div class="main-detail">
        <h2 class="text-capitalize">{{ product.name }} </h2>
        <h6 class="content-color">{{ product.seo_title.en }}</h6>
        <div class="rating-section">
          <ul class="ratings" v-if="!rating">
            <li v-for="star in 5" :key="star">
              <i :class="['iconly-Star', 'icbo', { empty: star > maxStarCount }]"></i>
            </li>
          </ul>
          <h6 class="content-color">({{ reviews.length }} ratings)</h6>
        </div>
        <div class="price">
          <h4 v-if="product.offer_price">
            {{ product.offer_price }} IQD
            <del v-if="product.offer_price">{{ product.price }} IQD</del>
            <span v-if="product.offer_price">
              %{{ calculateDiscountPercent(product.price, product.offer_price) }}
            </span>
          </h4>
          <h4 v-else>{{ product.price }} IQD</h4>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="product-detail-box px-15">
      <div class="size-detail">
        <h4 class="size-title">Select Size: <a href="#">Size Chart</a></h4>
        <ul class="size-select" v-for="data in product.variants" :key="data.id">
          <template v-if="data.name.en == 'size'">
            <li
              v-for="sizes in data.product_variant_items"
              :key="sizes.id"
              :class="{ selected: sizes.id === selectedSizeId }"
              @click="selectSize(sizes.id)"
            >
              <a href="javascript:void(0)">
                {{ sizes.name.en.charAt(0) }}
              </a>
            </li>
            <!-- <li class="disable"><del>XL</del></li> -->
          </template>
        </ul>
      </div>
      <div class="size-detail">
        <h4 class="size-title">Select Color:</h4>
        <ul class="filter-color" v-for="data in product.variants" :key="data.id">
          <template v-if="data.name.en == 'color'">
            <li
              v-for="colors in data.product_variant_items"
              :key="colors.id"
              :class="{ selected: colors.id === selectedColorId }"
              @click="selectColor(colors.id)"
            >
              <a href="javascript:void(0)">
                <div
                  :style="{ backgroundColor: colors.name.en }"
                  :class="{ 'color-box': true }"
                ></div>
              </a>
            </li>
          </template>
        </ul>
      </div>
      <div class="size-detail">
        <h4 class="size-title">Quantity:</h4>
        <div class="qty-counter">
          <div class="input-group">
            <button
              type="button"
              class="btn quantity-left-minus"
              data-type="minus"
              data-field=""
            >
              <img src="@/assets/svg/minus-square.svg" class="img-fluid" alt="" />
            </button>
            <input
              type="number"
              name="quantity"
              @input="changeQty"
              class="form-control form-theme qty-input input-number"
              :value="qty"
            />
            <button
              type="button"
              class="btn quantity-right-plus"
              data-type="plus"
              data-field=""
            >
              <img src="@/assets/svg/plus-square.svg" class="img-fluid" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="product-detail-box px-15">
      <h4 class="page-title">Return & Exchange Policy</h4>
      <h4 class="content-color">
        This product is eligible for returns and size replacements. Please initiate
        returns/replacements from the 'My Orders' section in the App within 7 days of
        delivery. Please ensure the product is in its original condition with all tags
        attached.
      </h4>
    </div>
    <div class="divider"></div>
    <div class="product-detail-box px-15">
      <h4 class="page-title mb-1">Product Details</h4>
      <h4 class="content-color mb-3" v-html="product.long_description.en"></h4>
      <h4 class="page-title mb-1">Product Code</h4>
      <h4 class="content-color">{{ product.sku }}</h4>
    </div>
    <div class="divider"></div>
    <div class="product-detail-box px-15">
      <h4 class="page-title">
        Customer Reviews ({{ reviews.length }}) <a href="#">All Reviews</a>
      </h4>
      <div class="review-section">
        <ul>
          <li v-for="review in reviews">
            <div class="media">
              <img :src="$uploads + review.user.image" class="img-fluid" alt="" />
              <div class="media-body">
                <h4>{{ review.user.name }} | {{ review.created_at_formatted }}</h4>
                <ul class="ratings" v-if="!rating">
                  <li v-for="star in 5" :key="star">
                    <i
                      :class="['iconly-Star', 'icbo', { empty: star > maxStarCount }]"
                    ></i>
                  </li>
                </ul>
              </div>
            </div>
            <h4 class="content-color">{{ review.review }}</h4>
          </li>
        </ul>
      </div>
    </div>
    <div class="divider"></div>
    <div class="check-delivery-section product-detail-box px-15">
      <div class="title-section">
        <h4>Check Delivery</h4>
      </div>

      <div class="service-section">
        <ul>
          <li>
            <img src="@/assets/svg/delivery.svg" class="img-fluid" alt="" />Free Delivery
            on order above $200.00
          </li>
          <li>
            <img src="@/assets/svg/payment.svg" class="img-fluid" alt="" />Cash On
            delivery Available
          </li>
          <li>
            <img src="@/assets/svg/refund.svg" class="img-fluid" alt="" />Easy 21 days
            returns and exchanges
          </li>
        </ul>
      </div>
    </div>
    <div class="divider"></div>
  </section>
  <!-- slider end -->
  <!-- related section start -->
  <section class="pt-0 product-slider-section overflow-hidden">
    <div class="title-section px-15">
      <h2>Similar Products</h2>
    </div>
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
      <swiper-slide v-for="p in filteredProducts" :key="p.id">
        <div class="product-box ratio_square">
          <div class="img-part">
            <router-link :to="{ name: 'product-detail', params: { product: p.slug } }">
              <img
                :src="$uploads + p.thumb_image"
                style="height: 200px; width: 200px"
                alt=""
                class="img-fluid bg-img"
              />
            </router-link>
            <div class="wishlist-btn">
              <button class="btn" @click.prevent="toWishlist(p.id)">
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
            <router-link :to="{ name: 'product-detail', params: { product: p.slug } }">
              <h4>{{ p.name }}</h4>
            </router-link>
            <div class="price">
              <h4 v-if="p.offer_price">
                {{ p.offer_price }} IQD
                <del v-if="p.offer_price">{{ p.price }} IQD</del>
                <span v-if="p.offer_price">
                  %{{ calculateDiscountPercent(p.price, p.offer_price) }}
                </span>
              </h4>
              <h4 v-else>{{ p.price }} IQD</h4>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper-container>
  </section>
  <!-- related section end -->
  <!-- panel space start -->
  <section class="panel-space"></section>
  <!-- panel space end -->
  <!-- fixed panel start -->
  <div class="fixed-panel">
    <div class="row">
      <div class="col-6">
        <button class="btn" @click.prevent="toWishlist(product.id)">
          <i class="iconly-Heart icli"></i>WISHLIST
        </button>
      </div>
      <div class="col-6">
        <button @click.prevent="addToCart" class="theme-color btn">
          <i class="iconly-Buy icli"></i>ADD TO CART
        </button>
      </div>
    </div>
  </div>
  <!-- fixed panel end -->
</template>

<script setup>
import { register } from "swiper/element/bundle";
import { useUserStore } from "../stores/user";
register();
import { useCartStore } from "../stores/cart"; // Import your cart store
import { toast } from "vue3-toastify";
import { calculateDiscountPercent } from "@/helpers.js";
import { ref, computed, onMounted, getCurrentInstance } from "vue";
const instance = getCurrentInstance();
const loading = ref(true)
const { $axios, $uploads } = instance.appContext.config.globalProperties;
const props = defineProps(["product", "products"]);
let userStore = useUserStore();
const cartStore = useCartStore(); // Access the cart store
const imagegallery = ref([]);
const product = ref();
const qty = ref(1);
const selectedSizeId = ref(null);
const selectedColorId = ref(null);
const userId = ref(null);
const token = ref(null);
const changeQty = () => {
  qty.value = parseInt(event.target.value);
};
const products = ref([]);
const reviews = ref([]);
const filteredProducts = ref([]);
onMounted(async () => {
  await userStore.fetchUser();
  userId.value = userStore.getUser?.id;
  token.value = userStore.getToken;
});
const fetchProductData = () => {
  $axios.get(`product-details/${props.product}`).then((response) => {
    imagegallery.value = response.data.product.product_image_galleries;
    product.value = response.data.product;
    products.value = response.data.products;
    reviews.value = response.data.reviews.data;
        filteredProducts.value = response.data.products.filter(p => p.id !== product.value.id);
  });
  loading.value = false;
};

fetchProductData();

const addToCart = () => {
  const price = product.value.offer_price ? product.value.offer_price : product.value.price;
  const totalVariants = product.value.variants.length;
  
  if (!userStore.getUser.id) {
    toast.error("Please log in to add to cart.");
    return;
  }

  // Check if the item exists in the cart
  const existingCartItem = cartStore.cartItems.find(item => item.product_id === product.value.id);

  if (existingCartItem) {
    // Item exists in the cart, update its quantity
    const updatedQty = existingCartItem.qty += qty.value;
    const updatedCartItem = { ...existingCartItem, qty: updatedQty };
    console.log(updatedCartItem);
    // Update the cart store with the updated item
    cartStore.updateCartItem(updatedCartItem);

    // Notify the user
    toast.success("Item quantity updated in cart.");
  } else {
    // Item does not exist in the cart, add it
    let requestData = {
      user_id: userStore.getUser.id,
      product_id: product.value.id,
      unit_price: price,
      qty: qty.value,
      thumb_image: product.value.thumb_image,
      product_slug: product.value.slug,
      vendor_id:product.value.vendor_id,
      total_variants: totalVariants,
      variants_items: [], // Initialize an empty array to store variant item IDs
    };
    product.value.variants.forEach((variant) => {
      if (variant.name.en === "size" || variant.name.en === "color") {
        variant.product_variant_items.forEach((item) => {
          if (item.id === selectedSizeId.value || item.id === selectedColorId.value) {
            requestData.variants_items.push(item); // Push the item's ID to the variants_items array
          }
        });
      }
    });

    // Add the item to the cart
    $axios.post("add-to-cart", requestData)
      .then((response) => {
        if (response.data.status === "success") {
          // Update cart state in the Pinia store
          cartStore.addToCart(requestData);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  }
};
const selectSize = (sizeId) => {
  selectedSizeId.value = sizeId;
};
const selectColor = (colorId) => {
  selectedColorId.value = colorId;
};
const productSizes = computed(() => {
  return (
    product.value.variants.find((variant) => variant.name.en === "size")
      ?.product_variant_items || []
  );
});
const productColors = computed(() => {
  return (
    product.value.variants.find((variant) => variant.name.en === "color")
      ?.product_variant_items || []
  );
});
</script>
