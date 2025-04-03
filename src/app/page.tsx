import Link from 'next/link';
import { StructuredText } from 'react-datocms';
import styles from '@/styles/home.module.scss';
import { getHomePageContent } from '@/lib/datocms';

export default async function HomePage() {
  const content = await getHomePageContent();

  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>{content.title}</h1>
          <StructuredText data={content.text.value} />
          <Link href="/rivers" className={styles.ctaButton}>
            Skoða Veiðisvæði
          </Link>
        </div>
      </section>
    </main>
  );
}
