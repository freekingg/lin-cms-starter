<template>
    <div id="app" class="home">
        <!-- 海报图 -->
        <div class="page-banner" id="months-new">
            <img src="@/assets/images/sp_1.png">
        </div>

        <!-- 购买信息 -->
        <PurchaseInfo />

        <!-- 商品图-列表 -->
        <detailContentMain />

        <!-- orderBox -->
        <orderBox />

        <!-- 底部 -->
        <footers />

        <!-- 右侧图标 -->
        <suspension/>
    </div>
</template>

<script setup>
import detailContentMain from '@/components/detail-content-main.vue';
import orderBox from '@/components/order-box.vue';
import footers from '@/components/footer.vue';
import PurchaseInfo from '@/components/PurchaseInfo.vue';
import suspension from '@/components/suspension.vue';
</script>

<style lang="scss">
.page-banner {
    width: 100%;
    font-size: 1.5rem;
    color: #333;
}

.page-list {
    width: 100%;
    padding-top: 50px;
    font-size: 1.5rem;
    color: #333;
}

img {
    display: block
}

.NavigationBar-logo {
    max-width: 180px;
    height: 50px;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 0px 15px;
}

.NavigationBar-logo img {
    max-height: 100%;
}

.page-banner img {
    width: 100%
}

.pull-right {
    float: right;
}

ul,
ol {
    margin-top: 0;
    margin-bottom: 10px;
}

.NavigationBar-actionMenu>.List-item {
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    margin: 0 10px;
}

.NavigationBar .NavigationBar-actionMenu>.List-item .NavigationBar-actionMenu-button {
    font-size: 18px;
    line-height: 0;
}

.NavigationBar-actionMenu-button.nav-color {
    color: #333;
}

.NavigationBar-actionMenu-button svg {
    width: 22px;
    height: 22px;
    vertical-align: middle;
}

.NavigationBar.NavigationBar-actionMenu>.List-item .NavigationBar-actionMenu-button.sl-menu-panel-toggle {
    width: 60px;
    height: 60px;
    position: relative;
}

.page-title-index {
    text-align: center;
    margin-bottom: 2.25rem;
}


.page-title-index-button {
    margin-top: 17px;
    position: absolute;
    content: " ";
    width: 2rem;
    height: 0.2rem;
    background-color: #c74060;
    left: 50%;
    margin-left: -1rem;
    opacity: .7;
}

.price-sel-lise {
    text-align: center;
    color: #c74060;
    font-weight: 700;
    font-size: 14PX;
    margin: 10;
}

.price-sel-lise-button {
    text-align: center;
    color: #c74060;
    font-size: 18PX;
    background-color: #f7f7f7;
    border-color: #f7f7f7;
    padding: 8;
}

.layout-footer {
    border-top: 0.05rem solid #eee;
    width: 100%;
    margin-bottom: 1.5rem;
}

.layout-footer .footer-content {
    width: 100%;
    padding: 0.5rem 0 1.5rem;
    margin: 0 auto;
    display: block;
    text-align: center;
    font-size: .7rem;
    box-sizing: border-box;
    padding: 1rem;
}

.layout-footer .footer-content .logo {
    flex-shrink: 0;
    margin-right: 2rem;
    width: 100%;
    margin: 0;
}

.layout-footer .footer-content .logo img {
    width: 100%;
}

.layout-footer .footer-content .description {
    font-size: .8rem;
    margin-top: 0.5rem;
    box-sizing: border-box;
    padding: 0 0.5rem;
}

.layout-footer .footer-content .description .desc {
    text-align: center;
}

.layout-footer .footer-content .description .desc .desc-title {
    font-size: 1.4rem;
    line-height: 1.4;
    margin-bottom: 0.2rem;
    color: #333;
    font-weight: 700;
}

.layout-footer .footer-content .description .desc .item>a {
    font-size: .8rem;
    color: #666;
}

.layout-footer .footer-content .description .desc .item1>a {
    margin-right: 0.5rem;
}

