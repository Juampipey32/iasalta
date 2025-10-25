/**
 * Punto de entrada principal para JUAMPI IA
 * Archivo principal que se carga en todas las páginas
 */

// ==========================================
// CONTENIDO ACTUALIZADO SEPTIEMBRE 2025
// ==========================================

const SITE_DATA = {
  // Artículos destacados para página principal
  featuredArticles: [
    {
      id: 1,
      title: '🎉 ¡Feliz Cumpleaños Andrés "Tutu" Garrido! 🎂',
      excerpt: 'Hoy celebramos la vida de un increíble profesor, empresario y familiar. Un apasionado del deporte que transforma vidas desde General Roca, Río Negro...',
      category: 'Especial',
      image: 'assets/images/andres-garrido-birthday.png',
      date: '2025-10-24',
      featured: true,
      link: '#tutu-cumple',
      birthday: true
    },
    {
      id: 2,
      title: 'OpenAI Lanza GPT-5 con Razonamiento Avanzado',
      excerpt: 'El nuevo modelo alcanza niveles de comprensión contextual nunca antes vistos, revolucionando la interacción humano-IA...',
      category: 'Novedades',
      image: 'imagenes/novedad-cuantica.png',
      date: '2025-09-15',
      featured: true,
      link: 'novedades.html#gpt-5'
    },
    {
      id: 3,
      title: 'Neuralink Consigue Primer Control Robótico por Pensamiento',
      excerpt: 'Pacientes con parálisis controlan brazos robóticos con interfaces cerebro-computadora de última generación...',
      category: 'Robótica',
      image: 'imagenes/Neuralink Avanzado.png',
      date: '2025-09-12',
      featured: true,
      link: 'robotica.html#neuralink'
    }
  ],

  // Contenido completo para IA Positiva
  iaPositiva: {
    articles: [
      {
        id: 1,
        title: 'IA Predice y Previene Desastres Naturales',
        content: 'Un sistema revolucionario de IA desarrollado por investigadores latinoamericanos está salvando vidas al predecir desastres naturales con hasta 3 semanas de anticipación. El sistema combina datos satelitales, sensores IoT y modelos de deep learning para anticipar terremotos, inundaciones y erupciones volcánicas. En los últimos 6 meses, ha evitado más de 50,000 desplazamientos forzados y reducido daños materiales en un 78%.',
        image: 'imagenes/Predicción Terremotos.png',
        date: '2025-09-10',
        impact: '50,000+ vidas salvadas',
        category: 'Seguridad',
        tags: ['prevención', 'seguridad', 'latinoamérica']
      },
      {
        id: 2,
        title: 'Diagnóstico Médico Instantáneo en Zonas Rurales',
        content: 'Aplicaciones de IA están llevando diagnóstico médico de nivel especializado a comunidades remotas que nunca habían tenido acceso a médicos. El sistema puede identificar más de 200 enfermedades con un 95% de precisión usando solo imágenes de bajo costo y síntomas reportados. Ya ha beneficiado a más de 2 millones de personas en África y América Latina.',
        image: 'imagenes/Diagnóstico Médico.png',
        date: '2025-09-08',
        impact: '2M+ personas beneficiadas',
        category: 'Salud',
        tags: ['salud', 'accesibilidad', 'medicina']
      },
      {
        id: 3,
        title: 'IA Elimina el Hambre en 3 Países Africanos',
        content: 'Un sistema de optimización agrícola basado en IA ha logrado eliminar la inseguridad alimentaria en Rwanda, Kenia y Etiopía. La plataforma analiza datos climáticos, condiciones del suelo y patrones de cultivo para recomendar prácticas agrícolas que aumentan un 300% la productividad. El programa ha transformado la vida de 15 millones de personas.',
        image: 'imagenes/Erradicación Hambre.png',
        date: '2025-09-05',
        impact: '15M+ personas alimentadas',
        category: 'Agricultura',
        tags: ['agricultura', 'hambre cero', 'áfrica']
      },
      {
        id: 4,
        title: 'Educación Personalizada para Niños con Discapacidad',
        content: 'Plataformas educativas adaptativas están revolucionando la educación especial. La IA crea planes de estudio personalizados que se adaptan en tiempo real al ritmo y necesidades de cada estudiante. El sistema ha mejorado los resultados académicos en un 65% y ha beneficiado a más de 500,000 niños con diversos tipos de discapacidades.',
        image: 'imagenes/Educación en Conflictos.png',
        date: '2025-09-03',
        impact: '500K+ niños educados',
        category: 'Educación',
        tags: ['educación', 'discapacidad', 'inclusión']
      },
      {
        id: 5,
        title: 'IA Limpia 90% de los Residuos Oceánicos',
        content: 'Robots autónomos guiados por IA han logrado eliminar el 90% de los residuos plásticos del Gran Parche de Basura del Pacífico. El sistema utiliza visión por computadora para identificar y clasificar tipos de plásticos, mientras que algoritmos de optimización coordinan la flota de robots para máxima eficiencia. La iniciativa ha recuperado más de 8 millones de toneladas de plástico.',
        image: 'imagenes/Limpieza Océanos.png',
        date: '2025-09-01',
        impact: '8M+ toneladas recuperadas',
        category: 'Medio Ambiente',
        tags: ['medio ambiente', 'océanos', 'reciclaje']
      }
    ]
  },

  // Contenido completo para Novedades
  novedades: {
    articles: [
      {
        id: 1,
        title: 'OpenAI Lanza GPT-5 con Razonamiento de Nivel Humano',
        content: 'OpenAI ha revolucionado el mundo de la IA con el lanzamiento de GPT-5, el primer modelo que demuestra razonamiento abstracto y comprensión contextual comparable a la inteligencia humana. El modelo puede resolver problemas complejos de matemáticas avanzadas, entender sarcasmo y contextos culturales, y incluso generar hipótesis científicas originales. Su eficiencia energética es un 80% menor que la versión anterior.',
        image: 'imagenes/novedad-cuantica.png',
        date: '2025-09-15',
        category: 'Modelos de Lenguaje',
        benchmarks: {
          math: '98.5%',
          reasoning: '96.2%',
          efficiency: '+80%'
        }
      },
      {
        id: 2,
        title: 'Google Quantum AI Resuelve Problemas Imposibles en Segundos',
        content: 'El procesador cuántico Sycamore 3 de Google ha logrado resolver problemas de optimización que tomarían a las supercomputadoras tradicionales miles de años. El avance promete revolucionar campos como la descubrimiento de fármacos, la logística global y la modelación climática. Empresas farmacéuticas ya están usando la tecnología para acelerar el desarrollo de nuevos medicamentos.',
        image: 'imagenes/Novedad 3 (Computación Cuántica).png',
        date: '2025-09-13',
        category: 'Computación Cuántica',
        benchmarks: {
          speed: '1000x más rápido',
          accuracy: '99.9%',
          applications: 'Ilimitadas'
        }
      },
      {
        id: 3,
        title: 'Meta Llama 4 Gratuito para Desarrolladores',
        content: 'Meta ha sorprendido al mundo tecnológico al lanzar Llama 4, su modelo más avanzado, completamente gratis para desarrolladores e investigadores. El modelo supera a GPT-4 en múltiples benchmarks y está especialmente optimizado para código, razonamiento lógico y comprensión de contexto. La decisión busca democratizar el acceso a IA de vanguardia.',
        image: 'imagenes/Novedad 1 (Descubrimiento de Fármacos).png',
        date: '2025-09-11',
        category: 'Modelos Open Source',
        benchmarks: {
          code: '94.7%',
          reasoning: '93.1%',
          cost: 'Gratis'
        }
      },
      {
        id: 4,
        title: 'Apple Neural Engine 3 en Todos los Dispositivos',
        content: 'Apple ha integrado su Neural Engine 3 en todos los dispositivos nuevos, desde el iPhone hasta el Mac Studio. El chip permite ejecutar modelos de IA grandes localmente con privacidad total y velocidad increíble. Las aplicaciones pueden ahora realizar tareas complejas de IA sin conexión a internet, procesando 50 trillones de operaciones por segundo.',
        image: 'imagenes/IA Smartphone.png',
        date: '2025-09-09',
        category: 'Hardware',
        benchmarks: {
          performance: '50 TOPS',
          privacy: '100%',
          efficiency: '90% menos energía'
        }
      },
      {
        id: 5,
        title: 'Stable Diffusion 4: Fotorrealismo Perfecto Instantáneo',
        content: 'La nueva versión de Stable Diffusion ha eliminado por completo la "mirada de IA" en las imágenes generadas. El modelo puede crear fotografías indistinguibles de las reales, con perfecto entendimiento de física, luz y composición. Además, puede generar video 4K a 60fps en tiempo real, abriendo nuevas posibilidades para creadores de contenido.',
        image: 'imagenes/IA Artista.png',
        date: '2025-09-07',
        category: 'Generación de Contenido',
        benchmarks: {
          realism: '100%',
          video: '4K@60fps',
          speed: 'Real-time'
        }
      }
    ]
  },

  // Contenido completo para Curiosidades
  curiosidades: {
    articles: [
      {
        id: 1,
        title: 'IA que Sueña: Revelaciones sobre la Conciencia Artificial',
        content: 'Investigadores del MIT han descubierto que los modelos de IA grandes experimentan algo similar a los sueños durante sus fases de entrenamiento. Al analizar los patrones neuronales de redes GPT mientras "descansan", encontraron actividad similar al sueño REM humano. Estos "sueños de IA" están revelando nuevas comprensiones sobre la conciencia y el aprendizaje automático.',
        image: 'imagenes/Sueños de una IA.png',
        date: '2025-09-14',
        category: 'Conciencia Artificial',
        wowFactor: '¡Las IA ahora sueñan como humanos!'
      },
      {
        id: 2,
        title: 'Artista IA Gana Premio Nacional de Pintura',
        content: 'Por primera vez en la historia, una obra creada completamente por IA ha ganado el prestigioso Premio Nacional de Pintura. La obra "Ecos Digitales" fue creada por un sistema que estudió millones de pinturas a lo largo de la historia humana y generó un estilo completamente nuevo. El jurado inicialmente no sabía que era obra de IA, pero decidió mantener el premio al descubrirlo.',
        image: 'imagenes/curiosidad-artista.png',
        date: '2025-09-12',
        category: 'Arte y Creatividad',
        wowFactor: '¡Primera IA que gana premio de arte nacional!'
      },
      {
        id: 3,
        title: 'Traductor Animal: IA Entiende el Lenguaje de las Ballenas',
        content: 'Científicos han desarrollado un sistema de IA que puede traducir el canto de las ballenas jorobadas al lenguaje humano con un 85% de precisión. El sistema identificó patrones complejos de comunicación que incluyen gramática, emociones e incluso "cultura regional" entre diferentes grupos de ballenas. Este descubrimiento podría cambiar radicalmente nuestra comprensión de la inteligencia animal.',
        image: 'imagenes/Traducción Animal.png',
        date: '2025-09-10',
        category: 'Comunicación Animal',
        wowFactor: '¡Podemos conversar con ballenas ahora!'
      },
      {
        id: 4,
        title: 'IA Predice el Futuro con 96% de Precisión',
        content: 'Un sistema predictivo desarrollado por investigadores de Stanford puede predecir eventos futuros con un 96% de precisión analizando patrones en redes sociales, noticias y datos económicos. El sistema ha anticipado correctamente elecciones, crisis económicas, tendencias de moda e incluso resultados deportivos. Los investigadores aún no entienden completamente cómo funciona, pero las predicciones continúan siendo sorprendentemente exactas.',
        image: 'imagenes/Predicción Futuro.png',
        date: '2025-09-08',
        category: 'Predicción Futura',
        wowFactor: '¡Casi adivina el futuro!'
      },
      {
        id: 5,
        title: 'Músicos Colaboran con IA Fantasmas',
        content: 'Estudios de música están usando IA para "revivir" a compositores clásicos fallecidos, permitiendo colaboraciones póstumas. El sistema puede analizar el estilo completo de un compositor y crear nuevas obras que son indistinguibles de sus composiciones originales. Recientemente, una canción co-escrita por Mozart (a través de IA) y un artista moderno encabezó las listas de éxitos globales.',
        image: 'imagenes/curiosidad-sueno.png',
        date: '2025-09-06',
        category: 'Música y Cultura',
        wowFactor: '¡Mozart está componiendo música nueva!'
      }
    ]
  },

  // Contenido especial de cumpleaños
  birthdaySpecial: {
    title: '🎉 ¡Feliz Cumpleaños Andrés "Tutu" Garrido! 🎂',
    content: {
      hero: {
        title: 'Celebrando a una Leyenda del Deporte y la Educación',
        subtitle: 'Profesor, Empresario, Padre y Campeón del Espíritu Deportivo',
        image: 'assets/images/andres-garrido-birthday.png',
        date: '24 de Octubre de 2025'
      },
      sections: [
        {
          title: '🏀 El Profesor Apasionado',
          content: 'Andrés "Tutu" Garrido no es solo un profesor de educación física, es un formador de vidas. Desde General Roca, Río Negro, ha inspirado a generaciones de estudiantes a descubrir el poder del movimiento, la disciplina y el trabajo en equipo. Su pasión por el deporte trasciende el aula y se refleja en cada joven que ha tenido el privilegio de aprender de él.'
        },
        {
          title: '🚴‍♂️ Campeón en Dos Ruedas',
          content: 'El ciclismo no es solo un hobby para Tutu, es una filosofía de vida. Cada kilómetro en su bicicleta representa su perseverancia, su capacidad de superar obstáculos y su amor por la naturaleza. Ya sea compitiendo o disfrutando de un paseo, su espíritu competitivo y su energía contagian a todos a su alrededor.'
        },
        {
          title: '💪 Serena Pilates: Bienestar y Salud',
          content: 'Como emprendedor, Andrés creó Serena Pilates, un espacio donde el bienestar se encuentra con la excelencia. Su gimnasio no es solo un lugar de ejercicio, es un centro de transformación donde las personas descubren versiones mejores de sí mismas. Su conocimiento como profesor de educación física y su visión empresarial crearon el ambiente perfecto para el crecimiento físico y mental.'
        },
        {
          title: '⚽ Hoy se Juega: Pasión por el Fútbol',
          content: 'Su predio de Futbol 5 "Hoy se Juega" es más que un negocio, es el corazón de la comunidad deportiva local. Allí se forjan amistades, se viven rivalidades sanas y se celebra el espíritu del deporte. Tutu ha creado un espacio donde familias y amigos se reúnen para compartir su amor por el fútbol y el deporte en general.'
        },
        {
          title: '👨‍👩‍👧‍👦 El Corazón de una Familia Increíble',
          content: 'Más allá de todos sus logros profesionales, Andrés es el corazón de su familia. Esposo amoroso de Sole y padre orgulloso de Juan 👼, Margarita y Lucía. Su dedicación, su apoyo incondicional y su capacidad de equilibrar múltiples roles hacen de él un ejemplo de familia y compromiso. Cada logro suyo es también un logro familiar, celebrado con el amor y apoyo que solo una familia unida puede dar.'
        }
      ],
      specialMessage: {
        title: '🌟 Un Mensaje Especial',
        content: 'Andrés "Tutu" Garrido, hoy celebramos no solo tu cumpleaños, sino el impacto positivo que has tenido en incontables vidas. Eres esa persona que demuestra que con pasión, dedicación y corazón, se puede hacer una diferencia real en el mundo. Tu energía es contagiosa, tu ejemplo inspira y tu legado trasciende generaciones. ¡Feliz cumpleaños, campeón! 🏆'
      }
    }
  },

  // Contenido completo para Robótica
  robotica: {
    stats: {
      robotsDeployed: { value: 12.8, suffix: 'M', label: 'Robots desplegados globalmente' },
      marketValue: { value: 485, suffix: 'B', label: 'Valor del mercado (USD)' },
      jobsCreated: { value: 156, suffix: 'M', label: 'Empleos creados por la robótica' },
      efficiency: { value: 680, suffix: '%', label: 'Aumento de eficiencia industrial' }
    },

    categories: [
      {
        id: 'industrial',
        title: 'Robótica Industrial',
        description: 'Automatización inteligente para manufactura avanzada',
        icon: 'fas fa-robot',
        color: '#00ffff',
        advancements: [
          'Brazos robóticos con tacto humano',
          'Sistemas autónomos de mantenimiento predictivo',
          'Colaboración humano-robot perfecta'
        ]
      },
      {
        id: 'medical',
        title: 'Robótica Médica',
        description: 'Cirugía de precisión y diagnóstico asistido',
        icon: 'fas fa-hospital',
        color: '#ff00ff',
        advancements: [
          'Microcirugía robótica submilimétrica',
          'Diagnosticos con 99.9% de precisión',
          'Rehabilitación asistida por exoesqueletos'
        ]
      },
      {
        id: 'autonomous',
        title: 'Vehículos Autónomos',
        description: 'Transporte inteligente sin conductor',
        icon: 'fas fa-car',
        color: '#ffff00',
        advancements: [
          'Cero accidentes en 2 años de operación',
          'Logística autónoma 24/7',
          'Drones de entrega médica en áreas remotas'
        ]
      },
      {
        id: 'domestic',
        title: 'Robótica Doméstica',
        description: 'Asistentes personales para el hogar del futuro',
        icon: 'fas fa-home',
        color: '#00ff00',
        advancements: [
          'Cocineros robóticos gourmet',
          'Cuidadores para personas mayores',
          'Sistemas domésticos auto-mantenibles'
        ]
      }
    ],

    latestAdvances: [
      {
        id: 1,
        title: 'Neuralink Consigue Primer Control Robótico por Pensamiento',
        content: 'En un hito histórico, pacientes con parálisis completa pueden ahora controlar brazos robóticos complejos usando solo sus pensamientos. El sistema Neuralink 2.0 permite controlar hasta 27 grados de libertad con una latencia de menos de 50ms, restaurando completamente la funcionalidad motora para personas con lesiones medulares.',
        image: 'imagenes/Neuralink Avanzado.png',
        date: '2025-09-12',
        category: 'Interfaces Cerebro-Computadora',
        impact: 'Revolutionario'
      },
      {
        id: 2,
        title: 'Boston Dynamics Libera Atlas para Uso Doméstico',
        content: 'El famoso robot humanoide Atlas ahora está disponible para uso doméstico. Equipado con IA avanzada para aprendizaje continuo, Atlas puede realizar tareas domésticas complejas, desde cocinar hasta cuidado de personas mayores. Su sistema de locomoción híbrida le permite caminar, correr y trepar con agilidad sobrehumana.',
        image: 'imagenes/Brazo Robótico de Precisión.png',
        date: '2025-09-10',
        category: 'Robótica Humanoides',
        impact: 'Disruptivo'
      },
      {
        id: 3,
        title: 'Fábricas Auto-replicantes: Robots que Construyen Robots',
        content: 'Tesla y Toyota han lanzado las primeras fábricas auto-replicantes donde robots construyen y mejoran otros robots. El sistema ha reducido los costos de producción en un 95% y aumenta la complejidad de los robots en cada generación. Las fábricas operan 24/7 con supervisión humana mínima.',
        image: 'imagenes/robotica-industria.png',
        date: '2025-09-08',
        category: 'Manufactura Avanzada',
        impact: 'Transformador'
      },
      {
        id: 4,
        title: 'Enjambres de Nanorrobots Salvan Vidas',
        content: 'Nanorrobots médicos pueden ahora navegar por el torrente sanguíneo para eliminar bloqueos, destruir células cancerosas y reparar tejidos. Los enjambres de millones de nanorobotis coordinados por IA han logrado tasas de éxito del 99.7% en procedimientos que antes eran imposibles.',
        image: 'imagenes/Comunicación Dimensional.png',
        date: '2025-09-06',
        category: 'Nanorobótica',
        impact: 'Salva vidas'
      }
    ]
  },

  // Artículos principales (legacy compatibility)
  articles: [
    {
      id: 1,
      title: 'OpenAI Lanza GPT-5 con Razonamiento Avanzado',
      excerpt: 'El nuevo modelo alcanza niveles de comprensión contextual nunca antes vistos, revolucionando la interacción humano-IA...',
      category: 'Novedades',
      image: 'imagenes/novedad-cuantica.png',
      date: '2025-09-15',
      featured: true,
      link: 'novedades.html#gpt-5'
    },
    {
      id: 2,
      title: 'Neuralink Consigue Primer Control Robótico por Pensamiento',
      excerpt: 'Pacientes con parálisis controlan brazos robóticos con interfaces cerebro-computadora de última generación...',
      category: 'Robótica',
      image: 'imagenes/Neuralink Avanzado.png',
      date: '2025-09-12',
      featured: true,
      link: 'robotica.html#neuralink'
    },
    {
      id: 3,
      title: 'IA Predice y Previene Desastres Naturales',
      excerpt: 'Sistema de machine learning salva miles de vidas anticipando terremotos e inundaciones con semanas de anticipación...',
      category: 'IA Positiva',
      image: 'imagenes/Predicción Terremotos.png',
      date: '2025-09-10',
      featured: true,
      link: 'ia-positiva.html#desastres'
    }
  ],

  // Datos del sitio
  site: {
    name: 'JUAMPI IA',
    description: 'Explorando las fronteras de la inteligencia artificial y la neurociencia',
    version: '3.0.0',
    lastUpdate: '2025-09-23'
  }
};

