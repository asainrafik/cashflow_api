var dbConn = require("../../config/db.config");

var GradeSection = function (gradeSection) {
    this.grade_id = gradeSection.grade_id;
    this.section = gradeSection.section;
    this.academic_year_id = gradeSection.academic_year_id;
    this.created_at = new Date();
    this.updated_at = new Date();
};

GradeSection.getAllGradeSectionModel = (result) => {
    dbConn.query("SELECT * FROM grade_section", (err, res) => {
        if (res) {
            console.log("Grade Section fetched successfully");
            result(null, res);
        } else {
            console.log("error fetching data year");
            result(null, err);
        }
    });
};

GradeSection.createGradeSectionModel = (gradeSectionReqData, result) => {
    console.log(gradeSectionReqData, "+++++");
    dbConn.query(
        `select * from grade_section where grade_id="${gradeSectionReqData.grade_id}" and section="${gradeSectionReqData.section}" and academic_year_id=${gradeSectionReqData.academic_year_id};`,
        (err, res) => {
            if (res) {
                console.log("year fetched successfully");
                console.log(res);
                if (res.length > 0) {
                    result(null, { IsExsist: true, duplication: res });
                } else {
                    dbConn.query("INSERT into grade_section SET ?", gradeSectionReqData, (err, res) => {
                        if (res) {
                            console.log("year inserted successfully");
                            let finaldata = {
                                id: res.insertId,
                                ...gradeSectionReqData,
                            };
                            result(null, { IsExsist: false, data: finaldata });
                        } else {
                            console.log("error inserting data year");
                            result(null, err);
                        }
                    });
                }
            } else {
                console.log("error fetching data year");
                result(null, err);
            }
        }
    );
};

GradeSection.deleteGradeSectionModel = (gradeSectionReqData, result) => {
    dbConn.query(`SELECT * FROM year_of_fees WHERE  grade_id=${gradeSectionReqData.grade_section_id}`, (err, res) => {
        if (res) {
            console.log("year fetched successfully");
            console.log(res);
            if (res.length > 0) {
                result(null, { isDeletable: false, data: { res } });
            } else {
                let gradeToFind = { grade_section_id: gradeSectionReqData.grade_section_id };
                dbConn.query("DELETE FROM grade_section WHERE ?", gradeToFind, (err, res) => {
                    if (res) {
                        console.log("year deleted successfully");
                        console.log(res);
                        result(null, { isDeletable: true, record: "record Deleted" });
                    } else {
                        console.log("error inserting data year");
                        result(null, err);
                    }
                });
            }
        } else {
            console.log("error fetching data year");
            result(null, err);
        }
    });
    //result(null,"data is up")
};

GradeSection.settingapicollectionModel = (result) => {
    dbConn.query(
        "SELECT gs.section,g.grade_master,y.academic_year FROM grade_section gs INNER JOIN grade_master g ON g.grade_master_id = gs.grade_section_id inner join  years y on y.year_id = gs.academic_year_id ",

        (err, res) => {
            if (res) {
                console.log("Grade Section fetched successfully 1");
                result(null, res);
            } else {
                console.log("error fetching data year");
                result(null, err);
            }
        }
    );
};

module.exports = GradeSection;
