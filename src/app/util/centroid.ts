export function findCentroid(points: Array<any>): Array<any> {

    let coords: Array<any> = [], n = points.length;
    points.forEach(item => {
        if (item.lat != null && item.lon != null) coords.push([item.lat * (Math.PI / 180), item.lon * (Math.PI / 180)]);
    });
    let X, Y, Z, xSum = 0, ySum = 0, zSum = 0;
    coords.forEach(coord => {
        X = Math.cos(coord[0]) * Math.cos(coord[1]);
        Y = Math.cos(coord[0]) * Math.sin(coord[1]);
        Z = Math.sin(coord[0]);
        xSum += X;
        ySum += Y;
        zSum += Z;
    });
    X = xSum / n;
    Y = ySum / n;
    Z = zSum / n;
    let lon = Math.atan2(Y, X) * (180 / Math.PI);
    let hyp = Math.sqrt(X * X + Y * Y);
    let lat = Math.atan2(Z, hyp) * (180 / Math.PI);
    console.log(lon, lat);
    return [lon, lat];

}