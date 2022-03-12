
//-------------Add Question Master --
function fChangeSubject(id, vrid) {
    ExamId = 0;
    $.ajax({
        type: "Get",
        dataType: "json",
        // async: false,
        url: "../QuestionMaster/GetPaperName",
        data: { SubjectID: $('#' + id).val() },
        success: function (data) {
            // alert(data);
            debugger;
            $('#' + vrid).html('');

            for (i = 0; i < data.length; i++) {

                $('#' + vrid).append("<option value='" + data[i].ID + "'>" + data[i].DDLName + "</option>");
            }
        }

    }).error(function (err) {
        alert(err);

    });

}

function fValidation(varfield, varAlert) {

    alert(varAlert);
    var varX = document.getElementById(varfield).offsetTop;
    var varY = document.getElementById(varfield).offsetLeft;
    window.scrollTo(varX, varY);
    document.getElementById(varfield).focus();
}
function AddQuestions() {

    var qustion = $('#QuestionText').val();
    var text1 = $('#choicetxt1').val();
    var text2 = $('#choicetxt2').val();
    var text3 = $('#choicetxt3').val();
    var text4 = $('#choicetxt4').val();
    var ansid = $('#AnswerId').val();
    var IsActive = false;
    if ($('#IsActive').val() == "1") {
        IsActive = true;
    }
    if ($('#ddlExamId').val() == "") {
        fValidation('ddlExamId', 'Please Select Exam');
        return false;
    }
    if ($('#ddlSubjectId').val() == "" || $('#ddlSubjectId').val() == null) {
        fValidation('ddlSubjectId', 'Please Select Subject');
        return false;
    }
    if ($('#ddlPeperId').val() == "" || $('#ddlPeperId').val() == null) {
        fValidation('ddlPeperId', 'Please Select Paper');
        return false;
    }
    if (qustion == "") {
        fValidation('QuestionText', 'Please enter question text');
        return false;
    }
    if (text1 == "") {
        fValidation('choicetxt1', 'Please enter first option ');
        return false;
    }
    if (text2 == "") {
        fValidation('choicetxt2', 'Please enter second option ');
        return false;
    }
    if (text3 == "") {
        fValidation('choicetxt3', 'Please enter third option ');
        return false;
    }
    if (text4 == "") {
        fValidation('choicetxt4', 'Please enter forth option ');
        return false;
    }
    if (ansid == "" || ansid == null) {
        fValidation('AnswerId', 'Please enter answer ');
        return false;
    }
    var subjectid = parseInt($('#ddlSubjectId').val());
    var ExamID = parseInt($('#ddlExamId').val());
    var QuestionID = $('#qstId').val() == "" ? 0 : $('#qstId').val();
    var QuestionModel = {
        QuestionID: QuestionID, QuestionText: qustion.trim(), Choice1: text1.trim(), Choice2: text2.trim(), Choice3: text3.trim(), Choice4: text4.trim(), Answer: ansid, ExamID: ExamID, IsActive: IsActive, PaperID: $('#ddlPeperId').val()
        , SubjectID: subjectid
    }

    $.ajax({
        type: "post",
        dataType: "html",
        // async: false,
        url: "../QuestionMaster/AddQuestion",
        data: QuestionModel,//JSON.stringify(QuestionModel),// { question: qustion.trim(), qid: qid },

        success: function (data) {
            alert(data);
            if (data != "Error Occured") {
                reset();
            }

        }

    }).error(function (err) {
        alert(err);
        //alert(JSON.stringify(err));
        // $("#frmdealBooking").submit();

    });


}
function reset() {
    $('#qstId').val(0);
    $('#QuestionText').val('');
    $('#choicetxt1').val('');
    $('#choicetxt2').val('');
    $('#choicetxt3').val('');
    $('#choicetxt4').val('');
    $('#AnswerId').val('');
    $('#ddlPeperId').attr('disabled', false);
    $('#ddlSubjectId').attr('disabled', false);
    $('#ddlExamId').attr('disabled', false);
}
function editQuestion(Qid) {

    $.ajax({
        type: "GET",
        dataType: "json",
        async: false,
        url: "../QuestionMaster/EditQuestion",
        data: { QuestionId: Qid },

        success: function (data) {
            debugger;
            //   var json = jQuery.parseJSON(JSON.stringify(data));
            // var Qid = data.QuestionID;
            $('#qstId').val(data.QuestionID);

            $('#QuestionText').val(data.QuestionText);
            $('#choicetxt1').val(data.Choice1);
            $('#choicetxt2').val(data.Choice2);
            $('#choicetxt3').val(data.Choice3);
            $('#choicetxt4').val(data.Choice4);
            $('#AnswerId').val(data.Answer);
            $('#ddlExamId').val(data.ExamID);
         
            if (data.IsActive) {
                $('#IsActive').val('1');
            } else {
                $('#IsActive').val('0');
            }

            $('#ddlPeperId').append("<option value='" + data.PaperId + "'>" + data.PaperName + "</option>");
            $('#ddlPeperId').attr('disabled', true);
            $('#ddlSubjectId').append("<option value='" + data.SubjectID + "'>" + data.SubjectName + "</option>");
            $('#ddlSubjectId').attr('disabled', true);
            $('#ddlExamId').attr('disabled', true);
            window.scrollTo(0, 0);
        },

        error: function (err) {
            alert(err);
            //alert(JSON.stringify(err));
            // $("#frmdealBooking").submit();
        }
    });
}
function showqustionDetails() {
    var PaperID = parseInt($('#ddlPeperfId').val());
    var isActive = $('#IsActiveid').val();

    $.ajax({
        type: "Get",
        dataType: "html",
        async: false,
        url: "../QuestionMaster/_QuestionList",
        data: { PaperID: PaperID, isActive: isActive },
        'success': function (data) {
            $('.np5').html(data);
        }
    });
}

///////-Add Question Masster End-----------