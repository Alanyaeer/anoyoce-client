<script setup>
import { ref } from 'vue';
import {getLogin, register} from '@/api/user'

const title = ref('登录');
const titleN = ref(0);
const form = ref({});
const visibility = ref(true);


const stopPropagation = (event) => {
    event.stopPropagation();
};

</script>
<template>
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
                                    <a-button type="primary">确定注册</a-button>
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
                                <a-button type="primary">确定登录</a-button>
                                </form>
                            </div>
                        </div>
                </label>
            </div>   
        </div>
    </div>
</template>


<style lang="scss" scoped>
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