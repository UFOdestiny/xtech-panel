<template>
    <div class="mt-4">
        <el-input v-model="input" placeholder="10004405.XSHG" class="input-with-select">
            <template #prepend>
                <el-button @click="changeContract"><el-icon>
                        <Search />
                    </el-icon></el-button>
            </template>
            <!-- <template #append>
                <el-select v-model="select" placeholder="Select" style="width: 115px">
                    <el-option label="Restaurant" value="1" />
                    <el-option label="Order No." value="2" />
                    <el-option label="Tel" value="3" />
                </el-select>
            </template> -->
        </el-input>
    </div>
</template>


<script>
import { Search } from '@element-plus/icons-vue'
export default {
    name: 'ContractPicker',
    components: { Search },
    data() {
        return {
            input: ""
        };
    },
    methods: {
        changeContract() {
            if (this.input.length >= 3) { this.$store.commit('changeContract', this.input) }
        },
    },


};

</script>

<style>
.input-with-select .el-input-group__prepend {
    background-color: var(--el-fill-color-blank);
}
</style>