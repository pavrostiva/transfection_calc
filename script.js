function calculate() {
    // Получаем значения из полей ввода
    let plasmidLength = parseFloat(document.getElementById("plasmid_length").value);
    let dnaAmount = parseFloat(document.getElementById("dna_amount").value);
    let plasmidRatio = parseFloat(document.getElementById("plasmid_ratio").value);
    let volumeWork = parseFloat(document.getElementById("volume_work").value);
    let coef = parseFloat(document.getElementById("coef").value);

    // 🔢 Расчеты
    let KJ = volumeWork * coef;  // Объем КЖ
    let totalPlasmids = dnaAmount * plasmidRatio;  // Суммарное количество плазмид
    let VG = totalPlasmids * plasmidLength * 1e6;  // Количество вирусных геномов
    let mixVolume = VG / (10 * 1e6);  // Примерная формула для объема микса

    // Вывод результатов в таблицу
    document.getElementById("output_KJ").textContent = KJ.toFixed(2) + " мл";
    document.getElementById("output_total_plasmids").textContent = totalPlasmids.toFixed(2) + " нг";
    document.getElementById("output_VG").textContent = VG.toExponential(2) + " VG";
    document.getElementById("output_mix").textContent = mixVolume.toFixed(2) + " мл";
}
