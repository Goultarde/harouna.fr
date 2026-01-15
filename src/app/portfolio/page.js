import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Certifications from '@/components/Certifications';

export const metadata = {
    title: 'Portfolio | Harouna Coulibaly',
    description: 'Skills and Projects of Harouna Coulibaly',
}

export default function PortfolioPage() {
    return (
        <main>
            <div style={{ paddingTop: '5rem' }}>
                <Projects />
                <Skills />
                <Certifications />
                <Education />
            </div>
        </main>
    );
}