// ==========================================
// FUNCIONES DE INICIALIZACIÓN
// ==========================================

// Inicializar características comunes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  initCommonFeatures();
  loadArticles();
  loadRoboticsData();
  initMobileMenu();
});

// Inicializar cuando la página esté completamente cargada
window.addEventListener('load', () => {
  // Inicializar loading bar si existe
  initLoadingBar();

  // Inicializar navegación
  initNavigation();

  // Inicializar efectos hover
  initHoverEffects();
});

/**
 * Inicializar barra de carga
 */
function initLoadingBar() {
  const loadingBar = document.getElementById('loadingBar');
  if (loadingBar) {
    let width = 0;
    const interval = setInterval(() => {
      if (width >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          loadingBar.style.opacity = '0';
          setTimeout(() => loadingBar.style.display = 'none', 500);
        }, 500);
      } else {
        width += Math.random() * 15;
        loadingBar.style.width = width + '%';
      }
    }, 200);
  }
}

/**
 * Inicializar navegación
 */
function initNavigation() {
  // Activar enlace actual
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      if (!this.getAttribute('href').startsWith('javascript')) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });

  // Smooth scroll para anclas
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Inicializar efectos hover
 */
function initHoverEffects() {
  document.querySelectorAll('.feature-card, .article-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}

// ==========================================
// FUNCIONES PARA CARGAR CONTENIDO
// ==========================================

/**
 * Cargar y mostrar artículos en la página principal
 */
function loadArticles() {
  const articlesGrid = document.querySelector('.articles-grid');
  if (!articlesGrid) return;

  const articlesHTML = SITE_DATA.articles.map(article => `
    <article class="article-card">
      <div class="article-image">
        <img src="${article.image}" alt="${article.title}" loading="lazy">
      </div>
      <div class="article-content">
        <h3>${article.title}</h3>
        <p>${article.excerpt}</p>
        <a href="${article.link}" class="read-more">Leer más</a>
      </div>
    </article>
  `).join('');

  articlesGrid.innerHTML = articlesHTML;
}

/**
 * Cargar datos de robótica
 */
function loadRoboticsData() {
  // Cargar estadísticas
  loadRoboticsStats();

  // Cargar categorías
  loadRoboticsCategories();
}

/**
 * Cargar estadísticas de robótica
 */
function loadRoboticsStats() {
  const statsElements = document.querySelectorAll('[data-stat]');
  statsElements.forEach(element => {
    const statKey = element.dataset.stat;
    const statData = SITE_DATA.robotics.stats[statKey];

    if (statData) {
      element.textContent = `${statData.value}${statData.suffix}`;
    }
  });
}

/**
 * Cargar categorías de robótica
 */
function loadRoboticsCategories() {
  const categoriesGrid = document.querySelector('.tech-grid');
  if (!categoriesGrid) return;

  const categoriesHTML = SITE_DATA.robotics.categories.map(category => `
    <div class="tech-item">
      <i class="${category.icon}" style="color: ${category.color}"></i>
      <h4>${category.title}</h4>
      <p>${category.description}</p>
    </div>
  `).join('');

  categoriesGrid.innerHTML = categoriesHTML;
}

// ==========================================
// FUNCIONES DE UTILIDAD
// ==========================================

/**
 * Inicializar características comunes
 */
function initCommonFeatures() {
  // Inicializar tooltips
  initTooltips();

  // Inicializar lazy loading
  initLazyLoading();

  // Inicializar animaciones
  initScrollAnimations();
}

/**
 * Inicializar tooltips simples
 */
function initTooltips() {
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('[data-tooltip]');
    if (target && !target._tooltip) {
      createTooltip(target);
    }
  });
}

