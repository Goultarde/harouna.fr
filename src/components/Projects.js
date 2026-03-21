'use client';

import { useApp } from '@/context/AppContext';
import { projectsData } from '@/data/projects';
import styles from './Projects.module.css';

const Projects = () => {
    const { t, language } = useApp();


    const projects = projectsData[language];

    return (
        <section className={styles.projectsSection}>
            <h2 className={styles.title}>{t.projects.title}</h2>
            <div className={styles.grid}>
                {projects.map((project, index) => {
                    const CardContent = () => (
                        <div className={`${styles.card} ${project.link ? styles.clickable : ''}`}>
                            <span className={styles.status}>{project.status}</span>
                            <h3 className={styles.cardTitle}>
                                {project.title}
                                {project.link && <span className={styles.linkIcon}> ↗</span>}
                            </h3>
                            <p className={styles.description}>{project.description}</p>
                            <div className={styles.techStack}>
                                {project.tech.map((t, i) => (
                                    <span key={i} className={styles.techItem}>#{t}</span>
                                ))}
                            </div>
                        </div>
                    );

                    return project.link ? (
                        <a
                            key={index}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <CardContent />
                        </a>
                    ) : (
                        <div key={index}><CardContent /></div>
                    );
                })}
            </div>
        </section>
    );
};

export default Projects;
