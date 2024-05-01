import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { toast } from "vue3-toastify";
import { useUserStore } from "./user";
import { useRouter } from 'vue-router';
import axios from 'axios';
export const useCartStore = defineStore({
    id: 'cart',
    state: () => ({
        cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
        subtotal: 0,
        totalAmount: 0,
        coupon: '', // New state property for storing coupon code
        couponDetails: { discount: 0, discount_type: '', cart_total: 0 ,coupon_name:'',coupon_code:'' }, // New state property for coupon details
        selectedAddressObject: {},
        selectedShippingAreaObject: {},
        selectedShippingMethod: null,
        selectedShippingAddress: null,
    }),
    actions: {
        addToCart(newCartItem) {
            this.cartItems.push(newCartItem);
            this.saveCartToLocalStorage();
            this.calculateSubtotal();
            this.calculateTotalAmount();
        },
        removeFromCart(index) {
            this.cartItems.splice(index, 1);
            this.saveCartToLocalStorage();
            this.calculateSubtotal();
            this.calculateTotalAmount();
        },
        updateCartItem({ index, newCartItem }) {
            this.cartItems[index] = newCartItem;
            this.saveCartToLocalStorage();
            this.calculateSubtotal();
            this.calculateTotalAmount();
        },
        saveCartToLocalStorage() {
            localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        },
        calculateSubtotal() {
            this.subtotal = this.cartItems.reduce((total, cartItem) => {
                return total + (cartItem.unit_price * cartItem.qty);
            }, 0);
        },
        calculateTotalAmount() {
            const totalDiscount = this.couponDetails.discount || 0; // Use coupon discount from state
            this.totalAmount = Math.max(0, this.subtotal - totalDiscount);
        },
        // Function to apply coupon
        applyCoupon(coupon) {
            axios.post('http://127.0.0.1:8000/api/v1/apply-coupon', { coupon_code: coupon }).then((response) => {
                const couponData = response.data.coupon;
                this.coupon = coupon;
                if (couponData) {
                    // Update couponDetails with the data from the response
                    this.couponDetails = {
                        discount: couponData.discount,
                        discount_type: couponData.discount_type,
                        coupon_name: couponData.coupon_name,
                        coupon_code: couponData.coupon_code,
                        cart_total: this.subtotal // Assuming subtotal is the total before applying coupon
                    };
                    console.log(this.couponDetails);
                    // Calculate the coupon discount
                    this.calculateCouponDiscount();
                    toast.success(response.data.message);
                } else {
                    toast.error("Invalid coupon");
                }
            }).catch((error) => {
                console.error('Error applying coupon:', error);
                toast.error("Failed to apply coupon");
            });
        },
        // Calculate the coupon discount based on the coupon type (percentage or amount)
        calculateCouponDiscount() {
            const couponType = this.couponDetails.discount_type;
            const couponValue = this.couponDetails.discount;
            let discount = 0;
            if (couponType === 'percent') {
                discount = (this.subtotal * couponValue) / 100;
            } else if (couponType === 'amount') {
                discount = couponValue;
            }

            this.couponDetails.discount = discount;
            this.calculateTotalAmount(); // Recalculate total amount after applying coupon
        },
        
         // Set selected address object
         setSelectedAddressObject(address) {
          this.selectedAddressObject = address;
      },

      // Set selected shipping area object
      setSelectedShippingAreaObject(area) {
          this.selectedShippingAreaObject = area;
      },
      destroyCart() {
        this.cartItems = [];
        this.subtotal = 0;
        this.totalAmount = 0;
        this.coupon = '';
        this.couponDetails = { discount: 0, discount_type: '', cart_total: 0, coupon_name: '', coupon_code: '' };
        this.selectedAddressObject = {};
        this.selectedShippingAreaObject = {};
        this.selectedShippingMethod = null;
        this.selectedShippingAddress = null;
        localStorage.removeItem('cartItems');
      }
    }
});