.layout-footer .footer-content .description .desc .cp {
    color: #999;
    padding-top: 20px;
}

.sold-line {
    padding-right: 5px;
    width: 80%;
    height: 100%;
    background: #f20012;
    border-radius: 12px
}

.product-name {
    padding: 10px;
    font-size: 18px
}

.table_details {
    padding: 0;
    padding-bottom: 10px
}

.table_details {
    height: auto;
    margin: 0 auto;
    background: #e7e7e7;
    padding-bottom: 5px
}

.data-table {
    margin: 1.5%;
    font-size: 14px;
    color: #666;
    margin-top: 0
}

.data-table tr {
    height: 27px
}

.data-table th {
    border: 1px solid #ccc;
    font-weight: 100;
    padding: 5px
}

.data-table th {
    background: none repeat scroll 0 0 #f4f4f4;
    text-transform: uppercase;
    font-family: Arial;
    white-space: nowrap
}

.data-table td {
    padding: 10px;
    background: #fff;
    border: 1px solid #ccc
}

.table_details p {
    margin-bottom: 0
}

.data-table {
    margin: 1.5%;
    font-size: 14px;
    color: #666;
    margin-top: 0
}

.data-table tr {
    height: 27px
}

.data-table th {
    border: 1px solid #ccc;
    font-weight: 100;
    padding: 5px
}

.data-table th {
    background: none repeat scroll 0 0 #f4f4f4;
    text-transform: uppercase;
    font-family: Arial;
    white-space: nowrap
}

.data-table td {
    padding: 10px;
    background: #fff;
    border: 1px solid #ccc
}

.table_details p {
    margin-bottom: 0
}

.data-table img {
    width: 100%
}

.page-top-btn {
    display: flex;
    justify-content: center;
    line-height: 46px;
    width: calc(100% - 20px);
    margin: 10px;
    background: #e02e24;
    color: #fff;
    font-size: 16px;
    border-radius: 5px;
    margin-bottom: 40px
}

.page-float-btn {
    display: flex;
    justify-content: center;
    line-height: 46px;
    width: 100%;
    background: #409eff;
    color: #fff;
    font-size: 16px;
    position: fixed;
    bottom: 0;
    max-width: 640px
}

.send-type2 {
    display: none
}

.combo-box {
    margin-bottom: 10px
}

.combo-box li {
    padding: 1.375rem;
}

#combo-box li {
    width: 100%;
    font-size: 15px;
    display: inline-block;
    text-align: center;
    font-weight: bold;
    padding: 10px;
    color: #666;
    border: 2px solid #ccc;
    margin: 5px 5px 5px 0;
    border-radius: 0.4rem;
    transition: all 0.3s linear 0s;
    box-sizing: border-box;
    box-shadow: 0 0 5px rgb(0 0 0 / 20%);
}

.combo-box li {
    width: calc(31% - 10px);
    margin-right: 5px;
    padding: 5px;
    float: left;
    /* background: #ede6fa; */
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 0.4rem;
    transition: all 0.3s linear 0s;
    box-shadow: 0 0 5px rgb(0 0 0 / 20%);
}

#spec-box .rows-head-2 {
    font-size: .8rem;
    font-weight: 700;
}

#combo-box1 li {
    color: #666;
    font-size: 14px;
    padding: 10px;
    border: 1px solid #ddd;
    margin: 5px 5px 5px 0;
    border-radius: .2rem;
    display: inline-block;
    text-align: center;
    background: rgba(0, 0, 0, .06)
}

.combo-img {
    width: 100%;
    padding: 50% 0;
    position: relative;
    top: 0
}

.combo-img img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    border-radius: 15px
}

