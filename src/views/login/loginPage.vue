
<script setup>
import { ref } from 'vue';

const title = ref('登录');
const titleN = ref(0);
const form = ref({});
const visibility = ref(true);

const updateTitle = () =>{
    if(title.value=='登录'){
        titleN.value = 1;
        title.value = '注册';
    }
    else if(title.value == '注册'){
        titleN.value = 0;
        title.value = '登录';
    }
};

const Confirm =() =>{
}

const  preValidate =(id, password, repassword) =>{
    console.log(id, password, repassword);
    if(password != repassword){
        ElNotification({
            type: 'warning',
            message: '前后密码输入不一致',
            title: '输入问题'
        })
        return false;
    }
    let validateStatus = 1;
    //校验Id
    let checkId = /^\S{6,15}$/ ;
    //使用test方法校验
    validateStatus &= checkId.test(id);
    let checkPassword = /^\S{6,15}$/
    validateStatus &= checkPassword.test(password);
    if(validateStatus === 0){
        ElNotification({
            type: 'warning',
            message: '密码强度过低或者id不满足条件',
            title: '校验问题'
        })
        return false;
    }
    return true;
}



</script>

<template>
    <div class="body">
        <div class ="login">
            <div class ="head">{{ title }}</div>
            <div class ="accountBox">
                <a-input :style="{width:'320px'}" v-model="form.userName" 
                placeholder="请输入账号" allow-clear />
            </div>
            <div class ="passwordBox">
                <a-input-password v-model:visibility="visibility" 
                placeholder="请输入密码" :style="{width:'320px'}" 
                v-model="form.password" :defaultVisibility="false" allow-clear/>
            </div>
            <div v-show = "titleN" class = "repasswordBox">
                <a-input-password v-model:visibility="visibility" 
                placeholder="请再次输入密码" :style="{width:'320px'}" 
                v-model="form.password" :defaultVisibility="false" allow-clear/>
            </div>
            <div class ="btn1">
                <a-button type="primary">确定{{ title }}</a-button>
            </div>
            <div class ="btn1" style="top: 150px;">
                <div @click="updateTitle()">
                    <a-button type="primary">切换{{ title }}</a-button>
                </div>
            </div>
        <!-- <div><input value="Login" class="button1" type="submit"></div> -->
        </div>
    </div>  
    
</template>

<style lang="scss" scoped>
    .body{
        width: 100vw;
        height: 100vh;
        background-color: #09263a60;
        display: flex;
        align-items: center;
        justify-content: center;
        .login{
            position: relative;
            width: 30%;
            height: 400px;
            background-color: #09263a60;
            margin: auto;
            margin-top: 10%;
            border-radius: 10px;
            padding: 50px 50px;
            text-align: center;
            align-items: center;
            justify-content: center;
            .head{
                font-size: 38px;
                font-weight: 700;
                line-height: 100px;
                color: #253175;
            }
            .accountBox{
                position: relative;
                top: 40px;
                bottom: 10px;
            }
            .passwordBox{
                position: relative;
                top: 60px;
                bottom: 10px;
            }
            .repasswordBox{
                position: relative;
                top: 80px;
                bottom: 10px;
            }
            .btn1{
                position: relative;
                top: 120px;
                border-radius: 45px;
            }
            // .btn2{
            //     position: relative;
            //     top: 160px;
            // }
            // .btn2 {
            //     position: relative;
            //     padding: 0.5em 0.1em;
            //     font-size: 14px;
            //     // width: 60px;
            //     // text-align: center;
            //     text-transform: uppercase;
            //     letter-spacing: 2px;
            //     font-weight: 500;
            //     color: #000;
            //     background-color: #fff; 
            //     border: none;
            //     border-radius: 45px;
            //     box-shadow: 0px 10px 16px rgba(0, 0, 0, 0.1);
            //     transition: all 0.3s ease 0s;
            //     cursor: pointer;
            //     outline: none;
            //     top: 150px;
                
            // }
        }

    }
    
    
</style>
<!-- 



-->