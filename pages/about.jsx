import { Navbar } from '../components/navbar/navbar';
import { AboutMe } from '../components/hero/aboutMe';
import { Hobbies } from '../components/hobbies/hobbies';
import { Banner } from '../components/banner/banner';
import { Footer } from '../components/footer/footer';
import { Cookies } from '../components/cookies/cookies'
import { SeoHead } from '../components/seo/seo-head';
import { metadata } from '../contants';
import { aboutPageSchema } from '../lib/schema';

const aboutDescription =
  'Learn more about Miha Žnidar — full-stack web developer from Slovenia, skills, hobbies, and professional background.';

const About = () => {
  return (
    <>
      <SeoHead
        title={`About ${metadata.author.name}`}
        description={aboutDescription}
        path="/about"
        ogType="profile"
        schemas={[aboutPageSchema()]}
      />

      <main>
        <Navbar />
        <AboutMe />
        <Hobbies />
        <Banner />
        <Footer />
        <Cookies />
      </main>
    </>
  )
}

export default About;
