<template>
  <header>
      <div class="back-links">
        <button  @click="$router.go(-1)" class="btn d-flex">
          <i class="iconly-Arrow-Left icli mt-1 mx-2"></i>
          <div class="content">
            <h2>Shopping Cart</h2>
            <h6>Step 1 of 2</h6>
          </div>
        </button>
      </div>
    <div class="header-option">
      <ul>
        <li>
          <router-link :to="{name:'wishlist'}"><i class="iconly-Heart icli"></i></router-link>
        </li>
      </ul>
    </div>
  </header>
  <!-- header end -->
  <!-- cart items start -->
  <section class="cart-section pt-0 top-space xl-space">
    <template v-for="(cartItem, index) in cartItems" :key="index">
      <div class="cart-box px-15">
        <a :href="'product.html?id=' + cartItem.id" class="cart-img">
          <img
            :src="$uploads + cartItem.thumb_image"
            class="img-fluid"
            :alt="cartItem.product_slug"
          />
        </a>

        <div class="cart-content">
          <a :href="'product.html?id=' + cartItem.id">
            <h4>{{ cartItem.product_slug }}</h4>
          </a>
          <h5 class="content-color">{{ cartItem.brand }}</h5>
          <div class="price">
            <h4>{{ cartItem.unit_price }} IQD</h4>
          </div>
          <div class="select-size-sec">
            <a href="javascript:void(0)">
              <h6>Qty: {{ cartItem.qty }}</h6>
            </a>
          </div>
          <div class="cart-option">
            <h5 @click="removeFromCart(cartItem)">
              <i class="iconly-Delete icli"></i> Remove
            </h5>
          </div>
        </div>
      </div>
      <div class="divider"></div>
    </template>
  </section>
  <!-- cart items end -->
  <!-- coupon section -->
  <section class="px-15 pt-0">
    <form @submit.prevent="coupons" method="post">
      <h2 class="title">Coupons:</h2>
      <div class="coupon-section flex items-center">
        <i class="iconly-Discount icli icon-discount "></i>
        <input class="form-control form-theme py-3" v-model="coupon" placeholder="Apply Coupons" />
        <button type="submit" class="btn ">
          <i class="iconly-Arrow-Right-2 icli icon-right mb-5"></i>
        </button>
      </div>
    </form>
  </section>
  <div class="divider"></div>
  <!-- coupon end -->
  <!-- Order details start -->
  <section id="order-details" class="px-15 pt-0">
    <h2 class="title">Order Details:</h2>
    <div class="order-details">
      <ul>
        <!-- Display subtotal -->
        <li>
          <h4>Subtotal <span>{{ cartStore.subtotal }}</span></h4>
        </li>
        <!-- Display coupon discount if applicable -->
        <li v-if="couponDetails.discount > 0">
          <h4>Coupon Discount <span>{{ couponDetails.discount }}</span></h4>
        </li>
      </ul>
      <div class="total-amount">
        <!-- Display total amount -->
        <h4>Total Amount <span>{{ (cartStore.totalAmount) }}</span></h4>
      </div>
      <!-- Delivery info and other details -->
    </div>
  </section>
  <!-- Order details end -->
  <div class="divider"></div>
  <!-- Order details section -->
  <section id="order-details" class="px-15 pt-0">
    <h2 class="title">Order Details:</h2>
    <div class="order-details">
      <ul>
        <!-- Subtotal -->
        <li>
          <h4>Subtotal <span>{{ formatCurrency(subtotal) }}</span></h4>
        </li>
        <!-- Coupon discount -->
        <li v-if="couponDetails.discount > 0">
          <h4>Coupon Discount <span>{{ formatCurrency(couponDetails.discount) }}</span></h4>
        </li>
      </ul>
      <!-- Total amount -->
      <div class="total-amount">
        <h4>Total Amount <span>{{ formatCurrency(totalAmount) }}</span></h4>
      </div>
    </div>
  </section>
  <!-- service section end -->
  <div class="divider"></div>
  <!-- delivery option section start -->
  <section class="top-space px-15 pt-0">
    <div class="delivery-option-section">
      <ul>
        <li v-for="address in addresses" :key="address.id">
          <div class="check-box">
            <div class="form-check d-flex ps-0">
              <input
                class="radio_animated"
                type="radio"
                name="flexRadioDefault"
                :id="address.id"
                :checked="selectedShippingAddress === address.id"
                @change="selectedAddress(address)"
                />
              <label class="form-check-label" :for="address.id"></label>
              <div>
                <h4 class="name">{{ address.name }}</h4>
                <div class="addess">
                  <h4>{{ address.country }}</h4>
                  <h4>{{ address.state }}</h4>
                  <h4>{{ address.city }}</h4>
                  <h4>{{ "(" + address.zip + ")" + address.address }}</h4>
                </div>
                <h4>Phone No: {{ address.phone }}</h4>
                <h6 class="label">Location</h6>
              </div>
            </div>
          </div>
          <div class="buttons mt-3 l-15">
            <button @click.prevent="deleteData(address.id)" class="btn">Remove</button>
            <router-link
              class="btn mx-3 mt-1"
              :to="{ name: 'edit-address', params: { id: address.id } }"
              >edit</router-link
            >
          </div>
        </li>
      </ul>
      <router-link
        :to="{ name: 'new-address' }"
        class="btn btn-outline text-capitalize w-100 mt-3"
        >add New address</router-link
      >
    </div>
  </section>
  <!-- delivery option section end -->
  <div class="divider"></div>

