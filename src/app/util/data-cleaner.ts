export function cleanData(items: any, O2: boolean, ICU: boolean, normal: boolean): Array<any> {

    let data: Array<any> = [];

    if (!O2 && !ICU && !normal) {
        items.forEach((item: any) => {
            if (item.CovidBedDetails.VaccantO2Beds > 0 || item.CovidBedDetails.VaccantICUBeds > 0 || item.CovidBedDetails.VaccantNonO2Beds > 0) {
                data.push({
                    name: item.Name,
                    landline: item.Landline,
                    mobile: item.MobileNumber,
                    lat: item.Latitude,
                    lon: item.Longitude,
                    oxygenBedsAllotted: item.CovidBedDetails.AllotedO2Beds,
                    oxygenBedsVacant: item.CovidBedDetails.VaccantO2Beds,
                    icuBedsAlotted: item.CovidBedDetails.AllotedICUBeds,
                    icuBedsVacant: item.CovidBedDetails.VaccantICUBeds,
                    normalBedsAlloted: item.CovidBedDetails.OccupancyNonO2Beds,
                    normalBedsVacant: item.CovidBedDetails.VaccantNonO2Beds,
                    mapLink: `https://www.google.com/maps/search/?api=1&query=${item.Latitude},${item.Longitude}`                    
                });
            }
        });
        return data;
    }
    
    items.forEach((item: any) => {
        if (O2 && item.CovidBedDetails.VaccantO2Beds > 0) {
            data.push({
                name: item.Name,
                landline: item.Landline,
                mobile: item.MobileNumber,
                lat: item.Latitude,
                lon: item.Longitude,
                oxygenBedsAllotted: item.CovidBedDetails.AllotedO2Beds,
                oxygenBedsVacant: item.CovidBedDetails.VaccantO2Beds,
                icuBedsAlotted: item.CovidBedDetails.AllotedICUBeds,
                icuBedsVacant: item.CovidBedDetails.VaccantICUBeds,
                normalBedsAlloted: item.CovidBedDetails.OccupancyNonO2Beds,
                normalBedsVacant: item.CovidBedDetails.VaccantNonO2Beds,
                mapLink: `https://www.google.com/maps/search/?api=1&query=${item.Latitude},${item.Longitude}` 
            });
        } else if (ICU && item.CovidBedDetails.VaccantICUBeds > 0) {
            data.push({
                name: item.Name,
                landline: item.Landline,
                mobile: item.MobileNumber,
                lat: item.Latitude,
                lon: item.Longitude,
                oxygenBedsAllotted: item.CovidBedDetails.AllotedO2Beds,
                oxygenBedsVacant: item.CovidBedDetails.VaccantO2Beds,
                icuBedsAlotted: item.CovidBedDetails.AllotedICUBeds,
                icuBedsVacant: item.CovidBedDetails.VaccantICUBeds,
                normalBedsAlloted: item.CovidBedDetails.OccupancyNonO2Beds,
                normalBedsVacant: item.CovidBedDetails.VaccantNonO2Beds,
                mapLink: `https://www.google.com/maps/search/?api=1&query=${item.Latitude},${item.Longitude}` 
            });
        } else if (normal && item.CovidBedDetails.VaccantNonO2Beds > 0) {
            data.push({
                name: item.Name,
                landline: item.Landline,
                mobile: item.MobileNumber,
                lat: item.Latitude,
                lon: item.Longitude,
                oxygenBedsAllotted: item.CovidBedDetails.AllotedO2Beds,
                oxygenBedsVacant: item.CovidBedDetails.VaccantO2Beds,
                icuBedsAlotted: item.CovidBedDetails.AllotedICUBeds,
                icuBedsVacant: item.CovidBedDetails.VaccantICUBeds,
                normalBedsAlloted: item.CovidBedDetails.OccupancyNonO2Beds,
                normalBedsVacant: item.CovidBedDetails.VaccantNonO2Beds,
                mapLink: `https://www.google.com/maps/search/?api=1&query=${item.Latitude},${item.Longitude}` 
            });
        }
    }); 

    console.log(data);
    return data;

}