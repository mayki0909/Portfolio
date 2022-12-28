
import Head from 'next/head'
import { Navbar } from '../components/navbar/navbar'
import { Hero } from '../components/hero/newHero'
import { Projects } from '../components/newProjects/projects';
import { About } from '../components/about/about';
import { Banner } from '../components/banner/banner';
import { Footer } from '../components/footer/footer';

const Index = () => {
  const metadata = {
    url: 'asdasd',
    title: 'Personal portfolio - Miha Žnidar',
    description: 'My name is Miha Žnidar I am full stack web developer. Interested in blockchain, web development, game development and AR/VR technologies. In free time I experiment a lot with those technologies.',
    image: `${process.env.NODE_ENV === "production" ? '/Portfolio' : ''}/images/matadata.jpg`
  }
  return (
    <>
      <Head>
        <meta name="google-site-verification" content="QsMKB5atxvBbyS1GOp5YivZXKJIDqls51EfGSisUkMY" />
        
        <title>{metadata.title}</title>
        <meta name="title" content={metadata.title} />
        <meta name="description" content={metadata.description} />


        <meta property="og:type" content="website" />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />


        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={metadata.url} />
        <meta property="twitter:title" content={metadata.title} />
        <meta property="twitter:description" content={metadata.description} />
        <meta property="twitter:image" content={`${metadata.url}${metadata.image}`} />
      </Head>

      <main>
        <Navbar />
        <Hero />
        <Projects />
        <About />
        <Banner />
        <Footer />
      </main>
    </>
  )
}

export default Index