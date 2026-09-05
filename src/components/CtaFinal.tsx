import StoreButtons from './StoreButtons'
import Reveal from './Reveal'
import groupePhoto from '../assets/hero/groupe-meufs.webp'
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
          {/* Rappel de la preuve sociale au tout dernier CTA de la home (05/09/2026,
              "utilise tous les moyens psychologiques marketing connus pour inciter les
              gens à... télécharger l'application") : effet de récence — c'est la dernière
              chose vue avant de quitter la page, donc le dernier argument qui pèse dans
              la décision. Même chiffre que le Hero/la section Avis (jamais de nouveau
              chiffre inventé), en texte simple pour rester au même niveau que le titre
              plutôt que de rivaliser avec les boutons de stores juste au-dessus. */}
          <p className={styles.trust}>
            <span aria-hidden="true">★★★★★</span> 4,8/5 · 450+ avis
          </p>
        </Reveal>
        {/* Photo de groupe (03/09/2026, "tu peux integrer cette image sous 'tu nous
            rejoins' sous les logos des stores et mettre un petit effet smooth") : Reveal
            avec un délai un peu plus long que les boutons, pour une entrée en fondu qui
            suit le reste du bloc plutôt que d'arriver toutes en même temps. */}
        <Reveal delay={0.2}>
          <img src={groupePhoto} alt="" className={styles.groupPhoto} />
        </Reveal>
      </div>
    </section>
  )
}
