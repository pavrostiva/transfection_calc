function calculate() {
    // Получаем значения из полей ввода
    let plasmidLength = parseFloat(document.getElementById("plasmid_length").value);
    let dnaAmount = parseFloat(document.getElementById("dna_amount").value);
    let plasmidRatio = parseFloat(document.getElementById("plasmid_ratio").value);
    let volumeWork = parseFloat(document.getElementById("volume_work").value);
    let coef = parseFloat(document.getElementById("coef").value);

    // Проверка на корректность значений
    if (isNaN(plasmidLength) || isNaN(dnaAmount) || isNaN(plasmidRatio) || isNaN(volumeWork) || isNaN(coef)) {
        alert("Пожалуйста, убедитесь, что все поля заполнены корректно.");
        return;
    }

    // 🔢 Расчеты
    let KJ = volumeWork * coef;  // Объем КЖ (ml)
    let totalPlasmids = dnaAmount * plasmidRatio;  // Суммарное количество плазмид (нг)
    let VG = totalPlasmids * plasmidLength * 1e6;  // Количество вирусных геномов (VG)
    let mixVolume = VG / (10 * 1e6);  // Примерная формула для объема микса (ml)

    // Отладка: выводим значения в консоль
    console.log(`Длина плазмиды: ${plasmidLength}`);
    console.log(`Количество ДНК: ${dnaAmount}`);
    console.log(`Соотношение плазмид: ${plasmidRatio}`);
    console.log(`Объем наработки: ${volumeWork}`);
    console.log(`Коэффициент перевода: ${coef}`);
    console.log(`Объем КЖ: ${KJ}`);
    console.log(`Суммарное количество плазмид: ${totalPlasmids}`);
    console.log(`Количество вирусных геномов: ${VG}`);
    console.log(`Объем микса: ${mixVolume}`);

    // Вывод результатов в таблицу
    document.getElementById("output_KJ").textContent = KJ.toFixed(2) + " мл";
    document.getElementById("output_total_plasmids").textContent = totalPlasmids.toFixed(2) + " нг";
    document.getElementById("output_VG").textContent = VG.toExponential(2) + " VG";
    document.getElementById("output_mix").textContent = mixVolume.toFixed(2) + " мл";
}
