<template>
  <div class="container">
    <el-date-picker
      v-model="value"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
      popper-class="date-box"
      :default-time="defaultTime"
      :shortcuts="shortcuts"
    >
    </el-date-picker>
  </div>
</template>

<script type="text/ecmascript-6">
import dayjs from 'dayjs'

export default {
  data() {
    return {
      value: '',
      defaultTime: [
        new Date(2000, 1, 1, 0, 0, 0),
        new Date(2000, 2, 1, 23, 59, 59)
      ],
      shortcuts: [

      {
          text: "今天",
          value: (() => {
            const today = new Date();
               const start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
               const end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
            return [start, end]
        })(),
        },
        {
          text: "昨天",
          value: (() => {
            const yesterday = new Date();
               yesterday.setDate(yesterday.getDate() - 1);
               const start = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 0, 0, 0);
               const end = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 23, 59, 59);
            return [start, end]
        })(),
        },
        {
          text: "前天",
          value: (() => {
            const yesterday = new Date();
               yesterday.setDate(yesterday.getDate() - 2);
               const start = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 0, 0, 0);
               const end = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 23, 59, 59);
            return [start, end]
        })(),
        },
        {
        text: '最近一周',
        value: (() => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        })(),
      }]

    }
  },
  watch: {
    value(date) {
      this.$emit('dateChange', date ? date.map(item => dayjs(item).format('YYYY-MM-DD HH:mm:ss')) : '')
    },
  },
  methods: {
    clear() {
      this.value = ''
    },
  },
}
</script>
