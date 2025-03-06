// Данные о плазмидах
const plasmidsData = {
    "pAAV-Helper": { length: 11600, concentration: 1.08 },
    "AAV2/6": { length: 7300, concentration: 2.74 },
    "AAV-CMV-EGFP": { length: 5200, concentration: 1.63 }
};

// Коэффициенты для типов объемов
const coefficients = {
    "T175": 1,
    "КРУГЛЫЕ 10см": 0.6,
    "5-level cellstack": 18
};

// Объем среды для каждого типа
const mediumVolume = {
    "T175": 30,
    "КРУГЛЫЕ 10см": 8,
    "5-level cellstack": 3180
};

// Функция для расчета
function calculate() {
    // Получаем значения из полей ввода
    const plasmidHelper = document.getElementById("plasmid_helper").value;
    const plasmidCapsid = document.getElementById("plasmid_capsid").value;
    const plasmidTransgene = document.getElementById("plasmid_transgene").value;

    const plasmidHelperLength = parseFloat(document.getElementById("plasmid_helper_length").value);
    const plasmidCapsidLength = parseFloat(document.getElementById("plasmid_capsid_length").value);
    const plasmidTransgeneLength = parseFloat(document.getElementById("plasmid_transgene_length").value);

    const plasmidHelperConcentration = plasmidsData[plasmidHelper].concentration;
    const plasmidCapsidConcentration = plasmidsData[plasmidCapsid].concentration;
    const plasmidTransgeneConcentration = plasmidsData[plasmidTransgene].concentration;

    const plasmidRatio = document.getElementById("plasmid_ratio").value.split(':').map(r => parseFloat(r.trim()));

    const volumeType = document.getElementById("volume_type").value;
    const coef = coefficients[volumeType];
    const volumeWork = mediumVolume[volumeType];
    const volumeAmount = parseInt(document.getElementById("volume_amount").value);

    // Проверка на корректность ввода
    if (isNaN(plasmidHelperLength) || isNaN(plasmidCapsidLength) || isNaN(plasmidTransgeneLength)) {
        alert("Пожалуйста, введите корректные длины плазмид.");
        return;
    }

    // Расчет объема КЖ
    const KJ = volumeWork * coef * volumeAmount;

    // Расчет суммарного количества ДНК
    const totalDNA = (plasmidHelperConcentration * plasmidRatio[0]) +
                     (plasmidCapsidConcentration * plasmidRatio[1]) +
                     (plasmidTransgeneConcentration * plasmidRatio[2]);

    // Расчет общего количества вирусных геномов (VG)
    const VG = totalDNA * 1e6;

    // Расчет объема микса
    const mixVolume = VG / (10 * 1e6);

    // Вывод результатов
    document.getElementById("output_KJ").textContent = KJ.toFixed(2) + " мл";
    document.getElementById("output_total_dna").textContent = totalDNA.toFixed(2) + " нг";
    document.getElementById("output_VG").textContent = VG.toExponential(2) + " VG";
    document.getElementById("output_mix").textContent = mixVolume.toFixed(2) + " мл";
}

// Привязка события к кнопке
document.getElementById("calculate-btn").addEventListener("click", calculate);