.combo-img+div {
    font-size: 13px;
    color: #333;
    font-size: 14px;
    text-align: center;
    margin-bottom: 4px;
    display: -webkit-box;
    height: auto;
    max-height: 45px;
    margin: 0 auto;
    line-height: 1.4;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.combo-active {
    background: #e02e24 !important;
    border-color: #e02e24 !important;
    color: #fff
}

.combo-active>div {
    color: #fff !important
}

.count-btn {
    width: 36px;
    height: 36px;
    line-height: 36px;
    background: #eee;
    color: #222;
    text-align: center;
    font-size: 16px
}

.count-box {
    border: 1px solid #ccc;
    width: 152px
}

.count-box input {
    width: 80px;
    height: 36px;
    text-align: center;
    border: none;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc
}

.order-info-input input {
    width: 100%;
    padding: 10px 5px;
    line-height: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #333;
    box-sizing: border-box
}

.order-info-input select {
    border-radius: 20px
}

.order-info-title {
    line-height: 36px
}

.send-type-box {
    line-height: 40px;
    font-size: 16px;
    overflow: hidden;
    border-radius: 5px
}

.send-type-box>div {
    text-align: center;
    width: 50%
}

.send-type-box>div:first-child {
    border-right: 1px solid #ccc
}

.send-type-active {
    background: #e40681 !important;
    border-color: #e40681 !important;
    color: #fff !important
}

.order-info-input select {
    width: 100%;
    padding: 10px 5px;
    line-height: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #333;
    box-sizing: border-box
}

.order-info-input textarea {
    width: 100%;
    padding: 10px 5px;
    line-height: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #333;
    box-sizing: border-box
}

.success-box {
    width: 100%;
    height: 100%;
    margin-top: 35px;
    max-width: 750px;
    position: fixed;
    top: 0;
    background: #fff;
    display: none
}

.order-info-box {
    padding: 10px
}

.order-info-box li {
    padding: 10px 0;
    color: #666
}

.order-info-box li>div:last-child {
    width: 60%;
    line-height: 21px;
    font-size: 14px;
    color: #222;
    text-align: right
}

.detail img {
    width: 100%
}

h2 {
    color: #555;
    font-weight: 500;
    font-size: 16px;
    line-height: 42px;
    text-indent: 2%
}

h2:before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 18px;
    background: #c50a1d;
    margin-right: 8px;
    vertical-align: middle
}

.notesbox {
    padding: 0 3% 30px;
    color: #fff
}

.note_text {
    text-indent: 1em
}

footer {
    display: -webkit-flex;
    display: flex;
    background: #fff;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 640px
}

.inquiry {
    width: 60%;
    border-left: 1px dashed #ff2a2a
}

.top {
    width: 20%
}

.main-price span {
    font-weight: 700
}

.justify-content-between {
    justify-content: space-between
}

.s-goods-price {
    font-size: 18px
}

.top-big-btn-box {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    text-align: center
}

.top-big-btn-red {
    height: 100%;
    background: #409eff;
    border-radius: 50px;
    text-align: center
}

.fu-flag {
    padding: .05333rem .10667rem;
    background: red;
    color: #fff;
    line-height: .48rem;
    margin-left: .05333rem;
    border-radius: .08rem;
    font-size: .4rem
}

.fu-flag-ak {
    padding: .05333rem .10667rem;
    background: red;
    color: #fff;
    line-height: .48rem;
    margin-left: 1.05333rem;
    border-radius: .08rem
}

.fu-flag-bk {
    padding: .05333rem .10667rem;
    background: #000;
    color: #fff;
    line-height: .48rem;
    margin-left: 1.05333rem;
    border-radius: .08rem
}

.content-active {
    padding-bottom: 3px
}

.issue-title {
    font-size: 18px;
    line-height: 18px;
    padding: 15px 10px 0
}

.issue-title+div {
    padding: 0 10px;
    transition-duration: .5s;
    color: #666
}

.issue-list-box {
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 10px
}

.issue-arrow-active {
    transform: rotate(180deg);
    transition-duration: .5s
}

.issue-content {
    height: 0;
    overflow: hidden
}

a {
    background: 0 0;
    text-decoration: none
}

