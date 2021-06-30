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
  import { getRouterList, updateRouterList } from '@/api/api'
  import { filterRouter } from '../../router'

  export default {
    name: 'index',
    data() {
      return {
        id: 1,
        routeList: [],
        dialogVisible: false,
        form: {
          src: '',
          title: ''
        },
        nodeTempDta: {}, //存放临时数据节点
        status: 1 //1:状态是添加 2：状态是修改
      }
    },
    computed: {
      roles: {
        get() {
          return this.$store.state.user.roles
        },
        set() {
        }
      }
    },
    mounted() {
      getRouterList(this.roles[0]).then((res) => {
        this.routeList = JSON.parse(res.data)
      }).catch(() => {
        this.$message.error('获取列表信息失败！')
      })
    },
    methods: {
      add() {
        //这个data为routeList的某一个子节点的对象引用
        let data = this.nodeTempDta
        //添加
        if (this.status === 1) {
          let timeStamp = Date.parse(new Date())
          const newChild = {
            path: String(timeStamp),
            name: String(timeStamp),
            component: '() => import(\'@/views/display/display\')',
            meta: {
              title: this.form.title,
              src: this.form.src,
              roles: ['admin', 'editor']
            }
          }
          if (!data.children) {
            this.$set(data, 'children', [])
          }
          data.children.push(newChild)
          //请求后台接口
          updateRouterList(this.roles[0], JSON.stringify(this.routeList)).then((res) => {
            console.log(res)
            this.$message.success('添加成功')
          }).catch(() => {
            this.$message.error('添加失败')
            //数据还原
            data.children.pop(newChild)
          })
        }
        //修改
        if ( this.status === 2){
          let srcTemp = data.meta.src
          let titleTemp = data.meta.title
          data.meta.src = this.form.src
          data.meta.title = this.form.title
          updateRouterList(this.roles[0], JSON.stringify(this.routeList)).then((res) => {
            console.log(res)
            this.$message.success('修改成功')
          }).catch(() => {
            this.$message.error('修改失败')
            //数据还原为之前值
            data.meta.src = srcTemp
            data.meta.title = titleTemp
          })
        }
        this.dialogVisible = false
      },
      append(data) {
        this.form = {
          src: '',
          title: ''
        }
        console.log('data 160', data)
        this.nodeTempDta = data
        this.status = 1
        this.dialogVisible = true
      },
      update(data) {
        this.status = 2
        this.dialogVisible = true
        this.nodeTempDta = data
        // let data = this.$refs.tree.getCheckedNodes()[0]
        this.form.title = data.meta.title
        this.form.src = data.meta.src
      },
      remove(node, data) {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.path === data.path)
        children.splice(index, 1)
        updateRouterList(this.roles[0], JSON.stringify(this.routeList)).then((res) => {
          console.log(res)
          this.$message.success('删除成功')
        }).catch(() => {
          this.$message.error('删除失败')
          //数据还原为之前值(将删除的值插入)
          children.splice(index,0,data)
        })
      }
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
