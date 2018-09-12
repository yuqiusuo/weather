<style lang="less" scoped>
@import url('./style.less');
</style>

<template>
    <div class="cont__area" :class="{'show': show}">
        <input type="text" name="city" id="city" class="search__npt"
                v-model="city" @keyup.enter="search"/>
        <button class="search__btn" @click="search">
            <i class="iconfont icon-search search__icon"></i>
        </button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    props: {
        show: Boolean
    }
})
export default class contArea extends Vue {
    city: string = '';

    // 搜索回调
    search() {
        this.$emit('search', this.city.trim());
    }
}
</script>