div.mui-bar {
    border: none;
    height: auto;
    padding: 10px;
    padding-top: 1px;
    padding-left: 2px;
    padding-right: 2px;
    padding-bottom: 3px;
    background-color: #fdfdfd;
    width: 100%;
    max-width: 640px;
    min-width: 320px;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 9999;
    box-shadow: 0 -1px 1px #dad8d8
}

.mui-bar .service,
.query {
    width: 23%;
    height: 56px;
    border: 1px solid #dedede;
    text-align: center;
    float: left;
    border-radius: 4px 4px 4px 4px
}

.mui-bar {
    box-shadow: none
}

.query a,
.service a {
    color: #dd2d97;
    font-size: 14px
}

.query img,
.service img {
    max-width: 30px;
    margin: 0 auto
}

.mui-bar .purchase {
    float: left;
    width: 48%;
    height: 56px;
    border: 1px solid #dedede;
    margin: 0 .5%;
    text-align: center;
    background-color: red;
    border-radius: 4px 4px 4px 4px
}

@-moz-document url-prefix() {
    .mui-bar .purchase {
        width: 47%
    }
}

.mui-bar .purchase a {
    line-height: 56px;
    font-size: .22rem;
    color: #fff
}

.mui-bar .service,
.query {
    width: 24.4%;
    height: 56px;
    border: 1px solid #dedede;
    text-align: center;
    float: left;
    border-radius: 4px 4px 4px 4px
}

.query a,
.service a {
    float: left;
    line-height: 18px;
    color: #000;
    font-size: 14px;
    width: auto;
    text-align: center;
    margin-top: 9px;
    margin-left: 6%
}

.query img,
.service img {
    float: left;
    max-width: 30px;
    margin: 0 auto;
    margin-top: 12px;
    margin-left: 26%;
    margin-right: 1px
}

.fot {
    width: 100%;
    text-align: center;
    line-height: 1.2;
    padding-top: 2px;
    font-size: 12px
}

.mui-bar {
    border: none
}

.mui-bar .purchase img {
    max-width: 30px;
    margin: 12px auto 0 20%;
    text-align: right;
    float: left;
    width: 50%;
    padding-top: 3px
}

.mui-bar .purchase span {
    text-align: left;
    line-height: 60px;
    width: 50%
}

.mui-bar .purchase a {
    margin: 0 auto;
    text-align: center;
    font-size: 16px;
    line-height: 56px;
    width: 100%
}

.fot p {
    margin: 0 auto;
    color: #000;
    line-height: 13px;
    font-size: 13px;
    text-align: center;
    margin-top: 34px
}

.fot p img {
    width: 35px;
    height: auto;
    margin-right: 0;
    padding-top: 6px;
    margin-left: 3px
}

.mui-bar .purchase a span {
    line-height: 50px;
    float: left;
    font-size: 20px;
    text-align: center
}

.mui-bar {
    box-shadow: 0 -1px 1px #dad8d8;
    margin: 0 auto;
    max-width: 640px;
    padding-bottom: 1px
}

.spec-img {
    width: 100px;
    height: 100px;
    border-radius: .2rem;
    border: 1px solid #f1f1f1
}

.pay_content {
    width: 100%;
    height: auto;
    background: #fefefe;
    margin-top: .8rem;
    margin-bottom: .53333rem
}

.pay_image {
    width: 20%;
    height: auto;
    float: left;
    padding-top: 6%;
    margin-left: 3%
}

.detail-context {
    position: relative;
    font-size: 12px;
    border-bottom: 1px solid #dcdcdc;
    padding: 10px;
    height: 30px !important
}

.dc-price .s-price-1 {
    padding: 1% 2%;
    color: #d62672;
    float: left;
    font-size: 24px
}

.dc-price .o-price-1 {
    text-decoration: line-through;
    float: left;
    padding: 0 6px
}

.detail-context .flag {
    float: left;
    background: red;
    color: #fff;
    line-height: 18px;
    margin-left: 2px;
    border-radius: 3px;
    padding: 2px 4px
}

.detail-profile {
    border-bottom: 1px solid #dcdcdc;
    padding: 10px;
    color: #d62672;
    min-height: 30px;
    font-size: 14px
}

