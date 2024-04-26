
<script setup>
import { ref } from 'vue';
import {getLogin, register} from '@/api/user'

const title = ref('登录');
const titleN = ref(0);
const form = ref({});
const visibility = ref(true);

const login = async () => {
  
  // 向后端发起一个请求的接口
  // 第一个 'user'  你要去看接口文档的接受的变量的名称， 
  // form 就是我们传入的数据
  let rep = await getLogin({'user': form.value})
  console.log(rep)
  localStorage.setItem('token', rep.data)
}
// 类似这样写一个注册的就好了 
const Register = async () => {
  let rep = await register({'user': form.value})
  console.log(rep)
  localStorage.setItem('token', rep.data)
}

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
    <!-- <div class="body">
        <div class ="login">
            <div class="wrapper">
                <label class="switch">
                    <input type="checkbox" class="toggle">
                    <span class="slider"></span>
                    <span class="card-side"></span>
                    <div class ="head">{{ title }}</div>
                    <div class="flip-card__inner">
                        <div class="flip-card__front">
                            <from class ="frombox">
                                <a-input :style="{width:'250px'}" v-model="form.userName" 
                                placeholder="请输入账号" allow-clear /> -->
                            <!-- </div> -->
                            <!-- <div class ="passwordBox"> -->
                                <!-- <a-input-password v-model:visibility="visibility" 
                                placeholder="请输入密码" :style="{width:'250px'}" 
                                v-model="form.password" :defaultVisibility="false" allow-clear/>
                                <a-button type="primary">确定{{ title }}</a-button>
                            </from>
                        </div>
                        <div class="flip-card__back">
                            <from class ="frombox">
                                <a-input :style="{width:'250px'}" v-model="form.userName" 
                                placeholder="请输入账号" allow-clear />
                                <a-input-password v-model:visibility="visibility" 
                                placeholder="请输入密码" :style="{width:'250px'}" 
                                v-model="form.password" :defaultVisibility="false" allow-clear/>
                                <a-input-password v-model:visibility="visibility" 
                                placeholder="请再次输入密码" :style="{width:'250px'}" 
                                v-model="form.repassword" :defaultVisibility="false" allow-clear/>
                                <a-button type="primary">确定{{ title }}</a-button>
                            </from>
                        </div>
                    </div> -->
                    <!-- <div class ="btn1">
                        <a-button type="primary">确定{{ title }}</a-button>
                    </div> -->
                    <!-- <div class ="btn1" style="top: 150px;">
                        <div @click="updateTitle()">
                            <a-button type="primary">切换{{ title }}</a-button>
                        </div>
                    </div> -->
                <!-- </label>
            </div>
        </div>
    </div> -->
    
    <div class="container"><!-- 底层居中 -->
        <div class="wrapper"><!-- 整个登录注册面板 -->
            <div class="aswitch">
                <label class="switch">
                    <input type="checkbox" class="toggle">
                    <span class="slider"></span>
                    <span class="card-side"></span>
                        <div class="flip-card__inner" >
                            <div class="flip-card__front">
                                <div class="title">注册</div>
                                <form class="flip-card__form" >
                                    <label @click.stop>
                                        <a-input :style="{width:'250px'}" v-model="form.userName" 
                                        placeholder="请输入账号" allow-clear /></label>
                                    <label @click.stop>
                                        <a-input-password 
                                        v-model:visibility="visibility" 
                                        placeholder="请输入密码" :style="{width:'250px'}" 
                                        v-model="form.password" :defaultVisibility="false" allow-clear/>
                                    </label>
                                    <label @click.stop>
                                        <a-input-password v-model:visibility="visibility" 
                                        placeholder="请再次输入密码" :style="{width:'250px'}" 
                                        v-model="form.repassword" :defaultVisibility="false" allow-clear/>
                                    </label>
                                    <a-button @click="Register()" type="primary">确定注册</a-button>
                                </form>
                                </div>
                            <div class="flip-card__back">
                                <div class="title">登录</div>
                                <form class="flip-card__form" action="">
                                <label @click.stop>
                                    <a-input :style="{width:'250px'}" v-model="form.userName" 
                                    placeholder="请输入账号" allow-clear /></label>
                                <label @click.stop>
                                    <a-input-password v-model:visibility="visibility" 
                                    placeholder="请输入密码" :style="{width:'250px'}" 
                                    v-model="form.password" :defaultVisibility="false" allow-clear/>
                                </label>
                                <a-button @click="getLogin()" type="primary">确定登录</a-button>
                                </form>
                            </div>
                        </div>
                </label>
            </div>   
        </div>
    </div>
    
</template>

