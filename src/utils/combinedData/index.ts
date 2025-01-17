
// // Hàm chuyển `block_time` thành định dạng `YYYYMMDD`
const formatToYYYYMMDD = (timestamp: number): number => {
    const date = new Date(timestamp * 1000); // Chuyển UNIX timestamp sang mili giây
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    const day = date.getDate().toString().padStart(2, '0');
    return parseInt(`${year}${month}${day}`, 10); // Trả về số dạng YYYYMMDD
};

// // Hàm tìm giá gần nhất từ `priceData`
// const findClosestPrice = (date: number, priceData: { date: number; price: number }[]) => {
//     return priceData.reduce((closest, current) => {
//         const closestDiff = Math.abs(closest.date - date);
//         const currentDiff = Math.abs(current.date - date);
//         return currentDiff < closestDiff ? current : closest;
//     });
// };

// // Ghép giá SOL vào hoạt động
// const mapActivitiesWithPrice = (
//     activities: typeof tokenDefiActivities,
//     priceData: typeof priceData
// ) => {
//     return activities.map((activity) => {
//         const activityDate = formatToYYYYMMDD(activity.block_time);
//         const closestPrice = findClosestPrice(activityDate, priceData);
//         return {
//             ...activity,
//             solPrice: closestPrice.price // Thêm giá SOL vào hoạt động
//         };
//     });
// };

// // Thực hiện ghép dữ liệu
// const result = mapActivitiesWithPrice(tokenDefiActivities, priceData);