.detail-bars {
    box-shadow: 0 1px 1px #ebe9e9;
    list-style-type: none;
    background: none repeat scroll 0% 0% #fff;
    height: 40px;
    width: 100%;
    max-width: 640px;
    padding: 0;
    list-style: none;
    overflow: hidden
}

.detail-bars li {
    font-size: 14px !important;
    background: #fff;
    color: #333;
    width: 33.33%;
    line-height: 39px;
    border-right: 1px solid #ddd;
    float: left;
    text-align: center;
    cursor: pointer
}

.detail-bars li:last-child {
    border-right: none
}

.service1 {
    font-size: 14px;
    color: #393d49;
    display: flex;
    font-weight: 600
}

.service1>.a {
    width: 25%;
    text-align: center;
    float: left;
    display: fle
}

.original_price {
    float: left;
    text-decoration: line-through;
    padding-left: 20px;
    color: #788188;
    font-size: .8rem;
    padding-top: 17px
}

.top-main-box {
    height: 55px;
    background: #f5f769;
    overflow: hidden;
    position: relative
}

.top-main-box-bg {
    width: 500px;
    background: #fae300;
    height: 400px;
    border-radius: 500px;
    position: absolute;
    top: -350px;
    left: calc(-500px + 70%);
    border: 20px solid #f7ef00
}

.top-main-content {
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    padding: 5px 10px
}

.main-price span {
    font-weight: 700
}

.sold-box {
    width: 100px;
    height: 12px;
    margin: 4px;
    border-radius: 10px;
    background: #fba35d;
    font-size: 10px;
    line-height: 12px;
    text-align: right;
    color: #fff
}

.sold-line {
    padding-right: 5px;
    width: 80%;
    height: 100%;
    background: #f20012;
    border-radius: 12px
}

.time-count-box {
    width: 16px;
    height: 16px;
    border-radius: 3px;
    color: #fff;
    background: #000;
    line-height: 16px;
    font-size: 10px
}

.time-count-flag {
    padding: 0 3px;
    position: relative;
    top: -4px
}

.goods-title {
    padding: 10px;
    text-align: left;
    font-size: 14px
}

.top-big-btn-box {
    height: 50px;
    border-radius: 50px;
    background: #f5ef00;
    line-height: 50px;
    font-size: 16px;
    margin-bottom: 10px
}

.top-big-btn-red {
    height: 100%;
    background: #ff000f;
    border-radius: 50px;
    color: #fff
}

.detail-content {
    text-align: left
}

.detail-content-main iframe {
    width: 100%;
    height: 500px
}

.content-active {
    font-size: 1.25rem;
    padding-bottom: 3px;
    color: rgba(0, 0, 0, .65);
    font-weight: bolder;
    line-height: 1.4;
    margin: 2rem auto;
}

img {
    display: block
}

h1 {
    font-size: .8rem
}

.detail-content-main {
    overflow: hidden
}

.detail-content-main img {
    width: 100%
}

.banner-content {
    padding-bottom: .8rem
}

.immediately-buy-btn {
    max-width: 640px;
    margin: 10px;
    text-align: center;
    line-height: 54px;
    background: #f60011;
    border-radius: 50px;
    color: #fff;
    position: fixed;
    bottom: 0;
    width: calc(100% - 20px);
    box-shadow: 0 0 8px #f200129e
}

.page-header {
    height: 46px;
    box-shadow: 0 0 4px rgba(196, 213, 167, .26);
    position: absolute;
    width: 100%;
    background: #fff;
    color: #222;
    z-index: 9;
    top: 0;
    line-height: 46px;
    font-size: 16px
}

.order-info>div>div:last-child {
    width: calc(100% - 36px)
}

.order-price-box {
    padding: 5px 10px;
    width: 100%;
    border-radius: 5px;
    color: #666
}

.order-price-box>div>div {
    margin: 5px 0
}

.order-price-box>div>div>div:first-child {
    position: relative;
    color: #666
}

