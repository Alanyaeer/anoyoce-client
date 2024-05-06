<script setup>
import { ref } from 'vue';
import {getLogin, register} from '@/api/user'

const title = ref('登录');
const titleN = ref(0);
const form = ref({});
const visibility = ref(true);
const info = ref({
    name: "张三",
    id: "114514",
    rename: "法外狂徒",
    groupName:"法外狂徒",
    signature: "I hope I will make you proud enough",
    place: "提瓦特大陆",
})
const infoDetails = ref([
  { label: '备注', content: info.value.rename },
  { label: '群昵称', content: info.value.groupName },
  { label: '签名', content: info.value.signature },
  { label: '所在地', content: info.value.place }
]);

const stopPropagation = (event) => {
    event.stopPropagation();
};

</script>
<template>
    <div class="container"><!-- 底层居中 -->
        <div class="card"><!-- 整个登录注册面板 -->
                <div class="user-info">
                    <div class="row">
                        <div class="avatar"><img src="#" alt="用户头像"></div>
                        <div class="name">
                            {{info.name}}
                            <div class="id">ID: {{info.id}}</div>
                        </div>  
                    </div>
                    <!-- <div class="infoCss">
                        <div>备注:{{info.rename}}</div>
                        <div>群昵称:{{ info.groupName }} </div>
                        <div>签名:{{ info.signature }} </div>
                        <div>所在地: {{info.place}}</div>
                    </div> -->
                    <div class="details">
                        <div v-for="detail in infoDetails" :key="detail.label">
                            <span class="label">{{ detail.label }}:</span>
                            <span class="content">{{ detail.content }}</span>
                        </div>
                    </div>
                </div>
                <span class="actions">
                    <a-button>加好友</a-button>
                </span>
                <span>
                    <a-button type="primary">发消息</a-button>
                </span>
        </div>
    </div>
</template>


<style lang="scss" scoped>

// .container{
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     position: relative;
//     width: 100vw;
//     height: 100vh;
//     // --s: 82px;
//     // background: repeating-radial-gradient(circle, #fff, #f8f8f8 5px, #000 6px);
//     background-size: 50px 100px;
//     .card {
//         width: 350px;
//         height: 450px;
//         border-radius: 30px;
//         background: #e0e0e0;
//         box-shadow: 15px 15px 30px #bebebe,-15px -15px 30px #ffffff;
//         // display: flex;
//         justify-content: center;
//         align-items: center;
//         margin: auto;
//         padding: 20px;
//         position: relative;
//         .user-info {
//             position: relative;
//             display: block;
//             justify-content: center;
//             align-items: center;
//             margin-bottom: 20px;
//             .row{
//                 display: flex;
//             }
//             .avatar {
//                 position: relative;
//                 width: 80px;
//                 height: 80px;
//                 /* 如果你想要图片有边距 */
//                 margin-right: 20px;
//             }
//             .infoCss{
//                 position: relative;
//                 justify-content: center;
//                 align-items: center;
//                 top: 150px;
//             }
//             .name{
//                 font-size: 20px;
//                 position: relative;
//                 // display: flex;
//                 justify-content: center;
//                 align-items: center;
//             }
//             .id{
//                 // position: relative;
//                 // display: flex;
//                 // justify-content: center;
//                 // align-items: center;
//                 font-size: 16px;
//             }
//             .actions{
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 top:60px;
//                 margin: 5px;
//                 padding: 10px 20px;
//             }
//         }
//     }
// }


.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;

  .card {
    width: 300px;
    height: 300px;
    border-radius: 10px;
    background: #cde2e6;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: left;
    justify-content: space-between;
    .user-info {
      margin-bottom: 20px; // 为用户信息块添加外边距
      .row {
        display: flex;
        align-items: center;
        margin-top: 10px;
        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin-right: 28px;
        }

        .name {
          font-size: 20px;

          .id {
            font-size: 16px;
            color: #666;
            margin-top: 5px; // 为ID添加上边距
            }
        }
      }

      .details {
          display: flex;
          flex-direction: column;
        div {
          margin-bottom: 10px; // 为每一行信息添加下边距

          .label {
              flex-shrink: 0; // 标签不缩小
              margin-right: 20px;
            }

            .content {
                text-align: right;
              flex-grow: 1; // 内容占据剩余空间
            }
        }
      }
    }

    .actions {
        a-button {
            margin-right: 10px;
        }
    }
  }
}
</style> 