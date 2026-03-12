import { onMounted } from 'vue'

export const useScrollReveal = () => {
    onMounted(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible')
                    // Once visible, we can stop observing if we want it to stay revealed
                    // observer.unobserve(entry.target)
                }
            })
        }, observerOptions)

        const targets = document.querySelectorAll('.reveal')
        targets.forEach(target => observer.observe(target))
    })
}
