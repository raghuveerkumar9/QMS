//----SElect Test
function Getstart() {

    $.ajax({

        type: 'POST',
        url: "../Quiz/Test",
        data: {
            SubjectID: $('#ddlPaperID').val(), ExamId: 0, SubjectName: $('#ddlPaperID option:selected').html(),
            Qtime: $('#ddlQtime').val(), TQuestion: $('#ddlTQuestion').val() //, QuestionType: $('#ddlQuestionType').val()
        },

        success: function (response) {
            window.location.href = response;
        },
        error: function (response) {

        }
    });
}
//-----End---



//Subject wise Result Details
function fview(PID, ResultID)
{
    $.ajax({

        type: 'GET',
        url: "../Quiz/ResultwithAnswer",
        data: {
            PID: PID, ResultID: ResultID
        },
        success: function (response) {
            $('.np').html(response);
        },
        error: function (response) {
        }
    });
}
//--------Subject wise REsult End