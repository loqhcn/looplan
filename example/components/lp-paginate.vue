<template>
    <div class="lp-paginate" v-if="lastPage > 1">
        <button class="page-btn" :disabled="page === 1" @click="goTo(1)">«</button>
        <button class="page-btn" :disabled="page === 1" @click="goTo(page - 1)">‹</button>

        <button v-for="p in pageNumbers" :key="p" :class="['page-btn', { active: p === page }]" @click="goTo(p)">
            {{ p }}
        </button>

        <button class="page-btn" :disabled="page === lastPage" @click="goTo(page + 1)">›</button>
        <button class="page-btn" :disabled="page === lastPage" @click="goTo(lastPage)">»</button>

        <span class="page-info">第 {{ page }} / {{ lastPage }} 页（共 {{ status.total }} 条）</span>

        <template v-if="showQuickJumper">
            <input type="number" min="1" :max="lastPage" v-model.number="inputPage" class="page-input" />
            <button class="page-btn" @click="goTo(inputPage)">跳转</button>
        </template>
    </div>
    <div class="lp-paginate" v-else>
        <span class="page-info">共 {{ status.total }} 条</span>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import type { PaginatePageStatus } from '@/types/model-client'

interface LpPaginateProps {
    status: PaginatePageStatus
    maxButtons?: number
    showQuickJumper?: boolean
}

const props = withDefaults(defineProps<LpPaginateProps>(), {
    showQuickJumper: false,
})

const emit = defineEmits<{
    (e: 'update:status', v: PaginatePageStatus): void
    (e: 'change', v: PaginatePageStatus): void
}>()

const maxButtons = computed(() => props.maxButtons ?? 7)
const page = computed(() => props.status.page)
const limit = computed(() => Math.max(1, props.status.limit))
const total = computed(() => Math.max(0, props.status.total))
const lastPage = computed(() => Math.max(1, Math.ceil(total.value / limit.value)))
const inputPage = ref(page.value)

watch(page, (p) => { inputPage.value = p })

const pageNumbers = computed(() => {
    const count = maxButtons.value
    const half = Math.floor(count / 2)
    let start = Math.max(1, page.value - half)
    let end = Math.min(lastPage.value, start + count - 1)
    // adjust start if near the end
    start = Math.max(1, end - count + 1)
    const arr: number[] = []
    for (let i = start; i <= end; i++) arr.push(i)
    return arr
})

function goTo(target: number) {
    const p = Math.max(1, Math.min(lastPage.value, Number.isFinite(target) ? target : page.value))
    const next: PaginatePageStatus = {
        page: p,
        limit: limit.value,
        total: total.value,
        lastPage: lastPage.value,
        hasMore: p < lastPage.value,
    }
    emit('update:status', next)
    emit('change', next)
}
</script>

<script lang="ts">
export default {
    name: 'lp-paginate',
}
</script>

<style lang="scss" scoped>
.lp-paginate {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
}

.page-btn {
    padding: 4px 8px;
    border: 1px solid #d0d7de;
    background: #fff;
    border-radius: 4px;
    cursor: pointer;
    color: #24292f;
}

.page-btn[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
}

.page-btn.active {
    background: #0969da;
    color: #fff;
    border-color: #0969da;
}

.page-info {
    margin-left: 8px;
    color: #57606a;
}

.page-input {
    width: 60px;
    padding: 4px 6px;
    border: 1px solid #d0d7de;
    border-radius: 4px;
}
</style>