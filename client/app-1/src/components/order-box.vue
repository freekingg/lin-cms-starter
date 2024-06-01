<template>
  <!-- 商品图-列表 -->
  <div id="order-box">
    <img src="@/assets/images/dj.webp" style="width: 100%" alt="" />
    <div id="copywriting" class="title">確認訂單</div>

    <div class="float-clear rows-box-2">
      <div class="float-left spec-img">
        <img style="width: 100%; height: 100%" src="@/assets/images/sp_1.png" />
      </div>
      <div class="float-left sp_left">
        <div class="order-price">
          NT$&nbsp;<strong
            ><span id="dynamic_condition_price">998</span></strong
          >
        </div>
        <div id="goods-name" class="goods-name">
          迷你榨汁杯 榨汁細膩無渣 比飲品店還好喝！ 無線榨汁 小巧便攜
          隨時隨地喝新鮮果汁！
        </div>
      </div>
      <div class="package-box group" style="padding: 0 10px">
        <div class="set-meal">
          <ul class="combo-box float-clear" id="combo-box">
            <li
              data-index="1"
              id="11357"
              @click="chooesProduce(item, index)"
              :class="{ 'combo-active': activeIndex === index }"
              v-for="(item, index) in produces"
              :key="index"
            >
              <div>{{ item.name }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="spec-box">
      <div class="spec-box-all">
        <div class="sku_1 sku">
          <div class="rows-head-2">顏色<span style="color: red">*</span></div>
          <div class="rows-headcombo-box float-clear-content">
            <ul class="combo-box float-clear">
              <li
                data-speci="1"
                class="sku_1_1"
                @click="chooesSku(item, index)"
                :class="{ 'combo-active': activeSkuIndex === index }"
                v-for="(item, index) in skus"
                :key="index"
              >
                <div class="combo-img">
                  <img :src="item.img" />
                </div>
                <div class="property">{{ item.name }}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="u-address-bg"></div>
      <div>
        <div class="details-rows">
          <label class="rows-head"
            >訂單價格
            <span class="product-price">NT$&nbsp;<em>1398.00</em></span>
          </label>
        </div>
        <div class="buy-single-row">
          <label>
            <div class="input-label">
              <div class="cell">姓名<span class="details-request">*</span></div>
            </div>
            <div class="fixed">
              <input
                type="text"
                id="receiptName"
                name="receiver"
                placeholder="請填寫您的姓名"
                class="inputText"
                value=""
                style="outline: none; line-height: 30px"
              />
            </div>
          </label>
        </div>
        <div class="buy-single-row">
          <label>
            <div class="input-label">
              <div class="cell">手機<span class="details-request">*</span></div>
            </div>
            <div class="fixed">
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="請填寫您的行動電話 09xxxxxxxx"
                class="inputText"
                value=""
                style="outline: none; line-height: 30px"
              />
            </div>
          </label>
        </div>
        <div class="details-rows">
          <label class="rows-head"
            >支付方式<span class="details-request">*</span></label
          >
          <div class="rowsparams" style="display: -webkit-box">
            <div class="detail-payment">
              <label
                class="detail-params payOnDelivery"
                @click="chooesPayment(item, index)"
                :class="[
                  activePaymentIndex === index ? 'active' : '',
                  item.class,
                ]"
                v-for="(item, index) in payments"
                :key="index"
                >貨到付款</label
              >
            </div>
            <input type="hidden" name="delivery" id="delivery" value="1" />
          </div>
        </div>
        <div class="detail-alert" style="display: block">
          <div>
            您的地址需明確到市區路號（樓、室），本商場可接受7-11，全家的代收。
          </div>
        </div>
        
        <div class="region_all" id="region_all">
          <div class="buy-single-row">
            <label class="city_all">
              <div class="input-label">
                <div class="cell">
                  縣市<span class="details-request">*</span>
                </div>
              </div>
              <div class="fixed">
                <select id="one" name="county" @change="getArea('shi')">
                  <option value="-1">請選擇縣市</option>
                  <option
                    value="700000"
                    v-for="(item, index) in shengData"
                    :key="index"
                    :value="item.id"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </label>
          </div>
          <div class="buy-single-row">
            <label>
              <div class="input-label">
                <div class="cell">
                  地區<span class="details-request">*</span>
                </div>
              </div>
              <div class="fixed">
                <select id="two" name="district">
                  <option value="-1">請選擇地區</option>
                  <option value="700172">彰化市</option>
                </select>
              </div>
            </label>
          </div>
          <div id="buy-single-row" class="buy-single-row">
            <label>
              <div class="input-label">
                <div class="cell">
                  店鋪<span class="details-request">*</span>
                </div>
              </div>
              <div class="fixed">
                <select id="there" name="shop">
                  <option value="-1">請選擇店鋪</option>
                </select>
              </div>
            </label>
          </div>
        </div>
        <div class="buy-single-row send-type1" id="address-detail-all">
          <label>
            <div class="input-label">
              <div class="cell">
                詳細地址<span class="details-request">*</span>
              </div>
            </div>
            <div class="fixed">
              <input
                type="text"
                id="address-detail"
                style="outline: none; line-height: 30px"
                placeholder="填寫您的詳細地址，確保宅配人員可以通過此地址聯繫到您"
                class="inputText"
                value=""
              />
            </div>
          </label>
        </div>
        <div class="buy-single-row">
          <label>
            <div class="input-label">
              <div class="cell">留言<span class="details-request"></span></div>
            </div>
            <div class="fixed">
              <textarea
                type="text"
                id="remark"
                name="remark"
                placeholder="留言您的特殊需求或者其它想要告訴我們的事情"
                class="inputText"
                style="height: 25px; line-height: 25px"
              ></textarea>
            </div>
          </label>
        </div>
      </div>
      <div class="submit-float-btn float-clear">
        <div class="float-left mian-btn" id="submit">確認下單</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import img1 from "../assets/images/pink.png";
