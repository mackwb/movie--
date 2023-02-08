<template>
    <div>

        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="phone" name="phone" label="" placeholder="手机号"
                    :rules="[{ required: true, message: '请输入手机号' }]" />
                <van-field v-model="password" type="password" name="password" label="" placeholder="密码"
                    :rules="[{ required: true, message: '请输入密码' }]" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit" >
                    登录
                </van-button>
            </div>
        </van-form>


        <van-nav-bar title="标题" />

    </div>
</template>

<script setup>
import request from "http";
import { ref } from 'vue';

 function getCheckData(){
    return request({
        url:"http://localhost:8080/json/check.json",
        method:"get",
    })
}
// 获取账号密码 
function getLoginCellphone(){
    return request({
        url:"http://localhost:8080/json/cellphone.json",
        method:"get",
    })
}
// 获取用户信息
function getUserData(){
    return request({
        url:"http://localhost:8080/json/user.json",
        method:"get",
        params:{
            userId:123564
        }
    })
}
const phone = ref('')

const password = ref('')
const userPhone=ref(null)
const userPassword=ref(null)
const onSubmit = () => {
    let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    // 2.验证密码
    let pass = /^[a-zA-Z0-9]\w{8,17}$/;
    if (!reg.test(phone.value) || !pass.test(password.value)) {//不正确处理
        console.log("请输入正确手机号码与密码");
        return;
        
    }
    console.log(phone.value,password.value);
    console.log(userPhone.value,userPassword.value);
    
    // 请求用户名密码
    if (phone.value === userPhone.value || password.value === userPassword.value) {
        getCheckData().then(data => {
            console.log(phone.value);
            console.log("登陆成功==>", data);
            if (data.data[0].code == 200) {
                window.localStorage.setItem("token", data.data[0].token)
                window.localStorage.setItem("userId", data.data[0].userId)
                console.log("登陆成功");
                router.push("/my")
            } else {
                Toast("请输入正确手机号码与密码");
            }
        })
    } else {
        Toast("请输入正确手机号码与密码");
    }
    let  gohome=()=>{
                window.localStorage.setItem("btabId",0)
                router.push("/home")
            }
        
       
            getLoginCellphone().then(data=>{
               userPhone.value=data.phone
               userPassword.value= data.password
            })
        
        return {
                phone,
                password,
                userPhone,
                userPassword,
                getLoginCellphone,
                gohome,
                onSubmit
         }
       } 



</script>

<style  scoped>

</style>