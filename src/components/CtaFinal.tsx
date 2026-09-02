import StoreButtons from './StoreButtons'
import Reveal from './Reveal'
import styles from './CtaFinal.module.css'

export default function CtaFinal() {
  return (
    <section className={styles.section} aria-labelledby="cta-title">
      <div className={`container ${styles.inner}`}>
        <Reveal>
          <h2 id="cta-title" className={styles.title}>
            Alors, tu nous rejoins&nbsp;?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <StoreButtons />
        </Reveal>
      </div>
    </section>
  )
}
