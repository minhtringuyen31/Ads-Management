const SocketListener = {
    start: function (io) {
        io.on('connection', async function (socket) {

            console.log('A user connected with socket id:', socket.id);

            // Giả sử cán bộ phường/quận gửi thông tin này khi kết nối
            const { ward, district, uuid } = socket.handshake.query;

            global.userList[uuid] = socket.id;

            // Tham gia vào room dựa trên phường/quận
            if (ward) {
                socket.join(`ward_${ward}`);
            }
            if (district) {
                socket.join(`district_${district}`);
            }

            // Xử lý sự kiện new_report từ người dân
            socket.on('new_report', (report) => {
                console.log('Nhận báo cáo mới:', report);

                // Lưu trữ báo cáo cùng với code
                global.userList[report.code] = socket.id;
                // Simulate a delay of 2 seconds
                setTimeout(() => {
                    // TODO: Save the report to the database here (replace the comment with your actual database saving code)
                    const newReport = { ...report, code: report.code }
                    console.log('Lưu trữ báo cáo:', socket.id);
                    // Gửi code trở lại cho người dân

                    // Gửi báo cáo đến cán bộ phường/quận
                    if (report.ward) {
                        io.to(`ward_${report.ward}`).emit('new_report', newReport);
                    }
                    if (report.district) {
                        io.to(`district_${report.district}`).emit('new_report', newReport);
                    }
                    console.log('Báo cáo đã được lưu sau 2 giây');
                }, 3000); // 2000 milliseconds = 2 seconds


            });

            socket.on('report_response', (response) => {
                console.log("Report response:", response);
                io.to(global.userList[response.code]).emit('report_response', {
                    code: response.code,
                    message: response.message
                });
            });
            socket.on('disconnect', () => {
                const disconnectedUserId = Object.keys(global.userList).find(
                    (key) => global.userList[key] === socket.id
                );
                if (disconnectedUserId) {
                    delete global.userList[disconnectedUserId];
                    console.log(`User ${disconnectedUserId} has disconnected.`);
                    console.log(global.userList);
                }
            });
        });
    },
};
// config socket
export default SocketListener;
