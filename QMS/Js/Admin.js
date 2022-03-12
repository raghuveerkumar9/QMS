//----Exam Master
function ExamSave() {

    if ($('#txtExam').val() == "") {
        alert('Please Enter Course Name');
        $('#txtExam').focus();
        return false;
    }
    if ($('#IsActive').val() == "") {
        alert('Please Select Active');
        $('#IsActive').focus();
        return false;
    }
    var model = { ExamID: $('#Examid').val(), ExamName: $('#txtExam').val(), IsActive: $('#IsActive').val() == '1' ? true : false };
    $.ajax({
        type: "post",
        dataType: "html",
        // async: false,
        url: "../Admin/SaveExamCourseMaster",
        data: model,//JSON.stringify(QuestionModel),// { question: qustion.trim(), qid: qid },

        success: function (data) {
            alert(data);
            if (data != "Error Occured") {
                ExamReset();
            }
        }

    }).error(function (err) {
        alert(err);
    });

}
function ExamReset() {
    $('#txtExam').val('');
    $('#Examid').val('0');
    $('#IsActive').val('1');
    ShowDetails();
}
function ShowDetails() {
    $.ajax({
        type: "GET",
        dataType: "html",
        // async: false,
        url: "../Admin/ExamCoursePartial",
        data: null,
        success: function (data) {
            $('.np5').html(data);
        }

    }).error(function (err) {
        alert(err);
    });
    $('#Examid').val(0);
}

function fEditExam(ExamID) {
    $.ajax({
        type: "GET",
        dataType: "json",
        // async: false,
        url: "../Admin/GetExam",
        data: { ExamID: ExamID },
        success: function (data) {
            $('#txtExam').val(data.ExamName);
            $('#Examid').val(data.ExamID);

            if (data.IsActive == true) {
                $('#IsActive').val(1);
            } else {
                $('#IsActive').val(0);
            }

        }

    }).error(function (err) {
        alert(err);
    });
}
//---End

//-------------Subject Master
function SubjectSave() {
    if ($('#CourseId').val() == "") {
        alert('Please select Course Name');
        $('#CourseId').focus();
        return false;
    }
    if ($('#txtSubject').val() == "") {
        alert('Please Enter Subject Name');
        $('#txtSubject').focus();
        return false;
    }
    if ($('#IsActive').val() == "") {
        alert('Please Select Active');
        $('#IsActive').focus();
        return false;
    }
    var model = { SubjectID: $('#SubjectId').val(), SubjectName: $('#txtSubject').val(), ExamID: $('#CourseId').val(), IsActive: $('#IsActive').val() == '1' ? true : false };
    $.ajax({
        type: "post",
        dataType: "html",
        // async: false,
        url: "../Admin/SaveSubjectMaster",
        data: model,
        success: function (data) {
            alert(data);
            if (data != "Error Occured") {
                SubjectReset();
            }
        }
    }).error(function (err) {
        alert(err);
    });

}
function SubjectReset() {
    $('#txtSubject').val('');
    $('#SubjectId').val('0');
    $('#IsActive').val('1');
    SubjectShowDetails();
}
function SubjectShowDetails() {
    $.ajax({
        type: "GET",
        dataType: "html",
        // async: false,
        url: "../Admin/SubjectPartial",
        data: null,
        success: function (data) {
            $('.np5').html(data);
        }

    }).error(function (err) {
        alert(err);
    });
    $('#SubjectId').val(0);
}
function fEditSubject(SubjectID) {
    $.ajax({
        type: "GET",
        dataType: "json",
        // async: false,
        url: "../Admin/GetSubjects",
        data: { SubjectID: SubjectID },
        success: function (data) {

            $('#SubjectId').val(data.SubjectID);
            $('#txtSubject').val(data.SubjectName);
            $('#CourseId').val(data.ExamID);

            if (data.IsActive == true) {
                $('#IsActive').val(1);
            } else {
                $('#IsActive').val(0);
            }

        }

    }).error(function (err) {
        alert(err);
    });
}
//----End

