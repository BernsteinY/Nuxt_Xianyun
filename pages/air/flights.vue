<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <div>
          <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />

          <!-- 分页 -->
          <el-row type="flex" justify="center" style="margin-top:10px">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageIndex"
              :page-sizes="[5, 10,20, 50]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </el-row>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";

export default {
  data() {
    return {
      // 航班总数据
      flightsData: {},
      //   航班列表数据，用于循环 flightsItem组件, 单独出来是因为要分页
      dataList: [],
      pageIndex: 1, // 显示页数
      pagesize: 5, //显示条数
      total: 10
    };
  },
  components: {
    FlightsListHead,
    FlightsItem
  },
  methods: {
    //   获取航班总数据
    getData() {
      this.$axios({
        url: `airs`,
        params: this.$route.query
      }).then(res => {
        console.log(res);
        this.flightsData = res.data;

        // 初始化datalist数据
        this.setDataList();
      });
    },

    // 设置dataList数据
    setDataList() {
      const start = (this.pageIndex - 1) * this.pagesize;
      const end = start + this.pagesize;
      this.total = this.flightsData.flights.length;
      this.dataList = this.flightsData.flights.slice(start, end);
    },
    handleSizeChange(val) {
      this.pagesize = val;
      // this.pageIndex=1
      this.setDataList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.setDataList();
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>