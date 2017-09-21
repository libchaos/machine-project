<template>
    <div class="container">
        <h1>测试测试</h1>
        <Button type="error" @click="getTestData">请求数据</Button>
        <p v-if="data===''">暂无数据</p>
        <div v-else>
            <Card style="width:400px;margin: auto;text-align: left;" v-for="(item,index) in data" :key="index">
                <div>
                    <h3>{{index+1}}、 {{item.title}}</h3>
                    <nuxt-link :to="{ name: '/detail', params: { userId: item.id }}">查看详情</nuxt-link>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import NuxtLink from '../.nuxt/components/nuxt-link'
    export default {
        components: {NuxtLink},
        asyncData ({ req, params }) {
        },
        data(){
            return{
                data:''
            }
        },
        methods:{
            getTestData(){
                let _this=this;
                axios.get('https://jsonplaceholder.typicode.com/posts')
                    .then((res) => {
                        _this.data=res.data.slice(0,10);
                    });
            }
        },
        head: {
            title: 'Nuxt测试案例'
        }
    }
</script>

<style scoped>
    .container {
        width: 70%;
        margin: auto;
        text-align: center;
        padding-top: 100px;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    ul li {
        border: 1px #ddd solid;
        padding: 20px;
        text-align: left;
    }
    ul li a {
        color: gray;
    }
    p {
        font-size: 20px;
    }
    a {
        color: #41B883;
    }
</style>
