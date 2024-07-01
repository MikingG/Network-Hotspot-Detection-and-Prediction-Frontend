<template>
  <div class="app-container">
    <el-tree
      :props="props"
      :load="loadNode"
      lazy
      show-checkbox
    />

  </div>

</template>

<script>
import { getCategories, getCategoriesByParentId } from '@/api/category.js'

export default {
  data() {
    return {
      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      }
    }
  },
  created: function() {

  },
  methods: {
    // 渲染节点及子节点时会自动调用此方法
    loadNode(node, resolve) {
      if (node.level === 0) {
        // 加载所有顶级分类
        getCategories().then(res => {
          resolve(res.data.items)
        })
      }
      if (node.level > 0) {
        // 根据节点的id加载其子节点
        getCategoriesByParentId(node.data.id).then(res => {
          resolve(res.data.items)
        })
      }
    }
  }
}
</script>