.address-box {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #f9f9f9;
    top: 0;
    z-index: 99999999;
    left: 100%
}

.address-goods-box {
    background: #fff;
    border-radius: 5px;
    padding: 10px;
    text-align: left
}

.address-main-box {
    background: #fff;
    border-radius: 5px;
    text-align: left;
    margin: 0 10px;
    font-size: .8rem
}

.address-main-box>div {
    padding: 10px 0
}

.address-main-box>div>div:first-child {
    width: 90px;
    font-size: 16px;
    line-height: 40px
}

.address-main-box>div>div:last-child {
    width: calc(100% - 90px);
    font-size: 14px
}

.shadow-box {
    box-shadow: 0 0 8px rgba(0, 0, 0, .06)
}

.service-box {
    padding: 0 10px;
    border-radius: 3px
}

.count-btn {
    width: 1.3rem;
    height: 1.3rem;
    background: #f1f1f1;
    text-align: center;
    font-size: .8rem
}

.count-box {
    line-height: 1.3rem
}

.count-box input {
    border: none;
    outline: none;
    text-align: center;
    width: 2rem
}

.radio-label {
    width: .9rem;
    height: .9rem;
    border-radius: 10px;
    border: .1rem solid #f60011;
    margin: .175rem;
    box-sizing: border-box
}

.radio-active {
    border: .25rem solid #f60011
}

textarea {
    width: 100%;
    height: 50px;
    outline: none;
    font-size: 14px;
    font-family: cwtexfangsong;
    background: #fff;
    border: none;
    line-height: 21px;
    padding: 10px;
    background: #f7f7f7;
    width: calc(100% - 20px);
    resize: none;
    border-radius: .2rem
}

.address-content-main {
    height: 100%;
    overflow: auto
}

.sc-select {
    display: none
}

.submit-float-btn {
    line-height: 45px;
    width: 100%;
    font-size: 16px
}

.mian-btn {
    width: calc(100% - 20px);
    margin: 10px;
    text-align: center;
    background: #e02e24;
    color: #fff;
    box-shadow: 0 0 8px #e02e24
}

.explain {
    padding: 16px;
    margin-top: 16px
}

.explain h1 {
    font-size: 24px;
    text-align: center;
    color: #222;
    font-weight: 100
}

.explain p {
    font-size: 12px;
    color: #666;
    margin-top: 8px;
    line-height: 20px;
    word-break: break-all
}

.this_box {
    margin: 16px;
    background: #f6f6f6
}

.m-orderItem {
    margin-top: 10px;
    padding-left: 15px;
    font-size: 16px
}

.this_explain h1 {
    font-size: 12px;
    font-weight: 100;
    color: #aaa;
    margin-top: 20px
}

.this_explain p {
    font-size: 12px;
    color: #666;
    margin-top: 8px
}

.m-orderItem .row-2 {
    padding: 10px 0;
    padding-top: 0
}

.m-orderItem .goodImg {
    position: relative;
    width: 64px;
    height: 64px;
    background-color: #f4f4f4;
    border: 1px solid #eee;
    border-radius: 4px;
    overflow: hidden;
    box-sizing: border-box
}

.m-orderItem .goodInfo {
    margin-left: 16px;
    color: #999
}

.m-orderItem .goodName {
    overflow: hidden;
    font-size: 12px;
    color: #aaa
}

.row-2 {
    width: 100%;
    height: auto;
    overflow: hidden
}

.flex-btw {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1%
}

.final-price {
    font-size: 24px;
    color: #e02e24;
    margin: 3px;
    font-weight: bold;
}

.plugdetail {
    position: relative;
    z-index: 2;
    width: 95%;
    margin: -0.5rem auto 0;
    box-sizing: border-box;
    padding: 0.5rem 0.8rem;
    background-color: #fff;
    box-shadow: 0 0 0.5rem 0.5rem rgb(0 0 0 / 10%);
    border-radius: 0.5rem;
}

.old-price {
    font-size: 17px;
    color: #666;
    text-decoration: line-through;
    margin-top: 9px
}

