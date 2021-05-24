let insertItem = (data: Array<any>, item: any, noCoords: Array<any>): void => {

    let lat = item.Latitude, lon = item.Longitude;
    let details = {
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
        mapLink: `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`                    
    }
    if (lat == null || lon == null) {
        details.mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURI(item.Name)}`;
        noCoords.push(details);
    }
    data.push(details);

}

export function cleanData(items: any, O2: boolean, ICU: boolean, normal: boolean): Array<any> {

    let data: Array<any> = [];
    let noCoords: Array<any> = [];

    if (!O2 && !ICU && !normal) {
        items.forEach((item: any) => {
            if (item.CovidBedDetails.VaccantO2Beds > 0 || item.CovidBedDetails.VaccantICUBeds > 0 || item.CovidBedDetails.VaccantNonO2Beds > 0) {
                insertItem(data, item, noCoords);
            }
        });
        return [data, noCoords];
    }
    
    items.forEach((item: any) => {
        if (O2 && item.CovidBedDetails.VaccantO2Beds > 0) {
            insertItem(data, item, noCoords);
        } else if (ICU && item.CovidBedDetails.VaccantICUBeds > 0) {
            insertItem(data, item, noCoords);
        } else if (normal && item.CovidBedDetails.VaccantNonO2Beds > 0) {
            insertItem(data, item, noCoords);
        }
    }); 

    console.log(data);
    return [data, noCoords];

}