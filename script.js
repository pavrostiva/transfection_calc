// Функция для расчета
function calculate() {
    // Получаем значения из полей ввода
    let plasmidHelperConcentration = parseFloat(document.getElementById("plasmid_helper_concentration").value);
    let plasmidCapsidConcentration = parseFloat(document.getElementById("plasmid_capsid_concentration").value);
    let plasmidTransgeneConcentration = parseFloat(document.getElementById("plasmid_transgene_concentration").value);

    // Парсим соотношение плазмид
    let plasmidRatio = document.getElementById("plasmid_ratio").value.split(':').map(r => parseFloat(r.trim()));

    // Проверка на корректность значений
    if (isNaN(plasmidHelperConcentration) || isNaN(plasmidCapsidConcentration) || isNaN(plasmidTransgeneConcentration) || plasmidRatio.length !== 3) {
        alert("Пожалуйста, убедитесь, что все поля заполнены корректно.");
        return;
    }

    // Получаем выбранный тип емкости для наработки
    let volumeType = document.getElementById("volume_type").value;
    let coef = 0;

    // Устанавливаем коэффициент перевода в зависимости от типа емкости
    if (volumeType === "T175") {
        coef = 1;
    } else if (volumeType === "КРУГЛЫЕ 10см") {
        coef = 0.6;
    } else if (volumeType === "5-level cellstack") {
        coef = 18;
    }

    // Устанавливаем значение коэффициента перевода в поле
    document.getElementById("coef").value = coef;

    let volumeWork = parseFloat(document.getElementById("volume_work_ml").value);

    // Проверка на корректность значений
    if (isNaN(volumeWork) || isNaN(coef)) {
        alert("Пожалуйста, убедитесь, что объем и коэффициент перевода введены корректно.");
        return;
    }

    // Расчет объема КЖ (ml)
    let KJ = volumeWork * coef;  

    // Расчет суммарного количества ДНК для всех трех плазмид с учетом их соотношений
    let totalDNA = (plasmidHelperConcentration * plasmidRatio[0]) + 
                   (plasmidCapsidConcentration * plasmidRatio[1]) + 
                   (plasmidTransgeneConcentration * plasmidRatio[2]);

    // Расчет общего количества вирусных геномов (VG) и объема микса
    let VG = totalDNA * 1e6;  // Примерная формула для количества вирусных геномов (VG)
    let mixVolume = VG / (10 * 1e6);  // Примерная формула для объема микса (ml)

    // Вывод результатов
    document.getElementById("output_KJ").textContent = KJ.toFixed(2) + " мл";
    document.getElementById("output_total_dna").textContent = totalDNA.toFixed(2) + " нг";
    document.getElementById("output_VG").textContent = VG.toExponential(2) + " VG";
    document.getElementById("output_mix").textContent = mixVolume.toFixed(2) + " мл";
}

// Привязка события к кнопке
document.getElementById("calculate-btn").addEventListener("click", calculate);
