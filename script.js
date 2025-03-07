async function runPythonCode() {
    await loadPyodide(); // Загружаем Pyodide

    const L1 = parseFloat(document.getElementById('L1').value);
    const L2 = parseFloat(document.getElementById('L2').value);
    const L3 = parseFloat(document.getElementById('L3').value);
    const M1 = parseFloat(document.getElementById('M1').value);
    const M2 = parseFloat(document.getElementById('M2').value);
    const M3 = parseFloat(document.getElementById('M3').value);
    const working_volume = parseFloat(document.getElementById('working_volume').value);
    const flask_type = document.getElementById('flask_type').value;
    const conc1 = parseFloat(document.getElementById('conc1').value);
    const conc2 = parseFloat(document.getElementById('conc2').value);
    const conc3 = parseFloat(document.getElementById('conc3').value);

    const pythonCode = `
import math

# Ввод параметров
L1 = ${L1}
L2 = ${L2}
L3 = ${L3}
M1 = ${M1}
M2 = ${M2}
M3 = ${M3}
working_volume = ${working_volume}
flask_type = "${flask_type}"
conc1 = ${conc1}
conc2 = ${conc2}
conc3 = ${conc3}

# Устанавливаем коэффициент K в зависимости от типа флакона
if flask_type == "T175":
    K = 1
elif flask_type == "КРУГЛЫЕ10СМ":
    K = 0.6
elif flask_type == "5-level cellstack":
    K = 18
elif flask_type == "10-level cellstack":
    K = 36

# Расчет количества ДНК с учетом молекулярной массы
V1 = L1 * 660 / 10**6
V2 = L2 * 660 / 10**6
V3 = L3 * 660 / 10**6

DNA1 = V1 * M1
DNA2 = V2 * M2
DNA3 = V3 * M3

total_DNA = DNA1 + DNA2 + DNA3

# Расчет суммарного количества плазмид
total_plasmid = working_volume * K * 1.5 * 30

# Суммарное количество PEI
total_PEI = total_plasmid * 3

# Коэффициент для расчета
coefficient = total_plasmid / total_DNA

# Расчет на все чашки
X1 = coefficient * DNA1
X2 = coefficient * DNA2
X3 = coefficient * DNA3

# Объем плазмид, мкл
Volume1 = X1 / conc1
Volume2 = X2 / conc2
Volume3 = X3 / conc3

# Общий объем плазмид, мкл
total_plasmid_volume = Volume1 + Volume2 + Volume3

# Сколько суммарно среды к ДНК, мл
media_for_DNA = (working_volume * K * 3 / 2 - total_plasmid_volume * 0.001)

# Сколько суммарно среды к PEI, мл
media_for_PEI = (working_volume * K * 3 / 2 - total_PEI * 0.001)

# Объем микса с DMEM на чашку
DMEM_per_dish = (media_for_DNA + total_plasmid_volume * 0.001 + media_for_PEI + total_PEI * 0.001) / working_volume

# Результаты
results_PEI = {
    "Суммарное количество PEI": round(total_PEI, 2),
    "Среда для PEI": round(media_for_PEI, 2),
}

results_plasmids = {
    "Среда для ДНК": round(media_for_DNA, 2),
    "Объем pAAV-Helper": round(Volume1, 2),
    "Объем capsid AAV": round(Volume2, 2),
    "Объем AAV pITR": round(Volume3, 2),
}

mixVolume = f"Объем микса с DMEM на чашку: {round(DMEM_per_dish, 2)} мл"
totalMixVolume = f"Суммарно микс занимает объем: {round(DMEM_per_dish * working_volume, 2)} мл"

(results_PEI, results_plasmids, mixVolume, totalMixVolume)
    `;
  
    const results = await pyodide.runPython(pythonCode);
    const resultsPEI = JSON.parse(results)[0];
    const resultsPlasmids = JSON.parse(results)[1];
    const mixVolume = JSON.parse(results)[2];
    const totalMixVolume = JSON.parse(results)[3];

    // Update the HTML with the results
    const peTable = document.getElementById("resultsPEI").getElementsByTagName('tbody')[0];
    peTable.innerHTML = "";
    for (const key in resultsPEI) {
        const row = peTable.insertRow();
        row.insertCell(0).textContent = key;
        row.insertCell(1).textContent = resultsPEI[key];
    }

    const plasmidsTable = document.getElementById("resultsPlasmids").getElementsByTagName('tbody')[0];
    plasmidsTable.innerHTML = "";
    for (const key in resultsPlasmids) {
        const row = plasmidsTable.insertRow();
        row.insertCell(0).textContent = key;
        row.insertCell(1).textContent = resultsPlasmids[key];
    }

    document.getElementById('mixVolume').textContent = mixVolume;
    document.getElementById('totalMixVolume').textContent = totalMixVolume;
}

document.getElementById('calculateButton').addEventListener('click', runPythonCode);
