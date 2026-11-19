document.addEventListener('DOMContentLoaded', function () {

    const ubicacion = document.getElementById('ubicacion');
    
    // Contenedores
    const grupoDomicilio = document.getElementById('grupoDomicilio');
    const grupoTramites = document.getElementById('grupoTramites');

    // Inputs
    const direccionDomicilio = document.getElementById('direccionDomicilio');
    const direccionAcompanamiento = document.getElementById('direccionAcompanamiento');
    const direccionTramites = document.getElementById('direccionTramites');

    const descripcion = document.getElementById('descripcion');
    const contador = document.getElementById('contadorPalabras');
    const btnEnviar = document.getElementById('btnEnviar');

    // MOSTRAR / OCULTAR CAMPOS
    ubicacion.addEventListener('change', function () {
        const valor = ubicacion.value;

        // Ocultar todos
        grupoDomicilio.classList.remove('visible');
        grupoTramites.classList.remove('visible');

        // Limpiar valores
        direccionDomicilio.value = '';
        direccionAcompanamiento.value = '';
        direccionTramites.value = '';

        // Mostrar según selección
        if (valor === 'Acompañamiento domiciliario') {
            grupoDomicilio.classList.add('visible');
        } else if (valor === 'Acompañamiento en trámites y gestión médica') {
            grupoTramites.classList.add('visible');
        }
    });

    // CONTADOR DE PALABRAS
    descripcion.addEventListener('input', function () {
        const palabras = descripcion.value.trim() === '' ? 0 : descripcion.value.trim().split(/\s+/).length;
        contador.textContent = palabras + ' / 100 palabras';
        contador.style.color = palabras > 100 ? 'red' : '#777';
    });

    // ENVIAR
    btnEnviar.addEventListener('click', function () {
        try {
            const nombrePaciente = document.getElementById('nombrePaciente').value.trim();
            const nombreContratante = document.getElementById('nombreContratante').value.trim();
            const ubicacionSel = ubicacion.value;
            
            const dirDomicilioVal = direccionDomicilio.value.trim();
            const dirAcompanamientoVal = direccionAcompanamiento.value.trim();
            const dirTramitesVal = direccionTramites.value.trim();
            
            const dia = document.getElementById('dia').value;
            const horario = document.getElementById('horario').value;
            const descripcionCaso = descripcion.value.trim();

            // Validación de campos obligatorios
            if (!nombrePaciente || !nombreContratante || !ubicacionSel || !dia || !horario || !descripcionCaso) {
                alert('Por favor, complete todos los campos obligatorios.');
                return;
            }

            if (ubicacionSel === 'Acompañamiento domiciliario' && !dirDomicilioVal) {
                alert('Por favor, complete la dirección del acompañamiento.');
                return;
            }

            if (ubicacionSel === 'Acompañamiento en trámites y gestión médica' && (!dirAcompanamientoVal || !dirTramitesVal)) {
                alert('Por favor, complete la dirección del acompañamiento y la del lugar de los trámites.');
                return;
            }

            // Validación de palabras
            const cantidadPalabras = descripcionCaso.split(/\s+/).length;
            if (cantidadPalabras > 100) {
                alert('La descripción no puede superar las 100 palabras. Actualmente tiene ' + cantidadPalabras + '.');
                return;
            }

            // ⚠️ Número de WhatsApp
            const numeroWhatsApp = "5492262364046";
            
            // Formatear fecha
            const [anio, mes, diaNum] = dia.split('-');
            const diaFormateado = diaNum + '/' + mes + '/' + anio;

            // Armar mensaje (sin emojis, solo texto plano)
            let mensaje =
                "Nueva solicitud - Acompaña Salud\n\n" +
                "Paciente: " + nombrePaciente + "\n" +
                "Contratante: " + nombreContratante + "\n" +
                "Ubicación: " + ubicacionSel + "\n";

            if (ubicacionSel === 'Acompañamiento domiciliario') {
                mensaje += "Dirección del acompañamiento: " + dirDomicilioVal + "\n";
            }

            if (ubicacionSel === 'Acompañamiento en trámites y gestión médica') {
                mensaje += "Dirección del acompañamiento: " + dirAcompanamientoVal + "\n";
                mensaje += "Dirección de los trámites: " + dirTramitesVal + "\n";
            }

            mensaje +=
                "Día: " + diaFormateado + "\n" +
                "Horario: " + horario + "\n\n" +
                "Descripción:\n" + descripcionCaso;

            // Codificar UNA sola vez al final
            const mensajeEncoded = encodeURIComponent(mensaje);

            const url = "https://wa.me/" + numeroWhatsApp + "?text=" + mensajeEncoded;
            window.location.href = url;

        } catch (error) {
            console.error('Error al enviar:', error);
            alert('Ocurrió un error al enviar: ' + error.message);
        }
    });
});