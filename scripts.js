document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.pill-btn');
    const sections = document.querySelectorAll('.tab-content');
    const fields = document.querySelectorAll('.editable');
    const grid = document.querySelector('.showcase-grid');
    const showTab = id => {
        grid.classList.toggle('photos-hidden', id !== 'personal');
        tabs.forEach(t => t.classList.toggle('active', t.dataset.target === id));
        sections.forEach(s => s.classList.toggle('active', s.id === id));
    };

    tabs.forEach(t => t.addEventListener('click', () => showTab(t.dataset.target)));
    document.getElementById('nextToFamilyBtn').onclick = () => showTab('family');
    document.getElementById('nextToCareerBtn').onclick = () => showTab('career');
    document.getElementById('nextToContactBtn').onclick = () => showTab('contact');

    function loadPhoto(imageId, key) {
        const image = document.getElementById(imageId);
        const saved = localStorage.getItem(key);
        if (saved) image.src = saved;
    }

    loadPhoto('imgFront', 'marriage_bio_front_photo');
    loadPhoto('imgBack', 'marriage_bio_back_photo');

    fields.forEach(field => {
        const key = 'marriage_bio_' + field.dataset.key;
        const saved = localStorage.getItem(key);
        if (saved !== null) field.textContent = saved;
        field.oninput = () => localStorage.setItem(key, field.textContent);
    });
});