<section class="service-wrapper px-15 pt-0">
  <div class="row">
    <div class="col-4" v-for="shippingMethod in shippingMethods" :key="shippingMethod.id">
      <div class="service-wrap">
        <div class="icon-box">
          <img src="@/assets/images/logo/scooter.png" class="img-fluid" alt="" />
        </div>
        <span>{{ shippingMethod.name }}</span>
        <br>
        <label v-if="shippingMethod.type === 'min_cost' && totalAmount >= shippingMethod.min_cost">
          <input type="radio" :name="'shippingMethod'" :value="shippingMethod.id" @change="selectedShippingArea(shippingMethod)" :checked="selectedShippingMethod === shippingMethod.id">
          
          <span>Cost: ({{ shippingMethod.cost }}IQD)</span>
        </label>
        <label v-else-if="shippingMethod.type === 'flat_cost'">
          <input type="radio" :name="'shippingMethod'" @change="selectedShippingArea(shippingMethod)" :value="shippingMethod.id" :checked="selectedShippingMethod === shippingMethod.id" >
          <span>Cost: ({{ shippingMethod.cost }} IQD)</span>
        </label>
      </div>
    </div>
  </div>
</section>


    
  <!-- service section end -->
  <div class="divider"></div>

  <!-- panel space start -->
  <section class="panel-space"></section>
  <!-- panel space end -->
  <!-- bottom panel start -->
  <div class="cart-bottom">
    <div>
      <div class="left-content">
        <h4>Total Amount <span><br>{{ formatCurrency(totalAmount) }}</span></h4>
      </div>
      <button @click.prevent="submitCheckoutForm" class="btn btn-solid">Place Order</button>
    </div>
  </div>
  <!-- bottom panel end -->
</template>

<script setup>
import { useCartStore } from "../stores/cart";
import { ref, watch,computed } from "vue";
import { toast } from "vue3-toastify";
import { getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter()
const instance = getCurrentInstance();
const { $axios, $uploads } = instance.appContext.config.globalProperties;

const cartStore = useCartStore();
const cartItems = cartStore.cartItems;
const coupon = ref('');
const couponDetails = ref({ discount: 0, cart_total: 0,coupon_name:'',coupon_code:'' });

// Function to remove item from cart
const removeFromCart = (cartItem) => {
  cartStore.removeFromCart(cartItem);
  toast.success("Item removed from cart successfully");
};

// Method to apply coupon
const coupons= () => {
  cartStore.applyCoupon(coupon.value)
};

// Computed properties for subtotal and totalAmount
const subtotal = computed(() => cartStore.subtotal);
const totalAmount = computed(() => cartStore.totalAmount);
cartStore.calculateSubtotal();
cartStore.calculateTotalAmount();
// Method to format currency
const formatCurrency = (amount) => {
  return `${amount.toFixed(1)} IQD`;
};

// Calculate the coupon discount based on the coupon type (percentage or amount)
const calculateCouponDiscount = () => {
  const couponType = couponDetails.value.type;
  const couponValue = couponDetails.value.discount;
  let discount = 0;
  if (couponType === 'percent') {
    discount = (cartStore.subtotal * couponValue) / 100;
  } else if (couponType === 'amount') {
    discount = couponValue;
  }

  couponDetails.value.discount = discount;

  return discount; // Return the discount value
};

watch(coupon, () => {
  calculateCouponDiscount();
});

//shipping method
const shippingMethods = ref([]);
const getShippingMethod = async()=>{
  await $axios.get('checkout').then((response)=>{
    shippingMethods.value = response.data.shippingMethods
  })
}
getShippingMethod()

//delivery
const addresses = ref([]);
const loading = ref(true);

// Fetch wishlist data
const fetchData = async () => {
  try {
    const response = await $axios.get("address");
    addresses.value = response.data.data;
    loading.value = false;
  } catch (error) {
    console.error("Error fetching address data:", error);
    loading.value = false;
  }
};
const deleteData = async (id) => {
  try {
    const response = await $axios.delete("address/" + id);
    fetchData();
    loading.value = false;
    console.log(response);
  } catch (error) {
    console.error("Error deleting address data:", error);
    loading.value = false;
  }
};
fetchData();

//place order
const selectedShippingMethod = ref(null);
const selectedShippingAddress = ref(null);
const selectedAddressObject = ref({})
const selectedShippingAreaObject = ref({})
const selectedAddress = (address)=>{
  selectedAddressObject.value = address;
  selectedShippingAddress.value = address.id;
  cartStore.selectedAddressObject = address
}
const selectedShippingArea = (area)=>{
  selectedShippingAreaObject.value = area;
  selectedShippingMethod.value = area.id; // Update selectedShippingMethod with the ID of the selected shipping method
  cartStore.selectedShippingAreaObject = area
}
const submitCheckoutForm = () => {
  if (!selectedShippingMethod.value) {
    toast.error('Shipping method is required');
  } else if (!selectedShippingAddress.value) {
    toast.error('Shipping address is required');
  } else {
    const requestData = {
      shipping_method_id: selectedShippingMethod.value,
      shipping_address_id: selectedShippingAddress.value,
    };
    $axios
      .post("checkout/form-submit",requestData)
      .then((response) => {
        if (response.data.status === 'success') {
          toast.success('Order placed successfully');
          router.push({name:'payment'})
        }
      })
      .catch((error) => {
        console.error('Error submitting checkout form:', error);
      });
  }
};

</script>
