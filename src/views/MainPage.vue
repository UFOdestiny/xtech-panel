<template>
    <el-container class="container-wrapper">
        <el-container>
            <el-aside :width="collapse ? '64px' : '200px'">
                <div class="toggle-button" @click="togglecollapse">|||</div>
                <el-menu default-active="2" :collapse="collapse" :router="true">


                    <el-menu-item index="/OpTargetQuote">
                        <el-icon>
                            <Location />
                        </el-icon>
                        <template #title>OpTargetQuote</template>
                    </el-menu-item>

                    <el-menu-item index="/OpNominalAmount">
                        <el-icon>
                            <icon-menu />
                        </el-icon>
                        <template #title>OpNominalAmount</template>
                    </el-menu-item>


                    <el-menu-item index="/OpContractQuote">
                        <el-icon>
                            <icon-menu />
                        </el-icon>
                        <template #title>OpContractQuote</template>
                    </el-menu-item>

                    <el-menu-item index="/PutdMinusCalld">
                        <el-icon>
                            <icon-menu />
                        </el-icon>
                        <template #title>PutdMinusCalld</template>
                    </el-menu-item>

                    <el-menu-item index="/OpDiscount">
                        <el-icon>
                            <icon-menu />
                        </el-icon>
                        <template #title>OpDiscount</template>
                    </el-menu-item>

                    <el-menu-item index="/OpTargetDerivativeVol">
                        <el-icon>
                            <icon-menu />
                        </el-icon>
                        <template #title>OpTargetDerivativeVol</template>
                    </el-menu-item>

                    <el-menu-item index="/OpTargetDerivativePrice">
                        <el-icon>
                            <icon-menu />
                        </el-icon>
                        <template #title>OpTargetDerivativePrice</template>
                    </el-menu-item>

                    <el-menu-item index="/CPR">
                        <el-icon>
                            <document />
                        </el-icon>
                        <template #title>CPR</template>
                    </el-menu-item>

                    <el-menu-item index="/Vix">
                        <el-icon>
                            <document />
                        </el-icon>
                        <template #title>Vix</template>
                    </el-menu-item>

                    <el-menu-item index="/Skew">
                        <el-icon>
                            <document />
                        </el-icon>
                        <template #title>Skew</template>
                    </el-menu-item>



                    <el-menu-item index="/NotionalPrincipal">
                        <el-icon>
                            <Location />
                        </el-icon>
                        <template #title>名义本金</template>
                    </el-menu-item>



                    <el-menu-item index="/PremiumDiscount">
                        <el-icon>
                            <setting />
                        </el-icon>
                        <template #title>升贴水</template>
                    </el-menu-item>
                    <el-menu-item index="/Skewness">
                        <el-icon>
                            <setting />
                        </el-icon>
                        <template #title>偏度</template>
                    </el-menu-item>
                    <el-menu-item index="/SmileSurface">
                        <el-icon>
                            <setting />
                        </el-icon>
                        <template #title>SmileSurface</template>
                    </el-menu-item>
                    <el-menu-item index="/IVDiff">
                        <el-icon>
                            <setting />
                        </el-icon>
                        <template #title>波动率差异</template>
                    </el-menu-item>
                    <el-menu-item index="/IVATM">
                        <el-icon>
                            <setting />
                        </el-icon>
                        <template #title>平值隐波</template>
                    </el-menu-item>
                    <el-menu-item index="/VerticalSpread">
                        <el-icon>
                            <setting />
                        </el-icon>
                        <template #title>垂直价差</template>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Document, Menu as IconMenu, Location, Setting, } from '@element-plus/icons-vue'
//import { useRouter } from "vue-router";

var collapse = ref(true)
//const router = useRouter()

function togglecollapse() {
    collapse.value = !collapse.value
}

onMounted(() => {
    //router.push('/OpTargetQuote') //router.push('/FormVue')
})

</script>

<style lang="scss" scoped>
.toggle-button {
    // 添加背景颜色
    background-color: #4A5064;
    // 设置文本大小
    font-size: 10px;
    // 设置文本行高
    line-height: 24px;
    // 设置文本颜色
    color: #fff;
    // 设置文本居中
    text-align: center;
    // 设置文本间距
    letter-spacing: 0.2em;
    // 设置鼠标悬浮变小手效果
    cursor: pointer;
}

// .el-menu-vertical-demo:not(.el-menu--collapse) {
//     width: 100px;
//     height: 100%;
// }
.el-menu {
    border-right: none;
}

// .el-main {
//     background-color: #e9edf1;
//     width: 80%;
// }
// .el-aside{
//     width: 200px;
// }

// .el-menu-item {
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// }

.container-wrapper {
    width: 100%;
    height: 100%;
    padding: 0px;
    margin: 0;
}

.el-main {
    height: 100%;
    width: 100%;
    padding: 0px;
    margin: 0;
}

.el-aside {
    height: 100%;
    //background-color: #303133;
}

// .el-menu-item {
//     display: flex;
//     justify-content: flex-start;
//     align-items: center;
// }

.el-submenu {
    width: 200px;
}
</style>
