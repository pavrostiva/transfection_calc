# Ввод параметров
L1 <- 11635 # Длина плазмиды pAAV-Helper (Сириус)
L2 <- 8369  # Длина плазмиды AAV2/6 (Сириус)
L3 <- 7285  # Длина плазмиды AAV-CMV-EGFP (Сириус)

# Молярное соотношение плазмид
M1 <- 1 
M2 <- 1
M3 <- 1

# Объем наработки
working_volume <- 8 # 8xT175

# Выбор флакона и коэффициента перевода площадь-КЖ
flask_type <- "T175" # Можно выбрать: "T175", "КРУГЛЫЕ10СМ", "5-level cellstack", "10-level cellstack"

# Устанавливаем коэффициент K в зависимости от типа флакона
if (flask_type == "T175") {
  K <- 1
} else if (flask_type == "КРУГЛЫЕ10СМ") {
  K <- 0.6
} else if (flask_type == "5-level cellstack") {
  K <- 18
} else if (flask_type == "10-level cellstack") {
  K <- 36
} else {
  stop("Неизвестный тип флакона. Пожалуйста, выберите один из следующих: T175, КРУГЛЫЕ10СМ, 5-level cellstack, 10-level cellstack.")
}

# Кол-во ДНК на 1 мл КЖ
DNA_per_ml <- 1.5

# Объем среды на 1 флакон Т175, мл
medium_per_flask <- 30

#Объем микса дмем и пеи и плазмид на флакон Т175
TF_mixture_volume_per_flask <- 3

# Коэффициент PEI/DNA
PEI_to_DNA <- 3

# Концентрация плазмид, мкг/мкл
conc1 <- 1.1 
conc2 <- 2.335 
conc3 <- 1.01 

# Расчет количества ДНК с учетом молекулярной массы
V1 <- L1 * 660 / 10^6 
V2 <- L2 * 660 / 10^6
V3 <- L3 * 660 / 10^6

DNA1 <- V1 * M1
DNA2 <- V2 * M2
DNA3 <- V3 * M3

# Общее количество ДНК
total_DNA <- DNA1 + DNA2 + DNA3

# Расчет суммарного количества плазмид
total_plasmid <- working_volume * K * DNA_per_ml * medium_per_flask

# Суммарное количество PEI
total_PEI <- total_plasmid * PEI_to_DNA

# Коэффициент для расчета
coefficient <- total_plasmid / total_DNA

# Расчет на все чашки
X1 <- coefficient * DNA1
X2 <- coefficient * DNA2
X3 <- coefficient * DNA3

# Объем плазмид, мкл
Volume1 <- X1 / conc1
Volume2 <- X2 / conc2
Volume3 <- X3 / conc3

# Общий объем плазмид, мкл
total_plasmid_volume <- Volume1 + Volume2 + Volume3

# Сколько суммарно среды к ДНК, мл
media_for_DNA <- (working_volume * K * TF_mixture_volume_per_flask/2 - total_plasmid_volume * 0.001)

# Сколько суммарно среды к PEI, мл
media_for_PEI <- (working_volume * K * TF_mixture_volume_per_flask/2 - total_PEI * 0.001)

# Объем микса с DMEM на чашку
DMEM_per_dish <- (media_for_DNA + total_plasmid_volume * 0.001 + media_for_PEI + total_PEI * 0.001) / working_volume

# Проверка объема микса на чашку
mix_check <- 3 # Общий объем микса на флакон, мл

# Суммарно микс теоретически
total_mix_theoretical <- mix_check * working_volume

# Вывод результатов
cat("ДНК всего (мкг): ", round(total_DNA, 2), "\n")
cat("Общее количество плазмид: ", total_plasmid, "\n")
cat("Суммарное количество PEI, мкл: ", total_PEI, "\n")
cat("Общий объем плазмид, мкл: ", round(total_plasmid_volume, 2), "\n")
cat("Сколько суммарно среды к ДНК, мл: ", round(media_for_DNA, 1), "\n")
cat("Сколько суммарно среды к PEI, мл: ", round(media_for_PEI, 1), "\n")
cat("Объем микса с DMEM на чашку: ", DMEM_per_dish, "\n")
cat("Проверка объема микса на чашку: ", mix_check, "\n")
cat("Суммарно микс теоретически: ", total_mix_theoretical, "\n")

# Вывод объема каждой плазмиды с округлением до сотых
cat("\nОбъем каждой плазмиды (мкл):\n")
cat("Объем pAAV-Helper: ", round(Volume1, 2), "мкл\n")
cat("Объем AAV2/6: ", round(Volume2, 2), "мкл\n")
cat("Объем AAV-CMV-EGFP: ", round(Volume3, 2), "мкл\n")

# Проверка правильности объема микса
if (abs(DMEM_per_dish - mix_check) < 1e-6) {
  cat("Объем микса с DMEM на чашку = ", DMEM_per_dish, "и расчет верный\n")
}

# Принципы расчета
cat("\nПринципы расчета:\n")
cat("1. Количество ДНК на 1 pmol рассчитывается по формуле: V = Длина плазмиды * 660 / 10^6.\n")
cat("2. Молекулярная масса ДНК на основе длины плазмиды, умноженной на 660 (г/моль на пару оснований).\n")
cat("3. Количество плазмид рассчитывается на основе площади флакона, коэффициента и концентрации ДНК в КЖ.\n")
cat("4. Количество PEI рассчитывается как произведение общего количества плазмид на коэффициент PEI/DNA.\n")
cat("5. Объемы плазмид и общей среды рассчитываются с учетом их концентраций и объема.\n")