document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("fgRsp4VVowgTYz11D"); // Substitua pelo seu User ID do EmailJS

    document.getElementById('footer-year').textContent = new Date().getFullYear();

    let form = document.getElementById("contact-form");
    let campos = document.querySelectorAll("#contact-form input, #contact-form textarea");

    // Validação dinâmica: muda a cor do campo enquanto o usuário digita
    campos.forEach(campo => {
        campo.addEventListener("input", function () {
            campo.style.border = campo.value.trim() !== "" ? "2px solid green" : "2px solid red";
        });
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        let erros = [];
        let primeiroErro = null;

        // Validação dos campos
        campos.forEach(campo => {
            if (campo.value.trim() === "") {
                let nomeCampo = campo.getAttribute("aria-label") || campo.getAttribute("placeholder") || campo.name;
                erros.push(`❌ O campo '${nomeCampo}' não foi preenchido!`);
                campo.style.border = "2px solid red";

                if (!primeiroErro) {
                    primeiroErro = campo;
                }
            }
        });

        if (erros.length > 0) {
            alert(erros.join("\n"));
            primeiroErro.focus();
            return;
        }

        // Criando objeto com os dados do formulário
        let formData = {
            contact_name: document.getElementById("contact-name").value.trim(),
            contact_email: document.getElementById("contact-email").value.trim(),
            contact_phone: document.getElementById("contact-phone").value.trim(),
            subject: document.getElementById("subject").value.trim(),
            contact_message: document.getElementById("contact-message").value.trim(),
        };

        // Enviar e-mail pelo EmailJS
        emailjs.send("service_w1imy6l", "template_tcfv0lt", formData)
            .then(function () {
                alert("✅ Mensagem enviada com sucesso!");
                form.reset();
                campos.forEach(campo => campo.style.border = "1px solid #ced4da");
            })
            .catch(function (error) {
                alert("❌ Erro ao enviar a mensagem.");
                console.error("Erro: ", error);
            });
    });
});
