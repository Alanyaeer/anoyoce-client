import Mock from 'mockjs';
Mock.mock(/api\/user\/login/, 'post', (config)=>{
    return loginResult
})
let loginResult = Mock.mock(
    {
        data: '114514',
        code: 200, 
        msg: "jfaif"
    }
)