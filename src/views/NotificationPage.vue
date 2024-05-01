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
                <router-link :to="{name:'home'}">
                    <i class="iconly-Arrow-Left icli"></i>
                    <div class="content">
                        <h2>notification</h2>
                    </div>
                </router-link>
            </div>
        </header>
        <!-- header end -->
        <!-- tab section start -->
        <section class="pt-0 tab-section section-b-space">
            <div class="title-section px-15">
                <h2>Find your Style</h2>
                <h3>Super Summer Sale</h3>
            </div>
    
            <div class="px-15">
                <ul class="filter-title" id="filterOptions">
                    <li class="active"><a href="#" class="all">All</a></li>
                    <li><a href="#" class="order">Order Info</a></li>
                    <li><a href="#" class="offers">Offers</a></li>
                    <li><a href="#" class="payment">Payment</a></li>
                    <li><a href="#" class="return">return</a></li>
                </ul>
    
                <div id="ourHolder" class="filter-content">
                    <div class="item order">
                        <div class="media">
                            <img src="@/assets/images/notification/1.jpg" class="img-fluid" alt="">
                            <div class="media-body">
                                <h4>Exclusive Brand Day Sale!! HURRY, LIMITED period offer!</h4>
                                <h6 class="content-color">10 July, 2021</h6>
                            </div>
                        </div>
                    </div>
                    <div class="item offers">
                        <div class="media">
                            <img src="@/assets/images/notification/2.jpg" class="img-fluid" alt="">
                            <div class="media-body">
                                <h4>Order Placed successfully. It will be delivered on Mon 15 July, 2021</h4>
                                <h6 class="content-color">5 July, 2021</h6>
                            </div>
                        </div>
                    </div>
                    <div class="item order">
                        <div class="media">
                            <img src="@/assets/images/notification/3.jpg" class="img-fluid" alt="">
                            <div class="media-body">
                                <h4>We have got coupons. collect now and save extras !!!</h4>
                                <h6 class="content-color">5 June, 2021</h6>
                            </div>
                        </div>
                    </div>
                    <div class="item payment">
                        <div class="media">
                            <img src="@/assets/images/notification/4.jpg" class="img-fluid" alt="">
                            <div class="media-body">
                                <h4>Payment Failed. You can retry making a payment on order sections.</h4>
                                <h6 class="content-color">20 April, 2021</h6>
                            </div>
                        </div>
                    </div>
                    <div class="item payment">
                        <div class="media">
                            <img src="@/assets/images/notification/5.jpg" class="img-fluid" alt="">
                            <div class="media-body">
                                <h4>Exclusive Brand Day Sale!! HURRY, LIMITED period offer!</h4>
                                <h6 class="content-color">10 July, 2021</h6>
                            </div>
                        </div>
                    </div>
                    <div class="item offers">
                        <div class="media">
                            <img src="@/assets/images/notification/6.jpg" class="img-fluid" alt="">
                            <div class="media-body">
                                <h4>Your order is delivered on time. for any further assistance please contact us. </h4>
                                <h6 class="content-color">5 July, 2021</h6>
                            </div>
                        </div>
                    </div>
                    <div class="item order">
                        <div class="media">
                            <img src="@/assets/images/notification/3.jpg" class="img-fluid" alt="">
                            <div class="media-body">
                                <h4>We have got coupons. collect now and save extras !!!</h4>
                                <h6 class="content-color">5 June, 2021</h6>
                            </div>
                        </div>
                    </div>
                    <div class="item payment">
                        <div class="media">
                            <img src="@/assets/images/notification/4.jpg" class="img-fluid" alt="">
                            <div class="media-body">
                                <h4>Payment Failed. You can retry making a payment on order sections.</h4>
                                <h6 class="content-color">20 April, 2021</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- tab section end -->    
</template>
<script>
export default {
    mounted() {
        const filterOptions = document.querySelectorAll('#filterOptions li a');

        filterOptions.forEach((option) => {
            option.addEventListener('click', () => {
                const ourClass = option.classList[0];

                // Reset the active class on all the buttons
                filterOptions.forEach((item) => {
                    item.parentNode.classList.remove('active');
                });
                // Update the active state on our clicked button
                option.parentNode.classList.add('active');

                if (ourClass === 'all') {
                    // Show all items
                    document.querySelectorAll('#ourHolder div.item').forEach((item) => {
                        item.classList.remove('d-none');
                    });
                } else {
                    // Hide all elements that don't share ourClass
                    document.querySelectorAll('#ourHolder div:not(.' + ourClass + ')').forEach((item) => {
                        item.classList.remove('d-none');
                    });
                    // Show all elements that do share ourClass
                    document.querySelectorAll('#ourHolder div.' + ourClass).forEach((item) => {
                        item.classList.add('d-none');
                    });
                }
            });
        });
    }
};
</script>