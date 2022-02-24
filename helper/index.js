function statusDisease(level) {
    let status
    if(level == 1){
        status = `Penyakit sangat ringan, konsumsi banyak vitamin dan rajin-rajin berolahraga`
    }else if(level == 2){
        status = `Penyakit ringan, konsumsi obat-obat generic` 
    }else if(level == 3){
        status = `Penyakit menengah, hubungi dokter`
    }else if(level == 4){
        status = `Penyakit lumayan parah, segera hubungi dokter`
    }else if(level == 5){
        status = `Penyakit parah, segera hubungi tuhan untuk bertaubat`
    }
    return status
}

module.exports = statusDisease