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
            <a href="shop.html">
                <i class="iconly-Arrow-Left icli"></i>
                <div class="content">
                    <h2>Coupons</h2>
                </div>
            </a>
        </div>
    </header>
    <!-- header end -->


    <!-- apply coupons section start -->
    <section class="px-15 top-space pt-0">
        <div class="search-coupons">
            <input class="form-control form-theme" placeholder="Apply Coupons">
            <i class="iconly-Discount icli"></i>
        </div>
        <ul class="coupon-listing">
            <li>
                <div class="coupon-box">
                    <div class="top-bar">
                        <h4>MULTIKART10</h4><span>Save $20.00</span><a href="#">APPLY</a>
                    </div>
                    <p>Use code MULTIKART10 to get flat 10% off on minimum order of $200.00. Offer valid for first time
                        users only</p>
                    <router-link :to="{name:'terms-condition'}" class="text-green">View T&C</router-link>
                </div>
            </li>
            <li>
                <div class="coupon-box">
                    <div class="top-bar">
                        <h4>WELCOME</h4><span>Save $22.00</span><a href="#">APPLY</a>
                    </div>
                    <p>Use code WELCOME to get flat 10% off on minimum order of $200.00. Offer valid for first time
                        users only</p>
                        <router-link :to="{name:'terms-condition'}" class="text-green">View T&C</router-link>
                    </div>
            </li>
            <li>
                <div class="coupon-box">
                    <div class="top-bar">
                        <h4>LUCKY50</h4><span>Save $32.00</span><a href="#">APPLY</a>
                    </div>
                    <p>Use code LUCKY50 to get flat 10% off on minimum order of $200.00. Offer valid for first time
                        users only</p>
                        <router-link :to="{name:'terms-condition'}" class="text-green">View T&C</router-link>
                    </div>
            </li>
            <li>
                <div class="coupon-box">
                    <div class="top-bar">
                        <h4>SUMMERSALE</h4><span>Save $15.00</span><a href="#">APPLY</a>
                    </div>
                    <p>Use code SUMMERSALE to get flat 10% off on minimum order of $200.00. Offer valid for first time
                        users only</p>
                        <router-link :to="{name:'terms-condition'}" class="text-green">View T&C</router-link>
                    </div>
            </li>
        </ul>
    </section>
    <!-- apply coupons section end -->


    <!-- panel space start -->
    <section class="panel-space"></section>
    <!-- panel space end -->


    <!-- bottom panel start -->
    <div class="cart-bottom">
        <div>
            <div class="left-content">
                <h4>$270.00</h4>
                <a href="#order-details" class="theme-color">View details</a>
            </div>
            <a href="delivery.html" class="btn btn-solid">Place Order</a>
        </div>
    </div>
    <!-- bottom panel end -->

</template>