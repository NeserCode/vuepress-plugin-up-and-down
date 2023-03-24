import { debounce } from 'ts-debounce';
import { computed, defineComponent, h, onMounted, ref, Transition, nextTick } from 'vue';
import { getScrollTop, scrollToTop } from '../utils.js';
import '../styles/vars.css';
import '../styles/up-and-down.css';
export const UpAndDown = defineComponent({
    name: 'UpAndDown',
    setup() {
        const scrollTop = ref(0);
        const ElementIDSelector = ref('Comment-for-Up-and-Down')
        const show = computed(() => scrollTop.value > 300);
        const onScroll = debounce(() => {
            scrollTop.value = getScrollTop();
            nextTick(() => {
                if (!window || !document) return;
                hasComment.value = !(document.querySelector(`#${ElementIDSelector.value}`) === null)
            })
        }, 100);

        // Fix: SSR Content initalization
        const hasComment = ref(false)
        onMounted(() => {
            scrollTop.value = getScrollTop();
            window.addEventListener('scroll', () => onScroll());
        });
        const containerEl = h('div', { class: 'up-and-down' });
        const upToTopEl = h('div', { class: 'back-to-top', onClick: scrollToTop }, h('div', { class: 'up-and-down-mask' }));
        const downToBottomEl = h('a', {
            class: 'down-to-bottom',
            href: `#${ElementIDSelector.value}`,
        }, h('div', { class: 'up-and-down-mask' }));

        return () => h(containerEl, [
            h(Transition, { name: "up-and-down" }, () => show.value && upToTopEl),
            h(Transition, { name: "up-and-down" }, () => hasComment.value && downToBottomEl)
        ]);
    },
});

export default UpAndDown;