<style lang="scss" scoped>
    /*.body{
        width: 100vw;
        height: 100vh;
        background-color: #09263a60;
        display: flex;
        align-items: center;
        justify-content: center;
        .login{
            position: relative;
            width: 360px;
            height: 400px;
            background-color: #09263a60;
            margin: auto;
            margin-top: 10%;
            border-radius: 10px;
            padding: 50px 50px;
            text-align: center;
            align-items: center;
            justify-content: center;
            // .switch {
            // transform: translateY(50px);
            // position: relative;
            // display: flex;
            // flex-direction: column;
            // justify-content: center;
            // align-items: center;
            // // gap: 30px;
            // // width: 50px;
            // height: 120px;
            // }
            .wrapper {
                --input-focus: #2d8cf0;
                --font-color: #323232;
                --font-color-sub: #666;
                --bg-color: #fff;
                --bg-color-alt: #666;
                --main-color: #323232;
                // display: flex;
                // flex-direction: column;
                // align-items: center;
            }
            .card-side::before {
                position: relative;
                content: '注册';
                left: -70px;
                top: 0;
                width: 100px;
                text-decoration: underline;
                color: var(--font-color);
                font-weight: 600;
            }
            .card-side::after {
                position: relative;
                content: '登录';
                left: 70px;
                top: 0;
                width: 100px;
                text-decoration: none;
                color: var(--font-color);
                font-weight: 600;
            }
            .toggle {
                position: relative;
                opacity: 0;
                width: 0;
                height: 0;
            }
            .slider {
                box-sizing: border-box;
                border-radius: 5px;
                border: 2px solid var(--main-color);
                box-shadow: 4px 4px var(--main-color);
                position: relative;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: var(--bg-colorcolor);
                transition: 0.3s;
            }
            .slider:before {
                box-sizing: border-box;
                position: relative;
                content: "";
                height: 20px;
                width: 20px;
                border: 2px solid var(--main-color);
                border-radius: 5px;
                left: -2px;
                bottom: 2px;
                background-color: var(--bg-color);
                box-shadow: 0 3px 0 var(--main-color);
                transition: 0.3s;
            }
            .toggle:checked + .slider {
                background-color: var(--input-focus);
            }
            .toggle:checked + .slider:before {
                transform: translateX(30px);
            }
            .toggle:checked ~ .card-side:before {
                text-decoration: none;
            }
            .toggle:checked ~ .card-side:after {
                text-decoration: underline;
            }
            .head{
                font-size: 38px;
                font-weight: 700;
                line-height: 100px;
                color: #253175;
            }
            .flip-card__inner {
                width: 300px;
                height: 350px;
                position: relative;
                background-color: transparent;
                perspective: 1000px;
                //   width: 100%;
                //   height: 100%;
                text-align: center;
                transition: transform 0.8s;
                transform-style: preserve-3d;
            }
            .frombox{
                position: relative;
                top: 40px;
                bottom: 10px;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
            }
            .flip-card__front, .flip-card__back {
                padding: 20px;
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: center;
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
                // background: lightgrey;
                gap: 20px;
                border-radius: 5px;
                border: 2px solid var(--main-color);
                box-shadow: 4px 4px var(--main-color);
            }   
            .flip-card__back {
                width: 100%;
                transform: rotateY(180deg);
            }
            .toggle:checked ~ .flip-card__inner {
                transform: rotateY(180deg);
            }
            .toggle:checked ~ .flip-card__front {
                box-shadow: none;
            }
            
            // .passwordBox{
            //     position: relative;
            //     top: 60px;
            //     bottom: 10px;
            // }
            // .repasswordBox{
            //     position: relative;
            //     top: 80px;
            //     bottom: 10px;
            // }
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
    }*/
    
    .container{
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100vw;
    height: 100vh;
    --s: 82px;
    /* Add your background pattern here */
    background: repeating-radial-gradient(circle, #fff, #fff 5px, #000 6px);
    background-size: 50px 100px;
        .wrapper {
            --input-focus: #2d8cf0;
            --font-color: #323232;
            --font-color-sub: #666;
            --bg-color: #fff;
            --bg-color-alt: #666;
            --main-color: #323232;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        /* switch card */
        .switch {
            transform: translateY(150px);
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 30px;
            width: 50px;
            height: 20px;
            right: 50%;
            bottom: 98%;
        }

        .card-side::before {
            position: absolute;
            content: '注册';
            left: -70px;
            top: 0;
            width: 100px;
            text-decoration: underline;
            color: var(--font-color);
            font-weight: 600;
        }

        .card-side::after {
            position: absolute;
            content: '登录';
            left: 70px;
            top: 0;
            width: 100px;
            text-decoration: none;
            color: var(--font-color);
            font-weight: 600;
        }

        .toggle {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .slider {
            box-sizing: border-box;
            border-radius: 5px;
            border: 2px solid var(--main-color);
            box-shadow: 4px 4px var(--main-color);
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: var(--bg-colorcolor);
            transition: 0.3s;
        }
      
        .slider:before {
            box-sizing: border-box;
            position: absolute;
            content: "";
            height: 20px;
            width: 20px;
            border: 2px solid var(--main-color);
            border-radius: 5px;
            left: -2px;
            bottom: 2px;
            background-color: var(--bg-color);
            box-shadow: 0 3px 0 var(--main-color);
            transition: 0.3s;
        }

        .toggle:checked + .slider {
            background-color: var(--input-focus);
        }
      
        .toggle:checked + .slider:before {
            transform: translateX(30px);
        }
      
        .toggle:checked ~ .card-side:before {
            text-decoration: none;
        }
      
        .toggle:checked ~ .card-side:after {
            text-decoration: underline;
        }

    /* card */ 

        .flip-card__inner {
            position: relative;
            background-color: transparent;
            perspective: 1000px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            transition: transform 0.8s;
            transform-style: preserve-3d;
        }
        
        .toggle:checked ~ .flip-card__inner {
            transform: rotateY(180deg);
        }
      
        .toggle:checked ~ .flip-card__front {
            box-shadow: none;
        }
      
        .flip-card__front, .flip-card__back {
            padding: 20px;
            width: 300px;
            height: 300px;
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            background: lightgrey;
            gap: 20px;
            border-radius: 5px;
            border: 2px solid var(--main-color);
            box-shadow: 4px 4px var(--main-color);
        
        }   

        .flip-card__back {
            width: 300px;
            height: 300px;
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            transform: rotateY(180deg);
        }

        .flip-card__form {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
        }
      
        .title {
            margin: 20px 0 20px 0;
            font-size: 25px;
            font-weight: 900;
            text-align: center;
            color: var(--main-color);
        }
    }    
    
</style>
