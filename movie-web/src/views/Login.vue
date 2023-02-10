<template>
    <van-nav-bar title="标题" />
    <div class="all">
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="phone" name="phone" label="" placeholder="手机号"
                    :rules="[{ required: true, message: '请输入手机号' }]" />
                <van-field v-model="password" type="password" name="password" label="" placeholder="密码"
                    :rules="[{ required: true, message: '请输入密码' }]" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit" class="log" >
                    登录
                </van-button>
            </div>
        </van-form>
    </div>
   
</template>

<script>
import { ref } from 'vue';
import { Toast } from 'vant';
import { useRouter } from "vue-router";
import {getLoginCellphone,getCheckData,} from "../api/login"
import { showNotify, closeNotify } from 'vant';

export default {
       setup() {
            const router=useRouter()
              let phone= ref('')
               let password= ref('')
               let userPhone=ref('')
               let userPassword=ref('')

               let FW = ref(false)
                /* let params = params() */
                let onSubmit=(value)=>{
                    console.log(value);
                    console.log(111);
                // 验证手机号码与密码
    
                // 1.验证手机号码
                let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
                // 2.验证密码
                let pass = /^[a-zA-Z0-9]\w{8,17}$/;
 
                if(!reg.test(phone.value) || !pass.test(password.value) ){//不正确处理
                    console.log("请输入正确手机号码与密码");
                    return;
                }


                    // 请求用户名密码
                    if (phone.value==userPhone.value || password.value==userPassword.value) {
                        getCheckData().then(data=>{
                        console.log("登陆成功==>",data);
                        if(data.data[0].code == 200){
                            window.localStorage.setItem("token",data.data[0].token)
                            window.localStorage.setItem("userId",data.data[0].userId)
                            // Toast("登陆成功");
                            showNotify('登陆成功');
                            
                            router.push("/home")
                        }else{
                            showNotify('请输入正确手机号码与密码');

                            // Toast("请输入正确手机号码与密码");
                        }
                    })
                    }else{
                        showNotify('请输入正确手机号码与密码');

                        //  Toast("请输入正确手机号码与密码");
                    }

            }
          let  gohome=()=>{
                window.localStorage.setItem("btabId",0)
                router.push("/home")
            }
        
       
            getLoginCellphone().then(data =>{
                console.log(222);
                console.log(data);
                userPhone.value=data.phone
                userPassword.value=data.password
               console.log(userPhone.value);
               console.log(userPassword.value);

            })
        
        return {
                phone,
                password,
                userPhone,
                userPassword,
                getLoginCellphone,
                gohome,
                onSubmit,
                FW
                
         }
       } 
}  
</script>

<style  scoped>
.all{
    margin-top: 120px;
}
.log{
    width: 200px;
    margin: 60px auto;
}
</style>