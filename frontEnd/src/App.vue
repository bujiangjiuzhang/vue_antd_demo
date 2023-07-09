<template>
  <div id="app">
    <a-input
      :value="inputValue"
      @change="changeVal_"
      placeholder="请输入任务"
      class="my_ipt"
    />
    <a-button type="primary" @click="addItem_">添加事项</a-button>

    <a-list bordered :dataSource="filterList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox
          :checked="item.done ? true : false"
          @change="changeCheck_(item.id, !item.done)"
          >{{ item.info }}</a-checkbox
        >
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItem_(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div class="footer" slot="footer">
        <span>{{ unfinished }}条剩余</span>
        <a-button-group>
          <a-button
            @click="changeCurKey('all')"
            :type="curKey === 'all' ? 'primary' : 'default'"
            >全部</a-button
          >
          <a-button
            @click="changeCurKey('undo')"
            :type="curKey === 'undo' ? 'primary' : 'default'"
            >未完成</a-button
          >
          <a-button
            @click="changeCurKey('isdo')"
            :type="curKey === 'isdo' ? 'primary' : 'default'"
            >已完成</a-button
          >
        </a-button-group>
        <!-- <a>清除已完成</a> -->
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
export default {
  name: "app",
  data() {
    return {
      // list: [],
    };
  },
  computed: {
    ...mapState(["list", "inputValue", "curKey"]),
    ...mapGetters(["unfinished", "filterList"]),
  },
  methods: {
    ...mapActions(["addItem", "removeItem", "getlistSyc", "changeCheck"]),
    ...mapMutations(["changeVal", "changeCurKey"]),
    changeVal_(e) {
      this.changeVal(e.target.value.trim());
    },
    async addItem_() {
      if (this.inputValue.trim()) {
        const res = await this.addItem();
        const {
          data: { code, message },
        } = res;
        if (code === 200) {
          this.changeVal("");
          this.$message.success(message);
          // 重新获取列表数据
          this.getlistSyc();
        } else {
          this.$message.warn(message);
        }
      } else {
        this.$message.warn("请输入内容");
      }
    },
    async removeItem_(id) {
      const res = await this.removeItem(id);
      console.log("res", res);
      const {
        data: { code, message },
      } = res;
      if (code === 200) {
        this.$message.success(message);
        // 重新获取列表数据
        this.getlistSyc();
      } else {
        this.$message.warn(message);
      }
    },
    async changeCheck_(id, flag) {
      const done = flag ? 1 : 0;
      const res = await this.changeCheck({ id, done });
      const {
        data: { code, message },
      } = res;
      if (code === 200) {
        this.$message.success(message);
        // 重新获取列表数据
        this.getlistSyc();
      } else {
        this.$message.warn(message);
      }
    },
  },
  created() {
    this.getlistSyc();
  },
};
</script>
<style scoped>
#app {
  padding: 10px;
}
.my_ipt {
  width: 500px;
  margin-right: 10px;
}
.dt_list {
  width: 500px;
  margin-top: 10px;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
