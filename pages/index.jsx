
import { Navbar } from '../components/navbar/navbar'
import { Hero } from '../components/hero/newHero'
import { Projects } from '../components/newProjects/projects'
import { About } from '../components/about/about'
import { Banner } from '../components/banner/banner'
import { Footer } from '../components/footer/footer'
import { Cookies } from '../components/cookies/cookies'
import { SeoHead } from '../components/seo/seo-head'
import { metadata } from '../contants'
import { homePageSchema } from '../lib/schema'

const Index = () => {
  return (
    <>
      <SeoHead
        title={metadata.title}
        description={metadata.description}
        path="/"
        schemas={[homePageSchema()]}
      />

      <main>
        <Navbar />
        <Hero />
        <Projects limit={3} showViewMore />
        <About />
        <Banner />
        <Footer />
        <Cookies />
      </main>
    </>
  )
}

export default Index
