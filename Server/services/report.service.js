import { Report } from "../models/ReportModel.js";
const reportFormEnum = {
  denounce: "Tố giác sai phạm",
  register: "Đăng ký nội dung",
  feedback: "Đóng góp ý kiến",
  question: "Giải đáp thắc mắc",
};
const ReportService = {
  async getAll(filter, projection) {
    try {
      // Modfied by Quang Thanh to update field for front end
      const reports = await Report.find({})
        .populate({
          path: "location",
          model: "Location",
          populate: [
            {
              path: "ward",
              model: "Ward",
              select: "-coordinates -__v",
            },
            {
              path: "district",
              model: "District", // Thay thế bằng tên thực tế của mô hình District
              select: "-coordinates -__v -ward_ids",
            },
            {
              path: "location_type",
              model: "LocationType", // Thay thế bằng tên thực tế của mô hình LocationType
              select: "-__t -__v ",
            },
            {
              path: "ads_type",
              model: "AdsType", // Thay thế bằng tên thực tế của mô hình AdsType
              select: "-__t -__v ",
            },
          ],
        })
        .populate({
          path: "board",
          model: "AdsBoard", // Replace with the actual name of the Board model
          populate: {
            path: "location",
            model: "Location", // Replace with the actual name of the Location model
            populate: [
              {
                path: "ward",
                model: "Ward", // Replace with the actual name of the Location model
                select: "-coordinates -__v",
              },
              {
                path: "district",
                model: "District", // Replace with the actual name of the Location model
                select: "-coordinates -__v -ward_ids",
              },
              {
                path: "location_type",
                model: "LocationType", // Thay thế bằng tên thực tế của mô hình LocationType
                select: "-__t -__v ",
              },
              {
                path: "ads_type",
                model: "AdsType", // Thay thế bằng tên thực tế của mô hình AdsType
                select: "-__t -__v ",
              },
            ],
          },
        })
        .populate({
          path: "operation.user",
          model: "User", // Replace with the actual name of the User model
          select: "-password",
        })
        .lean()
        .exec();
      reports.forEach((report) => {
        report.report_form = reportFormEnum[report.report_form];
      });

      return reports;
    } catch (error) {
      console.error("Error getting reports:", error);
      throw error;
    }
  },
  // async getAll() {
  //   return await Report.find();
  // },

  async getById(id) {
    const report = await Report.findById(id)
      .populate({
        path: "location",
        model: "Location", // Replace with the actual name of the Location model
        populate: [
          {
            path: "ward",
            model: "Ward", // Thay thế bằng tên thực tế của mô hình Ward
            select: "-coordinates -__v",
          },
          {
            path: "district",
            model: "District", // Thay thế bằng tên thực tế của mô hình District
            select: "-coordinates -__v -ward_ids",
          },
          {
            path: "location_type",
            model: "LocationType", // Thay thế bằng tên thực tế của mô hình LocationType
            select: "-__t -__v ",
          },
          {
            path: "ads_type",
            model: "AdsType", // Thay thế bằng tên thực tế của mô hình AdsType
            select: "-__t -__v ",
          },
        ],
      })
      .populate({
        path: "board",
        model: "AdsBoard", // Replace with the actual name of the Board model
        populate: {
          path: "location",
          model: "Location", // Replace with the actual name of the Location model
          populate: [
            {
              path: "ward",
              model: "Ward", // Replace with the actual name of the Location model
              select: "-coordinates -__v",
            },
            {
              path: "district",
              model: "District", // Replace with the actual name of the Location model
              select: "-coordinates -__v -ward_ids",
            },
            {
              path: "location_type",
              model: "LocationType", // Thay thế bằng tên thực tế của mô hình LocationType
              select: "-__t -__v ",
            },
            {
              path: "ads_type",
              model: "AdsType", // Thay thế bằng tên thực tế của mô hình AdsType
              select: "-__t -__v ",
            },
          ],
        },
      })
      .populate({
        path: "operation.user",
        model: "User", // Replace with the actual name of the User model
        select: "-password",
      })
      .lean()
      .exec();
    // if (report && report.type == 'location') {
    //   // Xử lý và thêm trường "address" dựa trên thông tin từ "location"
    //   report.address = report.location.address;
    // } else {
    //   report.address = report.board.location.address;
    // }

    report.report_form = reportFormEnum[report.report_form];

    return report;
  },

  async create(objectData) {
    const newObject = new Report(objectData);
    let object = await newObject.save();
    object.report_form = reportFormEnum[object.report_form];
    return object;
    // const result = await Report.updateMany({}, {
    //   operation: {}
    // })
  },

  async update(id, updateData) {
    let object = await Report.findByIdAndUpdate(id, updateData, { new: true });
    object.report_form = reportFormEnum[object.report_form];
    return object;
  },

  async delete(id) {
    return await Report.findByIdAndDelete(id);
  },
};

export default ReportService;
