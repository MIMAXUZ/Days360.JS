//Days360

//event_date is start datea
//event_end_date And Datei

const Days360 = (event_date, event_end_date, res_x, res_y, arrest_date, m) => {
    let d1 = new Date(event_date);
    let d2 = new Date(event_end_date);

    let method = m || false;
    let d1_y = d1.getFullYear();
    let d2_y = d2.getFullYear();
    let dy = 0;
    let d1_m = d1.getMonth();
    let d2_m = d2.getMonth();
    let dm = 0;
    let d1_d = d1.getDate();
    let d2_d = d2.getDate();
    let dd = 0;
    if (method) {
        // euro
        if (d1_d == 31) d1_d = 30;
        if (d2_d == 31) d2_d = 30;
    } else {
        // american NAevent_date
        if (d1_d == 31) d1_d = 30;
        if (d2_d == 31) {
            if (d1_d < 30) {
                if (d2_m == 11) {
                    d2_y = d2_y + 1;
                    d2_m = 0;
                    d2_d = 1;
                } else {
                    d2_m = d2_m + 1;
                    d2_d = 1;
                }
            } else {
                d2_d = 30;
            }
        }
    }
    dy = d2_y - d1_y;
    dm = d2_m - d1_m;
    dd = d2_d - d1_d;

    //Calculates the total date, ie how much time is left from the start time to the end date
    let x = parseFloat(dy * 360 + dm * 30 + dd);
    console.log("x", x);

    const n = Math.round(x - (x * res_x / res_y));
    //We floated n because the residue should disappear
    console.log("n", x - (x * res_x / res_y));

    let year = Math.trunc(n / 360);
    // console.log("n year", year);
    let month = Math.trunc((n % 360) / 30);
    // console.log("n month", month);
    let day = Math.trunc((n % 360) % 30);
    // console.log("n day", day, "Total", Math.trunc(n));

    //initial shortening
    const n_f = Math.round(x - n);
    // console.log("n f", n_f, "x", x, "n", n);

    let year_n_f = Math.trunc(n_f / 360);
    //console.log("year", year_n_f);
    let month_n_f = Math.trunc((n_f % 360) / 30);
    // console.log("month", month_n_f);
    let day_n_f = Math.trunc((n_f % 360) % 30);
    // console.log("day", day_n_f);

    // return date;
    const result_date = AddDate(event_date, year, month, day)
    const result_date_act = AddDate(event_date, year_n_f, month_n_f, day_n_f)

    //Compare with today's date
    const [
        t_year_y,
        t_month_m,
        t_day_d
    ] = CheckWithToday(arrest_date, event_date, n);

    //Total compare
    const [
        a_year_y,
        a_month_m,
        a_day_d
    ] = CheckWithToday(event_date, result_date, n_f);

    //Return values
    return [
        result_date,
        year,
        month,
        day,
        year_n_f,
        month_n_f,
        day_n_f,
        t_year_y,
        t_month_m,
        t_day_d,
        a_year_y,
        a_month_m,
        a_day_d,
        result_date_act,
    ];
}

function AddDate(oldDate, offset, offset_month, offset_day, offsetType) {
    var year = parseInt(oldDate.getFullYear());
    var month = parseInt(oldDate.getMonth());
    var date = parseInt(oldDate.getDate());
    var newDate;
    switch (offsetType) {
        case "Y":
        case "y":
            newDate = new Date(year + offset, month, date);
            break;
        case "M":
        case "m":
            var yearOffset = 0;
            var monthOffset = 0;
            if (offset < 12) {
                yearOffset = Math.floor((month + offset) / 12);
                monthOffset = (month + offset) % 12;
            }
            else {
                yearOffset = Math.floor(offset / 12);
                monthOffset = month % 12 + offset % 12;
            }
            newDate = new Date(year + yearOffset, month + monthOffset, date);
            break;
        case "D":
        case "d":
            var o = oldDate.getTime();
            var n = o + offset * 24 * 3600 * 1000;
            newDate = new Date(n);
            break;
        default:
            newDate = new Date(year + offset, month + offset_month, date + offset_day);
    }
    return newDate;
}
//Calculates how much time has passed since then
const CheckWithToday = (start_date, end_date, year_c, m) => {
    let d1 = new Date(start_date);
    let d2 = new Date(end_date);

    let method = m || false;
    let d1_y = d1.getFullYear();
    let d2_y = d2.getFullYear();
    let dy = 0;
    let d1_m = d1.getMonth();
    let d2_m = d2.getMonth();
    let dm = 0;
    let d1_d = d1.getDate();
    let d2_d = d2.getDate();
    let dd = 0;
    if (method) {
        // euro
        if (d1_d == 31) d1_d = 30;
        if (d2_d == 31) d2_d = 30;
    } else {
        // american NAevent_date
        if (d1_d == 31) d1_d = 30;
        if (d2_d == 31) {
            if (d1_d < 30) {
                if (d2_m == 11) {
                    d2_y = d2_y + 1;
                    d2_m = 0;
                    d2_d = 1;
                } else {
                    d2_m = d2_m + 1;
                    d2_d = 1;
                }
            } else {
                d2_d = 30;
            }
        }
    }
    dy = d2_y - d1_y;
    dm = d2_m - d1_m;
    dd = d2_d - d1_d;

    //Calculate date
    let n = parseFloat(dy * 360 + dm * 30 + dd);
    console.log("All date", n);

    let year = Math.trunc((n + year_c) / 360);
    let month = Math.trunc(((n + year_c) % 360) / 30);
    let day = Math.trunc(((n + year_c) % 360) % 30);

    //Return values
    return [
        year,
        month,
        day,
    ];
}
export default Days360;