.price-box .label {
    background-color: #f51111;
    color: #fff
}

.buy_now {
    box-shadow: 0 0 8px #e02e24;
    width: 96%;
    background: #e02e24;
    margin: 2%;
    border-radius: 4px;
    text-align: center;
    color: #fff;
}

.buy_now span {
    color: #fff;
    font-size: 18px;
    line-height: 45px;
}

.label {
    padding: 1px 8px;
    font-size: 15px;
    margin-bottom: .05rem;
    margin-right: 3px;
    border-radius: 6px;
    border: 1px solid #e02e24;
    background: #e02e24;
    color: #fff
}

.d-name {
    font-size: 16px
}

.price-l {
    display: flex
}

.settime {
    display: inline-block;
    font-size: 14px;
    background: #fff;
    color: #e02e24;
}

.showmenu {
    float: left;
    color: #929292
}

.showmenu2 {
    width: 65px;
    text-align: center
}

@media screen and (max-width:750px) {
    .final-price {
        font-size: 20px
    }

    .old-price {
        font-size: 15px
    }

    .label {
        font-size: 13px
    }

    .d-name {
        font-size: 15px
    }

    .bz {
        font-size: 13px
    }
}

.hmbox {
    overflow: hidden;
    padding: 12px 5px;
    font-size: 14px;
    color: #888;
    background: #fff
}

.bz {
    font-size: 15px;
    color: #888;
    float: left
}

.bz span {
    display: inline-block;
    margin-right: 7px
}

.hmbox i {
    width: 16px;
    display: inline-block;
    float: left;
    margin-right: 3px;
    opacity: .7;
    margin-top: 2px
}

.layui-left-menu {
    position: relative;
    margin: 5px 0;
    background-color: #fff;
    box-sizing: border-box;
}

.layui-left-menu li {
    position: relative;
    margin: 1px 0;
    width: calc(100% + 1px);
    color: rgba(0, 0, 0, .8);
    font-size: 0.9375rem !important;
    line-height: 3.125rem !important;
    white-space: nowrap;
    cursor: pointer;
    transition: all .3s;
    padding-left: 24px;
}

.layui-menu li {}

.gou {
    margin: 5px;
    height: 45px;
    background: #e40681;
    border-radius: 3px;
    font-size: 18px;
    color: #fff;
    text-align: center;
    line-height: 45px
}

.buy-nav {
    width: 100%;
    position: fixed;
    bottom: 0;
    text-align: center;
    max-width: 750px;
    background: #fff;
    height: 50px;
    z-index: 100;
    box-shadow: 4px 0 10px #e02e24;
}

.combo-box-foot {
    margin-bottom: 10px;
}

.combo-box-foot li {
    padding: 1.375rem;
}

.buy-nav>.left {
    float: left;
    width: 36%;
    font-size: 1.2rem;
    background: #fff;
    height: 50px;
    line-height: 50px;
    cursor: pointer
}

.buy-nav>.right {
    float: left;
    width: 100%;
    font-size: 1.2rem;
    background: #e02e24;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    color: #fff
}

.buy-nav>.right>a {
    color: #fff
}

.u-address-bg {
    display: block;
    width: 100%;
    height: 5px;
    background: url("@/assets/images/address-bg.png") repeat-x;
    background-size: 31px 8px;
    margin-bottom: 12px
}

.details-rows {
    margin: 0 15px
}

.rows-head {
    display: block;
    padding: .2rem 0;
    font-size: 15px;
    font-weight: 700;
    line-height: 2rem;
    color: #666
}

.details-request {
    color: #e02e24;
    float: left
}

.rows-params {
    padding: 2px 0;
    line-height: 2rem;
    position: relative;
    color: #333;
    display: -webkit-box
}

select,
.details-input-text {
    text-indent: .3rem;
    width: 100%;
    display: inline-block;
    padding: .5rem 0;
    margin-right: 1px;
    font-weight: 10 !important;
    color: #000000 !important;
    border: 1px solid #ccc;
    font-family: MicroSoft Yahei;
    outline: none;
    transition: all .2s linear 0s;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    border-radius: 2px
}

