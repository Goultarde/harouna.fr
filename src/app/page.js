import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import Profil from '@/components/Profil';
import ScrollProgress from '@/components/ScrollProgress';

const Certifications = dynamic(() => import('@/components/Certifications'));
const Projects      = dynamic(() => import('@/components/Projects'));
const Skills        = dynamic(() => import('@/components/Skills'));
const Formations    = dynamic(() => import('@/components/Formations'));
const Journal       = dynamic(() => import('@/components/Journal'));
const Contact       = dynamic(() => import('@/components/Contact'));

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main>
        <Hero />
        <Profil />
        <Certifications />
        <Projects />
        <Skills />
        <Formations />
        <Journal />
      </main>
      <Contact />
    </>
  );
}
