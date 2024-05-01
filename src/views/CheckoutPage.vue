<template>
        <!-- loader strat -->
        <!-- <div class="loader">
            <span></span>
            <span></span>
        </div> -->
        <!-- loader end -->
        <!-- header start -->
        <header>
            <div class="back-links">
                <a href="cart.html">
                    <i class="iconly-Arrow-Left icli"></i>
                    <div class="content">
                        <h2>Payment Details</h2>
                        <h6>Step 2 of 2</h6>
                    </div>
                </a>
            </div>
        </header>
        <!-- header end -->
        <!-- offer section start -->
        <section class="offer-section px-15 top-space">
            <h2 class="page-title">Offers & promotions</h2>
            <div class="offer-listing">
                <ul class="listing">
                    <li>Get upto 25% discount on Multikart Pay using ICICI Bank Net banking or Cards</li>
                    <li>Enjoy upto 50% off & free delivery on online orders!</li>
                    <li>Get upto 25% discount on Multikart Pay using ICICI Bank Net banking or Cards</li>
                    <li>Enjoy upto 50% off & free delivery on online orders!</li>
                </ul>
                <div class="overlay-offer"></div>
            </div>
            <a href="#" class="show-more">Show More (5 offers)</a>
        </section>
        <div class="divider"></div>
        <!-- offer section end -->
        <!-- payment method start -->
        <section class="px-15 payment-method-section pt-0">
            <div class="accordion" id="accordionExample">
                <div class="card">
                    <div class="card-header" id="h_one">
                        <div class="btn btn-link" data-bs-toggle="collapse" data-bs-target="#one">
                            <label for='r_one'>
                                <img src="@/assets/images/payment/1.png" class="img-fluid" alt="">Cash On Delivery
                                <input type='radio' class="radio_animated" value="COD" checked id='r_one' name='occupation'
                                     required />
                            </label>
                        </div>
                    </div>
                    <div id="one" class="collapse show" aria-labelledby="h_one" data-bs-parent="#accordionExample">
                        <div class="card-body p-0">
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="divider"></div>
        <!-- payment method end -->
    
    
        <!-- order details start -->
        <!-- <section class="px-15 pt-0">
            <h2 class="title">Order Details:</h2>
            <div class="order-details">
                <ul>
                    <li>
                        <h4>Bag total <span>$220.00</span></h4>
                    </li>
                    <li>
                        <h4>Bag savings <span class="text-green">-$20.00</span></h4>
                    </li>
                    <li>
                        <h4>Coupon Discount <router-link :to="{name:'coupons'}" class="theme-color">Apply Coupon</router-link></h4>
                    </li>
                    <li>
                        <h4>Delivery <span>$50.00</span></h4>
                    </li>
                </ul>
                <div class="total-amount">
                    <h4>Total Amount <span>$270.00</span></h4>
                </div>
            </div>
        </section> -->
        <!-- order details end -->
        <!-- panel space start -->
        <section class="panel-space"></section>
        <!-- panel space end -->
        <!-- bottom panel start -->
        <div class="cart-bottom">
            <div>
                <!-- <div class="left-content">
                    <h4>$270.00</h4>
                    <a href="#" class="theme-color">View details</a>
                </div> -->
                <button @click.prevent="pay" class="btn btn-solid">Pay Now</button>
            </div>
        </div>
        <!-- bottom panel end -->
    
</template>
<script setup>
import { onMounted } from "vue";
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
function generateUniqueKey() {
  const timestamp = new Date().getTime().toString(16); // Convert current timestamp to hexadecimal string
  const randomString = Math.random().toString(36).substring(7); // Generate a random string
  return timestamp + randomString; // Concatenate timestamp and random string
}
// Generate a unique key for each item in the cartItems array
const indexedCartItems = cartStore.cartItems.reduce((acc, currentItem) => {
  const uniqueKey = generateUniqueKey(); // You need to implement this function
  acc[uniqueKey] = currentItem;
  return acc;
}, {});
//retrive store data from cart
const formData = {
    "sub_total":cartStore.subtotal,
    "amount":cartStore.totalAmount,
    "product_qty": Object.keys(indexedCartItems).length,
    "order_address":cartStore.selectedAddressObject,
    "shpping_method":cartStore.selectedShippingAreaObject,
    "cartItems": indexedCartItems
}
console.log(formData);
const pay = ()=>{
    $axios.post('pay',formData).then((response)=>{
        if(response.data.status == 200){
            toast.success(response.data.message)
            cartStore.destroyCart(); // Call destroyCart after successful payment
            router.push({name:'place-order'})
        }else{
            toast.error(response.data.message)
        }
    }).catch((error)=>{
        console.log(error)
})
}






onMounted(()=>{
    document.querySelectorAll('.show-more').forEach(function(button) {
    button.addEventListener('click', function(e) {
        document.querySelectorAll('.offer-listing').forEach(function(offer) {
            offer.classList.toggle('maximized');
        });

        this.textContent = this.textContent === 'Show Less' ? 'Show More' : 'Show Less';
    });
});
})

</script>