.buy-single-row {
    padding: 0 15px;
    line-height: 39px;
    border-radius: 2px;
    outline: 0
}

.buy-single-row label {
    padding: 4px 0;
    display: -webkit-flex;
    align-items: center;
    border-bottom: 1px solid rgba(217, 217, 217, .6);
    margin-bottom: 5px;
    font-weight: 700
}

.input-label {
    width: 20%;
    color: #666
}

.fixed {
    width: 80%;
    padding: 0;
    font-size: 15px;
    display: flex;
    align-items: center;
}

.cell {
    padding: 0;
    font-size: 15px
}


.layui-form select {
    display: block
}

.detail-region {
    display: block;
    float: left;
    width: 32%
}

.detail-alert {
    padding: .8rem;
    margin-bottom: 1rem;
    text-shadow: 0 1px 0 rgba(255, 255, 255, .5);
    background-color: #fbeedf;
    border: 1px solid #eed3d7;
    border-radius: .2rem;
    color: #c00;
    line-height: 1.5rem;
    margin: 0 2%;
    font-size: 18px;
}

.rowsparams {
    padding: 2px 0;
    line-height: 2rem;
    position: relative
}

.detail-params {
    float: left;
    padding: 0 3px;
    font-size: 1rem;
    color: #666;
    background-color: #fff;
    border: 2px solid #ccc;
    border-radius: 3px;
    margin: 6px 2px;
    text-decoration: none;
    transition: all .3s linear 0s
}

.detail-params:hover {
    background-color: #ccc;
    text-decoration: none
}

.detail-params.active {
    color: #fff;
    background-color: #e02e24;
    border-color: #e02e24;
    text-decoration: none
}

.inputText {
    width: 100%;
    font-size: 16px;
    border: none;
    border-radius: 2px;
    line-height: 18px;
    color: #000000;
    font-weight: 400;
    padding: 0;
}

.detail-payment .detail-payment-payOnDelivery {
    background-position: 2PX -2PX;
}

.detail-payment .detail-payment-payOnDelivery:hover {
    background-position: -200PX -2px;
}

.detail-payment .detail-payment-711 {
    background-position: 2px -345px
}

.detail-payment .detail-payment-711:hover {
    background-position: -198px -345px
}

.detail-payment .detail-payment-quanjia {
    background-position: 2px -395px
}

.detail-payment .detail-payment-quanjia:hover {
    background-position: -198px -395px
}

.detail-payment .detail-payment-paypal {
    background-position: 2px -295px
}

.detail-payment .detail-payment-paypal:hover {
    background-position: -198px -295px
}

.detail-payment label {
    background: url("@/assets/images/payment2.png") left -2px no-repeat;
    padding-left: 32px
}

.detail-alert {
    padding: .8rem;
    margin-bottom: 1rem;
    text-shadow: 0 1px 0 rgba(255, 255, 255, .5);
    background-color: #fbeedf;
    border: 1px solid #eed3d7;
    border-radius: .2rem;
    color: #c00;
    line-height: 1.5rem;
    margin: 0 2%
}

.layui-colla-title {
    height: 35px;
    font-size: .8rem
}

.layui-colla-content {
    font-size: 1.3rem
}

.doc-detail[data-v-9f90a42e] {
    max-width: 60rem;
    height: max-content;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 1.5rem 0.5rem 2.5rem;
    padding-top: 80px;
    padding-left: 20px;
    padding-right: 20px;
    line-height: 30px;
}

.doc-detail .title[data-v-9f90a42e] {
    font-size: 1.4rem;
    font-weight: bolder;
    margin: 1rem auto 0.5rem;
    text-align: center;
}

.doc-detail .date[data-v-9f90a42e] {
    font-size: .7rem;
    margin-bottom: 0.5rem;
    text-align: center;
}

.inputText {
    background: white;
}
</style>