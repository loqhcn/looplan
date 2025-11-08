<template>
    <svg :class="[$attrs.class]" :style="getStyle" :fill="color" aria-hidden="true">
      <use :xlink:href="symbolId" />
    </svg>
  </template>
  <script>
    export default {
      name: 'LpSvg',
    };
  </script>
  <script setup>
    import { computed } from 'vue';
  
    const props = defineProps({
      icon: {
        type: String,
        required: true,
      },
      size: {
        type: [Number, String],
        default: 12,
      },
      color: {
        type: String,
        default: '#000000',
      },
    });
  
    const symbolId = computed(() => `#${props.icon}`);
  
    const getStyle = computed(() => {
      const { size,color } = props;
      let s = `${size}`;
      s = `${s.replace('px', '')}px`;
      return {
        width: s,
        fill: color,
        height: s,
      };
    });
  </script>
  <style lang="scss" scoped>
    svg {
      width: 1em;
      height: 1em;
      fill: currentColor;
      stroke: currentColor;
      vertical-align: middle;
      overflow: hidden;
      color: inherit;
      &:focus {
        outline: none;
      }
    }
  </style>
  