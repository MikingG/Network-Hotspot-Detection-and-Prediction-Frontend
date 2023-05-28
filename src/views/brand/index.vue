<template>
  <div class="app-container">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="ID" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="名称" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>首字母: {{ scope.row.letter }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 点击按钮时，将id传入方法 -->
          <el-button size="mini" @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="changePage"
      v-if="isShow"
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getBrands, editBrand } from "@/api/brand.js";

export default {
  data() {
    return {
      total: 1,
      pageSize:1,
      // 默认不显示分页
      isShow: false,
      tableData: [],
    };
  },
  created: function () {
    getBrands().then((response) => {
      this.tableData = response.data.items.records;
      // 总记录数
      this.total = response.data.items.total;
      // 每页显示的条数
      this.pageSize = response.data.items.size;
      // 网络请求成功后，显示分页
      this.isShow = true;
    });
  },
  methods: {
    handleEdit(id) {
      console.log(id);
      //跳转到添加页面，同时传递品牌id，方便在添加页面查询品牌信息，并显示
      this.$router.push("/brand/edit/" + id);
    },
    handleDelete(id) {
      // console.log(id);
      // 删除
    },
    changePage(pageNum) {
      getBrands(pageNum).then((response) => {
        this.tableData = response.data.items.records;
    });
    },
  },
};
</script>