//-------------Paper Master
function PaperSave() {
    if ($('#ExamId').val() == "") {
        alert('Please select Exam Name');
        $('#ExamId').focus();
        return false;
    }
    if ($('#SubjectId').val() == "") {
        alert('Please select Subject Name');
        $('#SubjectId').focus();
        return false;
    }
    if ($('#txtPaper').val() == "") {
        alert('Please Enter Paper Name');
        $('#txtPaper').focus();
        return false;
    }
    if ($('#txtPrice').val() == "") {
        alert('Please Enter Price');
        $('#txtPrice').focus();
        return false;
    }
    if ($('#txtQuestions').val() == "") {
        alert('Please Enter Question');
        $('#txtQuestions').focus();
        return false;
    }
    if ($('#txtTime').val() == "") {
        alert('Please Enter Time');
        $('#txtTime').focus();
        return false;
    }
    if ($('#txtDescription').val() == "") {
        alert('Please Enter Description');
        $('#txtDescription').focus();
        return false;
    }
    if ($('#PaperType').val() == "") {
        alert('Please Select Paper Type');
        $('#PaperType').focus();
        return false;
    }
    if ($('#IsActive').val() == "") {
        alert('Please Select Active');
        $('#IsActive').focus();
        return false;
    }
    var model = {
        SubjectID: $('#SubjectId').val(),
        PaperID: $('#PaperId').val(), PaperName: $('#txtPaper').val(), PaperPrice: $('#txtPrice').val(), PaperType: $('#PaperType').val(), IsActive: $('#IsActive').val() == '1' ? true : false,
        TotalQuestion: $('#txtQuestions').val(), Time: $('#txtTime').val(), Description: $('#txtDescription').val(), ExamID: $('#ExamId').val()
    };
    $.ajax({
        type: "post",
        dataType: "html",
        // async: false,
        url: "../Admin/SavePaper",
        data: model,
        success: function (data) {
            alert(data);
            if (data != "Error Occured") {
                PaperReset();
                PaperhowDetails
            }
        }
    }).error(function (err) {
        alert(err);
    });

}
function PaperReset() {
    $('#txtPaper').val('');
    $('#txtPrice').val('');
    $('#PaperType').val('P');
    $('#PaperId').val('0');
    $('#IsActive').val('1');
    $('#txtQuestions').val('');
    $('#txtTime').val('');
    $('#txtDescription').val('');
    $('#ExamId').attr('disabled', false);
    $('#SubjectId').attr('disabled', false);
    PaperhowDetails();
}
function PaperhowDetails() {
    $.ajax({
        type: "GET",
        dataType: "html",
        // async: false,
        url: "../Admin/PaperPartial",
        data: null,
        success: function (data) {
            $('.np5').html(data);
        }

    }).error(function (err) {
        alert(err);
    });
    $('#PaperId').val(0);
}
function fEditPaper(PaperID) {
    $.ajax({
        type: "GET",
        dataType: "json",
        // async: false,
        url: "../Admin/GetPaper",
        data: { PaperID: PaperID },
        success: function (data) {

            $('#PaperId').val(data.PaperID);
            $('#txtPaper').val(data.PaperName);
            $('#txtPrice').val(data.PaperPrice);
            $('#PaperType').val(data.PaperType);
            $('#ExamId').val(data.ExamID);
            $('#SubjectId').val(data.SubjectID);
            $('#ExamId').attr('disabled', true);
            $('#SubjectId').attr('disabled', true);
            if (data.IsActive == true) {
                $('#IsActive').val(1);
            } else {
                $('#IsActive').val(0);
            }
            $('#txtQuestions').val(data.TotalQuestion);
            $('#txtTime').val(data.Time);
            $('#txtDescription').val(data.Description);
        }

    }).error(function (err) {
        alert(err);
    });
}
function fChangeExam(id, vrid) {
    ExamId = 0;
    $.ajax({
        type: "Get",
        dataType: "json",
        // async: false,
        url: "../Admin/GetSubjectName",
        data: { ExamId: $('#' + id).val() },
        success: function (data) {
            // alert(data);
            debugger;
            $('#' + vrid).html('');
            $('#' + vrid).append("<option value=''>--Select--</option>");
            for (i = 0; i < data.length; i++) {

                $('#' + vrid).append("<option value='" + data[i].ID + "'>" + data[i].DDLName + "</option>");
            }
        }

    }).error(function (err) {
        alert(err);

    });

}
//----End