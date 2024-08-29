// script.js
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('.sidebar ul li a');

    function setActiveSection(id) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        document.querySelector(id).classList.add('active');
    }

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const id = this.getAttribute('href');
            setActiveSection(id);
        });
    });
    setActiveSection('#home');
});
