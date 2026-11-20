document.addEventListener('DOMContentLoaded', function () {
    const pillButtons = document.querySelectorAll('.pill-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const editableElements = document.querySelectorAll('.editable');

    // Photo Upload Inputs & Images
    const inputFront = document.getElementById('inputFront');
    const imgFront = document.getElementById('imgFront');
    const inputBack = document.getElementById('inputBack');
    const imgBack = document.getElementById('imgBack');

    // Navigation Helper Function
    function switchTab(targetId) {
        pillButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-target') === targetId);
        });
        tabContents.forEach(content => {
            content.classList.toggle('active', content.id === targetId);
        });
    }

    // 1. Pill Tab Click Events
    pillButtons.forEach(button => {
        button.addEventListener('click', function () {
            const target = this.getAttribute('data-target');
            switchTab(target);
        });
    });

    // Next Section CTA Buttons
    document.getElementById('nextToFamilyBtn').addEventListener('click', () => switchTab('family'));
    document.getElementById('nextToCareerBtn').addEventListener('click', () => switchTab('career'));
    document.getElementById('nextToContactBtn').addEventListener('click', () => switchTab('contact'));

    // 2. Offline Photo Upload Handler (Using Local FileReader API)
    function setupPhotoUpload(inputEl, imgEl, storageKey) {
        const savedImg = localStorage.getItem(storageKey);
        if (savedImg) {
            imgEl.src = savedImg;
        }

        inputEl.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (!file) return;

            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file.');
                return;
            }

            const reader = new FileReader();
            reader.onload = function (event) {
                imgEl.src = event.target.result;
                try {
                    localStorage.setItem(storageKey, event.target.result);
                } catch (err) {
                    // Ignore storage limit if image is very large
                }
            };
            reader.readAsDataURL(file);
        });
    }

    setupPhotoUpload(inputFront, imgFront, 'marriage_bio_front_photo');
    setupPhotoUpload(inputBack, imgBack, 'marriage_bio_back_photo');

    // 3. Auto-Save Editable Text Fields in LocalStorage
    editableElements.forEach(el => {
        const key = 'marriage_bio_' + el.getAttribute('data-key');
        const savedValue = localStorage.getItem(key);
        if (savedValue !== null) {
            el.textContent = savedValue;
        }

        el.addEventListener('input', function () {
            localStorage.setItem(key, el.textContent);
        });
    });

    // 4. Print / Save Complete Biodata as PDF
    document.getElementById('printBiodataBtn').addEventListener('click', () => window.print());
    document.getElementById('printAllBtn').addEventListener('click', () => window.print());

    // 5. Reset All Data to Default
    document.getElementById('resetAllBtn').addEventListener('click', function () {
        if (confirm('Kya aap sabhi details aur photos ko default par reset karna chahte hain?')) {
            localStorage.removeItem('marriage_bio_front_photo');
            localStorage.removeItem('marriage_bio_back_photo');
            editableElements.forEach(el => {
                localStorage.removeItem('marriage_bio_' + el.getAttribute('data-key'));
            });
            location.reload();
        }
    });
});