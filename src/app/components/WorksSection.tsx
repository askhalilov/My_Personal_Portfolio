import { useState } from 'react';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { Chip } from './Chip';
import { projects, categories } from '../data/projects';

export function WorksSection() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'Все' || project.category === selectedCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="works" className="py-16 md:py-32 px-4 md:px-6 lg:px-20 relative">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          className="mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4 font-semibold inline-block">
            <span
              style={{
                background: 'var(--accent-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Портфолио
            </span>
          </div>
          <h2 
            className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight mb-6 md:mb-8" 
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span
              style={{
                background: 'linear-gradient(135deg, var(--foreground) 0%, var(--accent-purple) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              РАБОТЫ
            </span>
          </h2>

          {/* Filters */}
          <div className="flex gap-2 md:gap-3 mb-4 md:mb-6 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
            {categories.map((category) => (
              <Chip
                key={category}
                active={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Chip>
            ))}
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск проектов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 text-sm md:text-base rounded-xl md:rounded-2xl bg-card border border-border 
                         text-foreground placeholder:text-muted-foreground
                         focus:outline-none focus:border-primary/50 focus:bg-muted
                         transition-all duration-300"
            />
          </div>

          {selectedCategory === 'Скрипты/CRM' && (
            <div className="mt-4 max-w-2xl rounded-2xl border border-border/70 bg-card/50 backdrop-blur px-4 py-3 text-sm text-muted-foreground">
              Скрипты открываются в режиме <span className="text-foreground/90 font-medium">Live‑демо</span>.
              Исходный код и документация — на <span className="text-foreground/90 font-medium">GitHub</span> (кнопка в модалке).
            </div>
          )}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <ProjectCard
                id={project.id}
                title={project.title}
                description={project.description}
                category={project.category}
                stack={project.stack}
                tags={project.tags}
                images={project.images}
                demoUrl={project.demoUrl}
                githubUrl={project.githubUrl}
                company={project.company}
                year={project.year}
                countries={project.countries}
              />
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 md:py-20">
            <p className="text-muted-foreground text-base md:text-lg">
              Проекты не найдены. Попробуйте изменить фильтры.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}