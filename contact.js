document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");

    if (!form) return;

    const submitBtn = document.getElementById("submitBtn");
    const successMsg = document.getElementById("formSuccess");

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        successMsg.style.display = "none";

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span class="spinner-border spinner-border-sm"></span>
            Sending...
        `;

        const formData = new FormData(form);

        const data = {
            full_name: formData.get("full_name"),
            organisation_name: formData.get("organisation_name"),
            designation: formData.get("designation"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            city: formData.get("city"),
            state: formData.get("state"),
            organisation_type: formData.get("organisation_type"),
            message: formData.get("message"),
            website: formData.get("website"),
            interested_in: []
        };

        document
            .querySelectorAll('input[name="interested_in"]:checked')
            .forEach(item => {
                data.interested_in.push(item.value);
            });

        try {

    const response = await fetch(
    "https://caresstech.in/api/contact",
    {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)

            });

            const result = await response.json();

            if (response.ok && result.success) {

                form.reset();

                successMsg.style.display = "block";

                successMsg.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            } else {

                alert(result.message || "Submission failed.");

            }

        } catch (error) {

            console.error(error);

            alert("Network error. Please try again.");

        } finally {

            submitBtn.disabled = false;

            submitBtn.innerHTML = "Send Inquiry";

        }

    });

});
