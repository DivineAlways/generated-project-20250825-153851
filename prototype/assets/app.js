document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'assets/dummy-data.json';

    const fetchData = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Could not fetch data:", error);
            return null;
        }
    };

    const renderModules = (modules) => {
        const container = document.getElementById('modules-grid');
        if (!container) return;
        container.innerHTML = modules.map(module => `
            <div class="module-card">
                <div class="icon">${module.icon}</div>
                <h3>${module.title}</h3>
                <p>${module.description}</p>
            </div>
        `).join('');
    };

    const renderTestimonials = (testimonials) => {
        const container = document.getElementById('testimonials-grid');
        if (!container) return;
        container.innerHTML = testimonials.map(testimonial => `
            <div class="testimonial-card">
                <p class="quote">"${testimonial.quote}"</p>
                <p class="author">- ${testimonial.author} (${testimonial.handle})</p>
            </div>
        `).join('');
    };

    const renderFaqs = (faqs) => {
        const container = document.getElementById('faq-container');
        if (!container) return;
        container.innerHTML = faqs.map((faq, index) => `
            <div class="faq-item">
                <div class="faq-question" data-index="${index}">
                    ${faq.question}
                </div>
                <div class="faq-answer">
                    <p>${faq.answer}</p>
                </div>
            </div>
        `).join('');
    };

    const addFaqToggle = () => {
        const faqContainer = document.getElementById('faq-container');
        if (!faqContainer) return;

        faqContainer.addEventListener('click', (e) => {
            const question = e.target.closest('.faq-question');
            if (question) {
                const item = question.parentElement;
                item.classList.toggle('active');
            }
        });
    };

    const updateCourseInfo = (course) => {
        document.getElementById('hero-title').textContent = course.title;
        document.getElementById('hero-tagline').textContent = course.tagline;
        document.getElementById('hero-cta').textContent = course.cta;
        document.getElementById('enroll-cta').textContent = course.cta;
        document.getElementById('course-price').textContent = course.price;
    };
    
    const smoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    };

    const init = async () => {
        const data = await fetchData();
        if (!data) {
            // Render some fallback content or an error message
            document.body.innerHTML = '<p style="color: white; text-align: center; padding-top: 50px;">Failed to load course content. Please try again later.</p>';
            return;
        }

        updateCourseInfo(data.course);
        renderModules(data.modules);
        renderTestimonials(data.testimonials);
        renderFaqs(data.faqs);
        addFaqToggle();
        smoothScroll();
    };

    init();
});