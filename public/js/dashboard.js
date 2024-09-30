document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.sidebar ul li a');
    const contentSection = document.getElementById('content');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');

            // Fetch orqali ma'lumotni yuklash
            fetch(`/${section}`)
                .then(response => response.text())
                .then(html => {
                    contentSection.innerHTML = html;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    });
});
