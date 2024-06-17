<template>
  <div>
    <div ref="networkContainer" style="height: 600px;" />
  </div>
</template>

<script>
import vis from 'vis'

export default {
  mounted() {
    // 创建一个数据集，用于存储节点和边的数据
    const data = {
      nodes: new vis.DataSet([
        { id: 1, label: 'Node 1' },
        { id: 2, label: 'Node 2' },
        { id: 3, label: 'Node 3' },
        { id: 4, label: 'Node 4' },
        { id: 5, label: 'Node 5' }
      ]),
      edges: new vis.DataSet([
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 }
      ])
    }

    // 创建一个配置对象，用于设置图的外观和行为
    const options = {}

    // 创建一个网络实例，并将数据和配置应用于它
    const network = new vis.Network(
      this.$refs.networkContainer,
      data,
      options
    )
  }
}
</script>
