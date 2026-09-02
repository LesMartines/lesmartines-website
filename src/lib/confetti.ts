// Petit burst de confettis au clic sur les boutons de téléchargement (28/08/2026, demande
// "un petit élément cool qui donne du dynamisme"). DOM brut + CSS, aucune librairie :
// chaque particule est un <span> ajouté à document.body, animé en pur CSS (voir la classe
// .confettiParticle dans global.css), puis retiré tout seul à la fin de son animation.
// Coupé sous prefers-reduced-motion (mouvement purement décoratif, sans valeur
// fonctionnelle : on saute l'effet plutôt que de le désactiver à moitié).
const COLORS = ['var(--color-lime)', 'var(--color-lavender)', 'var(--color-primary)', 'var(--color-primary-dark)']

export function burstConfetti(x: number, y: number, count = 14) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('span')
    particle.className = 'confetti-particle'

    const angle = Math.random() * Math.PI * 2
    const distance = 60 + Math.random() * 70
    const dx = Math.cos(angle) * distance
    const dy = Math.sin(angle) * distance - 40 // léger biais vers le haut

    particle.style.left = `${x}px`
    particle.style.top = `${y}px`
    particle.style.setProperty('--dx', `${dx}px`)
    particle.style.setProperty('--dy', `${dy}px`)
    particle.style.setProperty('--rot', `${Math.round(Math.random() * 720 - 360)}deg`)
    particle.style.background = COLORS[i % COLORS.length]

    particle.addEventListener('animationend', () => particle.remove())
    document.body.appendChild(particle)
  }
}
