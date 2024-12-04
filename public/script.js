document.getElementById('logoUploadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData();
    const logoFile = document.getElementById('logo').files[0];

    if (logoFile) {
        formData.append('logo', logoFile);

        fetch('http://localhost:5000/api/kenf/management/kenf-logo/upload', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                const responseMessage = document.getElementById('responseMessage');
                if (data.message) {
                    responseMessage.innerHTML = `<span style="color: green;">${data.message}</span>`;
                }
            })
            .catch(error => {
                const responseMessage = document.getElementById('responseMessage');
                responseMessage.innerHTML = `<span style="color: red;">Failed to upload logo. Please try again.</span>`;
            });
    }
});
