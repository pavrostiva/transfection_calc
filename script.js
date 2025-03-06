document.getElementById("upload").addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Загружаем три листа
        const sheet1 = XLSX.utils.sheet_to_json(workbook.Sheets["Sheet1"], { header: 1 });
        const plasmids = XLSX.utils.sheet_to_json(workbook.Sheets["Плазмиды"], { header: 1 });
        const transduction = XLSX.utils.sheet_to_json(workbook.Sheets["Трансдукция ААВ"], { header: 1 });

        // Выводим в таблицы
        renderTable(sheet1, "sheet1");
        renderTable(plasmids, "plasmids");
        renderTable(transduction, "transduction");
    };

    reader.readAsArrayBuffer(file);
});

// Функция для отображения данных в таблице
function renderTable(data, tableId) {
    const table = document.getElementById(tableId);
    table.innerHTML = ""; // Очищаем перед вставкой новых данных

    data.forEach((row) => {
        let tr = document.createElement("tr");
        row.forEach((cell) => {
            let td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
}
