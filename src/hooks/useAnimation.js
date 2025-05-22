import { useEffect } from 'react';
import anime from 'animejs';

export default function useFadeInOnLoad(selector = '.section-animate') {
  useEffect(() => {
    anime({
      targets: selector,
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 800,
      easing: 'easeOutExpo',
      delay: anime.stagger(150), // si hay varios elementos
    });
  }, [selector]);
}
