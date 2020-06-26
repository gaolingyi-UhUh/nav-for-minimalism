<template>
  <div class="page-home">
    <div class="nav">
      <div class="search">
        <el-input v-model="searchVal" placeholder="百度一下" @keyup.enter.native="search"></el-input>
        <el-button type="primary" round @click="search">搜索</el-button>
      </div>
      <div class="menu">
        <div class="item show" v-for="(item,i) in menuList" @click="jump(item)">
          <div class="close el-icon-circle-close" @click.stop="del(item,i)"></div>
          <div class="ico">
            <img :src="`${getIco(item.url)}/favicon.ico`" alt />
          </div>
          <p>{{item.name}}</p>
        </div>
        <div class="item add" @click=" dialogVisible = true">+</div>
        <div class="item" v-for="i in 3" />
      </div>
    </div>
    <el-dialog title="添加" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form ref="form" :model="form" label-width="80px" label-position="left" :rules="rules">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="网址" prop="url">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-button type="primary" @click="add">保存</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      dialogVisible: false,
      searchVal: "",
      menuList: [],
      form: {
        name: "",
        url: ""
      },
      rules: {
        url: [
          {
            required: true,
            message: "请输入网址",
            trigger: "blur"
          },
          {
            message: "您缺少了'http'或'https'",
            type: "url"
          }
        ]
      }
    };
  },

  methods: {
    getIco(url) {
      return url.replace(/\/\/(.*?)(:\d+)?\/.*$/, "$1");
    },
    search() {
      this.searchVal === "" ||
        (window.location.href = `https://www.baidu.com/s?ie=UTF-8&wd=${this.searchVal}`);
    },
    add() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let { name, url } = this.form;
          name === "" && (name = url);
          this.menuList.push({ name, url });
          this.dialogVisible = false;
          localStorage.setItem("l", JSON.stringify(this.menuList));
          this.form = {
            name: "",
            url: ""
          };
        }
      });
    },
    jump(item) {
      window.location.href = item.url;
    },
    del(item, index) {
      let { name, url } = item;
      this.$confirm(`确定删除${name || url}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        console.log(index);
        this.menuList.splice(index, 1);
        localStorage.setItem("l", JSON.stringify(this.menuList));
      });
    }
  },
  created() {
    let list = JSON.parse(localStorage.getItem("l"));
    this.menuList = !!list
      ? list
      : [
          { name: "哔哩哔哩", url: "https://www.bilibili.com/" },
          { name: "百度", url: "https://www.baidu.com/" },
          { name: "写代码啦", url: "https://xiedaimala.com/" }
        ];
    this.$set(this.menuList, "menuList");
  }
};
</script>

<style scoped>
.page-home >>> .el-dialog {
  width: 30%;
}
.nav {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.search {
  max-width: 600px;
  margin: auto;
  display: flex;
}
.search .el-input {
  width: 100%;
}
.search >>> .el-input__inner {
  border-radius: 50px;
}
.search .el-button {
  margin-left: 20px;
}
.menu {
  max-width: 800px;
  margin: 80px -10px 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.menu .item {
  width: 125px;
  border-radius: 5px;
  margin-bottom: 40px;
  /* background: crimson; */
  margin: 10px;
}
.menu .item.show {
  position: relative;
  /* border: 1px solid; */
  transition: all 0.3s;
  top: 0;
  /* box-shadow: 0 0 10px #b5b4b4; */
}

.menu .item.show:hover,
.menu .item.add:hover {
  top: -3px;
  background: #ebebeb;
  /* box-shadow: 0 0 3px #b5b4b4; */
}

.menu .item.add {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  top: 0;
  transition: all 0.3s;
  height: 168px;
}
.menu .item.add:hover {
  font-size: 40px;
  /* top: -3px; */
}
.menu p {
  padding: 5px 10px;
  margin: 10px;
  border-radius: 50px;
  background: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.menu .ico {
  margin: 25px;
  padding: 25px;
  border-radius: 50%;
  background: #fff;
}
.menu .close {
  position: absolute;
  right: 5px;
  top: 5px;
  font-size: 20px;
  color: #9a9a9a;
  /* transition: all 0.8s; */
  visibility: hidden;
}
.menu .item.show:hover .close {
  visibility: visible;
}
@media only screen and (max-width: 1000px) {
  .search,
  .menu {
    max-width: 300px;
  }
  .nav {
    position: static;
    transform: translate(0, 0);
  }
  .menu {
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
  }
  .menu .item.add {
    font-size: 40px;
  }
  .page-home >>> .el-dialog {
    width: 90%;
  }
}
</style>