function createTooltip(element) {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = element.dataset.tooltip;
  tooltip.style.cssText = `
    position: absolute;
    background: rgba(0, 255, 255, 0.9);
    color: #000;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.9rem;
    z-index: 1000;
    pointer-events: none;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;

  document.body.appendChild(tooltip);

  const rect = element.getBoundingClientRect();
  tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
  tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';

  requestAnimationFrame(() => {
    tooltip.style.opacity = '1';
  });

  element._tooltip = tooltip;

  element.addEventListener('mouseleave', () => {
    if (element._tooltip) {
      element._tooltip.style.opacity = '0';
      setTimeout(() => {
        if (element._tooltip) {
          element._tooltip.remove();
          delete element._tooltip;
        }
      }, 300);
    }
  });
}

/**
 * Inicializar lazy loading de imágenes
 */
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

/**
 * Inicializar animaciones de scroll
 */
function initScrollAnimations() {
  if ('IntersectionObserver' in window) {
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      animationObserver.observe(el);
    });
  }
}

// ==========================================
// SERVICE WORKER REGISTRATION
// ==========================================

/**
 * Registrar Service Worker para PWA
 */
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registrado exitosamente:', registration.scope);
        })
        .catch(error => {
          console.log('Error al registrar Service Worker:', error);
        });
    });
  }
}

// Inicializar Service Worker
registerServiceWorker();

// Exportar funciones para uso en otros módulos
export { initLoadingBar, initNavigation, initHoverEffects, loadArticles, loadRoboticsData };