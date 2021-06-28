<template>
  <div class="custom-tree-container">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <span style="font-size: 10px">路由信息</span><br/>
      <span>tips:一级路由的path前需要添加'/'</span>
      <span slot="footer" class="dialog-footer">
        <el-form ref="form" :model="form" label-width="80px">
<!--          <el-form-item label="path: ">-->
<!--            <el-input v-model="form.path"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="name: ">-->
<!--            <el-input v-model="form.name"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="路由: ">
            <el-input v-model="form.src"></el-input>
          </el-form-item>
          <el-form-item label="标题: ">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
        </el-form>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="add()">确 定</el-button>
          </span>
    </el-dialog>
    <el-tree
      :data="routeList"
      show-checkbox
      node-key="path"
      ref="tree"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{data.meta.title }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            添加
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => update(data)">
            修改
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      const routeList = [
        {
          path: '/display',
          redirect: '/display/firstHall',
          name: 'exhibition',
          meta: {
            title: '大屏展示',
            icon: 'lock'
          },
          children: [
            {
              path: 'firstHall',
              name: 'firstHall',
              meta: {
                title: '一号大厅展示',
                src: 'http://192.168.7.156:50401/analysis/dashboard/show/2ab19145517a18d28721/'
              }
            },
            {
              path: 'secondHall',
              name: 'secondHall',
              meta: {
                title: '二号大厅展示',
                src: 'http://localhost:50401/analysis/dashboard/show/05cd39547179a1a1b489/',
                roles: ['admin', 'editor']
              }
            },
            {
              path: 'thirdHall',
              name: 'thirdHall',
              meta: {
                title: '三号大厅展示',
                src: 'http://localhost:50401/analysis/dashboard/show/09d756e23179a12580fb/',
                roles: ['admin', 'editor']
              }
            }
            , {
              path: 'fourthHall',
              name: 'fourthHall',
              meta: {
                title: '四号大厅展示',
                src: 'http://localhost:50401/analysis/dashboard/show/03590db461799c1f107b/',
                roles: ['admin', 'editor']
              }
            }
          ]
        }
      ]
      return {
        id: 1,
        routeList: routeList,
        dialogVisible: false,
        form: {
          src: '',
          title: ''
        },
        routePaths: [],//route中的path数组
        routeNames: [],//route中的name数组
        nodeTempDta:{} //存放临时数据节点
      }
    },
    mounted() {
      // this.routePaths = this.getRoutePaths()
      // this.routeNames = this.getRouteNames()
    },
    methods: {
      add() {
        // let data = this.$refs.tree.getCheckedNodes()[0]
        // if (this.routePaths.includes(this.form.path)) {
        //   this.$message.error('你输入的path已经存在了')
        //   return
        // }
        // if (this.routeNames.includes(this.form.name)){
        //   this.$message.error('你输入的name已经存在了')
        //   return
        // }
        let data = this.nodeTempDta
        let timeStamp = Date.parse(new Date())
        const newChild = {
          path: timeStamp, name: timeStamp, meta: {
            title: this.form.title,
            src: this.form.src
          }
        }
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
        this.dialogVisible = false
      },
      append(data) {
        this.form = {
          src: '',
          title: ''
        }
        console.log('data 160',data)
        this.nodeTempDta = data
        this.dialogVisible = true
      },
      update(data) {
        this.dialogVisible = true
        this.nodeTempDta = data
        // let data = this.$refs.tree.getCheckedNodes()[0]
        this.form.path = data.path
        this.form.name = data.name
        this.form.title = data.meta.title
        this.form.src = data.meta.src

      },
      remove(node, data) {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.path === data.path)
        children.splice(index, 1)
      },
      //求路由list里的path数组
      // getRoutePaths() {
      //   let paths = []
      //   this.getPaths(this.routeList,paths)
      //   return paths
      // },
      //递归
      // getPaths(lst, paths) {
      //   lst.forEach((arg) => {
      //     paths.push(arg.path)
      //     if (arg.children) {
      //       this.getPaths(arg.children, paths)
      //     }
      //     else
      //       return
      //   })
      // },
      //求路由list里的name数组
      // getRouteNames() {
      //   let names = []
      //   this.getNames(this.routeList,names)
      //   return names
      // },
      //递归
      // getNames(lst, names) {
      //   lst.forEach((arg) => {
      //     names.push(arg.name)
      //     if (arg.children) {
      //       this.getPaths(arg.children, names)
      //     }
      //     else
      //       return
      //   })
      // },
    }
  }
</script>

<style scoped>
  .custom-tree-container {
    height: 100%;
    width: 50%;
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  ::v-deep .el-tree-node__content {
    height: 40px;
  }
</style>
