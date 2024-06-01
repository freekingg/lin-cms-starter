<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <RouterView />
</template>

<style >
body {
    font-size: 13px;
    font-size-adjust: none;
    font-stretch: normal;
    font-style: normal;
    font-variant: normal;
    font-weight: normal;
    line-height: 1.4;
	font-size: .7rem;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";
    font-variant: tabular-nums;
	}
html, body{
    height: 100%;
    max-width: 750px;
    margin: 0 auto;
}
body, ul, ol, dl, dd, h1, h2, h3, h4, h5, h6, p, form, fieldset, legend, input, textarea, select, button, th, td {
    margin:0;
    padding:0;
}
h1, h2, h3, h4, h5, h6 {
    font-size:100%;
    font-weight:normal;
}
table {
    font-size:inherit;
}
button {
    overflow:visible;
}
th, em, strong, b, address, cite {
    font-style:normal;

}
li {
    list-style-image:none;
    list-style-position:outside;
    list-style-type:none;
}
img, fieldset {
    border:0 none;
    font-size: 0;
}
ins {
    text-decoration:none;
}
* {
    font-family: andy-money, Noto Sans, Mitr, Athiti, Noto Sans TC, Noto Sans SC, system-ui, -apple-system, Segoe UI, sans-serif;
}
.float-clear::after{
    content: '';
    display: block;
    clear: both;
}
.float-left{
    float: left;
}
.float-right{
    float: right;
}
.bottom-btn{
    line-height: 54px;
    background: #F60011;
    text-align: center;
    font-size: 16px;
    bottom: 0;
    border-radius: 50px;
    width: calc(100% - 20px);
    margin: 10px;
    color: rgba(255, 255, 255, 0.85);
    box-shadow: 0 0 8px #FF000F9e;
}
.flex{
    display: flex;
}

/*絲取�����靏�*/
.sort_data{
    width: 33%;
    text-align: center;
    float: left;
}

.sort_data>.sort_name{
    font-size: 1.5rem;
}
/*紊顔��*/
.header{
    background: #FFF;
    position: fixed;
    width: 100%;
    z-index: 99999;
    padding: 6px 0;
    height: 46px;
    max-width: 750px;
    margin:0px auto;
    box-shadow: 2px 2px 5px rgb(196, 196, 196);
}
.header>.header_right{
    position: absolute;
}
.header>.header_left{
    right: 0px;
    top: 18px;
    position: absolute;
}
.am-header-title{
    margin: 0 20%;
    font-size: 2rem;
    font-weight: normal;
    text-align: center;
    display: block;
    word-wrap: normal;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

/*��膠�*/
.layui-tab{
    background: #FFF;
}
.layui-tab-title li{
    font-size: 1rem;
    padding: 0 7px;
    line-height: 2rem;
}
.cartcoln{
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    line-height: 18px;
    text-align: center;
    color: #fff;
    background: #faa41a;
    font-style: normal;
    position: relative;
    top: 0px;
    float: right;
    right:  25%;
    font-size: 12px;
    font-family: Arial;
}

/*莅丞舟篋�羌頵����綺��紊т�500px�� abc �丞ず100px絎遵墾 */
@media screen and (max-width: 800px){
    .layui-input, .layui-textarea{
        width:97% ;
    }
    .service{
        width: 100%;
    }
}
@media screen and (max-width: 450px){}

.layui-form-item .layui-form-label {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: normal;
}

.navheader {
    background: #FFF;
    position: fixed;
    z-index: 3;
    padding: 6px 0;
    max-width: 350px;
    margin: 0px auto;
    top:60px;
    width: 70%;
    height: 80%;
    overflow-y: auto;
}
.menu {
    border-bottom: 1px solid #ddd;
    padding: 5px;
}

</style>
