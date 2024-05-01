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
                        <h2>settings</h2>
                    </div>
                </router-link>
            </div>
        </header>
        <!-- header end -->
        <!-- section start -->
        <section class="px-15 top-space pt-0 ratio_40">
            <div class="help-img rounded-1">
                <img src="@/assets/images/setting.jpg" class="img-fluid bg-img bg-top" alt="">
            </div>
        </section>
        <!-- section end -->
        <!-- setting section start -->
        <section class="px-15 pt-3">
            <h2 class="mb-2">Settings</h2>
            <div class="row">
                <div class="form-group toggle-sec col-12 mb-3">
                    <label>Dark <span>Lorem ipsum dolor sit amet
                        </span></label>
                    <div class="button toggle-btn">
                        <input id="darkButton" type="checkbox" class="checkbox">
                        <div class="knobs">
                            <span></span>
                        </div>
                        <div class="layer"></div>
                    </div>
                </div>
                <div class="form-group toggle-sec col-12 mb-3">
                    <label>RTL
                        <span>Lorem ipsum dolor sit amet</span>
                    </label>
                    <div class="button toggle-btn">
                        <input id="rtlButton" type="checkbox" class="checkbox">
                        <div class="knobs">
                            <span></span>
                        </div>
                        <div class="layer"></div>
                    </div>
                </div>
                <div class="form-group toggle-sec col-12">
                    <label>Notification
                        <span>Lorem ipsum dolor sit amet</span>
                    </label>
                    <div class="button toggle-btn">
                        <input type="checkbox" class="checkbox">
                        <div class="knobs">
                            <span></span>
                        </div>
                        <div class="layer"></div>
                    </div>
                </div>
            </div>
        </section>
        <!-- setting section end -->
        <the-footer></the-footer>
</template>
<script setup>
    import TheFooter from '@/components/TheFooter.vue'
</script>