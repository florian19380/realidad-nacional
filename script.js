document.addEventListener('DOMContentLoaded', () => {
    // Carrusel de Personajes
    const characterCarouselTrack = document.getElementById('characterCarouselTrack');
    const characterCarouselItems = Array.from(characterCarouselTrack.children);
    const characterPrevButton = document.querySelector('.character-carousel-arrow.prev-arrow');
    const characterNextButton = document.querySelector('.character-carousel-arrow.next-arrow');
    const characterCarouselDotsContainer = document.getElementById('characterCarouselDots');

    let characterCurrentIndex = 0;
    const itemsPerPage = 3; // Mostrar 3 personajes a la vez
    let characterAutoSlideInterval;

    if (characterCarouselTrack && characterCarouselItems.length > 0) {
        // Crear puntos de navegación para los "grupos" de slides
        const totalPages = Math.ceil(characterCarouselItems.length / itemsPerPage);
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.classList.add('character-carousel-dot');
            if (i === 0) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                clearInterval(characterAutoSlideInterval);
                moveToCharacterSlide(i * itemsPerPage); // Mueve al inicio de la página de items
                startCharacterAutoSlide();
            });
            characterCarouselDotsContainer.appendChild(dot);
        }

        const characterDots = Array.from(characterCarouselDotsContainer.children);

        // Función para mover el carrusel a un slide específico
        const moveToCharacterSlide = (index) => {
            characterCarouselTrack.style.transform = `translateX(-${index * (100 / itemsPerPage)}%)`;
            characterCurrentIndex = index;
            updateCharacterDots();
        };

        // Función para actualizar los puntos de navegación
        const updateCharacterDots = () => {
            characterDots.forEach(dot => dot.classList.remove('active'));
            const activeDotIndex = Math.floor(characterCurrentIndex / itemsPerPage);
            if (characterDots[activeDotIndex]) {
                characterDots[activeDotIndex].classList.add('active');
            }
        };

        // Navegación con flechas
        characterPrevButton.addEventListener('click', () => {
            clearInterval(characterAutoSlideInterval);
            let newIndex = characterCurrentIndex - itemsPerPage;
            if (newIndex < 0) {
                newIndex = (totalPages - 1) * itemsPerPage; // Volver al final
                if (newIndex >= characterCarouselItems.length) { // Ajuste para el último grupo incompleto
                    newIndex = characterCarouselItems.length - itemsPerPage;
                }
            }
            moveToCharacterSlide(newIndex);
            startCharacterAutoSlide();
        });

        characterNextButton.addEventListener('click', () => {
            clearInterval(characterAutoSlideInterval);
            let newIndex = characterCurrentIndex + itemsPerPage;
            if (newIndex >= characterCarouselItems.length) {
                newIndex = 0; // Volver al inicio
            }
            moveToCharacterSlide(newIndex);
            startCharacterAutoSlide();
        });

        // Función de auto-slide
        const startCharacterAutoSlide = () => {
            characterAutoSlideInterval = setInterval(() => {
                let newIndex = characterCurrentIndex + itemsPerPage;
                if (newIndex >= characterCarouselItems.length) {
                    newIndex = 0;
                }
                moveToCharacterSlide(newIndex);
            }, 5000); // Cambia cada 5 segundos
        };

        // Iniciar el auto-slide
        startCharacterAutoSlide();
        updateCharacterDots(); // Asegurar que el primer punto esté activo al cargar
    }
});