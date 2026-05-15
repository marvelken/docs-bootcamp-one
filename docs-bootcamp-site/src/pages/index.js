import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const cards = [
  {
    title: 'API Reference',
    description:
      'A complete reference for three GitHub REST API endpoints — Users, Repositories, and Issues. Includes request/response examples, field descriptions, and error codes.',
    link: '/docs/api-reference',
  },
  {
    title: 'Axios Tutorial',
    description:
      'A step-by-step tutorial walking through GET and POST requests, error handling, and an annotated TypeScript code sample.',
    link: '/docs/tutorial-axios',
  },
];

function Card({title, description, link}) {
  return (
    <div className={styles.card}>
      <Heading as="h3">{title}</Heading>
      <p>{description}</p>
      <Link className="button button--secondary button--sm" to={link}>
        Read more
      </Link>
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Home" description="Technical Writing Portfolio">
      <header className={styles.heroBanner}>
        <div className="container">
          <Heading as="h1" className={styles.heroTitle}>
            {siteConfig.title}
          </Heading>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <p className={styles.heroDescription}>
            A documentation portfolio built during a technical writing bootcamp.
            Browse an API reference and a hands-on tutorial below.
          </p>
          <Link
            className="button button--primary button--lg"
            to="/docs/intro">
            View Portfolio
          </Link>
        </div>
      </header>
      <main className="container">
        <section className={styles.cardSection}>
          {cards.map((card) => (
            <Card key={card.title} {...card} />
          ))}
        </section>
      </main>
    </Layout>
  );
}