import img2 from "../assets/images/green.png";
let activeIndex = ref(0);
let produces = ref([
  {
    name: "多數人選擇【買一送一】2入組 - NT$ 1398",
    value: 1398,
  },
  {
    name: "【新品嘗鮮】1入組 - NT$ 998",
    value: 998,
  },
]);

const chooesProduce = (item, index) => {
  activeIndex.value = index;
};

let activeSkuIndex = ref(0);
let skus = ref([
  {
    name: "粉色",
    value: "fense",
    img: img1,
  },
  {
    name: "綠色",
    value: "luse",
    img: img2,
  },
]);

const chooesSku = (item, index) => {
  activeSkuIndex.value = index;
};

let activePaymentIndex = ref(0);
let activePayment = ref("1");
let payments = ref([
  {
    name: "貨到付款",
    value: "1",
    class: "detail-payment-payOnDelivery",
  },
  {
    name: "7-11超商",
    value: "2",
    class: "detail-payment-711",
  },
  {
    name: "全家超商",
    value: "3",
    class: "detail-payment-quanjia",
  },
]);

let shengData = ref([]);
let chengshi = ref([]);
const chooesPayment = (item, index) => {
  activePaymentIndex.value = index;
};
const getArea = (type) => {
  if (activePayment.value === "1") {
    if (type === "sheng") {
      axios({
        url: "../data/711-sheng.json",
      }).then((result) => {
        console.log("result: ", result);
        shengData.value = result.data;
      });
    }
    if (type === "shi") {
      axios({
        url: "../data/711-chengshi.json",
      }).then((result) => {
        console.log("result: ", result);
        chengshi.value = result.data;
      });
    }
  }
};

onMounted(()=>{
  getArea('sheng')
})
</script>

<style scoped lang="scss">
.title {
  padding: 18px;
  font-size: 20px;
  text-align: center;
}

.rows-box-2 {
  position: relative;
  padding: 10px 10px 20px 10px;
  background: #f7f7f7;
  border-radius: 10px;
}

.sp_left {
  width: calc(100% - 120px);
  padding-top: 0px;
  text-align: left;
  padding-left: 10px;

  .order-price {
    font-size: 1.125rem;
    color: #e02e24;
    line-height: 1.5rem;
  }

  .goods-name {
    font-size: 16px;
    line-height: 1rem;
    color: #666;
  }
}

.spec-box-all {
  padding: 0 10px;
  background: #f7f7f7;
}

.property {
  text-align: center;
  font-size: 14px;
}

.sku_1_1,
.sku_1_2 {
  width: calc(33% - 10px);
  margin-left: 5px;
}

.product-price {
  font-size: 23px;
  font-weight: bold;
  margin-left: 13px;
  color: #e02e24;
}
</style>
