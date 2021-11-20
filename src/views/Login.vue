<template>
<!--    只能有一个div标签-->
    <el-container>
    <el-header>
        <img class="mlogo" src="https://gitee.com/fejxc/upic-file/raw/master/Users/sunyun/blog_pic /rhuaDp.png">
    </el-header>
    <el-main>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-main>
    </el-container>

</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                ruleForm: {
                    username: 'suny',
                    password: '123456'
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 1, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        //预存this，因为使用了axios this会指向axios的this
                        //_this指向Vue项目的this
                        const _this = this;
                        this.$axios.post('/login',this.ruleForm)
                            .then(res => {
                                const jwt = res.headers['authorization'];
                                //data.data 不然拿不到数据
                                const userInfo = res.data.data;
                                console.log(userInfo);
                                console.log(jwt);
                                //把数据共享出去
                                _this.$store.commit("SET_TOKEN",jwt);
                                _this.$store.commit("SET_USERINFO",userInfo);
                                //获取
                                console.log(_this.$store.getters.getUser);
                                //登陆完成进行跳转
                                _this.$router.push("/blogs");


                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created() {
            console.log(this.$store.getters.getUser);
        }
    }
</script>

<style>
    .el-header, .el-footer {
        background-color: #FFFFFF;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        /*background-color: #E9EEF3;*/
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    .mlogo {
        height: 80%;
        margin-top: 10px;
    }
    .demo-ruleForm {
        max-width: 500px;
        margin: 0 auto;
    }
</style>
