<template>
  <div>
    <br>
    <div style="margin-left: 35px">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="formInline.user" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="width: 97%">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>用户信息</span>
          <el-button style="float: right; padding: 3px 0" type="text">上级代理</el-button>
          &nbsp;   &nbsp;   &nbsp;   &nbsp;
          &nbsp;   &nbsp;   &nbsp;   &nbsp;
          &nbsp;   &nbsp;   &nbsp;   &nbsp;
          <el-button style="float: right; padding: 3px 0" type="text">下级代理</el-button>
        </div>
        <div class="text item">
          <div>
          </div>
          <div><span>用户账号:</span>&nbsp;&nbsp;&nbsp;<span>张三</span></div>
          <br>
          <div><span>游戏主键:</span>&nbsp;&nbsp;&nbsp;<span>001</span></div>
          <br>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>房卡:</span>&nbsp;&nbsp;&nbsp;<span>001</span></div>
          <br>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>金币:</span>&nbsp;&nbsp;&nbsp;<span>001</span></div>
        </div>
      </el-card>
    </div>

    <div style="width: 97%">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>下级代理</span>
        </div>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-card>
    </div>

    <div style="width: 97%">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>上级代理</span>
        </div>
        <div class="custom-tree-container">
          <!--<div class="block">-->
            <!--<p>使用 render-content</p>-->
            <!--<el-tree-->
              <!--:data="data4"-->
              <!--show-checkbox-->
              <!--node-key="id"-->
              <!--default-expand-all-->
              <!--:expand-on-click-node="false"-->
              <!--:render-content="renderContent">-->
            <!--</el-tree>-->
          <!--</div>-->
          <div class="block">
            <p>使用 scoped slot</p>
            <el-tree
              :data="data5"
              :show-checkbox="false"
              node-key="id"
              :default-expand-all="true"
              :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            Append
          </el-button>
           <el-button
             type="text"
             size="mini"
             @click="() => append(data)">
            Append
          </el-button>
           <el-button
             type="text"
             size="mini"
             @click="() => append(data)">
            Append
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>
            </el-tree>
          </div>
        </div>
      </el-card>
    </div>


  </div>
</template>


<script>
  let id = 1000;

  export default {
    data() {
      const data = [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }];
      return {
        formInline: {
          user: '',
          region: 'tj'
        },
        userAccount: '123',
        userNick: '小东东',
        data4: JSON.parse(JSON.stringify(data)),
        data5: JSON.parse(JSON.stringify(data))
      }
    },

    methods: {
      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },

      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
          <span>{node.label}</span>
        <span>
        <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
        <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
        </span>
        </span>);
      }
    }
  };
</script>
<!--formInline: {-->
<!--user: '',-->
<!--region: 'tj'-->
<!--},-->
<!--userAccount: '123',-->
<!--userNick: '小东东',-->

<!--<script>-->
  <!--export default {-->
    <!--data() {-->
      <!--return {-->
        <!--formInline: {-->
          <!--user: '',-->
          <!--region: 'tj'-->
        <!--},-->
        <!--userAccount: '123',-->
        <!--userNick: '小东东',-->
        <!--// logo: require('../assets/404_images/404_cloud.png'),-->
        <!--data: [{-->
          <!--label: '一级 1',-->
          <!--children: [{-->
            <!--label: '二级 1-1',-->
            <!--children: [{-->
              <!--label: '三级 1-1-1'-->
            <!--}]-->
          <!--}]-->
        <!--}, {-->
          <!--label: '一级 2',-->
          <!--children: [{-->
            <!--label: '二级 2-1',-->
            <!--children: [{-->
              <!--label: '三级 2-1-1'-->
            <!--}]-->
          <!--}, {-->
            <!--label: '二级 2-2',-->
            <!--children: [{-->
              <!--label: '三级 2-2-1'-->
            <!--}]-->
          <!--}]-->
        <!--}, {-->
          <!--label: '一级 3',-->
          <!--children: [{-->
            <!--label: '二级 3-1',-->
            <!--children: [{-->
              <!--label: '三级 3-1-1'-->
            <!--}]-->
          <!--}, {-->
            <!--label: '二级 3-2',-->
            <!--children: [{-->
              <!--label: '三级 3-2-1'-->
            <!--}]-->
          <!--}]-->
        <!--}],-->
        <!--defaultProps: {-->
          <!--children: 'children',-->
          <!--label: 'label'-->
        <!--}-->
      <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--handleNodeClick(data) {-->
        <!--console.log(data)-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 95%;
  }

  .common {
    font-size: 14px;
  }

  .cspan {
    margin-top: 10px;
    margin-bottom: 10px;
  }

</style>
