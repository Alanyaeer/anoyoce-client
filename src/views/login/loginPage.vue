<script setup>
    // const login = new VueUseComponentsResolver({
    //     el: '#login',
    //     data:{
    //         title: 'login'
    //     }
    // })
</script>

<template>
    <div class="login">
        <div class="head">注册</div>
        <div class = "account"><input type="text" placeholder="请输入账号"></div>
        <div><input type="password" placeholder="请输入密码"></div>
        <div class="button1"><a-button type="primary">Primary</a-button></div>
    </div>
</template>

<style lang="scss" scoped>
    .login{
      width: 30%;
      height: 400px;
      background-color: #09263a60;
      margin: auto;
      margin-top: 10%;
      text-align: center;
      border-radius: 10px;
      padding: 50px 50px;
    }
    .head{
        font-size: 38px;
        font-weight: 700;
        text-align: center;
        line-height: 200px;
        color: #253175;
    }
    .account{
        position: relative;
        bottom: 10px;
    }
    .button1{
        position: relative;
        top: 30px;
    }
</style>