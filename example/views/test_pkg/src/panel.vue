<template>
    <div class="test-panel">
        <div class="title">
            <slot name="title">
                <div class="tip">默认标题</div>
            </slot>
        </div>
        <slot>
            <div class="tip">默认内容</div>
        </slot>
        <div class="footer">
            <slot name="footer">
                <div class="tip">默认页脚</div>
            </slot>
        </div>
    </div>
</template>
<script setup>
import { ref,reactive,onMounted } from 'vue';

const state = reactive({

})
</script>
<style lang="scss">
.test-panel {
    padding: 16px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    .title {
        margin-bottom: 12px;
        font-size: 16px;
        font-weight: 600;
        color: #333333;
    }
    .tip {
        color: #999999;
        font-size: 14px;
    }
    .footer {
        margin-top: 12px;
        font-size: 14px;
        font-weight: 600;
        color: #333333;
        border-top: 1px solid #E5E5E5;
    }
}

</style>