<template>
    <!-- 商品图-列表 -->
    <div class="detail-content">
        <div class="flex content-switch-btn">
            <div class="content-switch-one" >
                <span class="content-active">商品描述</span>
            </div>
        </div>
        <div class="detail-content-main float-clear">
            <p v-for="item in list" :key="item">
                <img :src="item.path"/>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

import sp_1 from '@/assets/images/sp_1.png';
import sp_2 from '@/assets/images/sp_02.jpeg';
import sp_3 from '@/assets/images/sp_03.gif';
import sp_4 from '@/assets/images/sp_04.jpeg';
import sp_5 from '@/assets/images/sp_05.gif';
import sp_6 from '@/assets/images/sp_06.jpeg';
import sp_7 from '@/assets/images/sp_07.jpeg';
import sp_8 from '@/assets/images/sp_08.gif';
import sp_9 from '@/assets/images/sp_09.jpeg';
import sp_10 from '@/assets/images/sp_10.jpeg';
import sp_11 from '@/assets/images/sp_11.jpeg';
import sp_12 from '@/assets/images/sp_12.jpeg';
import sp_13 from '@/assets/images/sp_13.gif';
import sp_14 from '@/assets/images/sp_14.jpeg';
import sp_15 from '@/assets/images/sp_15.jpeg';
import sp_16 from '@/assets/images/sp_16.jpeg';
import sp_17 from '@/assets/images/sp_17.jpeg';
import sp_18 from '@/assets/images/sp_18.jpeg';
import sp_19 from '@/assets/images/sp_19.jpeg';
import sp_20 from '@/assets/images/sp_20.png';
import sp_21 from '@/assets/images/sp_21.jpeg';
import sp_22 from '@/assets/images/sp_22.jpeg';
import sp_23 from '@/assets/images/sp_23.jpeg';
const list = ref(
    [
        {
            path: sp_1
        },
        {
            path: sp_2
        },
        {
            path: sp_3
        },
        {
            path: sp_4
        },
        {
            path: sp_5
        },
        {
            path: sp_6
        },
        {
            path: sp_7
        },
        {
            path: sp_8
        },
        {
            path: sp_9
        },
        {
            path: sp_10
        },
        {
            path: sp_11
        },
        {
            path: sp_12
        },
        {
            path: sp_13
        },
        {
            path: sp_14
        },
        {
            path: sp_15
        },
        {
            path: sp_16
        },
        {
            path: sp_17
        },
        {
            path: sp_18
        },
        {
            path: sp_19
        },
        {
            path: sp_20
        },
        {
            path: sp_21
        },
        {
            path: sp_22
        },
        {
            path: sp_23
        },
    ]
)

</script>

<style scoped lang="scss">
.content-switch-btn{
    width:100%;
    text-align: center;
    padding: 40px 0 10px 0;height: 25px;

    .content-switch-one{
        text-align: center;
        margin: 0 auto;
    }
}
</style>