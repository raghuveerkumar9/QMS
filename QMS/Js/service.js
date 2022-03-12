function addLoadEvent(n) {
    var t = window.onload;
    window.onload = typeof window.onload != "function" ? n : function() {
        t && t();
        n()
    }
}

function hex(n) {
    for (var i = "", t = 7; t >= 0; t--) i += hex_chr.charAt(n >> t * 4 & 15);
    return i
}

function str2blks_SHA1(n) {
    for (var r = (n.length + 8 >> 6) + 1, i = new Array(r * 16), t = 0; t < r * 16; t++) i[t] = 0;
    for (t = 0; t < n.length; t++) i[t >> 2] |= n.charCodeAt(t) << 24 - t % 4 * 8;
    return i[t >> 2] |= 128 << 24 - t % 4 * 8, i[r * 16 - 1] = n.length * 8, i
}

function add(n, t) {
    var i = (n & 65535) + (t & 65535),
        r = (n >> 16) + (t >> 16) + (i >> 16);
    return r << 16 | i & 65535
}

function rol(n, t) {
    return n << t | n >>> 32 - t
}

function ft(n, t, i, r) {
    return n < 20 ? t & i | ~t & r : n < 40 ? t ^ i ^ r : n < 60 ? t & i | t & r | i & r : t ^ i ^ r
}

function kt(n) {
    return n < 20 ? 1518500249 : n < 40 ? 1859775393 : n < 60 ? -1894007588 : -899497514
}

function calcSHA1(n) {
    for (var c = str2blks_SHA1(n), o = new Array(80), r = 1732584193, u = -271733879, f = -1732584194, e = 271733878, s = -1009589776, i, h = 0; h < c.length; h += 16) {
        var l = r,
            a = u,
            v = f,
            y = e,
            p = s;
        for (i = 0; i < 80; i++) o[i] = i < 16 ? c[h + i] : rol(o[i - 3] ^ o[i - 8] ^ o[i - 14] ^ o[i - 16], 1), t = add(add(rol(r, 5), ft(i, u, f, e)), add(add(s, o[i]), kt(i))), s = e, e = f, f = rol(u, 30), u = r, r = t;
        r = add(r, l);
        u = add(u, a);
        f = add(f, v);
        e = add(e, y);
        s = add(s, p)
    }
    return hex(r) + hex(u) + hex(f) + hex(e) + hex(s)
}

function fAlert(n) {
    $("#dullscreen").hide();
    try {
        if ($("#sp-error") != null) {
            var t = $("#sp-error").html();
            if (t.trim() != "" && t != undefined) return !1
        }
    } catch (i) {}
    clearTimeout(Timerid);
    $("#dvProgressbar").show();
    $("#dvMsg").html(n);
    Timerid = setTimeout(fAutohidealert, 3e3)
}

function fAutohidealert() {
    $("#dullscreen").hide();
    $("#dvProgressbar").is(":hover") == !1 && fhidealert()
}

function fhidealert() {
    $("#dullscreen").hide();
    $("#dvMsg").html("<div class='C'>C <span class='load'>P l e a s e &nbsp;&nbsp; W a i t &nbsp;&nbsp;. . .<\/span><\/div><div id='loader' class='left-to-right'><\/div>");
    $("#dvProgressbar").hide()
}

function fSpin() {
    return "<div class='C' style='color:orange;'>C<\/div><div id='loader' class='left-to-right' ><\/div>"
}

function fEnableProgress() {
    clearTimeout(Timerid);
    $("#dullscreen").show();
    $("#dvProgressbar").show();
    $("#dvMsg").html("<div class='C'>C <span class='load'>P l e a s e &nbsp;&nbsp; W a i t &nbsp;&nbsp;. . .<\/span><\/div><div id='loader' class='left-to-right'><\/div>")
}

function keyup_removeclass(n, t) {
    if ((t == "undefined" || t == null || t == "") && (t = "sp-error"), varKey = window.event ? window.event.keyCode : n.which, varKey == 9 || varKey == 13) return !1;
    var i = n.target.id,
        r = document.getElementById(i).value;
    (r != "" || r != "0") && (document.getElementById(t).innerHTML = "", $("#" + i + "").parent().removeClass("has-error"))
}

function jsonAutoComplete(n, t) {
    var i = t.target.id,
        r;
    param = encodeURIComponent(document.getElementById(i).value);
    r = "/AutoComplete/GetCompletionList?term=" + param + "&table=" + n + "";
    param.length > 1 ? $.post(r, function(n) {
        $("#" + i + "").autocomplete({
            cashe: !1,
            source: $.map(n, function(n) {
                return {
                    label: n.DDLName,
                    valid: n.DDLID
                }
            }),
            select: function(n, r) {
                $("#" + i + "").val(r.item.label);
                $("#hid" + i + "").val(r.item.valid);
                typeof fSelectSearchResponse == "function" && fSelectSearchResponse(t);
                $("#ui-id-1").html("")
            }
        })
    }, "json") : $("#ui-id-1").html("")
}

function imageExists(n) {
    var t = new XMLHttpRequest;
    return t.open("HEAD", n, !1), t.send(), t.status != 404
}

function xmlPost(n, t) {
    var i = new XMLHttpRequest;
    i.addEventListener("load", function(n) {
        Complete(n)
    }, !1);
    i.addEventListener("error", function(n) {
        Failed(n)
    }, !1);
    i.addEventListener("abort", function(n) {
        Canceled(n)
    }, !1);
    i.open("POST", t, !0);
    i.send(n)
}

function Failed() {
    alert("There was an error in Controller")
}

function Canceled() {
    alert("Your Process is terminated by the user or the browser dropped the connection.")
}

function ShowingImagePreview(n, t) {
    var r = n.files[0].name.split("."),
        i;
    if ($.inArray(r[1], ["jpeg", "jpg", "JPG", "JPEG"]) == -1) return document.getElementById(n.id).value = "", fAlert("You can upload a JPG format only."), !1;
    if (n.files[0].size > 2e4) return document.getElementById(n.id).value = "", fAlert("Maximum size of 20 kb"), !1;
    n.files && n.files[0] && (i = new FileReader, i.onload = function(n) {
        $(t).prop("src", n.target.result);
        document.getElementById("rmv" + t).style.display = ""
    }, i.readAsDataURL(n.files[0]))
}

function jsonPostdata(n, t) {
    var r = "/" + n[0] + "/" + n[1] + "",
        u = n[2],
        i;
    t != null && (i = t.target.id);
    $.post(r, u, function(n) {
        n.Message != "" && (n.Message == "Login Again" ? location.href = "/" : (n.Message == "Save Successfully" || n.Message == "Saved Successfully" || n.Message == "S" ? (fAlert("Saved Successfully"), filllist(n.Data)) : n.Message == "Updated Successfully" || n.Message == "U" ? (fAlert(n.Message), filllist(n.Data)) : fAlert(n.Message), t != null && t.target.type == "submit" && $("#" + i + "").attr("disabled", !1)))
    }, "json")
}

function jsongetdata(n) {
    var t = "/" + n[0] + "/" + n[1] + "",
        i = n[2];
    $.post(t, i, function(n) {
        n.Message != "" ? n.Message == "Login Again" ? location.href = "/" : (fAlert(n.Message), typeof fClearPageData == "function" && fClearPageData()) : fillgetdata(n.Data)
    }, "json")
}

function fClose(n) {
    location.href = n != null && n != "" && n[2] != "mnuCCompany" && n[2] != "mnuFASetCompanyLocation" ? n[4] + "?parentid=" + n[0] + "&menuid=" + n[1] + "" : "/Campus/Default"
}

function convertjsonDate(n) {
    if (n != null && n.length > 10) {
        var r = n.substr(6),
            i = new Date(parseInt(r)),
            t = new Date(i.getTime() + 6e4 * i.getTimezoneOffset() + 36e5 * 5.5),
            u = (t.getMonth() + 1).toString().length == 1 ? "0" + (t.getMonth() + 1).toString() : (t.getMonth() + 1).toString(),
            f = t.getDate().toString().length == 1 ? "0" + t.getDate().toString() : t.getDate().toString(),
            e = t.getFullYear();
        return f + "/" + u + "/" + e
    }
    return ""
}

function fAllowNumeric(n) {
    return varKey = window.event ? window.event.keyCode : n.which, varKey >= 48 && varKey <= 57 || varKey == 8 || varKey == 127 || varKey == 0 ? !0 : !1
}

function validateDate(n) {
    var u, t, i, e = new Date,
        f = new Date,
        r;
    return (n = stripBlanks(n), n == "") ? !1 : n.length < 10 ? !1 : (r = n.split("/"), r.length != 3 && (r = n.split("-")), r.length != 3 && (r = n.split(".")), r.length != 3) ? !1 : (u = r[0], t = r[1], i = r[2], !isNum(u)) ? !1 : isNum(i) ? isNum(t) ? u.length > 2 ? !1 : t.length > 2 ? !1 : i.length > 4 ? !1 : (u = parseFloat(u), t = parseFloat(t), i = parseFloat(i), i < 1753 || i > 2099) ? !1 : (t == 2 && (i % 400 == 0 || i % 4 == 0 && i % 100 != 0) && day[t - 1]++, t < 1 || t > 12) ? !1 : u < 1 || u > day[t - 1] ? !1 : (f.setDate(u), f.setMonth(t - 1), f.setFullYear(i), !0) : !1 : !1
}

function stripBlanks(n) {
    var t = "",
        r = 0,
        u = " ";
    for (i = 0; i < n.length; i++)(n.charAt(i) != " " || r > 0) && (u != n.charAt(i) || u != " ") && (t += n.charAt(i), u = n.charAt(i), n.charAt(i) != " " && (r = t.length));
    return t.substr(0, r)
}

function isValid(n, t) {
    if (n == "") return !1;
    for (i = 0; i < n.length; i++)
        if (t.indexOf(n.charAt(i), 0) == -1) return !1;
    return !0
}

function isNum(n) {
    return isValid(n, numb)
}
function fValidation(varfield, varAlert) {

    alert(varAlert);
    var varX = document.getElementById(varfield).offsetTop;
    var varY = document.getElementById(varfield).offsetLeft;
    window.scrollTo(varX, varY);
    document.getElementById(varfield).focus();
}
function validateEmail(n) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(n) ? !0 : !1
}

function Restrict_Name(n) {
    var t;
    return t = window.event ? window.event.keyCode : n.which, t >= 65 && t <= 90 || t >= 97 && t <= 122 || t == 95 || t == 46 || t >= 38 && t <= 44 || t >= 45 && t <= 57 || t == 127 || t == 8 || t == 32 || t == 0 ? !0 : !1
}

function Restrict_Phone(n) {
    var t;
    return t = window.event ? window.event.keyCode : n.which, t == 44 || t >= 48 && t <= 57 || t == 8 || t == 127 || t == 0 ? !0 : !1
}

function Rest_Address(n) {
    var t;
    return t = window.event ? window.event.keyCode : n.which, t >= 64 && t <= 90 || t >= 97 && t <= 122 || t == 95 || t == 46 || t >= 38 && t <= 43 || t >= 44 && t <= 57 || t == 127 || t == 8 || t == 32 || t == 0 || t == 35 || t == 92 ? !0 : !1
}

function Rest_Pincode(n) {
    var t;
    return t = window.event ? window.event.keyCode : n.which, t >= 48 && t <= 57 || t == 127 || t == 8 || t == 0 ? !0 : !1
}

function Restrict_Multiline(n, t) {
    var i, r = n || window.event,
        u = r.target || r.srcElement;
    return (i = window.event ? window.event.keyCode : n.which, i == 8 || i == 0) ? !0 : i >= 64 && i <= 90 || i >= 97 && i <= 122 || i == 95 || i == 46 || i >= 38 && i <= 43 || i >= 44 && i <= 57 || i == 127 || i == 8 || i == 32 || i == 0 || i == 35 || i == 92 ? document.getElementById(u.id).value.length < t ? !0 : !1 : !1
}

function pLockControls(n) {
    for (var i = document.getElementById(n).getElementsByTagName("INPUT"), t = 0; t < i.length; t++) i[t].type.toLowerCase() == "text" || i[t].type.toLowerCase() == "textarea" ? i[t].readOnly = !0 : (i[t].type.toLowerCase() == "radio" || i[t].type.toLowerCase() == "checkbox") && (i[t].disabled = !0);
    for (i = document.getElementById(n).getElementsByTagName("SELECT"), t = 0; t < i.length; t++) i[t].id != "lstCDisplay" && (i[t].disabled = !0);
    for (i = document.getElementById(n).getElementsByTagName("textarea"), t = 0; t < i.length; t++) i[t].readOnly = !0;
    for (i = document.getElementById(n).getElementsByTagName("button"), t = 0; t < i.length; t++) i[t].disabled = !0
}

function pUnLockControls(n) {
    for (var i = document.getElementById(n).getElementsByTagName("INPUT"), t = 0; t < i.length; t++) i[t].type.toLowerCase() == "text" || i[t].type.toLowerCase() == "textarea" ? i[t].readOnly = !1 : (i[t].type.toLowerCase() == "radio" || i[t].type.toLowerCase() == "checkbox") && (i[t].disabled = !1);
    for (i = document.getElementById(n).getElementsByTagName("SELECT"), t = 0; t < i.length; t++) i[t].disabled = !1;
    for (i = document.getElementById(n).getElementsByTagName("textarea"), t = 0; t < i.length; t++) i[t].readOnly = !1;
    for (i = document.getElementById(n).getElementsByTagName("button"), t = 0; t < i.length; t++) i[t].disabled = !1
}

function pClearFields(n, t) {
    var r, i;
    try {
        for (r = document.getElementById(n).getElementsByTagName("INPUT"), i = 0; i < r.length; i++)(t == null || t.indexOf(r[i].id) < 0 || t == "undefined") && (r[i].type.toLowerCase() == "text" || r[i].type.toLowerCase() == "textarea" || r[i].type.toLowerCase() == "hidden" ? r[i].value = "" : r[i].type.toLowerCase() == "checkbox" && (r[i].checked = !1));
        for (r = document.getElementById(n).getElementsByTagName("SELECT"), i = 0; i < r.length; i++) r[i].selectedIndex = 0;
        for (r = document.getElementById(n).getElementsByTagName("textarea"), i = 0; i < r.length; i++) r[i].value = ""
    } catch (u) {
        fAlert(u.message)
    }
}

function Restrict_Money(n) {
    var t;
    return t = window.event ? window.event.keyCode : n.which, t >= 48 && t <= 57 || t == 127 || t == 46 || t == 8 || t == 0 ? !0 : !1
}

function ConvertDateToYYYYMMDD(n) {
    if (n.length < 10) return "";
    n = stripBlanks(n);
    var t = n.split("/");
    return t.length != 3 && (t = n.split("-")), t.length != 3 && (t = n.split(".")), t[2] + "/" + t[1] + "/" + t[0]
}

function fAllowMoneywithdot(n) {
    var t = window.event ? window.event.keyCode : n.which;
    var i = n || window.event,
        r = i.target || i.srcElement,
        u = r.value.split(".");
    return u.length > 1 && t == 46 ? !1 : t >= 48 && t <= 57 || t == 127 || t == 46 || t == 8 || t == 0 ? !0 : !1
}

function fNumber(n, t) {
    var i, f, u, r;
    if (i = window.event ? window.event.keyCode : t.which, f = event.target || event.srcElement, i == 44) {
        if (stripBlanks(f.value).length < 10) return alert("Please Enter 10 digit Mobile No"), !1;
        for (u = stripBlanks(f.value).split(","), r = 0; r < u.length; r++)
            if (u[r].length < 10 || u[r].length > 10) return alert("Please Enter 10 digit Mobile No"), !1
    } else return i >= 48 && i <= 57 || i == 32 || i == 127 || i >= 40 && i <= 41 || i == 8 || i == 0 ? !0 : !1
}

function RestrictEnterDate(n) {
    var i, r = n || window.event,
        t;
    return (i = window.event ? window.event.keyCode : n.which, t = r.target || r.srcElement, (t.value.length == 2 || t.value.length == 5) && (t.value = t.value + "/"), i == 47 || i == 45 || i == 46) ? !1 : Restrict_Date(n)
}

function Restrict_Date(n) {
    var t;
    return t = window.event ? window.event.keyCode : n.which, t >= 45 && t <= 57 || t == 127 || t == 8 || t == 0 ? !0 : !1
}

function Restrict_MoneyWithPercentage(n) {
    var t, i;
    t = window.event ? window.event.keyCode : n.which;
    var r = n || window.event,
        u = r.target || r.srcElement,
        i = u.value.split(".");
    return i.length > 1 && t == 46 ? !1 : (i = u.value.split("%"), i.length > 1 && t == 37) ? !1 : t == 46 || t == 37 || t >= 48 && t <= 57 || t == 8 || t == 127 ? !0 : !1
}

function RestrictforChrome(n) {
    var t;
    return t = window.event ? window.event.keyCode : n.which, t == 13 ? !1 : void 0
}

function GetScreenPosition(n) {
    var t = {};
    for (t.x = n.offsetLeft, t.y = n.offsetTop + n.offsetHeight; n.offsetParent;)
        if (t.x = t.x + n.offsetParent.offsetLeft, t.y = t.y + n.offsetParent.offsetTop, n == document.getElementsByTagName("body")[0]) break;
        else n = n.offsetParent;
    return t
}

function fClearDisplayMessage() {
    $("#sp-error").parent().removeClass("has-error");
    document.getElementById("sp-error").innerHTML = ""
}

function ImgUpload(n) {
    $("#" + n + "").clearQueue();
    document.getElementById(n).click()
}

function fDisplayMessage(n, t, i) {
    i == null || i == 0 ? (document.getElementById("sp-error").innerHTML = t, $("#" + n).parent().addClass("has-error"), document.getElementById(n).focus()) : (document.getElementById("sp-error").innerHTML = t, $("#" + n.replace("ID", "Name")).parent().addClass("has-error"), document.getElementById("btn" + n).focus())
}

function fFillSection() {
    return document.getElementById("CLID").value == "0" || stripBlanks(document.getElementById("CLID").value) == "" ? (fAlert("Please Select Class"), document.getElementById("CLID").focus(), !1) : (document.getElementById("TSectionIDs").href = "/Campus/DDLPopUp?strid=TSectionID^" + document.getElementById("CLID").value, document.getElementById("TSectionIDs").click(), !1)
}

function fAllowNumericMinus(n) {
    if (varKey = window.event ? window.event.keyCode : n.which, varKey >= 48 && varKey <= 57 || varKey == 8 || varKey == 127 || varKey == 0) return !0;
    if (varKey == 45) {
        var t = n.target.value;
        if (t.indexOf("-") < 0) {
            if (n.target.selectionStart == 0) return !0
        } else if (n.target.selectionStart != n.target.selectionEnd && n.target.selectionStart == 0) return !0
    }
    return !1
}

function fFillCheckBoxList(n, t) {
    var i = GetCheckCollection(n);
    i.length > 0 ? $.post("/Campus/GetCheckBoxList", {
        strid: t,
        ColID: i
    }, function(n) {
        var r, i, u;
        if (n.Message != "") n.Message == "Login Again" ? location.href = "/" : alert(n.Message);
        else {
            for (r = "", i = 0; i < n.Data[0].length; i++) u = '<label class="checkbox-inline" style="width:130px; margin-left:2px;"><input type="checkbox" name="chk_' + n.Data[0][i].CheckName + '" class="chk_' + t + '" oncontextmenu="return fSelectDeSelectMenu(event,\'chk_' + t + '\');" id="chk_' + t + "_" + n.Data[0][i].CheckID + '">' + n.Data[0][i].CheckName + "<\/label>", r = r + u;
            $("#div_" + t).html(r)
        }
    }, "json") : $("#div_" + t).html("")
}

function GetCheckCollection(n) {
    for (var r = [], i, t = 0; t < $(".chk_" + n).length; t++) i = $(".chk_" + n)[t], i.checked == !0 && r.push(i.id.replace("chk_" + n + "_", ""));
    return r
}

function GetCheckValue(n) {
    for (var t = "", r, i = 0; i < $(".chk_" + n).length; i++) r = $(".chk_" + n)[i], r.checked == !0 && (t = t + "," + r.id.replace("chk_" + n + "_", ""));
    return t.length > 0 && (t = t.substring(1, t.length)), t
}

function GetCheckName(n) {
    for (var t = "", r, i = 0; i < $(".chk_" + n).length; i++) r = $(".chk_" + n)[i], r.checked == !0 && (t = t + " ," + r.name.replace("chk_", ""));
    return t.length > 0 && (t = t.substring(1, t.length)), t
}

function SpanGridViewRow(n, t) {
    for (var f, i, u = t.split(","), r = 0; r < u.length; r++) {
        for (f = 1, i = 1; i < document.getElementById(n).rows.length - 1; i++) GetCellDataForRowSpan(document.getElementById(n).rows[f], document.getElementById(n).rows[i + 1], Number(u[r])) ? (document.getElementById(n).rows[f].cells[u[r]].rowSpan += 1, document.getElementById(n).rows[f].cells[u[r]].style = "vertical-align: middle;", document.getElementById(n).rows[i + 1].cells[u[r]].outerHTML = "") : f = i + 1, document.getElementById(n).rows[i].cells.length > Number(u[r]) && (document.getElementById(n).rows[i].cells[u[r]].innerHTML.toLowerCase() == "total" || document.getElementById(n).rows[i].cells[u[r]].innerHTML.toLowerCase() == "grand total") && $(document.getElementById(n).rows[i]).attr("style", "font-weight: bold;");
        document.getElementById(n).rows.length - 1 > 1 && document.getElementById(n).rows[i].cells.length > Number(u[r]) && (document.getElementById(n).rows[i].cells[u[r]].innerHTML.toLowerCase() == "total" || document.getElementById(n).rows[i].cells[u[r]].innerHTML.toLowerCase() == "grand total") && $(document.getElementById(n).rows[i]).attr("style", "font-weight: bold;")
    }
}

function SetCookieForReport() {
    var r, t, n, i;
    if (document.cookie = "", document.getElementById("divCheckBoxList") != null)
        for (t = 0; t < document.getElementById("divCheckBoxList").getElementsByTagName("div").length; t++) n = document.getElementById("divCheckBoxList").getElementsByTagName("div")[t].id, n.indexOf("div_") == 0 && (r = n.replace("div_", ""), document.cookie = r + "=" + GetCheckValue(r) + ";path=/", document.cookie = r + "_Name=" + GetCheckName(r) + ";path=/");
    if (document.getElementsByClassName("divTextBox") != null) {
        for (t = 0; t < $(".divTextBox").find("input").length; t++) n = $(".divTextBox").find("input")[t].id, n.indexOf("txt_") == 0 && (i = n.replace("txt_", ""), document.cookie = i + "=" + document.getElementById(n).value + ";path=/");
        for (t = 0; t < $(".divTextBox").find("input").length; t++) n = $(".divTextBox").find("input")[t].id, n.indexOf("ddl_") == 0 && (i = n.replace("ddl_", ""), document.cookie = i + "=" + document.getElementById(n).value + ";path=/", document.cookie = i + "_Name=" + document.getElementById(n).options[document.getElementById(n).selectedIndex].innerHTML + ";path=/")
    }
    if (document.getElementById("divDropDownList") != null)
        for (t = 0; t < document.getElementById("divDropDownList").getElementsByTagName("SELECT").length; t++) n = document.getElementById("divDropDownList").getElementsByTagName("SELECT")[t].id, n.indexOf("ddl_") == 0 && (i = n.replace("ddl_", ""), document.cookie = i + "=" + document.getElementById(n).value + ";path=/", document.cookie = i + "_Name=" + document.getElementById(n).options[document.getElementById(n).selectedIndex].innerHTML + ";path=/")
}

function round_decimals(n, t) {
    var i = n * Math.pow(10, t),
        r = Math.round(i),
        u = r / Math.pow(10, t);
    return pad_with_zeros(u, t)
}

function pad_with_zeros(n, t) {
    var i = n.toString(),
        f = i.indexOf("."),
        r, u;
    if (f == -1 ? (decimal_part_length = 0, i += t > 0 ? "." : "") : decimal_part_length = i.length - f - 1, r = t - decimal_part_length, r > 0)
        for (u = 1; u <= r; u++) i += "0";
    return i
}

function GetCellDataForRowSpan(n, t, i) {
    var u = "",
        f = "",
        r;
    if (n.cells.length > i) {
        for (r = i; r >= 0; r--) u += n.cells[r].innerHTML + "^", f += t.cells[r].innerHTML + "^";
        if (u == f) return !0
    }
    return !1
}

function getPosition(n) {
    var t, i, r;
    return n = n || window.event, t = {
        x: 0,
        y: 0
    }, n.pageX || n.pageY ? (t.x = n.pageX, t.y = n.pageY) : (i = document.documentElement, r = document.body, t.x = n.clientX + (i.scrollLeft || r.scrollLeft) - (i.clientLeft || 0), t.y = n.clientY + (i.scrollTop || r.scrollTop) - (i.clientTop || 0)), t
}

function fSelectDeSelectMenu(n, t, i) {
    var r = {},
        u, f;
    return r = document.getElementById("divSelectDeSelect"), u = getPosition(n).x, f = getPosition(n).y, r.style.position = "absolute", r.style.top = String(f) + "px", r.style.left = String(u) + "px", r.style.display = "inline", classname = t != null ? t : "chk", StartPosition = i != null ? i : 0, !1
}

function fInvisibleMenu() {
    document.getElementById("divSelectDeSelect") != null && (document.getElementById("divSelectDeSelect").style.display = "none")
}

function fSelectDeSelectAll(eType) {
    var i;
    if (eType == 1)
        for (i = StartPosition; i < $("." + classname).length; i++) $("." + classname)[i].disabled == !1 && ($("." + classname)[i].checked = !0);
    else
        for (i = StartPosition; i < $("." + classname).length; i++) $("." + classname)[i].disabled == !1 && ($("." + classname)[i].checked = !1);
    return document.getElementById("divSelectDeSelect").style.display = "none", $("." + classname).length > 0 && $("." + classname)[0].onclick != null && eval($("#" + $("." + classname)[0].id).attr("onclick")), !1
}

function fApplyToAllMenu(n, t, i, r, u) {
    var f = {},
        e, o;
    return f = document.getElementById("divApplyToAll"), e = getPosition(n).x, o = getPosition(n).y, f.style.position = "absolute", f.style.top = String(o) + "px", f.style.left = String(e) + "px", f.style.display = "inline", varCell = i, varRow = t, varContrlName = r, varType = u, !1
}

function fApplyToAll() {
    if (typeof fApplyToAll_Child == "function") fApplyToAll_Child();
    else if (document.getElementById(varContrlName) != null) {
        document.getElementById(varContrlName).rows.length > 0 && (varRow = Number(varRow) + 1);
        for (var n = varRow; n < document.getElementById(varContrlName).rows.length - 1; n++) varType == "INPUT" ? document.getElementById(varContrlName).rows[n + 1].cells[varCell].getElementsByTagName("INPUT")[0].value = document.getElementById(varContrlName).rows[n].cells[varCell].getElementsByTagName("INPUT")[0].value : document.getElementById(varContrlName).rows[n + 1].cells[varCell].getElementsByTagName("SELECT")[0].value = document.getElementById(varContrlName).rows[n].cells[varCell].getElementsByTagName("SELECT")[0].value
    }
    return document.getElementById("divApplyToAll").style.display = "none", !1
}

function fInvisibleApply() {
    document.getElementById("divApplyToAll") != null && (document.getElementById("divApplyToAll").style.display = "none")
}

function CompareDate(n, t) {
    var u, f, e, o, s, h, i, r;
    return (n = stripBlanks(n), t = stripBlanks(t), i = n.split("/"), i.length != 3 && (i = n.split("-")), i.length != 3 && (i = n.split(".")), r = t.split("/"), r.length != 3 && (r = t.split("-")), r.length != 3 && (r = t.split(".")), u = parseFloat(i[0]), f = parseFloat(i[1]), e = parseFloat(i[2]), o = parseFloat(r[0]), s = parseFloat(r[1]), h = parseFloat(r[2]), e < h) ? 1 : e > h ? 2 : f < s ? 1 : f > s ? 2 : u < o ? 1 : u > o ? 2 : 0
}

function readcookie(n) {
    for (var r = n + "=", u = document.cookie.split(";"), t, i = 0; i < u.length; i++) {
        for (t = u[i]; t.charAt(0) == " ";) t = t.substring(1, t.length);
        if (t.indexOf(r) == 0) return t.substring(r.length, t.length)
    }
    return null
}

function Setcookie(n, t, i) {
    var r = new Date,
        u;
    r.setTime(r.getTime() + i * 864e5);
    u = "expires=" + r.toUTCString();
    document.cookie = n + "=" + t + "; " + u
}

function DeleteCookie() {
    for (var i = document.cookie.split(";"), r, n = 0; n < i.length; n++) {
        var u = i[n],
            f = u.split("="),
            e = f[0],
            t = new Date;
        t.setTime(t.getTime() + -864e5);
        r = "expires=" + t.toUTCString();
        document.cookie = e + "=;" + r + ";path=/ "
    }
}

function getHTMLReportFilterVal() {
    var i = [],
        n, t;
    if (document.getElementById("divCheckBoxList") != null)
        for (n = 0; n < document.getElementById("divCheckBoxList").getElementsByTagName("div").length; n++)
            if (t = document.getElementById("divCheckBoxList").getElementsByTagName("div")[n].id, t.indexOf("div_") == 0) {
                var r = t.replace("div_", ""),
                    u = t.replace("div_", "lbl_"),
                    f = document.getElementById(u).innerHTML;
                i.push(f + "^" + GetCheckValue(r) + "#" + GetCheckName(r))
            }
    return i
}

function fFeeLoad() {
    if (document.getElementById("btnFIID") != null && document.getElementById("FGID") != null) {
        $("#FGID").on("change", function() {
            document.getElementById("FIID").value = "";
            document.getElementById("FIName").value = ""
        });
        $("#btnFIID").on("click", function() {
            return document.getElementById("btnFGID") != null && (document.getElementById("FGID").value == "" || document.getElementById("FGID").value == "0") ? (fDisplayMessage("FGID", "Please select Fee Group First", 1), !1) : document.getElementById("hidtxtSearchName") != null && (document.getElementById("hidtxtSearchName").value == "" || document.getElementById("hidtxtSearchName").value == "0") ? (fDisplayMessage("FNo", "Please select Student First"), !1) : ($("#btnFIID").attr("href", "/Campus/DDLPopUp?strid=FGFIID^" + document.getElementById("FGID").value + "&ctrlid=FIID"), !0)
        })
    }
}

function FilterDiv(n) {
    var t = getPosition(n).x,
        i = getPosition(n).y;
    $("#ddlFilter").parent("").removeClass("has-error");
    $("#Search").parent("").removeClass("has-error");
    $("#FilterDiv").css("display") == "none" ? ($("#FilterDiv").css({
        width: "170px",
        border: "2px solid #ff8c00",
        padding: "10px",
        display: "block",
        position: "absolute",
        "z-index": "2000",
        top: String(i - 60) + "px",
        left: String(t - 230) + "px",
        "background-image": "url(../Images/WhiteBack.jpg)",
        "border-radius": "7px",
        "text-align": "center"
    }), $("#FilterDiv").show()) : $("#FilterDiv").hide()
}

function ClearFilter() {
    return $("#ddlFilter").val("ad"), $("#Search").val("fads"), Search(), $("#Search").val(""), $("#ddlFilter").val(""), $("#FilterDiv").hide(), !1
}

function keyup_removeclass1(n) {
    $("#" + n.target.id + "").parent().removeClass("has-error")
}

function UploadFile(n, t, i) {
    var r;
    if (document.getElementById(n).files[0] != null) {
        var f = document.getElementById(n).files[0],
            e = f.name,
            u = new FormData;
        u.append("fileData", f);
        u.append("folder", i);
        r = new XMLHttpRequest;
        r.addEventListener("load", function(n) {
            UploadComplete(n)
        }, !1);
        r.addEventListener("error", function(n) {
            UploadFailed(n)
        }, !1);
        r.addEventListener("abort", function(n) {
            UploadCanceled(n)
        }, !1);
        r.open("POST", t, !0);
        r.send(u)
    }
}

function UploadProgress(n) {
    if (n.lengthComputable) {
        var t = Math.round(n.loaded * 100 / n.total);
        $("#uploading").text(t + "%")
    }
}

function UploadComplete(n) {
    n.target.status == 200 ? n.target.responseText == "OK" ? fUploadClose("OK") : alert(n.target.responseText) : alert("Error Uploading File")
}

function UploadFailed() {
    alert("There was an error attempting to upload the file.")
}

function UploadCanceled() {
    alert("The Upload has been canceled by the user or the browser dropped the connection.")
}

function fINVFillCheckBoxList(n, t) {
    var i = GetCheckCollection(n);
    i.length > 0 ? $.post("/Campus/GetCheckBoxList", {
        strid: t,
        ColID: i
    }, function(n) {
        var r, u, i, f;
        if (n.Message != "") n.Message == "Login Again" ? location.href = "/" : alert(n.Message);
        else {
            for (r = "", u = "", t == "Stock_Group" && (u = "Stock_Ledger"), t == "Stock_Ledger" && (u = "Item"), i = 0; i < n.Data[0].length; i++) f = '<label class="checkbox-inline" style="width:130px; margin-left:2px;"><input type="checkbox" name="chk_' + n.Data[0][i].CheckName + '" class="chk_' + t + '"  onclick=" fINVFillCheckBoxList( \'' + t + "' ,'" + u + "');\" oncontextmenu=\"return fSelectDeSelectMenu(event,'chk_" + t + '\');" id="chk_' + t + "_" + n.Data[0][i].CheckID + '">' + n.Data[0][i].CheckName + "<\/label>", r = r + f;
            $("#div_" + t).html(r)
        }
    }, "json") : $("#div_" + t).html("")
}
var hex_chr, Timerid, numb, mth, day, classname, StartPosition, varCell, varRow, varContrlName, varType;
(function(n, t) {
    function gt(n) {
        var t = n.length,
            r = i.type(n);
        return i.isWindow(n) ? !1 : 1 === n.nodeType && t ? !0 : "array" === r || "function" !== r && (0 === t || "number" == typeof t && t > 0 && t - 1 in n)
    }

    function te(n) {
        var t = ni[n] = {};
        return i.each(n.match(s) || [], function(n, i) {
            t[i] = !0
        }), t
    }

    function ur(n, r, u, f) {
        if (i.acceptData(n)) {
            var h, o, c = i.expando,
                l = n.nodeType,
                s = l ? i.cache : n,
                e = l ? n[c] : n[c] && c;
            if (e && s[e] && (f || s[e].data) || u !== t || "string" != typeof r) return e || (e = l ? n[c] = b.pop() || i.guid++ : c), s[e] || (s[e] = l ? {} : {
                toJSON: i.noop
            }), ("object" == typeof r || "function" == typeof r) && (f ? s[e] = i.extend(s[e], r) : s[e].data = i.extend(s[e].data, r)), o = s[e], f || (o.data || (o.data = {}), o = o.data), u !== t && (o[i.camelCase(r)] = u), "string" == typeof r ? (h = o[r], null == h && (h = o[i.camelCase(r)])) : h = o, h
        }
    }

    function fr(n, t, r) {
        if (i.acceptData(n)) {
            var e, o, s = n.nodeType,
                u = s ? i.cache : n,
                f = s ? n[i.expando] : i.expando;
            if (u[f]) {
                if (t && (e = r ? u[f] : u[f].data)) {
                    for (i.isArray(t) ? t = t.concat(i.map(t, i.camelCase)) : (t in e) ? t = [t] : (t = i.camelCase(t), t = (t in e) ? [t] : t.split(" ")), o = t.length; o--;) delete e[t[o]];
                    if (r ? !ti(e) : !i.isEmptyObject(e)) return
                }(r || (delete u[f].data, ti(u[f]))) && (s ? i.cleanData([n], !0) : i.support.deleteExpando || u != u.window ? delete u[f] : u[f] = null)
            }
        }
    }

    function er(n, r, u) {
        if (u === t && 1 === n.nodeType) {
            var f = "data-" + r.replace(rr, "-$1").toLowerCase();
            if (u = n.getAttribute(f), "string" == typeof u) {
                try {
                    u = "true" === u ? !0 : "false" === u ? !1 : "null" === u ? null : +u + "" === u ? +u : ir.test(u) ? i.parseJSON(u) : u
                } catch (e) {}
                i.data(n, r, u)
            } else u = t
        }
        return u
    }

    function ti(n) {
        var t;
        for (t in n)
            if (("data" !== t || !i.isEmptyObject(n[t])) && "toJSON" !== t) return !1;
        return !0
    }

    function ct() {
        return !0
    }

    function g() {
        return !1
    }

    function cr() {
        try {
            return r.activeElement
        } catch (n) {}
    }

    function ar(n, t) {
        do n = n[t]; while (n && 1 !== n.nodeType);
        return n
    }

    function fi(n, t, r) {
        if (i.isFunction(t)) return i.grep(n, function(n, i) {
            return !!t.call(n, i, n) !== r
        });
        if (t.nodeType) return i.grep(n, function(n) {
            return n === t !== r
        });
        if ("string" == typeof t) {
            if (oe.test(t)) return i.filter(t, n, r);
            t = i.filter(t, n)
        }
        return i.grep(n, function(n) {
            return i.inArray(n, t) >= 0 !== r
        })
    }

    function vr(n) {
        var i = yr.split("|"),
            t = n.createDocumentFragment();
        if (t.createElement)
            while (i.length) t.createElement(i.pop());
        return t
    }

    function gr(n, t) {
        return i.nodeName(n, "table") && i.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? n.getElementsByTagName("tbody")[0] || n.appendChild(n.ownerDocument.createElement("tbody")) : n
    }

    function nu(n) {
        return n.type = (null !== i.find.attr(n, "type")) + "/" + n.type, n
    }

    function tu(n) {
        var t = ye.exec(n.type);
        return t ? n.type = t[1] : n.removeAttribute("type"), n
    }

    function hi(n, t) {
        for (var u, r = 0; null != (u = n[r]); r++) i._data(u, "globalEval", !t || i._data(t[r], "globalEval"))
    }

    function iu(n, t) {
        if (1 === t.nodeType && i.hasData(n)) {
            var u, f, o, s = i._data(n),
                r = i._data(t, s),
                e = s.events;
            if (e) {
                delete r.handle;
                r.events = {};
                for (u in e)
                    for (f = 0, o = e[u].length; o > f; f++) i.event.add(t, u, e[u][f])
            }
            r.data && (r.data = i.extend({}, r.data))
        }
    }

    function be(n, t) {
        var r, f, u;
        if (1 === t.nodeType) {
            if (r = t.nodeName.toLowerCase(), !i.support.noCloneEvent && t[i.expando]) {
                u = i._data(t);
                for (f in u.events) i.removeEvent(t, f, u.handle);
                t.removeAttribute(i.expando)
            }
            "script" === r && t.text !== n.text ? (nu(t).text = n.text, tu(t)) : "object" === r ? (t.parentNode && (t.outerHTML = n.outerHTML), i.support.html5Clone && n.innerHTML && !i.trim(t.innerHTML) && (t.innerHTML = n.innerHTML)) : "input" === r && oi.test(n.type) ? (t.defaultChecked = t.checked = n.checked, t.value !== n.value && (t.value = n.value)) : "option" === r ? t.defaultSelected = t.selected = n.defaultSelected : ("input" === r || "textarea" === r) && (t.defaultValue = n.defaultValue)
        }
    }

    function u(n, r) {
        var s, e, h = 0,
            f = typeof n.getElementsByTagName !== o ? n.getElementsByTagName(r || "*") : typeof n.querySelectorAll !== o ? n.querySelectorAll(r || "*") : t;
        if (!f)
            for (f = [], s = n.childNodes || n; null != (e = s[h]); h++) !r || i.nodeName(e, r) ? f.push(e) : i.merge(f, u(e, r));
        return r === t || r && i.nodeName(n, r) ? i.merge([n], f) : f
    }

    function ke(n) {
        oi.test(n.type) && (n.defaultChecked = n.checked)
    }

    function ou(n, t) {
        if (t in n) return t;
        for (var r = t.charAt(0).toUpperCase() + t.slice(1), u = t, i = eu.length; i--;)
            if (t = eu[i] + r, t in n) return t;
        return u
    }

    function ut(n, t) {
        return n = t || n, "none" === i.css(n, "display") || !i.contains(n.ownerDocument, n)
    }

    function su(n, t) {
        for (var f, r, o, e = [], u = 0, s = n.length; s > u; u++) r = n[u], r.style && (e[u] = i._data(r, "olddisplay"), f = r.style.display, t ? (e[u] || "none" !== f || (r.style.display = ""), "" === r.style.display && ut(r) && (e[u] = i._data(r, "olddisplay", au(r.nodeName)))) : e[u] || (o = ut(r), (f && "none" !== f || !o) && i._data(r, "olddisplay", o ? f : i.css(r, "display"))));
        for (u = 0; s > u; u++) r = n[u], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? e[u] || "" : "none"));
        return n
    }

    function hu(n, t, i) {
        var r = to.exec(t);
        return r ? Math.max(0, r[1] - (i || 0)) + (r[2] || "px") : t
    }

    function cu(n, t, r, u, f) {
        for (var e = r === (u ? "border" : "content") ? 4 : "width" === t ? 1 : 0, o = 0; 4 > e; e += 2) "margin" === r && (o += i.css(n, r + p[e], !0, f)), u ? ("content" === r && (o -= i.css(n, "padding" + p[e], !0, f)), "margin" !== r && (o -= i.css(n, "border" + p[e] + "Width", !0, f))) : (o += i.css(n, "padding" + p[e], !0, f), "padding" !== r && (o += i.css(n, "border" + p[e] + "Width", !0, f)));
        return o
    }

    function lu(n, t, r) {
        var e = !0,
            u = "width" === t ? n.offsetWidth : n.offsetHeight,
            f = v(n),
            o = i.support.boxSizing && "border-box" === i.css(n, "boxSizing", !1, f);
        if (0 >= u || null == u) {
            if (u = y(n, t, f), (0 > u || null == u) && (u = n.style[t]), lt.test(u)) return u;
            e = o && (i.support.boxSizingReliable || u === n.style[t]);
            u = parseFloat(u) || 0
        }
        return u + cu(n, t, r || (o ? "border" : "content"), e, f) + "px"
    }

    function au(n) {
        var u = r,
            t = uu[n];
        return t || (t = vu(n, u), "none" !== t && t || (rt = (rt || i("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(u.documentElement), u = (rt[0].contentWindow || rt[0].contentDocument).document, u.write("<!doctype html><html><body>"), u.close(), t = vu(n, u), rt.detach()), uu[n] = t), t
    }

    function vu(n, t) {
        var r = i(t.createElement(n)).appendTo(t.body),
            u = i.css(r[0], "display");
        return r.remove(), u
    }

    function li(n, t, r, u) {
        var f;
        if (i.isArray(t)) i.each(t, function(t, i) {
            r || fo.test(n) ? u(n, i) : li(n + "[" + ("object" == typeof i ? t : "") + "]", i, r, u)
        });
        else if (r || "object" !== i.type(t)) u(n, t);
        else
            for (f in t) li(n + "[" + f + "]", t[f], r, u)
    }

    function gu(n) {
        return function(t, r) {
            "string" != typeof t && (r = t, t = "*");
            var u, f = 0,
                e = t.toLowerCase().match(s) || [];
            if (i.isFunction(r))
                while (u = e[f++]) "+" === u[0] ? (u = u.slice(1) || "*", (n[u] = n[u] || []).unshift(r)) : (n[u] = n[u] || []).push(r)
        }
    }

    function nf(n, r, u, f) {
        function o(h) {
            var c;
            return e[h] = !0, i.each(n[h] || [], function(n, i) {
                var h = i(r, u, f);
                return "string" != typeof h || s || e[h] ? s ? !(c = h) : t : (r.dataTypes.unshift(h), o(h), !1)
            }), c
        }
        var e = {},
            s = n === yi;
        return o(r.dataTypes[0]) || !e["*"] && o("*")
    }

    function pi(n, r) {
        var f, u, e = i.ajaxSettings.flatOptions || {};
        for (u in r) r[u] !== t && ((e[u] ? n : f || (f = {}))[u] = r[u]);
        return f && i.extend(!0, n, f), n
    }

    function ao(n, i, r) {
        for (var s, o, f, e, h = n.contents, u = n.dataTypes;
            "*" === u[0];) u.shift(), o === t && (o = n.mimeType || i.getResponseHeader("Content-Type"));
        if (o)
            for (e in h)
                if (h[e] && h[e].test(o)) {
                    u.unshift(e);
                    break
                }
        if (u[0] in r) f = u[0];
        else {
            for (e in r) {
                if (!u[0] || n.converters[e + " " + u[0]]) {
                    f = e;
                    break
                }
                s || (s = e)
            }
            f = f || s
        }
        return f ? (f !== u[0] && u.unshift(f), r[f]) : t
    }

    function vo(n, t, i, r) {
        var h, u, f, s, e, o = {},
            c = n.dataTypes.slice();
        if (c[1])
            for (f in n.converters) o[f.toLowerCase()] = n.converters[f];
        for (u = c.shift(); u;)
            if (n.responseFields[u] && (i[n.responseFields[u]] = t), !e && r && n.dataFilter && (t = n.dataFilter(t, n.dataType)), e = u, u = c.shift())
                if ("*" === u) u = e;
                else if ("*" !== e && e !== u) {
            if (f = o[e + " " + u] || o["* " + u], !f)
                for (h in o)
                    if (s = h.split(" "), s[1] === u && (f = o[e + " " + s[0]] || o["* " + s[0]])) {
                        f === !0 ? f = o[h] : o[h] !== !0 && (u = s[0], c.unshift(s[1]));
                        break
                    }
            if (f !== !0)
                if (f && n.throws) t = f(t);
                else try {
                    t = f(t)
                } catch (l) {
                    return {
                        state: "parsererror",
                        error: f ? l : "No conversion from " + e + " to " + u
                    }
                }
        }
        return {
            state: "success",
            data: t
        }
    }

    function rf() {
        try {
            return new n.XMLHttpRequest
        } catch (t) {}
    }

    function yo() {
        try {
            return new n.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
    }

    function ff() {
        return setTimeout(function() {
            it = t
        }), it = i.now()
    }

    function ef(n, t, i) {
        for (var u, f = (ft[t] || []).concat(ft["*"]), r = 0, e = f.length; e > r; r++)
            if (u = f[r].call(i, t, n)) return u
    }

    function of(n, t, r) {
        var h, e, o = 0,
            l = pt.length,
            f = i.Deferred().always(function() {
                delete c.elem
            }),
            c = function() {
                if (e) return !1;
                for (var s = it || ff(), t = Math.max(0, u.startTime + u.duration - s), h = t / u.duration || 0, i = 1 - h, r = 0, o = u.tweens.length; o > r; r++) u.tweens[r].run(i);
                return f.notifyWith(n, [u, i, t]), 1 > i && o ? t : (f.resolveWith(n, [u]), !1)
            },
            u = f.promise({
                elem: n,
                props: i.extend({}, t),
                opts: i.extend(!0, {
                    specialEasing: {}
                }, r),
                originalProperties: t,
                originalOptions: r,
                startTime: it || ff(),
                duration: r.duration,
                tweens: [],
                createTween: function(t, r) {
                    var f = i.Tween(n, u.opts, t, r, u.opts.specialEasing[t] || u.opts.easing);
                    return u.tweens.push(f), f
                },
                stop: function(t) {
                    var i = 0,
                        r = t ? u.tweens.length : 0;
                    if (e) return this;
                    for (e = !0; r > i; i++) u.tweens[i].run(1);
                    return t ? f.resolveWith(n, [u, t]) : f.rejectWith(n, [u, t]), this
                }
            }),
            s = u.props;
        for (bo(s, u.opts.specialEasing); l > o; o++)
            if (h = pt[o].call(u, n, s, u.opts)) return h;
        return i.map(s, ef, u), i.isFunction(u.opts.start) && u.opts.start.call(n, u), i.fx.timer(i.extend(c, {
            elem: n,
            anim: u,
            queue: u.opts.queue
        })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }

    function bo(n, t) {
        var r, f, e, u, o;
        for (r in n)
            if (f = i.camelCase(r), e = t[f], u = n[r], i.isArray(u) && (e = u[1], u = n[r] = u[0]), r !== f && (n[f] = u, delete n[r]), o = i.cssHooks[f], o && "expand" in o) {
                u = o.expand(u);
                delete n[f];
                for (r in u) r in n || (n[r] = u[r], t[r] = e)
            } else t[f] = e
    }

    function ko(n, t, r) {
        var u, a, v, c, e, y, s = this,
            l = {},
            o = n.style,
            h = n.nodeType && ut(n),
            f = i._data(n, "fxshow");
        r.queue || (e = i._queueHooks(n, "fx"), null == e.unqueued && (e.unqueued = 0, y = e.empty.fire, e.empty.fire = function() {
            e.unqueued || y()
        }), e.unqueued++, s.always(function() {
            s.always(function() {
                e.unqueued--;
                i.queue(n, "fx").length || e.empty.fire()
            })
        }));
        1 === n.nodeType && ("height" in t || "width" in t) && (r.overflow = [o.overflow, o.overflowX, o.overflowY], "inline" === i.css(n, "display") && "none" === i.css(n, "float") && (i.support.inlineBlockNeedsLayout && "inline" !== au(n.nodeName) ? o.zoom = 1 : o.display = "inline-block"));
        r.overflow && (o.overflow = "hidden", i.support.shrinkWrapBlocks || s.always(function() {
            o.overflow = r.overflow[0];
            o.overflowX = r.overflow[1];
            o.overflowY = r.overflow[2]
        }));
        for (u in t)
            if (a = t[u], po.exec(a)) {
                if (delete t[u], v = v || "toggle" === a, a === (h ? "hide" : "show")) continue;
                l[u] = f && f[u] || i.style(n, u)
            }
        if (!i.isEmptyObject(l)) {
            f ? "hidden" in f && (h = f.hidden) : f = i._data(n, "fxshow", {});
            v && (f.hidden = !h);
            h ? i(n).show() : s.done(function() {
                i(n).hide()
            });
            s.done(function() {
                var t;
                i._removeData(n, "fxshow");
                for (t in l) i.style(n, t, l[t])
            });
            for (u in l) c = ef(h ? f[u] : 0, u, s), u in f || (f[u] = c.start, h && (c.end = c.start, c.start = "width" === u || "height" === u ? 1 : 0))
        }
    }

    function f(n, t, i, r, u) {
        return new f.prototype.init(n, t, i, r, u)
    }

    function wt(n, t) {
        var r, i = {
                height: n
            },
            u = 0;
        for (t = t ? 1 : 0; 4 > u; u += 2 - t) r = p[u], i["margin" + r] = i["padding" + r] = n;
        return t && (i.opacity = i.width = n), i
    }

    function sf(n) {
        return i.isWindow(n) ? n : 9 === n.nodeType ? n.defaultView || n.parentWindow : !1
    }
    var et, bi, o = typeof t,
        hf = n.location,
        r = n.document,
        ki = r.documentElement,
        cf = n.jQuery,
        lf = n.$,
        ot = {},
        b = [],
        bt = "1.10.2",
        di = b.concat,
        kt = b.push,
        l = b.slice,
        gi = b.indexOf,
        af = ot.toString,
        k = ot.hasOwnProperty,
        dt = bt.trim,
        i = function(n, t) {
            return new i.fn.init(n, t, bi)
        },
        st = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        s = /\S+/g,
        vf = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        yf = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        nr = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        pf = /^[\],:{}\s]*$/,
        wf = /(?:^|:|,)(?:\s*\[)+/g,
        bf = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        kf = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
        df = /^-ms-/,
        gf = /-([\da-z])/gi,
        ne = function(n, t) {
            return t.toUpperCase()
        },
        h = function(n) {
            (r.addEventListener || "load" === n.type || "complete" === r.readyState) && (tr(), i.ready())
        },
        tr = function() {
            r.addEventListener ? (r.removeEventListener("DOMContentLoaded", h, !1), n.removeEventListener("load", h, !1)) : (r.detachEvent("onreadystatechange", h), n.detachEvent("onload", h))
        },
        ni, ir, rr, wi, at, nt, tt, tf, vt;
    i.fn = i.prototype = {
        jquery: bt,
        constructor: i,
        init: function(n, u, f) {
            var e, o;
            if (!n) return this;
            if ("string" == typeof n) {
                if (e = "<" === n.charAt(0) && ">" === n.charAt(n.length - 1) && n.length >= 3 ? [null, n, null] : yf.exec(n), !e || !e[1] && u) return !u || u.jquery ? (u || f).find(n) : this.constructor(u).find(n);
                if (e[1]) {
                    if (u = u instanceof i ? u[0] : u, i.merge(this, i.parseHTML(e[1], u && u.nodeType ? u.ownerDocument || u : r, !0)), nr.test(e[1]) && i.isPlainObject(u))
                        for (e in u) i.isFunction(this[e]) ? this[e](u[e]) : this.attr(e, u[e]);
                    return this
                }
                if (o = r.getElementById(e[2]), o && o.parentNode) {
                    if (o.id !== e[2]) return f.find(n);
                    this.length = 1;
                    this[0] = o
                }
                return this.context = r, this.selector = n, this
            }
            return n.nodeType ? (this.context = this[0] = n, this.length = 1, this) : i.isFunction(n) ? f.ready(n) : (n.selector !== t && (this.selector = n.selector, this.context = n.context), i.makeArray(n, this))
        },
        selector: "",
        length: 0,
        toArray: function() {
            return l.call(this)
        },
        get: function(n) {
            return null == n ? this.toArray() : 0 > n ? this[this.length + n] : this[n]
        },
        pushStack: function(n) {
            var t = i.merge(this.constructor(), n);
            return t.prevObject = this, t.context = this.context, t
        },
        each: function(n, t) {
            return i.each(this, n, t)
        },
        ready: function(n) {
            return i.ready.promise().done(n), this
        },
        slice: function() {
            return this.pushStack(l.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(n) {
            var i = this.length,
                t = +n + (0 > n ? i : 0);
            return this.pushStack(t >= 0 && i > t ? [this[t]] : [])
        },
        map: function(n) {
            return this.pushStack(i.map(this, function(t, i) {
                return n.call(t, i, t)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: kt,
        sort: [].sort,
        splice: [].splice
    };
    i.fn.init.prototype = i.fn;
    i.extend = i.fn.extend = function() {
        var u, o, r, e, s, h, n = arguments[0] || {},
            f = 1,
            l = arguments.length,
            c = !1;
        for ("boolean" == typeof n && (c = n, n = arguments[1] || {}, f = 2), "object" == typeof n || i.isFunction(n) || (n = {}), l === f && (n = this, --f); l > f; f++)
            if (null != (s = arguments[f]))
                for (e in s) u = n[e], r = s[e], n !== r && (c && r && (i.isPlainObject(r) || (o = i.isArray(r))) ? (o ? (o = !1, h = u && i.isArray(u) ? u : []) : h = u && i.isPlainObject(u) ? u : {}, n[e] = i.extend(c, h, r)) : r !== t && (n[e] = r));
        return n
    };
    i.extend({
        expando: "jQuery" + (bt + Math.random()).replace(/\D/g, ""),
        noConflict: function(t) {
            return n.$ === i && (n.$ = lf), t && n.jQuery === i && (n.jQuery = cf), i
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(n) {
            n ? i.readyWait++ : i.ready(!0)
        },
        ready: function(n) {
            if (n === !0 ? !--i.readyWait : !i.isReady) {
                if (!r.body) return setTimeout(i.ready);
                i.isReady = !0;
                n !== !0 && --i.readyWait > 0 || (et.resolveWith(r, [i]), i.fn.trigger && i(r).trigger("ready").off("ready"))
            }
        },
        isFunction: function(n) {
            return "function" === i.type(n)
        },
        isArray: Array.isArray || function(n) {
            return "array" === i.type(n)
        },
        isWindow: function(n) {
            return null != n && n == n.window
        },
        isNumeric: function(n) {
            return !isNaN(parseFloat(n)) && isFinite(n)
        },
        type: function(n) {
            return null == n ? n + "" : "object" == typeof n || "function" == typeof n ? ot[af.call(n)] || "object" : typeof n
        },
        isPlainObject: function(n) {
            var r;
            if (!n || "object" !== i.type(n) || n.nodeType || i.isWindow(n)) return !1;
            try {
                if (n.constructor && !k.call(n, "constructor") && !k.call(n.constructor.prototype, "isPrototypeOf")) return !1
            } catch (u) {
                return !1
            }
            if (i.support.ownLast)
                for (r in n) return k.call(n, r);
            for (r in n);
            return r === t || k.call(n, r)
        },
        isEmptyObject: function(n) {
            var t;
            for (t in n) return !1;
            return !0
        },
        error: function(n) {
            throw Error(n);
        },
        parseHTML: function(n, t, u) {
            if (!n || "string" != typeof n) return null;
            "boolean" == typeof t && (u = t, t = !1);
            t = t || r;
            var f = nr.exec(n),
                e = !u && [];
            return f ? [t.createElement(f[1])] : (f = i.buildFragment([n], t, e), e && i(e).remove(), i.merge([], f.childNodes))
        },
        parseJSON: function(r) {
            return n.JSON && n.JSON.parse ? n.JSON.parse(r) : null === r ? r : "string" == typeof r && (r = i.trim(r), r && pf.test(r.replace(bf, "@").replace(kf, "]").replace(wf, ""))) ? Function("return " + r)() : (i.error("Invalid JSON: " + r), t)
        },
        parseXML: function(r) {
            var u, f;
            if (!r || "string" != typeof r) return null;
            try {
                n.DOMParser ? (f = new DOMParser, u = f.parseFromString(r, "text/xml")) : (u = new ActiveXObject("Microsoft.XMLDOM"), u.async = "false", u.loadXML(r))
            } catch (e) {
                u = t
            }
            return u && u.documentElement && !u.getElementsByTagName("parsererror").length || i.error("Invalid XML: " + r), u
        },
        noop: function() {},
        globalEval: function(t) {
            t && i.trim(t) && (n.execScript || function(t) {
                n.eval.call(n, t)
            })(t)
        },
        camelCase: function(n) {
            return n.replace(df, "ms-").replace(gf, ne)
        },
        nodeName: function(n, t) {
            return n.nodeName && n.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(n, t, i) {
            var u, r = 0,
                f = n.length,
                e = gt(n);
            if (i) {
                if (e) {
                    for (; f > r; r++)
                        if (u = t.apply(n[r], i), u === !1) break
                } else
                    for (r in n)
                        if (u = t.apply(n[r], i), u === !1) break
            } else if (e) {
                for (; f > r; r++)
                    if (u = t.call(n[r], r, n[r]), u === !1) break
            } else
                for (r in n)
                    if (u = t.call(n[r], r, n[r]), u === !1) break; return n
        },
        trim: dt && !dt.call("﻿ ") ? function(n) {
            return null == n ? "" : dt.call(n)
        } : function(n) {
            return null == n ? "" : (n + "").replace(vf, "")
        },
        makeArray: function(n, t) {
            var r = t || [];
            return null != n && (gt(Object(n)) ? i.merge(r, "string" == typeof n ? [n] : n) : kt.call(r, n)), r
        },
        inArray: function(n, t, i) {
            var r;
            if (t) {
                if (gi) return gi.call(t, n, i);
                for (r = t.length, i = i ? 0 > i ? Math.max(0, r + i) : i : 0; r > i; i++)
                    if (i in t && t[i] === n) return i
            }
            return -1
        },
        merge: function(n, i) {
            var f = i.length,
                u = n.length,
                r = 0;
            if ("number" == typeof f)
                for (; f > r; r++) n[u++] = i[r];
            else
                while (i[r] !== t) n[u++] = i[r++];
            return n.length = u, n
        },
        grep: function(n, t, i) {
            var u, f = [],
                r = 0,
                e = n.length;
            for (i = !!i; e > r; r++) u = !!t(n[r], r), i !== u && f.push(n[r]);
            return f
        },
        map: function(n, t, i) {
            var u, r = 0,
                e = n.length,
                o = gt(n),
                f = [];
            if (o)
                for (; e > r; r++) u = t(n[r], r, i), null != u && (f[f.length] = u);
            else
                for (r in n) u = t(n[r], r, i), null != u && (f[f.length] = u);
            return di.apply([], f)
        },
        guid: 1,
        proxy: function(n, r) {
            var f, u, e;
            return "string" == typeof r && (e = n[r], r = n, n = e), i.isFunction(n) ? (f = l.call(arguments, 2), u = function() {
                return n.apply(r || this, f.concat(l.call(arguments)))
            }, u.guid = n.guid = n.guid || i.guid++, u) : t
        },
        access: function(n, r, u, f, e, o, s) {
            var h = 0,
                l = n.length,
                c = null == u;
            if ("object" === i.type(u)) {
                e = !0;
                for (h in u) i.access(n, r, h, u[h], !0, o, s)
            } else if (f !== t && (e = !0, i.isFunction(f) || (s = !0), c && (s ? (r.call(n, f), r = null) : (c = r, r = function(n, t, r) {
                    return c.call(i(n), r)
                })), r))
                for (; l > h; h++) r(n[h], u, s ? f : f.call(n[h], h, r(n[h], u)));
            return e ? n : c ? r.call(n) : l ? r(n[0], u) : o
        },
        now: function() {
            return (new Date).getTime()
        },
        swap: function(n, t, i, r) {
            var f, u, e = {};
            for (u in t) e[u] = n.style[u], n.style[u] = t[u];
            f = i.apply(n, r || []);
            for (u in t) n.style[u] = e[u];
            return f
        }
    });
    i.ready.promise = function(t) {
        if (!et)
            if (et = i.Deferred(), "complete" === r.readyState) setTimeout(i.ready);
            else if (r.addEventListener) r.addEventListener("DOMContentLoaded", h, !1), n.addEventListener("load", h, !1);
        else {
            r.attachEvent("onreadystatechange", h);
            n.attachEvent("onload", h);
            var u = !1;
            try {
                u = null == n.frameElement && r.documentElement
            } catch (e) {}
            u && u.doScroll && function f() {
                if (!i.isReady) {
                    try {
                        u.doScroll("left")
                    } catch (n) {
                        return setTimeout(f, 50)
                    }
                    tr();
                    i.ready()
                }
            }()
        }
        return et.promise(t)
    };
    i.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(n, t) {
        ot["[object " + t + "]"] = t.toLowerCase()
    });
    bi = i(r),
        function(n, t) {
            function u(n, t, i, r) {
                var p, u, f, l, w, a, k, c, g, d;
                if ((t ? t.ownerDocument || t : y) !== s && nt(t), t = t || s, i = i || [], !n || "string" != typeof n) return i;
                if (1 !== (l = t.nodeType) && 9 !== l) return [];
                if (v && !r) {
                    if (p = or.exec(n))
                        if (f = p[1]) {
                            if (9 === l) {
                                if (u = t.getElementById(f), !u || !u.parentNode) return i;
                                if (u.id === f) return i.push(u), i
                            } else if (t.ownerDocument && (u = t.ownerDocument.getElementById(f)) && ot(t, u) && u.id === f) return i.push(u), i
                        } else {
                            if (p[2]) return b.apply(i, t.getElementsByTagName(n)), i;
                            if ((f = p[3]) && e.getElementsByClassName && t.getElementsByClassName) return b.apply(i, t.getElementsByClassName(f)), i
                        }
                    if (e.qsa && (!h || !h.test(n))) {
                        if (c = k = o, g = t, d = 9 === l && n, 1 === l && "object" !== t.nodeName.toLowerCase()) {
                            for (a = pt(n), (k = t.getAttribute("id")) ? c = k.replace(cr, "\\$&") : t.setAttribute("id", c), c = "[id='" + c + "'] ", w = a.length; w--;) a[w] = c + wt(a[w]);
                            g = ti.test(n) && t.parentNode || t;
                            d = a.join(",")
                        }
                        if (d) try {
                            return b.apply(i, g.querySelectorAll(d)), i
                        } catch (tt) {} finally {
                            k || t.removeAttribute("id")
                        }
                    }
                }
                return pr(n.replace(vt, "$1"), t, i, r)
            }

            function ri() {
                function n(i, u) {
                    return t.push(i += " ") > r.cacheLength && delete n[t.shift()], n[i] = u
                }
                var t = [];
                return n
            }

            function c(n) {
                return n[o] = !0, n
            }

            function l(n) {
                var t = s.createElement("div");
                try {
                    return !!n(t)
                } catch (i) {
                    return !1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t);
                    t = null
                }
            }

            function ui(n, t) {
                for (var u = n.split("|"), i = n.length; i--;) r.attrHandle[u[i]] = t
            }

            function bi(n, t) {
                var i = t && n,
                    r = i && 1 === n.nodeType && 1 === t.nodeType && (~t.sourceIndex || vi) - (~n.sourceIndex || vi);
                if (r) return r;
                if (i)
                    while (i = i.nextSibling)
                        if (i === t) return -1;
                return n ? 1 : -1
            }

            function lr(n) {
                return function(t) {
                    var i = t.nodeName.toLowerCase();
                    return "input" === i && t.type === n
                }
            }

            function ar(n) {
                return function(t) {
                    var i = t.nodeName.toLowerCase();
                    return ("input" === i || "button" === i) && t.type === n
                }
            }

            function rt(n) {
                return c(function(t) {
                    return t = +t, c(function(i, r) {
                        for (var u, f = n([], i.length, t), e = f.length; e--;) i[u = f[e]] && (i[u] = !(r[u] = i[u]))
                    })
                })
            }

            function ki() {}

            function pt(n, t) {
                var e, f, s, o, i, h, c, l = li[n + " "];
                if (l) return t ? 0 : l.slice(0);
                for (i = n, h = [], c = r.preFilter; i;) {
                    (!e || (f = ir.exec(i))) && (f && (i = i.slice(f[0].length) || i), h.push(s = []));
                    e = !1;
                    (f = rr.exec(i)) && (e = f.shift(), s.push({
                        value: e,
                        type: f[0].replace(vt, " ")
                    }), i = i.slice(e.length));
                    for (o in r.filter)(f = yt[o].exec(i)) && (!c[o] || (f = c[o](f))) && (e = f.shift(), s.push({
                        value: e,
                        type: o,
                        matches: f
                    }), i = i.slice(e.length));
                    if (!e) break
                }
                return t ? i.length : i ? u.error(n) : li(n, h).slice(0)
            }

            function wt(n) {
                for (var t = 0, r = n.length, i = ""; r > t; t++) i += n[t].value;
                return i
            }

            function fi(n, t, i) {
                var r = t.dir,
                    u = i && "parentNode" === r,
                    f = di++;
                return t.first ? function(t, i, f) {
                    while (t = t[r])
                        if (1 === t.nodeType || u) return n(t, i, f)
                } : function(t, i, e) {
                    var h, s, c, l = p + " " + f;
                    if (e) {
                        while (t = t[r])
                            if ((1 === t.nodeType || u) && n(t, i, e)) return !0
                    } else
                        while (t = t[r])
                            if (1 === t.nodeType || u)
                                if (c = t[o] || (t[o] = {}), (s = c[r]) && s[0] === l) {
                                    if ((h = s[1]) === !0 || h === ht) return h === !0
                                } else if (s = c[r] = [l], s[1] = n(t, i, e) || ht, s[1] === !0) return !0
                }
            }

            function ei(n) {
                return n.length > 1 ? function(t, i, r) {
                    for (var u = n.length; u--;)
                        if (!n[u](t, i, r)) return !1;
                    return !0
                } : n[0]
            }

            function bt(n, t, i, r, u) {
                for (var e, o = [], f = 0, s = n.length, h = null != t; s > f; f++)(e = n[f]) && (!i || i(e, r, u)) && (o.push(e), h && t.push(f));
                return o
            }

            function oi(n, t, i, r, u, f) {
                return r && !r[o] && (r = oi(r)), u && !u[o] && (u = oi(u, f)), c(function(f, e, o, s) {
                    var l, c, a, p = [],
                        y = [],
                        w = e.length,
                        k = f || yr(t || "*", o.nodeType ? [o] : o, []),
                        v = !n || !f && t ? k : bt(k, p, n, o, s),
                        h = i ? u || (f ? n : w || r) ? [] : e : v;
                    if (i && i(v, h, o, s), r)
                        for (l = bt(h, y), r(l, [], o, s), c = l.length; c--;)(a = l[c]) && (h[y[c]] = !(v[y[c]] = a));
                    if (f) {
                        if (u || n) {
                            if (u) {
                                for (l = [], c = h.length; c--;)(a = h[c]) && l.push(v[c] = a);
                                u(null, h = [], l, s)
                            }
                            for (c = h.length; c--;)(a = h[c]) && (l = u ? it.call(f, a) : p[c]) > -1 && (f[l] = !(e[l] = a))
                        }
                    } else h = bt(h === e ? h.splice(w, h.length) : h), u ? u(null, e, h, s) : b.apply(e, h)
                })
            }

            function si(n) {
                for (var s, u, i, e = n.length, h = r.relative[n[0].type], c = h || r.relative[" "], t = h ? 1 : 0, l = fi(function(n) {
                        return n === s
                    }, c, !0), a = fi(function(n) {
                        return it.call(s, n) > -1
                    }, c, !0), f = [function(n, t, i) {
                        return !h && (i || t !== lt) || ((s = t).nodeType ? l(n, t, i) : a(n, t, i))
                    }]; e > t; t++)
                    if (u = r.relative[n[t].type]) f = [fi(ei(f), u)];
                    else {
                        if (u = r.filter[n[t].type].apply(null, n[t].matches), u[o]) {
                            for (i = ++t; e > i; i++)
                                if (r.relative[n[i].type]) break;
                            return oi(t > 1 && ei(f), t > 1 && wt(n.slice(0, t - 1).concat({
                                value: " " === n[t - 2].type ? "*" : ""
                            })).replace(vt, "$1"), u, i > t && si(n.slice(t, i)), e > i && si(n = n.slice(i)), e > i && wt(n))
                        }
                        f.push(u)
                    }
                return ei(f)
            }

            function vr(n, t) {
                var f = 0,
                    i = t.length > 0,
                    e = n.length > 0,
                    o = function(o, h, c, l, a) {
                        var y, g, k, w = [],
                            d = 0,
                            v = "0",
                            nt = o && [],
                            tt = null != a,
                            it = lt,
                            ut = o || e && r.find.TAG("*", a && h.parentNode || h),
                            rt = p += null == it ? 1 : Math.random() || .1;
                        for (tt && (lt = h !== s && h, ht = f); null != (y = ut[v]); v++) {
                            if (e && y) {
                                for (g = 0; k = n[g++];)
                                    if (k(y, h, c)) {
                                        l.push(y);
                                        break
                                    }
                                tt && (p = rt, ht = ++f)
                            }
                            i && ((y = !k && y) && d--, o && nt.push(y))
                        }
                        if (d += v, i && v !== d) {
                            for (g = 0; k = t[g++];) k(nt, w, h, c);
                            if (o) {
                                if (d > 0)
                                    while (v--) nt[v] || w[v] || (w[v] = nr.call(l));
                                w = bt(w)
                            }
                            b.apply(l, w);
                            tt && !o && w.length > 0 && d + t.length > 1 && u.uniqueSort(l)
                        }
                        return tt && (p = rt, lt = it), nt
                    };
                return i ? c(o) : o
            }

            function yr(n, t, i) {
                for (var r = 0, f = t.length; f > r; r++) u(n, t[r], i);
                return i
            }

            function pr(n, t, i, u) {
                var s, f, o, c, l, h = pt(n);
                if (!u && 1 === h.length) {
                    if (f = h[0] = h[0].slice(0), f.length > 2 && "ID" === (o = f[0]).type && e.getById && 9 === t.nodeType && v && r.relative[f[1].type]) {
                        if (t = (r.find.ID(o.matches[0].replace(k, d), t) || [])[0], !t) return i;
                        n = n.slice(f.shift().value.length)
                    }
                    for (s = yt.needsContext.test(n) ? 0 : f.length; s--;) {
                        if (o = f[s], r.relative[c = o.type]) break;
                        if ((l = r.find[c]) && (u = l(o.matches[0].replace(k, d), ti.test(f[0].type) && t.parentNode || t))) {
                            if (f.splice(s, 1), n = u.length && wt(f), !n) return b.apply(i, u), i;
                            break
                        }
                    }
                }
                return kt(n, h)(u, t, !v, i, ti.test(n)), i
            }
            var ut, e, ht, r, ct, hi, kt, lt, g, nt, s, a, v, h, tt, at, ot, o = "sizzle" + -new Date,
                y = n.document,
                p = 0,
                di = 0,
                ci = ri(),
                li = ri(),
                ai = ri(),
                ft = !1,
                dt = function(n, t) {
                    return n === t ? (ft = !0, 0) : 0
                },
                st = typeof t,
                vi = -2147483648,
                gi = {}.hasOwnProperty,
                w = [],
                nr = w.pop,
                tr = w.push,
                b = w.push,
                yi = w.slice,
                it = w.indexOf || function(n) {
                    for (var t = 0, i = this.length; i > t; t++)
                        if (this[t] === n) return t;
                    return -1
                },
                gt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                f = "[\\x20\\t\\r\\n\\f]",
                et = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                pi = et.replace("w", "w#"),
                wi = "\\[" + f + "*(" + et + ")" + f + "*(?:([*^$|!~]?=)" + f + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + pi + ")|)|)" + f + "*\\]",
                ni = ":(" + et + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + wi.replace(3, 8) + ")*)|.*)\\)|)",
                vt = RegExp("^" + f + "+|((?:^|[^\\\\])(?:\\\\.)*)" + f + "+$", "g"),
                ir = RegExp("^" + f + "*," + f + "*"),
                rr = RegExp("^" + f + "*([>+~]|" + f + ")" + f + "*"),
                ti = RegExp(f + "*[+~]"),
                ur = RegExp("=" + f + "*([^\\]'\"]*)" + f + "*\\]", "g"),
                fr = RegExp(ni),
                er = RegExp("^" + pi + "$"),
                yt = {
                    ID: RegExp("^#(" + et + ")"),
                    CLASS: RegExp("^\\.(" + et + ")"),
                    TAG: RegExp("^(" + et.replace("w", "w*") + ")"),
                    ATTR: RegExp("^" + wi),
                    PSEUDO: RegExp("^" + ni),
                    CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + f + "*(even|odd|(([+-]|)(\\d*)n|)" + f + "*(?:([+-]|)" + f + "*(\\d+)|))" + f + "*\\)|)", "i"),
                    bool: RegExp("^(?:" + gt + ")$", "i"),
                    needsContext: RegExp("^" + f + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + f + "*((?:-\\d)?\\d*)" + f + "*\\)|)(?=[^-]|$)", "i")
                },
                ii = /^[^{]+\{\s*\[native \w/,
                or = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                sr = /^(?:input|select|textarea|button)$/i,
                hr = /^h\d$/i,
                cr = /'|\\/g,
                k = RegExp("\\\\([\\da-f]{1,6}" + f + "?|(" + f + ")|.)", "ig"),
                d = function(n, t, i) {
                    var r = "0x" + t - 65536;
                    return r !== r || i ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(55296 | r >> 10, 56320 | 1023 & r)
                };
            try {
                b.apply(w = yi.call(y.childNodes), y.childNodes);
                w[y.childNodes.length].nodeType
            } catch (wr) {
                b = {
                    apply: w.length ? function(n, t) {
                        tr.apply(n, yi.call(t))
                    } : function(n, t) {
                        for (var i = n.length, r = 0; n[i++] = t[r++];);
                        n.length = i - 1
                    }
                }
            }
            hi = u.isXML = function(n) {
                var t = n && (n.ownerDocument || n).documentElement;
                return t ? "HTML" !== t.nodeName : !1
            };
            e = u.support = {};
            nt = u.setDocument = function(n) {
                var i = n ? n.ownerDocument || n : y,
                    u = i.defaultView;
                return i !== s && 9 === i.nodeType && i.documentElement ? (s = i, a = i.documentElement, v = !hi(i), u && u.attachEvent && u !== u.top && u.attachEvent("onbeforeunload", function() {
                    nt()
                }), e.attributes = l(function(n) {
                    return n.className = "i", !n.getAttribute("className")
                }), e.getElementsByTagName = l(function(n) {
                    return n.appendChild(i.createComment("")), !n.getElementsByTagName("*").length
                }), e.getElementsByClassName = l(function(n) {
                    return n.innerHTML = "<div class='a'><\/div><div class='a i'><\/div>", n.firstChild.className = "i", 2 === n.getElementsByClassName("i").length
                }), e.getById = l(function(n) {
                    return a.appendChild(n).id = o, !i.getElementsByName || !i.getElementsByName(o).length
                }), e.getById ? (r.find.ID = function(n, t) {
                    if (typeof t.getElementById !== st && v) {
                        var i = t.getElementById(n);
                        return i && i.parentNode ? [i] : []
                    }
                }, r.filter.ID = function(n) {
                    var t = n.replace(k, d);
                    return function(n) {
                        return n.getAttribute("id") === t
                    }
                }) : (delete r.find.ID, r.filter.ID = function(n) {
                    var t = n.replace(k, d);
                    return function(n) {
                        var i = typeof n.getAttributeNode !== st && n.getAttributeNode("id");
                        return i && i.value === t
                    }
                }), r.find.TAG = e.getElementsByTagName ? function(n, i) {
                    return typeof i.getElementsByTagName !== st ? i.getElementsByTagName(n) : t
                } : function(n, t) {
                    var i, r = [],
                        f = 0,
                        u = t.getElementsByTagName(n);
                    if ("*" === n) {
                        while (i = u[f++]) 1 === i.nodeType && r.push(i);
                        return r
                    }
                    return u
                }, r.find.CLASS = e.getElementsByClassName && function(n, i) {
                    return typeof i.getElementsByClassName !== st && v ? i.getElementsByClassName(n) : t
                }, tt = [], h = [], (e.qsa = ii.test(i.querySelectorAll)) && (l(function(n) {
                    n.innerHTML = "<select><option selected=''><\/option><\/select>";
                    n.querySelectorAll("[selected]").length || h.push("\\[" + f + "*(?:value|" + gt + ")");
                    n.querySelectorAll(":checked").length || h.push(":checked")
                }), l(function(n) {
                    var t = i.createElement("input");
                    t.setAttribute("type", "hidden");
                    n.appendChild(t).setAttribute("t", "");
                    n.querySelectorAll("[t^='']").length && h.push("[*^$]=" + f + "*(?:''|\"\")");
                    n.querySelectorAll(":enabled").length || h.push(":enabled", ":disabled");
                    n.querySelectorAll("*,:x");
                    h.push(",.*:")
                })), (e.matchesSelector = ii.test(at = a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.msMatchesSelector)) && l(function(n) {
                    e.disconnectedMatch = at.call(n, "div");
                    at.call(n, "[s!='']:x");
                    tt.push("!=", ni)
                }), h = h.length && RegExp(h.join("|")), tt = tt.length && RegExp(tt.join("|")), ot = ii.test(a.contains) || a.compareDocumentPosition ? function(n, t) {
                    var r = 9 === n.nodeType ? n.documentElement : n,
                        i = t && t.parentNode;
                    return n === i || !(!i || 1 !== i.nodeType || !(r.contains ? r.contains(i) : n.compareDocumentPosition && 16 & n.compareDocumentPosition(i)))
                } : function(n, t) {
                    if (t)
                        while (t = t.parentNode)
                            if (t === n) return !0;
                    return !1
                }, dt = a.compareDocumentPosition ? function(n, t) {
                    if (n === t) return ft = !0, 0;
                    var r = t.compareDocumentPosition && n.compareDocumentPosition && n.compareDocumentPosition(t);
                    return r ? 1 & r || !e.sortDetached && t.compareDocumentPosition(n) === r ? n === i || ot(y, n) ? -1 : t === i || ot(y, t) ? 1 : g ? it.call(g, n) - it.call(g, t) : 0 : 4 & r ? -1 : 1 : n.compareDocumentPosition ? -1 : 1
                } : function(n, t) {
                    var r, u = 0,
                        o = n.parentNode,
                        s = t.parentNode,
                        f = [n],
                        e = [t];
                    if (n === t) return ft = !0, 0;
                    if (!o || !s) return n === i ? -1 : t === i ? 1 : o ? -1 : s ? 1 : g ? it.call(g, n) - it.call(g, t) : 0;
                    if (o === s) return bi(n, t);
                    for (r = n; r = r.parentNode;) f.unshift(r);
                    for (r = t; r = r.parentNode;) e.unshift(r);
                    while (f[u] === e[u]) u++;
                    return u ? bi(f[u], e[u]) : f[u] === y ? -1 : e[u] === y ? 1 : 0
                }, i) : s
            };
            u.matches = function(n, t) {
                return u(n, null, null, t)
            };
            u.matchesSelector = function(n, t) {
                if ((n.ownerDocument || n) !== s && nt(n), t = t.replace(ur, "='$1']"), !(!e.matchesSelector || !v || tt && tt.test(t) || h && h.test(t))) try {
                    var i = at.call(n, t);
                    if (i || e.disconnectedMatch || n.document && 11 !== n.document.nodeType) return i
                } catch (r) {}
                return u(t, s, null, [n]).length > 0
            };
            u.contains = function(n, t) {
                return (n.ownerDocument || n) !== s && nt(n), ot(n, t)
            };
            u.attr = function(n, i) {
                (n.ownerDocument || n) !== s && nt(n);
                var f = r.attrHandle[i.toLowerCase()],
                    u = f && gi.call(r.attrHandle, i.toLowerCase()) ? f(n, i, !v) : t;
                return u === t ? e.attributes || !v ? n.getAttribute(i) : (u = n.getAttributeNode(i)) && u.specified ? u.value : null : u
            };
            u.error = function(n) {
                throw Error("Syntax error, unrecognized expression: " + n);
            };
            u.uniqueSort = function(n) {
                var r, u = [],
                    t = 0,
                    i = 0;
                if (ft = !e.detectDuplicates, g = !e.sortStable && n.slice(0), n.sort(dt), ft) {
                    while (r = n[i++]) r === n[i] && (t = u.push(i));
                    while (t--) n.splice(u[t], 1)
                }
                return n
            };
            ct = u.getText = function(n) {
                var r, i = "",
                    u = 0,
                    t = n.nodeType;
                if (t) {
                    if (1 === t || 9 === t || 11 === t) {
                        if ("string" == typeof n.textContent) return n.textContent;
                        for (n = n.firstChild; n; n = n.nextSibling) i += ct(n)
                    } else if (3 === t || 4 === t) return n.nodeValue
                } else
                    for (; r = n[u]; u++) i += ct(r);
                return i
            };
            r = u.selectors = {
                cacheLength: 50,
                createPseudo: c,
                match: yt,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(n) {
                        return n[1] = n[1].replace(k, d), n[3] = (n[4] || n[5] || "").replace(k, d), "~=" === n[2] && (n[3] = " " + n[3] + " "), n.slice(0, 4)
                    },
                    CHILD: function(n) {
                        return n[1] = n[1].toLowerCase(), "nth" === n[1].slice(0, 3) ? (n[3] || u.error(n[0]), n[4] = +(n[4] ? n[5] + (n[6] || 1) : 2 * ("even" === n[3] || "odd" === n[3])), n[5] = +(n[7] + n[8] || "odd" === n[3])) : n[3] && u.error(n[0]), n
                    },
                    PSEUDO: function(n) {
                        var r, i = !n[5] && n[2];
                        return yt.CHILD.test(n[0]) ? null : (n[3] && n[4] !== t ? n[2] = n[4] : i && fr.test(i) && (r = pt(i, !0)) && (r = i.indexOf(")", i.length - r) - i.length) && (n[0] = n[0].slice(0, r), n[2] = i.slice(0, r)), n.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(n) {
                        var t = n.replace(k, d).toLowerCase();
                        return "*" === n ? function() {
                            return !0
                        } : function(n) {
                            return n.nodeName && n.nodeName.toLowerCase() === t
                        }
                    },
                    CLASS: function(n) {
                        var t = ci[n + " "];
                        return t || (t = RegExp("(^|" + f + ")" + n + "(" + f + "|$)")) && ci(n, function(n) {
                            return t.test("string" == typeof n.className && n.className || typeof n.getAttribute !== st && n.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(n, t, i) {
                        return function(r) {
                            var f = u.attr(r, n);
                            return null == f ? "!=" === t : t ? (f += "", "=" === t ? f === i : "!=" === t ? f !== i : "^=" === t ? i && 0 === f.indexOf(i) : "*=" === t ? i && f.indexOf(i) > -1 : "$=" === t ? i && f.slice(-i.length) === i : "~=" === t ? (" " + f + " ").indexOf(i) > -1 : "|=" === t ? f === i || f.slice(0, i.length + 1) === i + "-" : !1) : !0
                        }
                    },
                    CHILD: function(n, t, i, r, u) {
                        var s = "nth" !== n.slice(0, 3),
                            e = "last" !== n.slice(-4),
                            f = "of-type" === t;
                        return 1 === r && 0 === u ? function(n) {
                            return !!n.parentNode
                        } : function(t, i, h) {
                            var a, k, c, l, v, w, b = s !== e ? "nextSibling" : "previousSibling",
                                y = t.parentNode,
                                g = f && t.nodeName.toLowerCase(),
                                d = !h && !f;
                            if (y) {
                                if (s) {
                                    while (b) {
                                        for (c = t; c = c[b];)
                                            if (f ? c.nodeName.toLowerCase() === g : 1 === c.nodeType) return !1;
                                        w = b = "only" === n && !w && "nextSibling"
                                    }
                                    return !0
                                }
                                if (w = [e ? y.firstChild : y.lastChild], e && d) {
                                    for (k = y[o] || (y[o] = {}), a = k[n] || [], v = a[0] === p && a[1], l = a[0] === p && a[2], c = v && y.childNodes[v]; c = ++v && c && c[b] || (l = v = 0) || w.pop();)
                                        if (1 === c.nodeType && ++l && c === t) {
                                            k[n] = [p, v, l];
                                            break
                                        }
                                } else if (d && (a = (t[o] || (t[o] = {}))[n]) && a[0] === p) l = a[1];
                                else
                                    while (c = ++v && c && c[b] || (l = v = 0) || w.pop())
                                        if ((f ? c.nodeName.toLowerCase() === g : 1 === c.nodeType) && ++l && (d && ((c[o] || (c[o] = {}))[n] = [p, l]), c === t)) break; return l -= u, l === r || 0 == l % r && l / r >= 0
                            }
                        }
                    },
                    PSEUDO: function(n, t) {
                        var f, i = r.pseudos[n] || r.setFilters[n.toLowerCase()] || u.error("unsupported pseudo: " + n);
                        return i[o] ? i(t) : i.length > 1 ? (f = [n, n, "", t], r.setFilters.hasOwnProperty(n.toLowerCase()) ? c(function(n, r) {
                            for (var u, f = i(n, t), e = f.length; e--;) u = it.call(n, f[e]), n[u] = !(r[u] = f[e])
                        }) : function(n) {
                            return i(n, 0, f)
                        }) : i
                    }
                },
                pseudos: {
                    not: c(function(n) {
                        var i = [],
                            r = [],
                            t = kt(n.replace(vt, "$1"));
                        return t[o] ? c(function(n, i, r, u) {
                            for (var e, o = t(n, null, u, []), f = n.length; f--;)(e = o[f]) && (n[f] = !(i[f] = e))
                        }) : function(n, u, f) {
                            return i[0] = n, t(i, null, f, r), !r.pop()
                        }
                    }),
                    has: c(function(n) {
                        return function(t) {
                            return u(n, t).length > 0
                        }
                    }),
                    contains: c(function(n) {
                        return function(t) {
                            return (t.textContent || t.innerText || ct(t)).indexOf(n) > -1
                        }
                    }),
                    lang: c(function(n) {
                        return er.test(n || "") || u.error("unsupported lang: " + n), n = n.replace(k, d).toLowerCase(),
                            function(t) {
                                var i;
                                do
                                    if (i = v ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return i = i.toLowerCase(), i === n || 0 === i.indexOf(n + "-");
                                while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1
                            }
                    }),
                    target: function(t) {
                        var i = n.location && n.location.hash;
                        return i && i.slice(1) === t.id
                    },
                    root: function(n) {
                        return n === a
                    },
                    focus: function(n) {
                        return n === s.activeElement && (!s.hasFocus || s.hasFocus()) && !!(n.type || n.href || ~n.tabIndex)
                    },
                    enabled: function(n) {
                        return n.disabled === !1
                    },
                    disabled: function(n) {
                        return n.disabled === !0
                    },
                    checked: function(n) {
                        var t = n.nodeName.toLowerCase();
                        return "input" === t && !!n.checked || "option" === t && !!n.selected
                    },
                    selected: function(n) {
                        return n.parentNode && n.parentNode.selectedIndex, n.selected === !0
                    },
                    empty: function(n) {
                        for (n = n.firstChild; n; n = n.nextSibling)
                            if (n.nodeName > "@" || 3 === n.nodeType || 4 === n.nodeType) return !1;
                        return !0
                    },
                    parent: function(n) {
                        return !r.pseudos.empty(n)
                    },
                    header: function(n) {
                        return hr.test(n.nodeName)
                    },
                    input: function(n) {
                        return sr.test(n.nodeName)
                    },
                    button: function(n) {
                        var t = n.nodeName.toLowerCase();
                        return "input" === t && "button" === n.type || "button" === t
                    },
                    text: function(n) {
                        var t;
                        return "input" === n.nodeName.toLowerCase() && "text" === n.type && (null == (t = n.getAttribute("type")) || t.toLowerCase() === n.type)
                    },
                    first: rt(function() {
                        return [0]
                    }),
                    last: rt(function(n, t) {
                        return [t - 1]
                    }),
                    eq: rt(function(n, t, i) {
                        return [0 > i ? i + t : i]
                    }),
                    even: rt(function(n, t) {
                        for (var i = 0; t > i; i += 2) n.push(i);
                        return n
                    }),
                    odd: rt(function(n, t) {
                        for (var i = 1; t > i; i += 2) n.push(i);
                        return n
                    }),
                    lt: rt(function(n, t, i) {
                        for (var r = 0 > i ? i + t : i; --r >= 0;) n.push(r);
                        return n
                    }),
                    gt: rt(function(n, t, i) {
                        for (var r = 0 > i ? i + t : i; t > ++r;) n.push(r);
                        return n
                    })
                }
            };
            r.pseudos.nth = r.pseudos.eq;
            for (ut in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) r.pseudos[ut] = lr(ut);
            for (ut in {
                    submit: !0,
                    reset: !0
                }) r.pseudos[ut] = ar(ut);
            ki.prototype = r.filters = r.pseudos;
            r.setFilters = new ki;
            kt = u.compile = function(n, t) {
                var r, u = [],
                    f = [],
                    i = ai[n + " "];
                if (!i) {
                    for (t || (t = pt(n)), r = t.length; r--;) i = si(t[r]), i[o] ? u.push(i) : f.push(i);
                    i = ai(n, vr(f, u))
                }
                return i
            };
            e.sortStable = o.split("").sort(dt).join("") === o;
            e.detectDuplicates = ft;
            nt();
            e.sortDetached = l(function(n) {
                return 1 & n.compareDocumentPosition(s.createElement("div"))
            });
            l(function(n) {
                return n.innerHTML = "<a href='#'><\/a>", "#" === n.firstChild.getAttribute("href")
            }) || ui("type|href|height|width", function(n, i, r) {
                return r ? t : n.getAttribute(i, "type" === i.toLowerCase() ? 1 : 2)
            });
            e.attributes && l(function(n) {
                return n.innerHTML = "<input/>", n.firstChild.setAttribute("value", ""), "" === n.firstChild.getAttribute("value")
            }) || ui("value", function(n, i, r) {
                return r || "input" !== n.nodeName.toLowerCase() ? t : n.defaultValue
            });
            l(function(n) {
                return null == n.getAttribute("disabled")
            }) || ui(gt, function(n, i, r) {
                var u;
                return r ? t : (u = n.getAttributeNode(i)) && u.specified ? u.value : n[i] === !0 ? i.toLowerCase() : null
            });
            i.find = u;
            i.expr = u.selectors;
            i.expr[":"] = i.expr.pseudos;
            i.unique = u.uniqueSort;
            i.text = u.getText;
            i.isXMLDoc = u.isXML;
            i.contains = u.contains
        }(n);
    ni = {};
    i.Callbacks = function(n) {
        n = "string" == typeof n ? ni[n] || te(n) : i.extend({}, n);
        var s, f, c, e, o, l, r = [],
            u = !n.once && [],
            a = function(t) {
                for (f = n.memory && t, c = !0, o = l || 0, l = 0, e = r.length, s = !0; r && e > o; o++)
                    if (r[o].apply(t[0], t[1]) === !1 && n.stopOnFalse) {
                        f = !1;
                        break
                    }
                s = !1;
                r && (u ? u.length && a(u.shift()) : f ? r = [] : h.disable())
            },
            h = {
                add: function() {
                    if (r) {
                        var t = r.length;
                        (function u(t) {
                            i.each(t, function(t, f) {
                                var e = i.type(f);
                                "function" === e ? n.unique && h.has(f) || r.push(f) : f && f.length && "string" !== e && u(f)
                            })
                        })(arguments);
                        s ? e = r.length : f && (l = t, a(f))
                    }
                    return this
                },
                remove: function() {
                    return r && i.each(arguments, function(n, t) {
                        for (var u;
                            (u = i.inArray(t, r, u)) > -1;) r.splice(u, 1), s && (e >= u && e--, o >= u && o--)
                    }), this
                },
                has: function(n) {
                    return n ? i.inArray(n, r) > -1 : !(!r || !r.length)
                },
                empty: function() {
                    return r = [], e = 0, this
                },
                disable: function() {
                    return r = u = f = t, this
                },
                disabled: function() {
                    return !r
                },
                lock: function() {
                    return u = t, f || h.disable(), this
                },
                locked: function() {
                    return !u
                },
                fireWith: function(n, t) {
                    return !r || c && !u || (t = t || [], t = [n, t.slice ? t.slice() : t], s ? u.push(t) : a(t)), this
                },
                fire: function() {
                    return h.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!c
                }
            };
        return h
    };
    i.extend({
        Deferred: function(n) {
            var u = [
                    ["resolve", "done", i.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", i.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", i.Callbacks("memory")]
                ],
                f = "pending",
                r = {
                    state: function() {
                        return f
                    },
                    always: function() {
                        return t.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var n = arguments;
                        return i.Deferred(function(f) {
                            i.each(u, function(u, e) {
                                var s = e[0],
                                    o = i.isFunction(n[u]) && n[u];
                                t[e[1]](function() {
                                    var n = o && o.apply(this, arguments);
                                    n && i.isFunction(n.promise) ? n.promise().done(f.resolve).fail(f.reject).progress(f.notify) : f[s + "With"](this === r ? f.promise() : this, o ? [n] : arguments)
                                })
                            });
                            n = null
                        }).promise()
                    },
                    promise: function(n) {
                        return null != n ? i.extend(n, r) : r
                    }
                },
                t = {};
            return r.pipe = r.then, i.each(u, function(n, i) {
                var e = i[2],
                    o = i[3];
                r[i[1]] = e.add;
                o && e.add(function() {
                    f = o
                }, u[1 ^ n][2].disable, u[2][2].lock);
                t[i[0]] = function() {
                    return t[i[0] + "With"](this === t ? r : this, arguments), this
                };
                t[i[0] + "With"] = e.fireWith
            }), r.promise(t), n && n.call(t, t), t
        },
        when: function(n) {
            var t = 0,
                u = l.call(arguments),
                r = u.length,
                e = 1 !== r || n && i.isFunction(n.promise) ? r : 0,
                f = 1 === e ? n : i.Deferred(),
                h = function(n, t, i) {
                    return function(r) {
                        t[n] = this;
                        i[n] = arguments.length > 1 ? l.call(arguments) : r;
                        i === o ? f.notifyWith(t, i) : --e || f.resolveWith(t, i)
                    }
                },
                o, c, s;
            if (r > 1)
                for (o = Array(r), c = Array(r), s = Array(r); r > t; t++) u[t] && i.isFunction(u[t].promise) ? u[t].promise().done(h(t, s, u)).fail(f.reject).progress(h(t, c, o)) : --e;
            return e || f.resolveWith(s, u), f.promise()
        }
    });
    i.support = function(t) {
        var a, e, f, h, c, l, v, y, s, u = r.createElement("div");
        if (u.setAttribute("className", "t"), u.innerHTML = "  <link/><table><\/table><a href='/a'>a<\/a><input type='checkbox'/>", a = u.getElementsByTagName("*") || [], e = u.getElementsByTagName("a")[0], !e || !e.style || !a.length) return t;
        h = r.createElement("select");
        l = h.appendChild(r.createElement("option"));
        f = u.getElementsByTagName("input")[0];
        e.style.cssText = "top:1px;float:left;opacity:.5";
        t.getSetAttribute = "t" !== u.className;
        t.leadingWhitespace = 3 === u.firstChild.nodeType;
        t.tbody = !u.getElementsByTagName("tbody").length;
        t.htmlSerialize = !!u.getElementsByTagName("link").length;
        t.style = /top/.test(e.getAttribute("style"));
        t.hrefNormalized = "/a" === e.getAttribute("href");
        t.opacity = /^0.5/.test(e.style.opacity);
        t.cssFloat = !!e.style.cssFloat;
        t.checkOn = !!f.value;
        t.optSelected = l.selected;
        t.enctype = !!r.createElement("form").enctype;
        t.html5Clone = "<:nav><\/:nav>" !== r.createElement("nav").cloneNode(!0).outerHTML;
        t.inlineBlockNeedsLayout = !1;
        t.shrinkWrapBlocks = !1;
        t.pixelPosition = !1;
        t.deleteExpando = !0;
        t.noCloneEvent = !0;
        t.reliableMarginRight = !0;
        t.boxSizingReliable = !0;
        f.checked = !0;
        t.noCloneChecked = f.cloneNode(!0).checked;
        h.disabled = !0;
        t.optDisabled = !l.disabled;
        try {
            delete u.test
        } catch (p) {
            t.deleteExpando = !1
        }
        f = r.createElement("input");
        f.setAttribute("value", "");
        t.input = "" === f.getAttribute("value");
        f.value = "t";
        f.setAttribute("type", "radio");
        t.radioValue = "t" === f.value;
        f.setAttribute("checked", "t");
        f.setAttribute("name", "t");
        c = r.createDocumentFragment();
        c.appendChild(f);
        t.appendChecked = f.checked;
        t.checkClone = c.cloneNode(!0).cloneNode(!0).lastChild.checked;
        u.attachEvent && (u.attachEvent("onclick", function() {
            t.noCloneEvent = !1
        }), u.cloneNode(!0).click());
        for (s in {
                submit: !0,
                change: !0,
                focusin: !0
            }) u.setAttribute(v = "on" + s, "t"), t[s + "Bubbles"] = v in n || u.attributes[v].expando === !1;
        u.style.backgroundClip = "content-box";
        u.cloneNode(!0).style.backgroundClip = "";
        t.clearCloneStyle = "content-box" === u.style.backgroundClip;
        for (s in i(t)) break;
        return t.ownLast = "0" !== s, i(function() {
            var h, e, f, c = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
                s = r.getElementsByTagName("body")[0];
            s && (h = r.createElement("div"), h.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", s.appendChild(h).appendChild(u), u.innerHTML = "<table><tr><td><\/td><td>t<\/td><\/tr><\/table>", f = u.getElementsByTagName("td"), f[0].style.cssText = "padding:0;margin:0;border:0;display:none", y = 0 === f[0].offsetHeight, f[0].style.display = "", f[1].style.display = "none", t.reliableHiddenOffsets = y && 0 === f[0].offsetHeight, u.innerHTML = "", u.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", i.swap(s, null != s.style.zoom ? {
                zoom: 1
            } : {}, function() {
                t.boxSizing = 4 === u.offsetWidth
            }), n.getComputedStyle && (t.pixelPosition = "1%" !== (n.getComputedStyle(u, null) || {}).top, t.boxSizingReliable = "4px" === (n.getComputedStyle(u, null) || {
                width: "4px"
            }).width, e = u.appendChild(r.createElement("div")), e.style.cssText = u.style.cssText = c, e.style.marginRight = e.style.width = "0", u.style.width = "1px", t.reliableMarginRight = !parseFloat((n.getComputedStyle(e, null) || {}).marginRight)), typeof u.style.zoom !== o && (u.innerHTML = "", u.style.cssText = c + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === u.offsetWidth, u.style.display = "block", u.innerHTML = "<div><\/div>", u.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== u.offsetWidth, t.inlineBlockNeedsLayout && (s.style.zoom = 1)), s.removeChild(h), h = u = f = e = null)
        }), a = h = c = l = e = f = null, t
    }({});
    ir = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/;
    rr = /([A-Z])/g;
    i.extend({
        cache: {},
        noData: {
            applet: !0,
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(n) {
            return n = n.nodeType ? i.cache[n[i.expando]] : n[i.expando], !!n && !ti(n)
        },
        data: function(n, t, i) {
            return ur(n, t, i)
        },
        removeData: function(n, t) {
            return fr(n, t)
        },
        _data: function(n, t, i) {
            return ur(n, t, i, !0)
        },
        _removeData: function(n, t) {
            return fr(n, t, !0)
        },
        acceptData: function(n) {
            if (n.nodeType && 1 !== n.nodeType && 9 !== n.nodeType) return !1;
            var t = n.nodeName && i.noData[n.nodeName.toLowerCase()];
            return !t || t !== !0 && n.getAttribute("classid") === t
        }
    });
    i.fn.extend({
        data: function(n, r) {
            var e, f, o = null,
                s = 0,
                u = this[0];
            if (n === t) {
                if (this.length && (o = i.data(u), 1 === u.nodeType && !i._data(u, "parsedAttrs"))) {
                    for (e = u.attributes; e.length > s; s++) f = e[s].name, 0 === f.indexOf("data-") && (f = i.camelCase(f.slice(5)), er(u, f, o[f]));
                    i._data(u, "parsedAttrs", !0)
                }
                return o
            }
            return "object" == typeof n ? this.each(function() {
                i.data(this, n)
            }) : arguments.length > 1 ? this.each(function() {
                i.data(this, n, r)
            }) : u ? er(u, n, i.data(u, n)) : null
        },
        removeData: function(n) {
            return this.each(function() {
                i.removeData(this, n)
            })
        }
    });
    i.extend({
        queue: function(n, r, u) {
            var f;
            return n ? (r = (r || "fx") + "queue", f = i._data(n, r), u && (!f || i.isArray(u) ? f = i._data(n, r, i.makeArray(u)) : f.push(u)), f || []) : t
        },
        dequeue: function(n, t) {
            t = t || "fx";
            var r = i.queue(n, t),
                e = r.length,
                u = r.shift(),
                f = i._queueHooks(n, t),
                o = function() {
                    i.dequeue(n, t)
                };
            "inprogress" === u && (u = r.shift(), e--);
            u && ("fx" === t && r.unshift("inprogress"), delete f.stop, u.call(n, o, f));
            !e && f && f.empty.fire()
        },
        _queueHooks: function(n, t) {
            var r = t + "queueHooks";
            return i._data(n, r) || i._data(n, r, {
                empty: i.Callbacks("once memory").add(function() {
                    i._removeData(n, t + "queue");
                    i._removeData(n, r)
                })
            })
        }
    });
    i.fn.extend({
        queue: function(n, r) {
            var u = 2;
            return "string" != typeof n && (r = n, n = "fx", u--), u > arguments.length ? i.queue(this[0], n) : r === t ? this : this.each(function() {
                var t = i.queue(this, n, r);
                i._queueHooks(this, n);
                "fx" === n && "inprogress" !== t[0] && i.dequeue(this, n)
            })
        },
        dequeue: function(n) {
            return this.each(function() {
                i.dequeue(this, n)
            })
        },
        delay: function(n, t) {
            return n = i.fx ? i.fx.speeds[n] || n : n, t = t || "fx", this.queue(t, function(t, i) {
                var r = setTimeout(t, n);
                i.stop = function() {
                    clearTimeout(r)
                }
            })
        },
        clearQueue: function(n) {
            return this.queue(n || "fx", [])
        },
        promise: function(n, r) {
            var u, e = 1,
                o = i.Deferred(),
                f = this,
                s = this.length,
                h = function() {
                    --e || o.resolveWith(f, [f])
                };
            for ("string" != typeof n && (r = n, n = t), n = n || "fx"; s--;) u = i._data(f[s], n + "queueHooks"), u && u.empty && (e++, u.empty.add(h));
            return h(), o.promise(r)
        }
    });
    var d, or, ii = /[\t\r\n\f]/g,
        ie = /\r/g,
        re = /^(?:input|select|textarea|button|object)$/i,
        ue = /^(?:a|area)$/i,
        ri = /^(?:checked|selected)$/i,
        a = i.support.getSetAttribute,
        ht = i.support.input;
    i.fn.extend({
        attr: function(n, t) {
            return i.access(this, i.attr, n, t, arguments.length > 1)
        },
        removeAttr: function(n) {
            return this.each(function() {
                i.removeAttr(this, n)
            })
        },
        prop: function(n, t) {
            return i.access(this, i.prop, n, t, arguments.length > 1)
        },
        removeProp: function(n) {
            return n = i.propFix[n] || n, this.each(function() {
                try {
                    this[n] = t;
                    delete this[n]
                } catch (i) {}
            })
        },
        addClass: function(n) {
            var e, t, r, u, o, f = 0,
                h = this.length,
                c = "string" == typeof n && n;
            if (i.isFunction(n)) return this.each(function(t) {
                i(this).addClass(n.call(this, t, this.className))
            });
            if (c)
                for (e = (n || "").match(s) || []; h > f; f++)
                    if (t = this[f], r = 1 === t.nodeType && (t.className ? (" " + t.className + " ").replace(ii, " ") : " ")) {
                        for (o = 0; u = e[o++];) 0 > r.indexOf(" " + u + " ") && (r += u + " ");
                        t.className = i.trim(r)
                    }
            return this
        },
        removeClass: function(n) {
            var e, t, r, u, o, f = 0,
                h = this.length,
                c = 0 === arguments.length || "string" == typeof n && n;
            if (i.isFunction(n)) return this.each(function(t) {
                i(this).removeClass(n.call(this, t, this.className))
            });
            if (c)
                for (e = (n || "").match(s) || []; h > f; f++)
                    if (t = this[f], r = 1 === t.nodeType && (t.className ? (" " + t.className + " ").replace(ii, " ") : "")) {
                        for (o = 0; u = e[o++];)
                            while (r.indexOf(" " + u + " ") >= 0) r = r.replace(" " + u + " ", " ");
                        t.className = n ? i.trim(r) : ""
                    }
            return this
        },
        toggleClass: function(n, t) {
            var r = typeof n;
            return "boolean" == typeof t && "string" === r ? t ? this.addClass(n) : this.removeClass(n) : i.isFunction(n) ? this.each(function(r) {
                i(this).toggleClass(n.call(this, r, this.className, t), t)
            }) : this.each(function() {
                if ("string" === r)
                    for (var t, f = 0, u = i(this), e = n.match(s) || []; t = e[f++];) u.hasClass(t) ? u.removeClass(t) : u.addClass(t);
                else(r === o || "boolean" === r) && (this.className && i._data(this, "__className__", this.className), this.className = this.className || n === !1 ? "" : i._data(this, "__className__") || "")
            })
        },
        hasClass: function(n) {
            for (var i = " " + n + " ", t = 0, r = this.length; r > t; t++)
                if (1 === this[t].nodeType && (" " + this[t].className + " ").replace(ii, " ").indexOf(i) >= 0) return !0;
            return !1
        },
        val: function(n) {
            var u, r, e, f = this[0];
            return arguments.length ? (e = i.isFunction(n), this.each(function(u) {
                var f;
                1 === this.nodeType && (f = e ? n.call(this, u, i(this).val()) : n, null == f ? f = "" : "number" == typeof f ? f += "" : i.isArray(f) && (f = i.map(f, function(n) {
                    return null == n ? "" : n + ""
                })), r = i.valHooks[this.type] || i.valHooks[this.nodeName.toLowerCase()], r && "set" in r && r.set(this, f, "value") !== t || (this.value = f))
            })) : f ? (r = i.valHooks[f.type] || i.valHooks[f.nodeName.toLowerCase()], r && "get" in r && (u = r.get(f, "value")) !== t ? u : (u = f.value, "string" == typeof u ? u.replace(ie, "") : null == u ? "" : u)) : void 0
        }
    });
    i.extend({
        valHooks: {
            option: {
                get: function(n) {
                    var t = i.find.attr(n, "value");
                    return null != t ? t : n.text
                }
            },
            select: {
                get: function(n) {
                    for (var e, t, o = n.options, r = n.selectedIndex, u = "select-one" === n.type || 0 > r, s = u ? null : [], h = u ? r + 1 : o.length, f = 0 > r ? h : u ? r : 0; h > f; f++)
                        if (t = o[f], !(!t.selected && f !== r || (i.support.optDisabled ? t.disabled : null !== t.getAttribute("disabled")) || t.parentNode.disabled && i.nodeName(t.parentNode, "optgroup"))) {
                            if (e = i(t).val(), u) return e;
                            s.push(e)
                        }
                    return s
                },
                set: function(n, t) {
                    for (var u, r, f = n.options, e = i.makeArray(t), o = f.length; o--;) r = f[o], (r.selected = i.inArray(i(r).val(), e) >= 0) && (u = !0);
                    return u || (n.selectedIndex = -1), e
                }
            }
        },
        attr: function(n, r, u) {
            var f, e, s = n.nodeType;
            if (n && 3 !== s && 8 !== s && 2 !== s) return typeof n.getAttribute === o ? i.prop(n, r, u) : (1 === s && i.isXMLDoc(n) || (r = r.toLowerCase(), f = i.attrHooks[r] || (i.expr.match.bool.test(r) ? or : d)), u === t ? f && "get" in f && null !== (e = f.get(n, r)) ? e : (e = i.find.attr(n, r), null == e ? t : e) : null !== u ? f && "set" in f && (e = f.set(n, u, r)) !== t ? e : (n.setAttribute(r, u + ""), u) : (i.removeAttr(n, r), t))
        },
        removeAttr: function(n, t) {
            var r, u, e = 0,
                f = t && t.match(s);
            if (f && 1 === n.nodeType)
                while (r = f[e++]) u = i.propFix[r] || r, i.expr.match.bool.test(r) ? ht && a || !ri.test(r) ? n[u] = !1 : n[i.camelCase("default-" + r)] = n[u] = !1 : i.attr(n, r, ""), n.removeAttribute(a ? r : u)
        },
        attrHooks: {
            type: {
                set: function(n, t) {
                    if (!i.support.radioValue && "radio" === t && i.nodeName(n, "input")) {
                        var r = n.value;
                        return n.setAttribute("type", t), r && (n.value = r), t
                    }
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(n, r, u) {
            var e, f, s, o = n.nodeType;
            if (n && 3 !== o && 8 !== o && 2 !== o) return s = 1 !== o || !i.isXMLDoc(n), s && (r = i.propFix[r] || r, f = i.propHooks[r]), u !== t ? f && "set" in f && (e = f.set(n, u, r)) !== t ? e : n[r] = u : f && "get" in f && null !== (e = f.get(n, r)) ? e : n[r]
        },
        propHooks: {
            tabIndex: {
                get: function(n) {
                    var t = i.find.attr(n, "tabindex");
                    return t ? parseInt(t, 10) : re.test(n.nodeName) || ue.test(n.nodeName) && n.href ? 0 : -1
                }
            }
        }
    });
    or = {
        set: function(n, t, r) {
            return t === !1 ? i.removeAttr(n, r) : ht && a || !ri.test(r) ? n.setAttribute(!a && i.propFix[r] || r, r) : n[i.camelCase("default-" + r)] = n[r] = !0, r
        }
    };
    i.each(i.expr.match.bool.source.match(/\w+/g), function(n, r) {
        var u = i.expr.attrHandle[r] || i.find.attr;
        i.expr.attrHandle[r] = ht && a || !ri.test(r) ? function(n, r, f) {
            var e = i.expr.attrHandle[r],
                o = f ? t : (i.expr.attrHandle[r] = t) != u(n, r, f) ? r.toLowerCase() : null;
            return i.expr.attrHandle[r] = e, o
        } : function(n, r, u) {
            return u ? t : n[i.camelCase("default-" + r)] ? r.toLowerCase() : null
        }
    });
    ht && a || (i.attrHooks.value = {
        set: function(n, r, u) {
            return i.nodeName(n, "input") ? (n.defaultValue = r, t) : d && d.set(n, r, u)
        }
    });
    a || (d = {
        set: function(n, i, r) {
            var u = n.getAttributeNode(r);
            return u || n.setAttributeNode(u = n.ownerDocument.createAttribute(r)), u.value = i += "", "value" === r || i === n.getAttribute(r) ? i : t
        }
    }, i.expr.attrHandle.id = i.expr.attrHandle.name = i.expr.attrHandle.coords = function(n, i, r) {
        var u;
        return r ? t : (u = n.getAttributeNode(i)) && "" !== u.value ? u.value : null
    }, i.valHooks.button = {
        get: function(n, i) {
            var r = n.getAttributeNode(i);
            return r && r.specified ? r.value : t
        },
        set: d.set
    }, i.attrHooks.contenteditable = {
        set: function(n, t, i) {
            d.set(n, "" === t ? !1 : t, i)
        }
    }, i.each(["width", "height"], function(n, r) {
        i.attrHooks[r] = {
            set: function(n, i) {
                return "" === i ? (n.setAttribute(r, "auto"), i) : t
            }
        }
    }));
    i.support.hrefNormalized || i.each(["href", "src"], function(n, t) {
        i.propHooks[t] = {
            get: function(n) {
                return n.getAttribute(t, 4)
            }
        }
    });
    i.support.style || (i.attrHooks.style = {
        get: function(n) {
            return n.style.cssText || t
        },
        set: function(n, t) {
            return n.style.cssText = t + ""
        }
    });
    i.support.optSelected || (i.propHooks.selected = {
        get: function(n) {
            var t = n.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
        }
    });
    i.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        i.propFix[this.toLowerCase()] = this
    });
    i.support.enctype || (i.propFix.enctype = "encoding");
    i.each(["radio", "checkbox"], function() {
        i.valHooks[this] = {
            set: function(n, r) {
                return i.isArray(r) ? n.checked = i.inArray(i(n).val(), r) >= 0 : t
            }
        };
        i.support.checkOn || (i.valHooks[this].get = function(n) {
            return null === n.getAttribute("value") ? "on" : n.value
        })
    });
    var ui = /^(?:input|select|textarea)$/i,
        fe = /^key/,
        ee = /^(?:mouse|contextmenu)|click/,
        sr = /^(?:focusinfocus|focusoutblur)$/,
        hr = /^([^.]*)(?:\.(.+)|)$/;
    i.event = {
        global: {},
        add: function(n, r, u, f, e) {
            var b, p, k, w, c, l, a, v, h, d, g, y = i._data(n);
            if (y) {
                for (u.handler && (w = u, u = w.handler, e = w.selector), u.guid || (u.guid = i.guid++), (p = y.events) || (p = y.events = {}), (l = y.handle) || (l = y.handle = function(n) {
                        return typeof i === o || n && i.event.triggered === n.type ? t : i.event.dispatch.apply(l.elem, arguments)
                    }, l.elem = n), r = (r || "").match(s) || [""], k = r.length; k--;) b = hr.exec(r[k]) || [], h = g = b[1], d = (b[2] || "").split(".").sort(), h && (c = i.event.special[h] || {}, h = (e ? c.delegateType : c.bindType) || h, c = i.event.special[h] || {}, a = i.extend({
                    type: h,
                    origType: g,
                    data: f,
                    handler: u,
                    guid: u.guid,
                    selector: e,
                    needsContext: e && i.expr.match.needsContext.test(e),
                    namespace: d.join(".")
                }, w), (v = p[h]) || (v = p[h] = [], v.delegateCount = 0, c.setup && c.setup.call(n, f, d, l) !== !1 || (n.addEventListener ? n.addEventListener(h, l, !1) : n.attachEvent && n.attachEvent("on" + h, l))), c.add && (c.add.call(n, a), a.handler.guid || (a.handler.guid = u.guid)), e ? v.splice(v.delegateCount++, 0, a) : v.push(a), i.event.global[h] = !0);
                n = null
            }
        },
        remove: function(n, t, r, u, f) {
            var y, o, h, b, p, a, c, l, e, w, k, v = i.hasData(n) && i._data(n);
            if (v && (a = v.events)) {
                for (t = (t || "").match(s) || [""], p = t.length; p--;)
                    if (h = hr.exec(t[p]) || [], e = k = h[1], w = (h[2] || "").split(".").sort(), e) {
                        for (c = i.event.special[e] || {}, e = (u ? c.delegateType : c.bindType) || e, l = a[e] || [], h = h[2] && RegExp("(^|\\.)" + w.join("\\.(?:.*\\.|)") + "(\\.|$)"), b = y = l.length; y--;) o = l[y], !f && k !== o.origType || r && r.guid !== o.guid || h && !h.test(o.namespace) || u && u !== o.selector && ("**" !== u || !o.selector) || (l.splice(y, 1), o.selector && l.delegateCount--, c.remove && c.remove.call(n, o));
                        b && !l.length && (c.teardown && c.teardown.call(n, w, v.handle) !== !1 || i.removeEvent(n, e, v.handle), delete a[e])
                    } else
                        for (e in a) i.event.remove(n, e + t[p], r, u, !0);
                i.isEmptyObject(a) && (delete v.handle, i._removeData(n, "events"))
            }
        },
        trigger: function(u, f, e, o) {
            var a, v, s, w, l, c, b, p = [e || r],
                h = k.call(u, "type") ? u.type : u,
                y = k.call(u, "namespace") ? u.namespace.split(".") : [];
            if (s = c = e = e || r, 3 !== e.nodeType && 8 !== e.nodeType && !sr.test(h + i.event.triggered) && (h.indexOf(".") >= 0 && (y = h.split("."), h = y.shift(), y.sort()), v = 0 > h.indexOf(":") && "on" + h, u = u[i.expando] ? u : new i.Event(h, "object" == typeof u && u), u.isTrigger = o ? 2 : 3, u.namespace = y.join("."), u.namespace_re = u.namespace ? RegExp("(^|\\.)" + y.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, u.result = t, u.target || (u.target = e), f = null == f ? [u] : i.makeArray(f, [u]), l = i.event.special[h] || {}, o || !l.trigger || l.trigger.apply(e, f) !== !1)) {
                if (!o && !l.noBubble && !i.isWindow(e)) {
                    for (w = l.delegateType || h, sr.test(w + h) || (s = s.parentNode); s; s = s.parentNode) p.push(s), c = s;
                    c === (e.ownerDocument || r) && p.push(c.defaultView || c.parentWindow || n)
                }
                for (b = 0;
                    (s = p[b++]) && !u.isPropagationStopped();) u.type = b > 1 ? w : l.bindType || h, a = (i._data(s, "events") || {})[u.type] && i._data(s, "handle"), a && a.apply(s, f), a = v && s[v], a && i.acceptData(s) && a.apply && a.apply(s, f) === !1 && u.preventDefault();
                if (u.type = h, !o && !u.isDefaultPrevented() && (!l._default || l._default.apply(p.pop(), f) === !1) && i.acceptData(e) && v && e[h] && !i.isWindow(e)) {
                    c = e[v];
                    c && (e[v] = null);
                    i.event.triggered = h;
                    try {
                        e[h]()
                    } catch (d) {}
                    i.event.triggered = t;
                    c && (e[v] = c)
                }
                return u.result
            }
        },
        dispatch: function(n) {
            n = i.event.fix(n);
            var o, e, r, u, s, h = [],
                c = l.call(arguments),
                a = (i._data(this, "events") || {})[n.type] || [],
                f = i.event.special[n.type] || {};
            if (c[0] = n, n.delegateTarget = this, !f.preDispatch || f.preDispatch.call(this, n) !== !1) {
                for (h = i.event.handlers.call(this, n, a), o = 0;
                    (u = h[o++]) && !n.isPropagationStopped();)
                    for (n.currentTarget = u.elem, s = 0;
                        (r = u.handlers[s++]) && !n.isImmediatePropagationStopped();)(!n.namespace_re || n.namespace_re.test(r.namespace)) && (n.handleObj = r, n.data = r.data, e = ((i.event.special[r.origType] || {}).handle || r.handler).apply(u.elem, c), e !== t && (n.result = e) === !1 && (n.preventDefault(), n.stopPropagation()));
                return f.postDispatch && f.postDispatch.call(this, n), n.result
            }
        },
        handlers: function(n, r) {
            var e, o, f, s, c = [],
                h = r.delegateCount,
                u = n.target;
            if (h && u.nodeType && (!n.button || "click" !== n.type))
                for (; u != this; u = u.parentNode || this)
                    if (1 === u.nodeType && (u.disabled !== !0 || "click" !== n.type)) {
                        for (f = [], s = 0; h > s; s++) o = r[s], e = o.selector + " ", f[e] === t && (f[e] = o.needsContext ? i(e, this).index(u) >= 0 : i.find(e, this, null, [u]).length), f[e] && f.push(o);
                        f.length && c.push({
                            elem: u,
                            handlers: f
                        })
                    }
            return r.length > h && c.push({
                elem: this,
                handlers: r.slice(h)
            }), c
        },
        fix: function(n) {
            if (n[i.expando]) return n;
            var e, o, s, u = n.type,
                f = n,
                t = this.fixHooks[u];
            for (t || (this.fixHooks[u] = t = ee.test(u) ? this.mouseHooks : fe.test(u) ? this.keyHooks : {}), s = t.props ? this.props.concat(t.props) : this.props, n = new i.Event(f), e = s.length; e--;) o = s[e], n[o] = f[o];
            return n.target || (n.target = f.srcElement || r), 3 === n.target.nodeType && (n.target = n.target.parentNode), n.metaKey = !!n.metaKey, t.filter ? t.filter(n, f) : n
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(n, t) {
                return null == n.which && (n.which = null != t.charCode ? t.charCode : t.keyCode), n
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(n, i) {
                var u, o, f, e = i.button,
                    s = i.fromElement;
                return null == n.pageX && null != i.clientX && (o = n.target.ownerDocument || r, f = o.documentElement, u = o.body, n.pageX = i.clientX + (f && f.scrollLeft || u && u.scrollLeft || 0) - (f && f.clientLeft || u && u.clientLeft || 0), n.pageY = i.clientY + (f && f.scrollTop || u && u.scrollTop || 0) - (f && f.clientTop || u && u.clientTop || 0)), !n.relatedTarget && s && (n.relatedTarget = s === n.target ? i.toElement : s), n.which || e === t || (n.which = 1 & e ? 1 : 2 & e ? 3 : 4 & e ? 2 : 0), n
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== cr() && this.focus) try {
                        return this.focus(), !1
                    } catch (n) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === cr() && this.blur ? (this.blur(), !1) : t
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return i.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : t
                },
                _default: function(n) {
                    return i.nodeName(n.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(n) {
                    n.result !== t && (n.originalEvent.returnValue = n.result)
                }
            }
        },
        simulate: function(n, t, r, u) {
            var f = i.extend(new i.Event, r, {
                type: n,
                isSimulated: !0,
                originalEvent: {}
            });
            u ? i.event.trigger(f, null, t) : i.event.dispatch.call(t, f);
            f.isDefaultPrevented() && r.preventDefault()
        }
    };
    i.removeEvent = r.removeEventListener ? function(n, t, i) {
        n.removeEventListener && n.removeEventListener(t, i, !1)
    } : function(n, t, i) {
        var r = "on" + t;
        n.detachEvent && (typeof n[r] === o && (n[r] = null), n.detachEvent(r, i))
    };
    i.Event = function(n, r) {
        return this instanceof i.Event ? (n && n.type ? (this.originalEvent = n, this.type = n.type, this.isDefaultPrevented = n.defaultPrevented || n.returnValue === !1 || n.getPreventDefault && n.getPreventDefault() ? ct : g) : this.type = n, r && i.extend(this, r), this.timeStamp = n && n.timeStamp || i.now(), this[i.expando] = !0, t) : new i.Event(n, r)
    };
    i.Event.prototype = {
        isDefaultPrevented: g,
        isPropagationStopped: g,
        isImmediatePropagationStopped: g,
        preventDefault: function() {
            var n = this.originalEvent;
            this.isDefaultPrevented = ct;
            n && (n.preventDefault ? n.preventDefault() : n.returnValue = !1)
        },
        stopPropagation: function() {
            var n = this.originalEvent;
            this.isPropagationStopped = ct;
            n && (n.stopPropagation && n.stopPropagation(), n.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = ct;
            this.stopPropagation()
        }
    };
    i.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(n, t) {
        i.event.special[n] = {
            delegateType: t,
            bindType: t,
            handle: function(n) {
                var u, f = this,
                    r = n.relatedTarget,
                    e = n.handleObj;
                return (!r || r !== f && !i.contains(f, r)) && (n.type = e.origType, u = e.handler.apply(this, arguments), n.type = t), u
            }
        }
    });
    i.support.submitBubbles || (i.event.special.submit = {
        setup: function() {
            return i.nodeName(this, "form") ? !1 : (i.event.add(this, "click._submit keypress._submit", function(n) {
                var u = n.target,
                    r = i.nodeName(u, "input") || i.nodeName(u, "button") ? u.form : t;
                r && !i._data(r, "submitBubbles") && (i.event.add(r, "submit._submit", function(n) {
                    n._submit_bubble = !0
                }), i._data(r, "submitBubbles", !0))
            }), t)
        },
        postDispatch: function(n) {
            n._submit_bubble && (delete n._submit_bubble, this.parentNode && !n.isTrigger && i.event.simulate("submit", this.parentNode, n, !0))
        },
        teardown: function() {
            return i.nodeName(this, "form") ? !1 : (i.event.remove(this, "._submit"), t)
        }
    });
    i.support.changeBubbles || (i.event.special.change = {
        setup: function() {
            return ui.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (i.event.add(this, "propertychange._change", function(n) {
                "checked" === n.originalEvent.propertyName && (this._just_changed = !0)
            }), i.event.add(this, "click._change", function(n) {
                this._just_changed && !n.isTrigger && (this._just_changed = !1);
                i.event.simulate("change", this, n, !0)
            })), !1) : (i.event.add(this, "beforeactivate._change", function(n) {
                var t = n.target;
                ui.test(t.nodeName) && !i._data(t, "changeBubbles") && (i.event.add(t, "change._change", function(n) {
                    !this.parentNode || n.isSimulated || n.isTrigger || i.event.simulate("change", this.parentNode, n, !0)
                }), i._data(t, "changeBubbles", !0))
            }), t)
        },
        handle: function(n) {
            var i = n.target;
            return this !== i || n.isSimulated || n.isTrigger || "radio" !== i.type && "checkbox" !== i.type ? n.handleObj.handler.apply(this, arguments) : t
        },
        teardown: function() {
            return i.event.remove(this, "._change"), !ui.test(this.nodeName)
        }
    });
    i.support.focusinBubbles || i.each({
        focus: "focusin",
        blur: "focusout"
    }, function(n, t) {
        var u = 0,
            f = function(n) {
                i.event.simulate(t, n.target, i.event.fix(n), !0)
            };
        i.event.special[t] = {
            setup: function() {
                0 == u++ && r.addEventListener(n, f, !0)
            },
            teardown: function() {
                0 == --u && r.removeEventListener(n, f, !0)
            }
        }
    });
    i.fn.extend({
        on: function(n, r, u, f, e) {
            var s, o;
            if ("object" == typeof n) {
                "string" != typeof r && (u = u || r, r = t);
                for (s in n) this.on(s, r, u, n[s], e);
                return this
            }
            if (null == u && null == f ? (f = r, u = r = t) : null == f && ("string" == typeof r ? (f = u, u = t) : (f = u, u = r, r = t)), f === !1) f = g;
            else if (!f) return this;
            return 1 === e && (o = f, f = function(n) {
                return i().off(n), o.apply(this, arguments)
            }, f.guid = o.guid || (o.guid = i.guid++)), this.each(function() {
                i.event.add(this, n, f, u, r)
            })
        },
        one: function(n, t, i, r) {
            return this.on(n, t, i, r, 1)
        },
        off: function(n, r, u) {
            var f, e;
            if (n && n.preventDefault && n.handleObj) return f = n.handleObj, i(n.delegateTarget).off(f.namespace ? f.origType + "." + f.namespace : f.origType, f.selector, f.handler), this;
            if ("object" == typeof n) {
                for (e in n) this.off(e, r, n[e]);
                return this
            }
            return (r === !1 || "function" == typeof r) && (u = r, r = t), u === !1 && (u = g), this.each(function() {
                i.event.remove(this, n, u, r)
            })
        },
        trigger: function(n, t) {
            return this.each(function() {
                i.event.trigger(n, t, this)
            })
        },
        triggerHandler: function(n, r) {
            var u = this[0];
            return u ? i.event.trigger(n, r, u, !0) : t
        }
    });
    var oe = /^.[^:#\[\.,]*$/,
        se = /^(?:parents|prev(?:Until|All))/,
        lr = i.expr.match.needsContext,
        he = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    i.fn.extend({
        find: function(n) {
            var t, r = [],
                u = this,
                f = u.length;
            if ("string" != typeof n) return this.pushStack(i(n).filter(function() {
                for (t = 0; f > t; t++)
                    if (i.contains(u[t], this)) return !0
            }));
            for (t = 0; f > t; t++) i.find(n, u[t], r);
            return r = this.pushStack(f > 1 ? i.unique(r) : r), r.selector = this.selector ? this.selector + " " + n : n, r
        },
        has: function(n) {
            var t, r = i(n, this),
                u = r.length;
            return this.filter(function() {
                for (t = 0; u > t; t++)
                    if (i.contains(this, r[t])) return !0
            })
        },
        not: function(n) {
            return this.pushStack(fi(this, n || [], !0))
        },
        filter: function(n) {
            return this.pushStack(fi(this, n || [], !1))
        },
        is: function(n) {
            return !!fi(this, "string" == typeof n && lr.test(n) ? i(n) : n || [], !1).length
        },
        closest: function(n, t) {
            for (var r, f = 0, o = this.length, u = [], e = lr.test(n) || "string" != typeof n ? i(n, t || this.context) : 0; o > f; f++)
                for (r = this[f]; r && r !== t; r = r.parentNode)
                    if (11 > r.nodeType && (e ? e.index(r) > -1 : 1 === r.nodeType && i.find.matchesSelector(r, n))) {
                        r = u.push(r);
                        break
                    }
            return this.pushStack(u.length > 1 ? i.unique(u) : u)
        },
        index: function(n) {
            return n ? "string" == typeof n ? i.inArray(this[0], i(n)) : i.inArray(n.jquery ? n[0] : n, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(n, t) {
            var r = "string" == typeof n ? i(n, t) : i.makeArray(n && n.nodeType ? [n] : n),
                u = i.merge(this.get(), r);
            return this.pushStack(i.unique(u))
        },
        addBack: function(n) {
            return this.add(null == n ? this.prevObject : this.prevObject.filter(n))
        }
    });
    i.each({
        parent: function(n) {
            var t = n.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(n) {
            return i.dir(n, "parentNode")
        },
        parentsUntil: function(n, t, r) {
            return i.dir(n, "parentNode", r)
        },
        next: function(n) {
            return ar(n, "nextSibling")
        },
        prev: function(n) {
            return ar(n, "previousSibling")
        },
        nextAll: function(n) {
            return i.dir(n, "nextSibling")
        },
        prevAll: function(n) {
            return i.dir(n, "previousSibling")
        },
        nextUntil: function(n, t, r) {
            return i.dir(n, "nextSibling", r)
        },
        prevUntil: function(n, t, r) {
            return i.dir(n, "previousSibling", r)
        },
        siblings: function(n) {
            return i.sibling((n.parentNode || {}).firstChild, n)
        },
        children: function(n) {
            return i.sibling(n.firstChild)
        },
        contents: function(n) {
            return i.nodeName(n, "iframe") ? n.contentDocument || n.contentWindow.document : i.merge([], n.childNodes)
        }
    }, function(n, t) {
        i.fn[n] = function(r, u) {
            var f = i.map(this, t, r);
            return "Until" !== n.slice(-5) && (u = r), u && "string" == typeof u && (f = i.filter(u, f)), this.length > 1 && (he[n] || (f = i.unique(f)), se.test(n) && (f = f.reverse())), this.pushStack(f)
        }
    });
    i.extend({
        filter: function(n, t, r) {
            var u = t[0];
            return r && (n = ":not(" + n + ")"), 1 === t.length && 1 === u.nodeType ? i.find.matchesSelector(u, n) ? [u] : [] : i.find.matches(n, i.grep(t, function(n) {
                return 1 === n.nodeType
            }))
        },
        dir: function(n, r, u) {
            for (var e = [], f = n[r]; f && 9 !== f.nodeType && (u === t || 1 !== f.nodeType || !i(f).is(u));) 1 === f.nodeType && e.push(f), f = f[r];
            return e
        },
        sibling: function(n, t) {
            for (var i = []; n; n = n.nextSibling) 1 === n.nodeType && n !== t && i.push(n);
            return i
        }
    });
    var yr = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        ce = / jQuery\d+="(?:null|\d+)"/g,
        pr = RegExp("<(?:" + yr + ")[\\s/>]", "i"),
        ei = /^\s+/,
        wr = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        br = /<([\w:]+)/,
        kr = /<tbody/i,
        le = /<|&#?\w+;/,
        ae = /<(?:script|style|link)/i,
        oi = /^(?:checkbox|radio)$/i,
        ve = /checked\s*(?:[^=]|=\s*.checked.)/i,
        dr = /^$|\/(?:java|ecma)script/i,
        ye = /^true\/(.*)/,
        pe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        e = {
            option: [1, "<select multiple='multiple'>", "<\/select>"],
            legend: [1, "<fieldset>", "<\/fieldset>"],
            area: [1, "<map>", "<\/map>"],
            param: [1, "<object>", "<\/object>"],
            thead: [1, "<table>", "<\/table>"],
            tr: [2, "<table><tbody>", "<\/tbody><\/table>"],
            col: [2, "<table><tbody><\/tbody><colgroup>", "<\/colgroup><\/table>"],
            td: [3, "<table><tbody><tr>", "<\/tr><\/tbody><\/table>"],
            _default: i.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "<\/div>"]
        },
        we = vr(r),
        si = we.appendChild(r.createElement("div"));
    e.optgroup = e.option;
    e.tbody = e.tfoot = e.colgroup = e.caption = e.thead;
    e.th = e.td;
    i.fn.extend({
        text: function(n) {
            return i.access(this, function(n) {
                return n === t ? i.text(this) : this.empty().append((this[0] && this[0].ownerDocument || r).createTextNode(n))
            }, null, n, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(n) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = gr(this, n);
                    t.appendChild(n)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(n) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = gr(this, n);
                    t.insertBefore(n, t.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(n) {
                this.parentNode && this.parentNode.insertBefore(n, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(n) {
                this.parentNode && this.parentNode.insertBefore(n, this.nextSibling)
            })
        },
        remove: function(n, t) {
            for (var r, e = n ? i.filter(n, this) : this, f = 0; null != (r = e[f]); f++) t || 1 !== r.nodeType || i.cleanData(u(r)), r.parentNode && (t && i.contains(r.ownerDocument, r) && hi(u(r, "script")), r.parentNode.removeChild(r));
            return this
        },
        empty: function() {
            for (var n, t = 0; null != (n = this[t]); t++) {
                for (1 === n.nodeType && i.cleanData(u(n, !1)); n.firstChild;) n.removeChild(n.firstChild);
                n.options && i.nodeName(n, "select") && (n.options.length = 0)
            }
            return this
        },
        clone: function(n, t) {
            return n = null == n ? !1 : n, t = null == t ? n : t, this.map(function() {
                return i.clone(this, n, t)
            })
        },
        html: function(n) {
            return i.access(this, function(n) {
                var r = this[0] || {},
                    f = 0,
                    o = this.length;
                if (n === t) return 1 === r.nodeType ? r.innerHTML.replace(ce, "") : t;
                if (!("string" != typeof n || ae.test(n) || !i.support.htmlSerialize && pr.test(n) || !i.support.leadingWhitespace && ei.test(n) || e[(br.exec(n) || ["", ""])[1].toLowerCase()])) {
                    n = n.replace(wr, "<$1><\/$2>");
                    try {
                        for (; o > f; f++) r = this[f] || {}, 1 === r.nodeType && (i.cleanData(u(r, !1)), r.innerHTML = n);
                        r = 0
                    } catch (s) {}
                }
                r && this.empty().append(n)
            }, null, n, arguments.length)
        },
        replaceWith: function() {
            var t = i.map(this, function(n) {
                    return [n.nextSibling, n.parentNode]
                }),
                n = 0;
            return this.domManip(arguments, function(r) {
                var u = t[n++],
                    f = t[n++];
                f && (u && u.parentNode !== f && (u = this.nextSibling), i(this).remove(), f.insertBefore(r, u))
            }, !0), n ? this : this.remove()
        },
        detach: function(n) {
            return this.remove(n, !0)
        },
        domManip: function(n, t, r) {
            n = di.apply([], n);
            var h, f, c, o, v, s, e = 0,
                l = this.length,
                p = this,
                w = l - 1,
                a = n[0],
                y = i.isFunction(a);
            if (y || !(1 >= l || "string" != typeof a || i.support.checkClone) && ve.test(a)) return this.each(function(i) {
                var u = p.eq(i);
                y && (n[0] = a.call(this, i, u.html()));
                u.domManip(n, t, r)
            });
            if (l && (s = i.buildFragment(n, this[0].ownerDocument, !1, !r && this), h = s.firstChild, 1 === s.childNodes.length && (s = h), h)) {
                for (o = i.map(u(s, "script"), nu), c = o.length; l > e; e++) f = s, e !== w && (f = i.clone(f, !0, !0), c && i.merge(o, u(f, "script"))), t.call(this[e], f, e);
                if (c)
                    for (v = o[o.length - 1].ownerDocument, i.map(o, tu), e = 0; c > e; e++) f = o[e], dr.test(f.type || "") && !i._data(f, "globalEval") && i.contains(v, f) && (f.src ? i._evalUrl(f.src) : i.globalEval((f.text || f.textContent || f.innerHTML || "").replace(pe, "")));
                s = h = null
            }
            return this
        }
    });
    i.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(n, t) {
        i.fn[n] = function(n) {
            for (var u, r = 0, f = [], e = i(n), o = e.length - 1; o >= r; r++) u = r === o ? this : this.clone(!0), i(e[r])[t](u), kt.apply(f, u.get());
            return this.pushStack(f)
        }
    });
    i.extend({
        clone: function(n, t, r) {
            var f, h, o, e, s, c = i.contains(n.ownerDocument, n);
            if (i.support.html5Clone || i.isXMLDoc(n) || !pr.test("<" + n.nodeName + ">") ? o = n.cloneNode(!0) : (si.innerHTML = n.outerHTML, si.removeChild(o = si.firstChild)), !(i.support.noCloneEvent && i.support.noCloneChecked || 1 !== n.nodeType && 11 !== n.nodeType || i.isXMLDoc(n)))
                for (f = u(o), s = u(n), e = 0; null != (h = s[e]); ++e) f[e] && be(h, f[e]);
            if (t)
                if (r)
                    for (s = s || u(n), f = f || u(o), e = 0; null != (h = s[e]); e++) iu(h, f[e]);
                else iu(n, o);
            return f = u(o, "script"), f.length > 0 && hi(f, !c && u(n, "script")), f = s = h = null, o
        },
        buildFragment: function(n, t, r, f) {
            for (var h, o, w, s, y, p, l, b = n.length, a = vr(t), c = [], v = 0; b > v; v++)
                if (o = n[v], o || 0 === o)
                    if ("object" === i.type(o)) i.merge(c, o.nodeType ? [o] : o);
                    else if (le.test(o)) {
                for (s = s || a.appendChild(t.createElement("div")), y = (br.exec(o) || ["", ""])[1].toLowerCase(), l = e[y] || e._default, s.innerHTML = l[1] + o.replace(wr, "<$1><\/$2>") + l[2], h = l[0]; h--;) s = s.lastChild;
                if (!i.support.leadingWhitespace && ei.test(o) && c.push(t.createTextNode(ei.exec(o)[0])), !i.support.tbody)
                    for (o = "table" !== y || kr.test(o) ? "<table>" !== l[1] || kr.test(o) ? 0 : s : s.firstChild, h = o && o.childNodes.length; h--;) i.nodeName(p = o.childNodes[h], "tbody") && !p.childNodes.length && o.removeChild(p);
                for (i.merge(c, s.childNodes), s.textContent = ""; s.firstChild;) s.removeChild(s.firstChild);
                s = a.lastChild
            } else c.push(t.createTextNode(o));
            for (s && a.removeChild(s), i.support.appendChecked || i.grep(u(c, "input"), ke), v = 0; o = c[v++];)
                if ((!f || -1 === i.inArray(o, f)) && (w = i.contains(o.ownerDocument, o), s = u(a.appendChild(o), "script"), w && hi(s), r))
                    for (h = 0; o = s[h++];) dr.test(o.type || "") && r.push(o);
            return s = null, a
        },
        cleanData: function(n, t) {
            for (var r, f, u, e, c = 0, s = i.expando, h = i.cache, l = i.support.deleteExpando, a = i.event.special; null != (r = n[c]); c++)
                if ((t || i.acceptData(r)) && (u = r[s], e = u && h[u])) {
                    if (e.events)
                        for (f in e.events) a[f] ? i.event.remove(r, f) : i.removeEvent(r, f, e.handle);
                    h[u] && (delete h[u], l ? delete r[s] : typeof r.removeAttribute !== o ? r.removeAttribute(s) : r[s] = null, b.push(u))
                }
        },
        _evalUrl: function(n) {
            return i.ajax({
                url: n,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                throws: !0
            })
        }
    });
    i.fn.extend({
        wrapAll: function(n) {
            if (i.isFunction(n)) return this.each(function(t) {
                i(this).wrapAll(n.call(this, t))
            });
            if (this[0]) {
                var t = i(n, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]);
                t.map(function() {
                    for (var n = this; n.firstChild && 1 === n.firstChild.nodeType;) n = n.firstChild;
                    return n
                }).append(this)
            }
            return this
        },
        wrapInner: function(n) {
            return i.isFunction(n) ? this.each(function(t) {
                i(this).wrapInner(n.call(this, t))
            }) : this.each(function() {
                var t = i(this),
                    r = t.contents();
                r.length ? r.wrapAll(n) : t.append(n)
            })
        },
        wrap: function(n) {
            var t = i.isFunction(n);
            return this.each(function(r) {
                i(this).wrapAll(t ? n.call(this, r) : n)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                i.nodeName(this, "body") || i(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    var rt, v, y, ci = /alpha\([^)]*\)/i,
        de = /opacity\s*=\s*([^)]*)/,
        ge = /^(top|right|bottom|left)$/,
        no = /^(none|table(?!-c[ea]).+)/,
        ru = /^margin/,
        to = RegExp("^(" + st + ")(.*)$", "i"),
        lt = RegExp("^(" + st + ")(?!px)[a-z%]+$", "i"),
        io = RegExp("^([+-])=(" + st + ")", "i"),
        uu = {
            BODY: "block"
        },
        ro = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        fu = {
            letterSpacing: 0,
            fontWeight: 400
        },
        p = ["Top", "Right", "Bottom", "Left"],
        eu = ["Webkit", "O", "Moz", "ms"];
    i.fn.extend({
        css: function(n, r) {
            return i.access(this, function(n, r, u) {
                var e, o, s = {},
                    f = 0;
                if (i.isArray(r)) {
                    for (o = v(n), e = r.length; e > f; f++) s[r[f]] = i.css(n, r[f], !1, o);
                    return s
                }
                return u !== t ? i.style(n, r, u) : i.css(n, r)
            }, n, r, arguments.length > 1)
        },
        show: function() {
            return su(this, !0)
        },
        hide: function() {
            return su(this)
        },
        toggle: function(n) {
            return "boolean" == typeof n ? n ? this.show() : this.hide() : this.each(function() {
                ut(this) ? i(this).show() : i(this).hide()
            })
        }
    });
    i.extend({
        cssHooks: {
            opacity: {
                get: function(n, t) {
                    if (t) {
                        var i = y(n, "opacity");
                        return "" === i ? "1" : i
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            float: i.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(n, r, u, f) {
            if (n && 3 !== n.nodeType && 8 !== n.nodeType && n.style) {
                var o, s, e, h = i.camelCase(r),
                    c = n.style;
                if (r = i.cssProps[h] || (i.cssProps[h] = ou(c, h)), e = i.cssHooks[r] || i.cssHooks[h], u === t) return e && "get" in e && (o = e.get(n, !1, f)) !== t ? o : c[r];
                if (s = typeof u, "string" === s && (o = io.exec(u)) && (u = (o[1] + 1) * o[2] + parseFloat(i.css(n, r)), s = "number"), !(null == u || "number" === s && isNaN(u) || ("number" !== s || i.cssNumber[h] || (u += "px"), i.support.clearCloneStyle || "" !== u || 0 !== r.indexOf("background") || (c[r] = "inherit"), e && "set" in e && (u = e.set(n, u, f)) === t))) try {
                    c[r] = u
                } catch (l) {}
            }
        },
        css: function(n, r, u, f) {
            var h, e, o, s = i.camelCase(r);
            return r = i.cssProps[s] || (i.cssProps[s] = ou(n.style, s)), o = i.cssHooks[r] || i.cssHooks[s], o && "get" in o && (e = o.get(n, !0, u)), e === t && (e = y(n, r, f)), "normal" === e && r in fu && (e = fu[r]), "" === u || u ? (h = parseFloat(e), u === !0 || i.isNumeric(h) ? h || 0 : e) : e
        }
    });
    n.getComputedStyle ? (v = function(t) {
        return n.getComputedStyle(t, null)
    }, y = function(n, r, u) {
        var s, h, c, o = u || v(n),
            e = o ? o.getPropertyValue(r) || o[r] : t,
            f = n.style;
        return o && ("" !== e || i.contains(n.ownerDocument, n) || (e = i.style(n, r)), lt.test(e) && ru.test(r) && (s = f.width, h = f.minWidth, c = f.maxWidth, f.minWidth = f.maxWidth = f.width = e, e = o.width, f.width = s, f.minWidth = h, f.maxWidth = c)), e
    }) : r.documentElement.currentStyle && (v = function(n) {
        return n.currentStyle
    }, y = function(n, i, r) {
        var s, e, o, h = r || v(n),
            u = h ? h[i] : t,
            f = n.style;
        return null == u && f && f[i] && (u = f[i]), lt.test(u) && !ge.test(i) && (s = f.left, e = n.runtimeStyle, o = e && e.left, o && (e.left = n.currentStyle.left), f.left = "fontSize" === i ? "1em" : u, u = f.pixelLeft + "px", f.left = s, o && (e.left = o)), "" === u ? "auto" : u
    });
    i.each(["height", "width"], function(n, r) {
        i.cssHooks[r] = {
            get: function(n, u, f) {
                return u ? 0 === n.offsetWidth && no.test(i.css(n, "display")) ? i.swap(n, ro, function() {
                    return lu(n, r, f)
                }) : lu(n, r, f) : t
            },
            set: function(n, t, u) {
                var f = u && v(n);
                return hu(n, t, u ? cu(n, r, u, i.support.boxSizing && "border-box" === i.css(n, "boxSizing", !1, f), f) : 0)
            }
        }
    });
    i.support.opacity || (i.cssHooks.opacity = {
        get: function(n, t) {
            return de.test((t && n.currentStyle ? n.currentStyle.filter : n.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        },
        set: function(n, t) {
            var r = n.style,
                u = n.currentStyle,
                e = i.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                f = u && u.filter || r.filter || "";
            r.zoom = 1;
            (t >= 1 || "" === t) && "" === i.trim(f.replace(ci, "")) && r.removeAttribute && (r.removeAttribute("filter"), "" === t || u && !u.filter) || (r.filter = ci.test(f) ? f.replace(ci, e) : f + " " + e)
        }
    });
    i(function() {
        i.support.reliableMarginRight || (i.cssHooks.marginRight = {
            get: function(n, r) {
                return r ? i.swap(n, {
                    display: "inline-block"
                }, y, [n, "marginRight"]) : t
            }
        });
        !i.support.pixelPosition && i.fn.position && i.each(["top", "left"], function(n, r) {
            i.cssHooks[r] = {
                get: function(n, u) {
                    return u ? (u = y(n, r), lt.test(u) ? i(n).position()[r] + "px" : u) : t
                }
            }
        })
    });
    i.expr && i.expr.filters && (i.expr.filters.hidden = function(n) {
        return 0 >= n.offsetWidth && 0 >= n.offsetHeight || !i.support.reliableHiddenOffsets && "none" === (n.style && n.style.display || i.css(n, "display"))
    }, i.expr.filters.visible = function(n) {
        return !i.expr.filters.hidden(n)
    });
    i.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(n, t) {
        i.cssHooks[n + t] = {
            expand: function(i) {
                for (var r = 0, f = {}, u = "string" == typeof i ? i.split(" ") : [i]; 4 > r; r++) f[n + p[r] + t] = u[r] || u[r - 2] || u[0];
                return f
            }
        };
        ru.test(n) || (i.cssHooks[n + t].set = hu)
    });
    var uo = /%20/g,
        fo = /\[\]$/,
        yu = /\r?\n/g,
        eo = /^(?:submit|button|image|reset|file)$/i,
        oo = /^(?:input|select|textarea|keygen)/i;
    i.fn.extend({
        serialize: function() {
            return i.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var n = i.prop(this, "elements");
                return n ? i.makeArray(n) : this
            }).filter(function() {
                var n = this.type;
                return this.name && !i(this).is(":disabled") && oo.test(this.nodeName) && !eo.test(n) && (this.checked || !oi.test(n))
            }).map(function(n, t) {
                var r = i(this).val();
                return null == r ? null : i.isArray(r) ? i.map(r, function(n) {
                    return {
                        name: t.name,
                        value: n.replace(yu, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: r.replace(yu, "\r\n")
                }
            }).get()
        }
    });
    i.param = function(n, r) {
        var u, f = [],
            e = function(n, t) {
                t = i.isFunction(t) ? t() : null == t ? "" : t;
                f[f.length] = encodeURIComponent(n) + "=" + encodeURIComponent(t)
            };
        if (r === t && (r = i.ajaxSettings && i.ajaxSettings.traditional), i.isArray(n) || n.jquery && !i.isPlainObject(n)) i.each(n, function() {
            e(this.name, this.value)
        });
        else
            for (u in n) li(u, n[u], r, e);
        return f.join("&").replace(uo, "+")
    };
    i.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(n, t) {
        i.fn[t] = function(n, i) {
            return arguments.length > 0 ? this.on(t, null, n, i) : this.trigger(t)
        }
    });
    i.fn.extend({
        hover: function(n, t) {
            return this.mouseenter(n).mouseleave(t || n)
        },
        bind: function(n, t, i) {
            return this.on(n, null, t, i)
        },
        unbind: function(n, t) {
            return this.off(n, null, t)
        },
        delegate: function(n, t, i, r) {
            return this.on(t, n, i, r)
        },
        undelegate: function(n, t, i) {
            return 1 === arguments.length ? this.off(n, "**") : this.off(t, n || "**", i)
        }
    });
    var w, c, ai = i.now(),
        vi = /\?/,
        so = /#.*$/,
        pu = /([?&])_=[^&]*/,
        ho = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        co = /^(?:GET|HEAD)$/,
        lo = /^\/\//,
        wu = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        bu = i.fn.load,
        ku = {},
        yi = {},
        du = "*/".concat("*");
    try {
        c = hf.href
    } catch (go) {
        c = r.createElement("a");
        c.href = "";
        c = c.href
    }
    w = wu.exec(c.toLowerCase()) || [];
    i.fn.load = function(n, r, u) {
        if ("string" != typeof n && bu) return bu.apply(this, arguments);
        var f, s, h, e = this,
            o = n.indexOf(" ");
        return o >= 0 && (f = n.slice(o, n.length), n = n.slice(0, o)), i.isFunction(r) ? (u = r, r = t) : r && "object" == typeof r && (h = "POST"), e.length > 0 && i.ajax({
            url: n,
            type: h,
            dataType: "html",
            data: r
        }).done(function(n) {
            s = arguments;
            e.html(f ? i("<div>").append(i.parseHTML(n)).find(f) : n)
        }).complete(u && function(n, t) {
            e.each(u, s || [n.responseText, t, n])
        }), this
    };
    i.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(n, t) {
        i.fn[t] = function(n) {
            return this.on(t, n)
        }
    });
    i.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: c,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(w[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": du,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": i.parseJSON,
                "text xml": i.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(n, t) {
            return t ? pi(pi(n, i.ajaxSettings), t) : pi(i.ajaxSettings, n)
        },
        ajaxPrefilter: gu(ku),
        ajaxTransport: gu(yi),
        ajax: function(n, r) {
            function k(n, r, s, c) {
                var a, rt, k, p, w, l = r;
                2 !== o && (o = 2, g && clearTimeout(g), y = t, d = c || "", f.readyState = n > 0 ? 4 : 0, a = n >= 200 && 300 > n || 304 === n, s && (p = ao(u, f, s)), p = vo(u, p, f, a), a ? (u.ifModified && (w = f.getResponseHeader("Last-Modified"), w && (i.lastModified[e] = w), w = f.getResponseHeader("etag"), w && (i.etag[e] = w)), 204 === n || "HEAD" === u.type ? l = "nocontent" : 304 === n ? l = "notmodified" : (l = p.state, rt = p.data, k = p.error, a = !k)) : (k = l, (n || !l) && (l = "error", 0 > n && (n = 0))), f.status = n, f.statusText = (r || l) + "", a ? tt.resolveWith(h, [rt, l, f]) : tt.rejectWith(h, [f, l, k]), f.statusCode(b), b = t, v && nt.trigger(a ? "ajaxSuccess" : "ajaxError", [f, u, a ? rt : k]), it.fireWith(h, [f, l]), v && (nt.trigger("ajaxComplete", [f, u]), --i.active || i.event.trigger("ajaxStop")))
            }
            "object" == typeof n && (r = n, n = t);
            r = r || {};
            var l, a, e, d, g, v, y, p, u = i.ajaxSetup({}, r),
                h = u.context || u,
                nt = u.context && (h.nodeType || h.jquery) ? i(h) : i.event,
                tt = i.Deferred(),
                it = i.Callbacks("once memory"),
                b = u.statusCode || {},
                rt = {},
                ut = {},
                o = 0,
                ft = "canceled",
                f = {
                    readyState: 0,
                    getResponseHeader: function(n) {
                        var t;
                        if (2 === o) {
                            if (!p)
                                for (p = {}; t = ho.exec(d);) p[t[1].toLowerCase()] = t[2];
                            t = p[n.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return 2 === o ? d : null
                    },
                    setRequestHeader: function(n, t) {
                        var i = n.toLowerCase();
                        return o || (n = ut[i] = ut[i] || n, rt[n] = t), this
                    },
                    overrideMimeType: function(n) {
                        return o || (u.mimeType = n), this
                    },
                    statusCode: function(n) {
                        var t;
                        if (n)
                            if (2 > o)
                                for (t in n) b[t] = [b[t], n[t]];
                            else f.always(n[f.status]);
                        return this
                    },
                    abort: function(n) {
                        var t = n || ft;
                        return y && y.abort(t), k(0, t), this
                    }
                };
            if (tt.promise(f).complete = it.add, f.success = f.done, f.error = f.fail, u.url = ((n || u.url || c) + "").replace(so, "").replace(lo, w[1] + "//"), u.type = r.method || r.type || u.method || u.type, u.dataTypes = i.trim(u.dataType || "*").toLowerCase().match(s) || [""], null == u.crossDomain && (l = wu.exec(u.url.toLowerCase()), u.crossDomain = !(!l || l[1] === w[1] && l[2] === w[2] && (l[3] || ("http:" === l[1] ? "80" : "443")) === (w[3] || ("http:" === w[1] ? "80" : "443")))), u.data && u.processData && "string" != typeof u.data && (u.data = i.param(u.data, u.traditional)), nf(ku, u, r, f), 2 === o) return f;
            v = u.global;
            v && 0 == i.active++ && i.event.trigger("ajaxStart");
            u.type = u.type.toUpperCase();
            u.hasContent = !co.test(u.type);
            e = u.url;
            u.hasContent || (u.data && (e = u.url += (vi.test(e) ? "&" : "?") + u.data, delete u.data), u.cache === !1 && (u.url = pu.test(e) ? e.replace(pu, "$1_=" + ai++) : e + (vi.test(e) ? "&" : "?") + "_=" + ai++));
            u.ifModified && (i.lastModified[e] && f.setRequestHeader("If-Modified-Since", i.lastModified[e]), i.etag[e] && f.setRequestHeader("If-None-Match", i.etag[e]));
            (u.data && u.hasContent && u.contentType !== !1 || r.contentType) && f.setRequestHeader("Content-Type", u.contentType);
            f.setRequestHeader("Accept", u.dataTypes[0] && u.accepts[u.dataTypes[0]] ? u.accepts[u.dataTypes[0]] + ("*" !== u.dataTypes[0] ? ", " + du + "; q=0.01" : "") : u.accepts["*"]);
            for (a in u.headers) f.setRequestHeader(a, u.headers[a]);
            if (u.beforeSend && (u.beforeSend.call(h, f, u) === !1 || 2 === o)) return f.abort();
            ft = "abort";
            for (a in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) f[a](u[a]);
            if (y = nf(yi, u, r, f)) {
                f.readyState = 1;
                v && nt.trigger("ajaxSend", [f, u]);
                u.async && u.timeout > 0 && (g = setTimeout(function() {
                    f.abort("timeout")
                }, u.timeout));
                try {
                    o = 1;
                    y.send(rt, k)
                } catch (et) {
                    if (!(2 > o)) throw et;
                    k(-1, et)
                }
            } else k(-1, "No Transport");
            return f
        },
        getJSON: function(n, t, r) {
            return i.get(n, t, r, "json")
        },
        getScript: function(n, r) {
            return i.get(n, t, r, "script")
        }
    });
    i.each(["get", "post"], function(n, r) {
        i[r] = function(n, u, f, e) {
            return i.isFunction(u) && (e = e || f, f = u, u = t), i.ajax({
                url: n,
                type: r,
                dataType: e,
                data: u,
                success: f
            })
        }
    });
    i.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(n) {
                return i.globalEval(n), n
            }
        }
    });
    i.ajaxPrefilter("script", function(n) {
        n.cache === t && (n.cache = !1);
        n.crossDomain && (n.type = "GET", n.global = !1)
    });
    i.ajaxTransport("script", function(n) {
        if (n.crossDomain) {
            var u, f = r.head || i("head")[0] || r.documentElement;
            return {
                send: function(t, i) {
                    u = r.createElement("script");
                    u.async = !0;
                    n.scriptCharset && (u.charset = n.scriptCharset);
                    u.src = n.url;
                    u.onload = u.onreadystatechange = function(n, t) {
                        (t || !u.readyState || /loaded|complete/.test(u.readyState)) && (u.onload = u.onreadystatechange = null, u.parentNode && u.parentNode.removeChild(u), u = null, t || i(200, "success"))
                    };
                    f.insertBefore(u, f.firstChild)
                },
                abort: function() {
                    u && u.onload(t, !0)
                }
            }
        }
    });
    wi = [];
    at = /(=)\?(?=&|$)|\?\?/;
    i.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var n = wi.pop() || i.expando + "_" + ai++;
            return this[n] = !0, n
        }
    });
    i.ajaxPrefilter("json jsonp", function(r, u, f) {
        var e, s, o, h = r.jsonp !== !1 && (at.test(r.url) ? "url" : "string" == typeof r.data && !(r.contentType || "").indexOf("application/x-www-form-urlencoded") && at.test(r.data) && "data");
        return h || "jsonp" === r.dataTypes[0] ? (e = r.jsonpCallback = i.isFunction(r.jsonpCallback) ? r.jsonpCallback() : r.jsonpCallback, h ? r[h] = r[h].replace(at, "$1" + e) : r.jsonp !== !1 && (r.url += (vi.test(r.url) ? "&" : "?") + r.jsonp + "=" + e), r.converters["script json"] = function() {
            return o || i.error(e + " was not called"), o[0]
        }, r.dataTypes[0] = "json", s = n[e], n[e] = function() {
            o = arguments
        }, f.always(function() {
            n[e] = s;
            r[e] && (r.jsonpCallback = u.jsonpCallback, wi.push(e));
            o && i.isFunction(s) && s(o[0]);
            o = s = t
        }), "script") : t
    });
    tf = 0;
    vt = n.ActiveXObject && function() {
        var n;
        for (n in nt) nt[n](t, !0)
    };
    i.ajaxSettings.xhr = n.ActiveXObject ? function() {
        return !this.isLocal && rf() || yo()
    } : rf;
    tt = i.ajaxSettings.xhr();
    i.support.cors = !!tt && "withCredentials" in tt;
    tt = i.support.ajax = !!tt;
    tt && i.ajaxTransport(function(r) {
        if (!r.crossDomain || i.support.cors) {
            var u;
            return {
                send: function(f, e) {
                    var h, s, o = r.xhr();
                    if (r.username ? o.open(r.type, r.url, r.async, r.username, r.password) : o.open(r.type, r.url, r.async), r.xhrFields)
                        for (s in r.xhrFields) o[s] = r.xhrFields[s];
                    r.mimeType && o.overrideMimeType && o.overrideMimeType(r.mimeType);
                    r.crossDomain || f["X-Requested-With"] || (f["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (s in f) o.setRequestHeader(s, f[s])
                    } catch (c) {}
                    o.send(r.hasContent && r.data || null);
                    u = function(n, f) {
                        var s, a, l, c;
                        try {
                            if (u && (f || 4 === o.readyState))
                                if (u = t, h && (o.onreadystatechange = i.noop, vt && delete nt[h]), f) 4 !== o.readyState && o.abort();
                                else {
                                    c = {};
                                    s = o.status;
                                    a = o.getAllResponseHeaders();
                                    "string" == typeof o.responseText && (c.text = o.responseText);
                                    try {
                                        l = o.statusText
                                    } catch (y) {
                                        l = ""
                                    }
                                    s || !r.isLocal || r.crossDomain ? 1223 === s && (s = 204) : s = c.text ? 200 : 404
                                }
                        } catch (v) {
                            f || e(-1, v)
                        }
                        c && e(s, l, c, a)
                    };
                    r.async ? 4 === o.readyState ? setTimeout(u) : (h = ++tf, vt && (nt || (nt = {}, i(n).unload(vt)), nt[h] = u), o.onreadystatechange = u) : u()
                },
                abort: function() {
                    u && u(t, !0)
                }
            }
        }
    });
    var it, yt, po = /^(?:toggle|show|hide)$/,
        uf = RegExp("^(?:([+-])=|)(" + st + ")([a-z%]*)$", "i"),
        wo = /queueHooks$/,
        pt = [ko],
        ft = {
            "*": [function(n, t) {
                var f = this.createTween(n, t),
                    s = f.cur(),
                    r = uf.exec(t),
                    e = r && r[3] || (i.cssNumber[n] ? "" : "px"),
                    u = (i.cssNumber[n] || "px" !== e && +s) && uf.exec(i.css(f.elem, n)),
                    o = 1,
                    h = 20;
                if (u && u[3] !== e) {
                    e = e || u[3];
                    r = r || [];
                    u = +s || 1;
                    do o = o || ".5", u /= o, i.style(f.elem, n, u + e); while (o !== (o = f.cur() / s) && 1 !== o && --h)
                }
                return r && (u = f.start = +u || +s || 0, f.unit = e, f.end = r[1] ? u + (r[1] + 1) * r[2] : +r[2]), f
            }]
        };
    i.Animation = i.extend(of, {
        tweener: function(n, t) {
            i.isFunction(n) ? (t = n, n = ["*"]) : n = n.split(" ");
            for (var r, u = 0, f = n.length; f > u; u++) r = n[u], ft[r] = ft[r] || [], ft[r].unshift(t)
        },
        prefilter: function(n, t) {
            t ? pt.unshift(n) : pt.push(n)
        }
    });
    i.Tween = f;
    f.prototype = {
        constructor: f,
        init: function(n, t, r, u, f, e) {
            this.elem = n;
            this.prop = r;
            this.easing = f || "swing";
            this.options = t;
            this.start = this.now = this.cur();
            this.end = u;
            this.unit = e || (i.cssNumber[r] ? "" : "px")
        },
        cur: function() {
            var n = f.propHooks[this.prop];
            return n && n.get ? n.get(this) : f.propHooks._default.get(this)
        },
        run: function(n) {
            var r, t = f.propHooks[this.prop];
            return this.pos = r = this.options.duration ? i.easing[this.easing](n, this.options.duration * n, 0, 1, this.options.duration) : n, this.now = (this.end - this.start) * r + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), t && t.set ? t.set(this) : f.propHooks._default.set(this), this
        }
    };
    f.prototype.init.prototype = f.prototype;
    f.propHooks = {
        _default: {
            get: function(n) {
                var t;
                return null == n.elem[n.prop] || n.elem.style && null != n.elem.style[n.prop] ? (t = i.css(n.elem, n.prop, ""), t && "auto" !== t ? t : 0) : n.elem[n.prop]
            },
            set: function(n) {
                i.fx.step[n.prop] ? i.fx.step[n.prop](n) : n.elem.style && (null != n.elem.style[i.cssProps[n.prop]] || i.cssHooks[n.prop]) ? i.style(n.elem, n.prop, n.now + n.unit) : n.elem[n.prop] = n.now
            }
        }
    };
    f.propHooks.scrollTop = f.propHooks.scrollLeft = {
        set: function(n) {
            n.elem.nodeType && n.elem.parentNode && (n.elem[n.prop] = n.now)
        }
    };
    i.each(["toggle", "show", "hide"], function(n, t) {
        var r = i.fn[t];
        i.fn[t] = function(n, i, u) {
            return null == n || "boolean" == typeof n ? r.apply(this, arguments) : this.animate(wt(t, !0), n, i, u)
        }
    });
    i.fn.extend({
        fadeTo: function(n, t, i, r) {
            return this.filter(ut).css("opacity", 0).show().end().animate({
                opacity: t
            }, n, i, r)
        },
        animate: function(n, t, r, u) {
            var o = i.isEmptyObject(n),
                e = i.speed(t, r, u),
                f = function() {
                    var t = of(this, i.extend({}, n), e);
                    (o || i._data(this, "finish")) && t.stop(!0)
                };
            return f.finish = f, o || e.queue === !1 ? this.each(f) : this.queue(e.queue, f)
        },
        stop: function(n, r, u) {
            var f = function(n) {
                var t = n.stop;
                delete n.stop;
                t(u)
            };
            return "string" != typeof n && (u = r, r = n, n = t), r && n !== !1 && this.queue(n || "fx", []), this.each(function() {
                var o = !0,
                    t = null != n && n + "queueHooks",
                    e = i.timers,
                    r = i._data(this);
                if (t) r[t] && r[t].stop && f(r[t]);
                else
                    for (t in r) r[t] && r[t].stop && wo.test(t) && f(r[t]);
                for (t = e.length; t--;) e[t].elem !== this || null != n && e[t].queue !== n || (e[t].anim.stop(u), o = !1, e.splice(t, 1));
                (o || !u) && i.dequeue(this, n)
            })
        },
        finish: function(n) {
            return n !== !1 && (n = n || "fx"), this.each(function() {
                var t, f = i._data(this),
                    r = f[n + "queue"],
                    e = f[n + "queueHooks"],
                    u = i.timers,
                    o = r ? r.length : 0;
                for (f.finish = !0, i.queue(this, n, []), e && e.stop && e.stop.call(this, !0), t = u.length; t--;) u[t].elem === this && u[t].queue === n && (u[t].anim.stop(!0), u.splice(t, 1));
                for (t = 0; o > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
                delete f.finish
            })
        }
    });
    i.each({
        slideDown: wt("show"),
        slideUp: wt("hide"),
        slideToggle: wt("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(n, t) {
        i.fn[n] = function(n, i, r) {
            return this.animate(t, n, i, r)
        }
    });
    i.speed = function(n, t, r) {
        var u = n && "object" == typeof n ? i.extend({}, n) : {
            complete: r || !r && t || i.isFunction(n) && n,
            duration: n,
            easing: r && t || t && !i.isFunction(t) && t
        };
        return u.duration = i.fx.off ? 0 : "number" == typeof u.duration ? u.duration : u.duration in i.fx.speeds ? i.fx.speeds[u.duration] : i.fx.speeds._default, (null == u.queue || u.queue === !0) && (u.queue = "fx"), u.old = u.complete, u.complete = function() {
            i.isFunction(u.old) && u.old.call(this);
            u.queue && i.dequeue(this, u.queue)
        }, u
    };
    i.easing = {
        linear: function(n) {
            return n
        },
        swing: function(n) {
            return .5 - Math.cos(n * Math.PI) / 2
        }
    };
    i.timers = [];
    i.fx = f.prototype.init;
    i.fx.tick = function() {
        var u, n = i.timers,
            r = 0;
        for (it = i.now(); n.length > r; r++) u = n[r], u() || n[r] !== u || n.splice(r--, 1);
        n.length || i.fx.stop();
        it = t
    };
    i.fx.timer = function(n) {
        n() && i.timers.push(n) && i.fx.start()
    };
    i.fx.interval = 13;
    i.fx.start = function() {
        yt || (yt = setInterval(i.fx.tick, i.fx.interval))
    };
    i.fx.stop = function() {
        clearInterval(yt);
        yt = null
    };
    i.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    i.fx.step = {};
    i.expr && i.expr.filters && (i.expr.filters.animated = function(n) {
        return i.grep(i.timers, function(t) {
            return n === t.elem
        }).length
    });
    i.fn.offset = function(n) {
        if (arguments.length) return n === t ? this : this.each(function(t) {
            i.offset.setOffset(this, n, t)
        });
        var r, e, f = {
                top: 0,
                left: 0
            },
            u = this[0],
            s = u && u.ownerDocument;
        if (s) return r = s.documentElement, i.contains(r, u) ? (typeof u.getBoundingClientRect !== o && (f = u.getBoundingClientRect()), e = sf(s), {
            top: f.top + (e.pageYOffset || r.scrollTop) - (r.clientTop || 0),
            left: f.left + (e.pageXOffset || r.scrollLeft) - (r.clientLeft || 0)
        }) : f
    };
    i.offset = {
        setOffset: function(n, t, r) {
            var f = i.css(n, "position");
            "static" === f && (n.style.position = "relative");
            var e = i(n),
                o = e.offset(),
                l = i.css(n, "top"),
                a = i.css(n, "left"),
                v = ("absolute" === f || "fixed" === f) && i.inArray("auto", [l, a]) > -1,
                u = {},
                s = {},
                h, c;
            v ? (s = e.position(), h = s.top, c = s.left) : (h = parseFloat(l) || 0, c = parseFloat(a) || 0);
            i.isFunction(t) && (t = t.call(n, r, o));
            null != t.top && (u.top = t.top - o.top + h);
            null != t.left && (u.left = t.left - o.left + c);
            "using" in t ? t.using.call(n, u) : e.css(u)
        }
    };
    i.fn.extend({
        position: function() {
            if (this[0]) {
                var n, r, t = {
                        top: 0,
                        left: 0
                    },
                    u = this[0];
                return "fixed" === i.css(u, "position") ? r = u.getBoundingClientRect() : (n = this.offsetParent(), r = this.offset(), i.nodeName(n[0], "html") || (t = n.offset()), t.top += i.css(n[0], "borderTopWidth", !0), t.left += i.css(n[0], "borderLeftWidth", !0)), {
                    top: r.top - t.top - i.css(u, "marginTop", !0),
                    left: r.left - t.left - i.css(u, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var n = this.offsetParent || ki; n && !i.nodeName(n, "html") && "static" === i.css(n, "position");) n = n.offsetParent;
                return n || ki
            })
        }
    });
    i.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(n, r) {
        var u = /Y/.test(r);
        i.fn[n] = function(f) {
            return i.access(this, function(n, f, e) {
                var o = sf(n);
                return e === t ? o ? r in o ? o[r] : o.document.documentElement[f] : n[f] : (o ? o.scrollTo(u ? i(o).scrollLeft() : e, u ? e : i(o).scrollTop()) : n[f] = e, t)
            }, n, f, arguments.length, null)
        }
    });
    i.each({
        Height: "height",
        Width: "width"
    }, function(n, r) {
        i.each({
            padding: "inner" + n,
            content: r,
            "": "outer" + n
        }, function(u, f) {
            i.fn[f] = function(f, e) {
                var o = arguments.length && (u || "boolean" != typeof f),
                    s = u || (f === !0 || e === !0 ? "margin" : "border");
                return i.access(this, function(r, u, f) {
                    var e;
                    return i.isWindow(r) ? r.document.documentElement["client" + n] : 9 === r.nodeType ? (e = r.documentElement, Math.max(r.body["scroll" + n], e["scroll" + n], r.body["offset" + n], e["offset" + n], e["client" + n])) : f === t ? i.css(r, u, s) : i.style(r, u, f, s)
                }, r, o ? f : t, o, null)
            }
        })
    });
    i.fn.size = function() {
        return this.length
    };
    i.fn.andSelf = i.fn.addBack;
    "object" == typeof module && module && "object" == typeof module.exports ? module.exports = i : (n.jQuery = n.$ = i, "function" == typeof define && define.amd && define("jquery", [], function() {
        return i
    }))
})(window),
function(n, t) {
    function i(t, i) {
        var u, f, e, o = t.nodeName.toLowerCase();
        return "area" === o ? (u = t.parentNode, f = u.name, t.href && f && "map" === u.nodeName.toLowerCase() ? (e = n("img[usemap=#" + f + "]")[0], !!e && r(e)) : !1) : (/input|select|textarea|button|object/.test(o) ? !t.disabled : "a" === o ? t.href || i : i) && r(t)
    }

    function r(t) {
        return n.expr.filters.visible(t) && !n(t).parents().addBack().filter(function() {
            return "hidden" === n.css(this, "visibility")
        }).length
    }
    var u = 0,
        f = /^ui-id-\d+$/;
    n.ui = n.ui || {};
    n.extend(n.ui, {
        version: "1.10.4",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    });
    n.fn.extend({
        focus: function(t) {
            return function(i, r) {
                return "number" == typeof i ? this.each(function() {
                    var t = this;
                    setTimeout(function() {
                        n(t).focus();
                        r && r.call(t)
                    }, i)
                }) : t.apply(this, arguments)
            }
        }(n.fn.focus),
        scrollParent: function() {
            var t;
            return t = n.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(n.css(this, "position")) && /(auto|scroll)/.test(n.css(this, "overflow") + n.css(this, "overflow-y") + n.css(this, "overflow-x"))
            }).eq(0) : this.parents().filter(function() {
                return /(auto|scroll)/.test(n.css(this, "overflow") + n.css(this, "overflow-y") + n.css(this, "overflow-x"))
            }).eq(0), /fixed/.test(this.css("position")) || !t.length ? n(document) : t
        },
        zIndex: function(i) {
            if (i !== t) return this.css("zIndex", i);
            if (this.length)
                for (var u, f, r = n(this[0]); r.length && r[0] !== document;) {
                    if (u = r.css("position"), ("absolute" === u || "relative" === u || "fixed" === u) && (f = parseInt(r.css("zIndex"), 10), !isNaN(f) && 0 !== f)) return f;
                    r = r.parent()
                }
            return 0
        },
        uniqueId: function() {
            return this.each(function() {
                this.id || (this.id = "ui-id-" + ++u)
            })
        },
        removeUniqueId: function() {
            return this.each(function() {
                f.test(this.id) && n(this).removeAttr("id")
            })
        }
    });
    n.extend(n.expr[":"], {
        data: n.expr.createPseudo ? n.expr.createPseudo(function(t) {
            return function(i) {
                return !!n.data(i, t)
            }
        }) : function(t, i, r) {
            return !!n.data(t, r[3])
        },
        focusable: function(t) {
            return i(t, !isNaN(n.attr(t, "tabindex")))
        },
        tabbable: function(t) {
            var r = n.attr(t, "tabindex"),
                u = isNaN(r);
            return (u || r >= 0) && i(t, !u)
        }
    });
    n("<a>").outerWidth(1).jquery || n.each(["Width", "Height"], function(i, r) {
        function u(t, i, r, u) {
            return n.each(o, function() {
                i -= parseFloat(n.css(t, "padding" + this)) || 0;
                r && (i -= parseFloat(n.css(t, "border" + this + "Width")) || 0);
                u && (i -= parseFloat(n.css(t, "margin" + this)) || 0)
            }), i
        }
        var o = "Width" === r ? ["Left", "Right"] : ["Top", "Bottom"],
            f = r.toLowerCase(),
            e = {
                innerWidth: n.fn.innerWidth,
                innerHeight: n.fn.innerHeight,
                outerWidth: n.fn.outerWidth,
                outerHeight: n.fn.outerHeight
            };
        n.fn["inner" + r] = function(i) {
            return i === t ? e["inner" + r].call(this) : this.each(function() {
                n(this).css(f, u(this, i) + "px")
            })
        };
        n.fn["outer" + r] = function(t, i) {
            return "number" != typeof t ? e["outer" + r].call(this, t) : this.each(function() {
                n(this).css(f, u(this, t, !0, i) + "px")
            })
        }
    });
    n.fn.addBack || (n.fn.addBack = function(n) {
        return this.add(null == n ? this.prevObject : this.prevObject.filter(n))
    });
    n("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (n.fn.removeData = function(t) {
        return function(i) {
            return arguments.length ? t.call(this, n.camelCase(i)) : t.call(this)
        }
    }(n.fn.removeData));
    n.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    n.support.selectstart = "onselectstart" in document.createElement("div");
    n.fn.extend({
        disableSelection: function() {
            return this.bind((n.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(n) {
                n.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    });
    n.extend(n.ui, {
        plugin: {
            add: function(t, i, r) {
                var u, f = n.ui[t].prototype;
                for (u in r) f.plugins[u] = f.plugins[u] || [], f.plugins[u].push([i, r[u]])
            },
            call: function(n, t, i) {
                var r, u = n.plugins[t];
                if (u && n.element[0].parentNode && 11 !== n.element[0].parentNode.nodeType)
                    for (r = 0; u.length > r; r++) n.options[u[r][0]] && u[r][1].apply(n.element, i)
            }
        },
        hasScroll: function(t, i) {
            if ("hidden" === n(t).css("overflow")) return !1;
            var r = i && "left" === i ? "scrollLeft" : "scrollTop",
                u = !1;
            return t[r] > 0 ? !0 : (t[r] = 1, u = t[r] > 0, t[r] = 0, u)
        }
    })
}(jQuery),
function(n, t) {
    var r = 0,
        i = Array.prototype.slice,
        u = n.cleanData;
    n.cleanData = function(t) {
        for (var i, r = 0; null != (i = t[r]); r++) try {
            n(i).triggerHandler("remove")
        } catch (f) {}
        u(t)
    };
    n.widget = function(i, r, u) {
        var h, e, f, s, c = {},
            o = i.split(".")[0];
        i = i.split(".")[1];
        h = o + "-" + i;
        u || (u = r, r = n.Widget);
        n.expr[":"][h.toLowerCase()] = function(t) {
            return !!n.data(t, h)
        };
        n[o] = n[o] || {};
        e = n[o][i];
        f = n[o][i] = function(n, i) {
            return this._createWidget ? (arguments.length && this._createWidget(n, i), t) : new f(n, i)
        };
        n.extend(f, e, {
            version: u.version,
            _proto: n.extend({}, u),
            _childConstructors: []
        });
        s = new r;
        s.options = n.widget.extend({}, s.options);
        n.each(u, function(i, u) {
            return n.isFunction(u) ? (c[i] = function() {
                var n = function() {
                        return r.prototype[i].apply(this, arguments)
                    },
                    t = function(n) {
                        return r.prototype[i].apply(this, n)
                    };
                return function() {
                    var i, r = this._super,
                        f = this._superApply;
                    return this._super = n, this._superApply = t, i = u.apply(this, arguments), this._super = r, this._superApply = f, i
                }
            }(), t) : (c[i] = u, t)
        });
        f.prototype = n.widget.extend(s, {
            widgetEventPrefix: e ? s.widgetEventPrefix || i : i
        }, c, {
            constructor: f,
            namespace: o,
            widgetName: i,
            widgetFullName: h
        });
        e ? (n.each(e._childConstructors, function(t, i) {
            var r = i.prototype;
            n.widget(r.namespace + "." + r.widgetName, f, i._proto)
        }), delete e._childConstructors) : r._childConstructors.push(f);
        n.widget.bridge(i, f)
    };
    n.widget.extend = function(r) {
        for (var u, f, o = i.call(arguments, 1), e = 0, s = o.length; s > e; e++)
            for (u in o[e]) f = o[e][u], o[e].hasOwnProperty(u) && f !== t && (r[u] = n.isPlainObject(f) ? n.isPlainObject(r[u]) ? n.widget.extend({}, r[u], f) : n.widget.extend({}, f) : f);
        return r
    };
    n.widget.bridge = function(r, u) {
        var f = u.prototype.widgetFullName || r;
        n.fn[r] = function(e) {
            var h = "string" == typeof e,
                o = i.call(arguments, 1),
                s = this;
            return e = !h && o.length ? n.widget.extend.apply(null, [e].concat(o)) : e, h ? this.each(function() {
                var i, u = n.data(this, f);
                return u ? n.isFunction(u[e]) && "_" !== e.charAt(0) ? (i = u[e].apply(u, o), i !== u && i !== t ? (s = i && i.jquery ? s.pushStack(i.get()) : i, !1) : t) : n.error("no such method '" + e + "' for " + r + " widget instance") : n.error("cannot call methods on " + r + " prior to initialization; attempted to call method '" + e + "'")
            }) : this.each(function() {
                var t = n.data(this, f);
                t ? t.option(e || {})._init() : n.data(this, f, new u(e, this))
            }), s
        }
    };
    n.Widget = function() {};
    n.Widget._childConstructors = [];
    n.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(t, i) {
            i = n(i || this.defaultElement || this)[0];
            this.element = n(i);
            this.uuid = r++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.options = n.widget.extend({}, this.options, this._getCreateOptions(), t);
            this.bindings = n();
            this.hoverable = n();
            this.focusable = n();
            i !== this && (n.data(i, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(n) {
                    n.target === i && this.destroy()
                }
            }), this.document = n(i.style ? i.ownerDocument : i.document || i), this.window = n(this.document[0].defaultView || this.document[0].parentWindow));
            this._create();
            this._trigger("create", null, this._getCreateEventData());
            this._init()
        },
        _getCreateOptions: n.noop,
        _getCreateEventData: n.noop,
        _create: n.noop,
        _init: n.noop,
        destroy: function() {
            this._destroy();
            this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(n.camelCase(this.widgetFullName));
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled");
            this.bindings.unbind(this.eventNamespace);
            this.hoverable.removeClass("ui-state-hover");
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: n.noop,
        widget: function() {
            return this.element
        },
        option: function(i, r) {
            var u, f, e, o = i;
            if (0 === arguments.length) return n.widget.extend({}, this.options);
            if ("string" == typeof i)
                if (o = {}, u = i.split("."), i = u.shift(), u.length) {
                    for (f = o[i] = n.widget.extend({}, this.options[i]), e = 0; u.length - 1 > e; e++) f[u[e]] = f[u[e]] || {}, f = f[u[e]];
                    if (i = u.pop(), 1 === arguments.length) return f[i] === t ? null : f[i];
                    f[i] = r
                } else {
                    if (1 === arguments.length) return this.options[i] === t ? null : this.options[i];
                    o[i] = r
                }
            return this._setOptions(o), this
        },
        _setOptions: function(n) {
            var t;
            for (t in n) this._setOption(t, n[t]);
            return this
        },
        _setOption: function(n, t) {
            return this.options[n] = t, "disabled" === n && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _on: function(i, r, u) {
            var e, f = this;
            "boolean" != typeof i && (u = r, r = i, i = !1);
            u ? (r = e = n(r), this.bindings = this.bindings.add(r)) : (u = r, r = this.element, e = this.widget());
            n.each(u, function(u, o) {
                function s() {
                    return i || f.options.disabled !== !0 && !n(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? f[o] : o).apply(f, arguments) : t
                }
                "string" != typeof o && (s.guid = o.guid = o.guid || s.guid || n.guid++);
                var h = u.match(/^(\w+)\s*(.*)$/),
                    c = h[1] + f.eventNamespace,
                    l = h[2];
                l ? e.delegate(l, c, s) : r.bind(c, s)
            })
        },
        _off: function(n, t) {
            t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            n.unbind(t).undelegate(t)
        },
        _delay: function(n, t) {
            function r() {
                return ("string" == typeof n ? i[n] : n).apply(i, arguments)
            }
            var i = this;
            return setTimeout(r, t || 0)
        },
        _hoverable: function(t) {
            this.hoverable = this.hoverable.add(t);
            this._on(t, {
                mouseenter: function(t) {
                    n(t.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(t) {
                    n(t.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(t) {
            this.focusable = this.focusable.add(t);
            this._on(t, {
                focusin: function(t) {
                    n(t.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(t) {
                    n(t.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(t, i, r) {
            var u, f, e = this.options[t];
            if (r = r || {}, i = n.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], f = i.originalEvent)
                for (u in f) u in i || (i[u] = f[u]);
            return this.element.trigger(i, r), !(n.isFunction(e) && e.apply(this.element[0], [i].concat(r)) === !1 || i.isDefaultPrevented())
        }
    };
    n.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(t, i) {
        n.Widget.prototype["_" + t] = function(r, u, f) {
            "string" == typeof u && (u = {
                effect: u
            });
            var o, e = u ? u === !0 || "number" == typeof u ? i : u.effect || i : t;
            u = u || {};
            "number" == typeof u && (u = {
                duration: u
            });
            o = !n.isEmptyObject(u);
            u.complete = f;
            u.delay && r.delay(u.delay);
            o && n.effects && n.effects.effect[e] ? r[t](u) : e !== t && r[e] ? r[e](u.duration, u.easing, f) : r.queue(function(i) {
                n(this)[t]();
                f && f.call(r[0]);
                i()
            })
        }
    })
}(jQuery),
function(n, t) {
    function e(n, t, i) {
        return [parseFloat(n[0]) * (a.test(n[0]) ? t / 100 : 1), parseFloat(n[1]) * (a.test(n[1]) ? i / 100 : 1)]
    }

    function r(t, i) {
        return parseInt(n.css(t, i), 10) || 0
    }

    function v(t) {
        var i = t[0];
        return 9 === i.nodeType ? {
            width: t.width(),
            height: t.height(),
            offset: {
                top: 0,
                left: 0
            }
        } : n.isWindow(i) ? {
            width: t.width(),
            height: t.height(),
            offset: {
                top: t.scrollTop(),
                left: t.scrollLeft()
            }
        } : i.preventDefault ? {
            width: 0,
            height: 0,
            offset: {
                top: i.pageY,
                left: i.pageX
            }
        } : {
            width: t.outerWidth(),
            height: t.outerHeight(),
            offset: t.offset()
        }
    }
    n.ui = n.ui || {};
    var f, u = Math.max,
        i = Math.abs,
        o = Math.round,
        s = /left|center|right/,
        h = /top|center|bottom/,
        c = /[\+\-]\d+(\.[\d]+)?%?/,
        l = /^\w+/,
        a = /%$/,
        y = n.fn.position;
    n.position = {
        scrollbarWidth: function() {
            if (f !== t) return f;
            var u, r, i = n("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'><\/div><\/div>"),
                e = i.children()[0];
            return n("body").append(i), u = e.offsetWidth, i.css("overflow", "scroll"), r = e.offsetWidth, u === r && (r = i[0].clientWidth), i.remove(), f = u - r
        },
        getScrollInfo: function(t) {
            var i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
                r = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
                u = "scroll" === i || "auto" === i && t.width < t.element[0].scrollWidth,
                f = "scroll" === r || "auto" === r && t.height < t.element[0].scrollHeight;
            return {
                width: f ? n.position.scrollbarWidth() : 0,
                height: u ? n.position.scrollbarWidth() : 0
            }
        },
        getWithinInfo: function(t) {
            var i = n(t || window),
                r = n.isWindow(i[0]),
                u = !!i[0] && 9 === i[0].nodeType;
            return {
                element: i,
                isWindow: r,
                isDocument: u,
                offset: i.offset() || {
                    left: 0,
                    top: 0
                },
                scrollLeft: i.scrollLeft(),
                scrollTop: i.scrollTop(),
                width: r ? i.width() : i.outerWidth(),
                height: r ? i.height() : i.outerHeight()
            }
        }
    };
    n.fn.position = function(t) {
        if (!t || !t.of) return y.apply(this, arguments);
        t = n.extend({}, t);
        var b, f, a, w, p, d, g = n(t.of),
            tt = n.position.getWithinInfo(t.within),
            it = n.position.getScrollInfo(tt),
            k = (t.collision || "flip").split(" "),
            nt = {};
        return d = v(g), g[0].preventDefault && (t.at = "left top"), f = d.width, a = d.height, w = d.offset, p = n.extend({}, w), n.each(["my", "at"], function() {
            var i, r, n = (t[this] || "").split(" ");
            1 === n.length && (n = s.test(n[0]) ? n.concat(["center"]) : h.test(n[0]) ? ["center"].concat(n) : ["center", "center"]);
            n[0] = s.test(n[0]) ? n[0] : "center";
            n[1] = h.test(n[1]) ? n[1] : "center";
            i = c.exec(n[0]);
            r = c.exec(n[1]);
            nt[this] = [i ? i[0] : 0, r ? r[0] : 0];
            t[this] = [l.exec(n[0])[0], l.exec(n[1])[0]]
        }), 1 === k.length && (k[1] = k[0]), "right" === t.at[0] ? p.left += f : "center" === t.at[0] && (p.left += f / 2), "bottom" === t.at[1] ? p.top += a : "center" === t.at[1] && (p.top += a / 2), b = e(nt.at, f, a), p.left += b[0], p.top += b[1], this.each(function() {
            var y, d, h = n(this),
                c = h.outerWidth(),
                l = h.outerHeight(),
                rt = r(this, "marginLeft"),
                ut = r(this, "marginTop"),
                ft = c + rt + r(this, "marginRight") + it.width,
                et = l + ut + r(this, "marginBottom") + it.height,
                s = n.extend({}, p),
                v = e(nt.my, h.outerWidth(), h.outerHeight());
            "right" === t.my[0] ? s.left -= c : "center" === t.my[0] && (s.left -= c / 2);
            "bottom" === t.my[1] ? s.top -= l : "center" === t.my[1] && (s.top -= l / 2);
            s.left += v[0];
            s.top += v[1];
            n.support.offsetFractions || (s.left = o(s.left), s.top = o(s.top));
            y = {
                marginLeft: rt,
                marginTop: ut
            };
            n.each(["left", "top"], function(i, r) {
                n.ui.position[k[i]] && n.ui.position[k[i]][r](s, {
                    targetWidth: f,
                    targetHeight: a,
                    elemWidth: c,
                    elemHeight: l,
                    collisionPosition: y,
                    collisionWidth: ft,
                    collisionHeight: et,
                    offset: [b[0] + v[0], b[1] + v[1]],
                    my: t.my,
                    at: t.at,
                    within: tt,
                    elem: h
                })
            });
            t.using && (d = function(n) {
                var r = w.left - s.left,
                    v = r + f - c,
                    e = w.top - s.top,
                    y = e + a - l,
                    o = {
                        target: {
                            element: g,
                            left: w.left,
                            top: w.top,
                            width: f,
                            height: a
                        },
                        element: {
                            element: h,
                            left: s.left,
                            top: s.top,
                            width: c,
                            height: l
                        },
                        horizontal: 0 > v ? "left" : r > 0 ? "right" : "center",
                        vertical: 0 > y ? "top" : e > 0 ? "bottom" : "middle"
                    };
                c > f && f > i(r + v) && (o.horizontal = "center");
                l > a && a > i(e + y) && (o.vertical = "middle");
                o.important = u(i(r), i(v)) > u(i(e), i(y)) ? "horizontal" : "vertical";
                t.using.call(this, n, o)
            });
            h.offset(n.extend(s, {
                using: d
            }))
        })
    };
    n.ui.position = {
            fit: {
                left: function(n, t) {
                    var h, e = t.within,
                        r = e.isWindow ? e.scrollLeft : e.offset.left,
                        o = e.width,
                        s = n.left - t.collisionPosition.marginLeft,
                        i = r - s,
                        f = s + t.collisionWidth - o - r;
                    t.collisionWidth > o ? i > 0 && 0 >= f ? (h = n.left + i + t.collisionWidth - o - r, n.left += i - h) : n.left = f > 0 && 0 >= i ? r : i > f ? r + o - t.collisionWidth : r : i > 0 ? n.left += i : f > 0 ? n.left -= f : n.left = u(n.left - s, n.left)
                },
                top: function(n, t) {
                    var h, o = t.within,
                        r = o.isWindow ? o.scrollTop : o.offset.top,
                        e = t.within.height,
                        s = n.top - t.collisionPosition.marginTop,
                        i = r - s,
                        f = s + t.collisionHeight - e - r;
                    t.collisionHeight > e ? i > 0 && 0 >= f ? (h = n.top + i + t.collisionHeight - e - r, n.top += i - h) : n.top = f > 0 && 0 >= i ? r : i > f ? r + e - t.collisionHeight : r : i > 0 ? n.top += i : f > 0 ? n.top -= f : n.top = u(n.top - s, n.top)
                }
            },
            flip: {
                left: function(n, t) {
                    var o, s, r = t.within,
                        y = r.offset.left + r.scrollLeft,
                        c = r.width,
                        h = r.isWindow ? r.scrollLeft : r.offset.left,
                        l = n.left - t.collisionPosition.marginLeft,
                        a = l - h,
                        v = l + t.collisionWidth - c - h,
                        u = "left" === t.my[0] ? -t.elemWidth : "right" === t.my[0] ? t.elemWidth : 0,
                        f = "left" === t.at[0] ? t.targetWidth : "right" === t.at[0] ? -t.targetWidth : 0,
                        e = -2 * t.offset[0];
                    0 > a ? (o = n.left + u + f + e + t.collisionWidth - c - y, (0 > o || i(a) > o) && (n.left += u + f + e)) : v > 0 && (s = n.left - t.collisionPosition.marginLeft + u + f + e - h, (s > 0 || v > i(s)) && (n.left += u + f + e))
                },
                top: function(n, t) {
                    var o, s, r = t.within,
                        y = r.offset.top + r.scrollTop,
                        a = r.height,
                        h = r.isWindow ? r.scrollTop : r.offset.top,
                        v = n.top - t.collisionPosition.marginTop,
                        c = v - h,
                        l = v + t.collisionHeight - a - h,
                        p = "top" === t.my[1],
                        u = p ? -t.elemHeight : "bottom" === t.my[1] ? t.elemHeight : 0,
                        f = "top" === t.at[1] ? t.targetHeight : "bottom" === t.at[1] ? -t.targetHeight : 0,
                        e = -2 * t.offset[1];
                    0 > c ? (s = n.top + u + f + e + t.collisionHeight - a - y, n.top + u + f + e > c && (0 > s || i(c) > s) && (n.top += u + f + e)) : l > 0 && (o = n.top - t.collisionPosition.marginTop + u + f + e - h, n.top + u + f + e > l && (o > 0 || l > i(o)) && (n.top += u + f + e))
                }
            },
            flipfit: {
                left: function() {
                    n.ui.position.flip.left.apply(this, arguments);
                    n.ui.position.fit.left.apply(this, arguments)
                },
                top: function() {
                    n.ui.position.flip.top.apply(this, arguments);
                    n.ui.position.fit.top.apply(this, arguments)
                }
            }
        },
        function() {
            var t, i, r, u, f, e = document.getElementsByTagName("body")[0],
                o = document.createElement("div");
            t = document.createElement(e ? "div" : "body");
            r = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            };
            e && n.extend(r, {
                position: "absolute",
                left: "-1000px",
                top: "-1000px"
            });
            for (f in r) t.style[f] = r[f];
            t.appendChild(o);
            i = e || document.documentElement;
            i.insertBefore(t, i.firstChild);
            o.style.cssText = "position: absolute; left: 10.7432222px;";
            u = n(o).offset().left;
            n.support.offsetFractions = u > 10 && 11 > u;
            t.innerHTML = "";
            i.removeChild(t)
        }()
}(jQuery),
function(n) {
    n.widget("ui.autocomplete", {
        version: "1.10.4",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        requestIndex: 0,
        pending: 0,
        _create: function() {
            var t, i, r, u = this.element[0].nodeName.toLowerCase(),
                f = "textarea" === u,
                e = "input" === u;
            this.isMultiLine = f ? !0 : e ? !1 : this.element.prop("isContentEditable");
            this.valueMethod = this.element[f || e ? "val" : "text"];
            this.isNewMenu = !0;
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off");
            this._on(this.element, {
                keydown: function(u) {
                    if (this.element.prop("readOnly")) return t = !0, r = !0, i = !0, undefined;
                    t = !1;
                    r = !1;
                    i = !1;
                    var f = n.ui.keyCode;
                    switch (u.keyCode) {
                        case f.PAGE_UP:
                            t = !0;
                            this._move("previousPage", u);
                            break;
                        case f.PAGE_DOWN:
                            t = !0;
                            this._move("nextPage", u);
                            break;
                        case f.UP:
                            t = !0;
                            this._keyEvent("previous", u);
                            break;
                        case f.DOWN:
                            t = !0;
                            this._keyEvent("next", u);
                            break;
                        case f.ENTER:
                        case f.NUMPAD_ENTER:
                            this.menu.active && (t = !0, u.preventDefault(), this.menu.select(u));
                            break;
                        case f.TAB:
                            this.menu.active && this.menu.select(u);
                            break;
                        case f.ESCAPE:
                            this.menu.element.is(":visible") && (this._value(this.term), this.close(u), u.preventDefault());
                            break;
                        default:
                            i = !0;
                            this._searchTimeout(u)
                    }
                },
                keypress: function(r) {
                    if (t) return t = !1, (!this.isMultiLine || this.menu.element.is(":visible")) && r.preventDefault(), undefined;
                    if (!i) {
                        var u = n.ui.keyCode;
                        switch (r.keyCode) {
                            case u.PAGE_UP:
                                this._move("previousPage", r);
                                break;
                            case u.PAGE_DOWN:
                                this._move("nextPage", r);
                                break;
                            case u.UP:
                                this._keyEvent("previous", r);
                                break;
                            case u.DOWN:
                                this._keyEvent("next", r)
                        }
                    }
                },
                input: function(n) {
                    return r ? (r = !1, n.preventDefault(), undefined) : (this._searchTimeout(n), undefined)
                },
                focus: function() {
                    this.selectedItem = null;
                    this.previous = this._value()
                },
                blur: function(n) {
                    return this.cancelBlur ? (delete this.cancelBlur, undefined) : (clearTimeout(this.searching), this.close(n), this._change(n), undefined)
                }
            });
            this._initSource();
            this.menu = n("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                role: null
            }).hide().data("ui-menu");
            this._on(this.menu.element, {
                mousedown: function(t) {
                    t.preventDefault();
                    this.cancelBlur = !0;
                    this._delay(function() {
                        delete this.cancelBlur
                    });
                    var i = this.menu.element[0];
                    n(t.target).closest(".ui-menu-item").length || this._delay(function() {
                        var t = this;
                        this.document.one("mousedown", function(r) {
                            r.target === t.element[0] || r.target === i || n.contains(i, r.target) || t.close()
                        })
                    })
                },
                menufocus: function(t, i) {
                    if (this.isNewMenu && (this.isNewMenu = !1, t.originalEvent && /^mouse/.test(t.originalEvent.type))) return this.menu.blur(), this.document.one("mousemove", function() {
                        n(t.target).trigger(t.originalEvent)
                    }), undefined;
                    var r = i.item.data("ui-autocomplete-item");
                    !1 !== this._trigger("focus", t, {
                        item: r
                    }) ? t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(r.value) : this.liveRegion.text(r.value)
                },
                menuselect: function(n, t) {
                    var i = t.item.data("ui-autocomplete-item"),
                        r = this.previous;
                    this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = r, this._delay(function() {
                        this.previous = r;
                        this.selectedItem = i
                    }));
                    !1 !== this._trigger("select", n, {
                        item: i
                    }) && this._value(i.value);
                    this.term = this._value();
                    this.close(n);
                    this.selectedItem = i
                }
            });
            this.liveRegion = n("<span>", {
                role: "status",
                "aria-live": "polite"
            }).addClass("ui-helper-hidden-accessible").insertBefore(this.element);
            this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _destroy: function() {
            clearTimeout(this.searching);
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete");
            this.menu.element.remove();
            this.liveRegion.remove()
        },
        _setOption: function(n, t) {
            this._super(n, t);
            "source" === n && this._initSource();
            "appendTo" === n && this.menu.element.appendTo(this._appendTo());
            "disabled" === n && t && this.xhr && this.xhr.abort()
        },
        _appendTo: function() {
            var t = this.options.appendTo;
            return t && (t = t.jquery || t.nodeType ? n(t) : this.document.find(t).eq(0)), t || (t = this.element.closest(".ui-front")), t.length || (t = this.document[0].body), t
        },
        _initSource: function() {
            var i, r, t = this;
            n.isArray(this.options.source) ? (i = this.options.source, this.source = function(t, r) {
                r(n.ui.autocomplete.filter(i, t.term))
            }) : "string" == typeof this.options.source ? (r = this.options.source, this.source = function(i, u) {
                t.xhr && t.xhr.abort();
                t.xhr = n.ajax({
                    url: r,
                    data: i,
                    dataType: "json",
                    success: function(n) {
                        u(n)
                    },
                    error: function() {
                        u([])
                    }
                })
            }) : this.source = this.options.source
        },
        _searchTimeout: function(n) {
            clearTimeout(this.searching);
            this.searching = this._delay(function() {
                this.term !== this._value() && (this.selectedItem = null, this.search(null, n))
            }, this.options.delay)
        },
        search: function(n, t) {
            return n = null != n ? n : this._value(), this.term = this._value(), n.length < this.options.minLength ? this.close(t) : this._trigger("search", t) !== !1 ? this._search(n) : undefined
        },
        _search: function(n) {
            this.pending++;
            this.element.addClass("ui-autocomplete-loading");
            this.cancelSearch = !1;
            this.source({
                term: n
            }, this._response())
        },
        _response: function() {
            var t = ++this.requestIndex;
            return n.proxy(function(n) {
                t === this.requestIndex && this.__response(n);
                this.pending--;
                this.pending || this.element.removeClass("ui-autocomplete-loading")
            }, this)
        },
        __response: function(n) {
            n && (n = this._normalize(n));
            this._trigger("response", null, {
                content: n
            });
            !this.options.disabled && n && n.length && !this.cancelSearch ? (this._suggest(n), this._trigger("open")) : this._close()
        },
        close: function(n) {
            this.cancelSearch = !0;
            this._close(n)
        },
        _close: function(n) {
            this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", n))
        },
        _change: function(n) {
            this.previous !== this._value() && this._trigger("change", n, {
                item: this.selectedItem
            })
        },
        _normalize: function(t) {
            return t.length && t[0].label && t[0].value ? t : n.map(t, function(t) {
                return "string" == typeof t ? {
                    label: t,
                    value: t
                } : n.extend({
                    label: t.label || t.value,
                    value: t.value || t.label
                }, t)
            })
        },
        _suggest: function(t) {
            var i = this.menu.element.empty();
            this._renderMenu(i, t);
            this.isNewMenu = !0;
            this.menu.refresh();
            i.show();
            this._resizeMenu();
            i.position(n.extend({
                of: this.element
            }, this.options.position));
            this.options.autoFocus && this.menu.next()
        },
        _resizeMenu: function() {
            var n = this.menu.element;
            n.outerWidth(Math.max(n.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function(t, i) {
            var r = this;
            n.each(i, function(n, i) {
                r._renderItemData(t, i)
            })
        },
        _renderItemData: function(n, t) {
            return this._renderItem(n, t).data("ui-autocomplete-item", t)
        },
        _renderItem: function(t, i) {
            return n("<li>").append(n("<a>").text(i.label)).appendTo(t)
        },
        _move: function(n, t) {
            return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(n) || this.menu.isLastItem() && /^next/.test(n) ? (this._value(this.term), this.menu.blur(), undefined) : (this.menu[n](t), undefined) : (this.search(null, t), undefined)
        },
        widget: function() {
            return this.menu.element
        },
        _value: function() {
            return this.valueMethod.apply(this.element, arguments)
        },
        _keyEvent: function(n, t) {
            (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(n, t), t.preventDefault())
        }
    });
    n.extend(n.ui.autocomplete, {
        escapeRegex: function(n) {
            return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        },
        filter: function(t, i) {
            var r = RegExp(n.ui.autocomplete.escapeRegex(i), "i");
            return n.grep(t, function(n) {
                return r.test(n.label || n.value || n)
            })
        }
    });
    n.widget("ui.autocomplete", n.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function(n) {
                    return n + (n > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                }
            }
        },
        __response: function(n) {
            var t;
            this._superApply(arguments);
            this.options.disabled || this.cancelSearch || (t = n && n.length ? this.options.messages.results(n.length) : this.options.messages.noResults, this.liveRegion.text(t))
        }
    })
}(jQuery),
function(n) {
    n.widget("ui.menu", {
        version: "1.10.4",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-carat-1-e"
            },
            menus: "ul",
            position: {
                my: "left top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function() {
            this.activeMenu = this.element;
            this.mouseHandled = !1;
            this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            }).bind("click" + this.eventNamespace, n.proxy(function(n) {
                this.options.disabled && n.preventDefault()
            }, this));
            this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true");
            this._on({
                "mousedown .ui-menu-item > a": function(n) {
                    n.preventDefault()
                },
                "click .ui-state-disabled > a": function(n) {
                    n.preventDefault()
                },
                "click .ui-menu-item:has(a)": function(t) {
                    var i = n(t.target).closest(".ui-menu-item");
                    !this.mouseHandled && i.not(".ui-state-disabled").length && (this.select(t), t.isPropagationStopped() || (this.mouseHandled = !0), i.has(".ui-menu").length ? this.expand(t) : !this.element.is(":focus") && n(this.document[0].activeElement).closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                },
                "mouseenter .ui-menu-item": function(t) {
                    var i = n(t.currentTarget);
                    i.siblings().children(".ui-state-active").removeClass("ui-state-active");
                    this.focus(t, i)
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function(n, t) {
                    var i = this.active || this.element.children(".ui-menu-item").eq(0);
                    t || this.focus(n, i)
                },
                blur: function(t) {
                    this._delay(function() {
                        n.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(t)
                    })
                },
                keydown: "_keydown"
            });
            this.refresh();
            this._on(this.document, {
                click: function(t) {
                    n(t.target).closest(".ui-menu").length || this.collapseAll(t);
                    this.mouseHandled = !1
                }
            })
        },
        _destroy: function() {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show();
            this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
                var t = n(this);
                t.data("ui-menu-submenu-carat") && t.remove()
            });
            this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
        },
        _keydown: function(t) {
            function o(n) {
                return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            }
            var i, f, r, e, u, s = !0;
            switch (t.keyCode) {
                case n.ui.keyCode.PAGE_UP:
                    this.previousPage(t);
                    break;
                case n.ui.keyCode.PAGE_DOWN:
                    this.nextPage(t);
                    break;
                case n.ui.keyCode.HOME:
                    this._move("first", "first", t);
                    break;
                case n.ui.keyCode.END:
                    this._move("last", "last", t);
                    break;
                case n.ui.keyCode.UP:
                    this.previous(t);
                    break;
                case n.ui.keyCode.DOWN:
                    this.next(t);
                    break;
                case n.ui.keyCode.LEFT:
                    this.collapse(t);
                    break;
                case n.ui.keyCode.RIGHT:
                    this.active && !this.active.is(".ui-state-disabled") && this.expand(t);
                    break;
                case n.ui.keyCode.ENTER:
                case n.ui.keyCode.SPACE:
                    this._activate(t);
                    break;
                case n.ui.keyCode.ESCAPE:
                    this.collapse(t);
                    break;
                default:
                    s = !1;
                    f = this.previousFilter || "";
                    r = String.fromCharCode(t.keyCode);
                    e = !1;
                    clearTimeout(this.filterTimer);
                    r === f ? e = !0 : r = f + r;
                    u = RegExp("^" + o(r), "i");
                    i = this.activeMenu.children(".ui-menu-item").filter(function() {
                        return u.test(n(this).children("a").text())
                    });
                    i = e && -1 !== i.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : i;
                    i.length || (r = String.fromCharCode(t.keyCode), u = RegExp("^" + o(r), "i"), i = this.activeMenu.children(".ui-menu-item").filter(function() {
                        return u.test(n(this).children("a").text())
                    }));
                    i.length ? (this.focus(t, i), i.length > 1 ? (this.previousFilter = r, this.filterTimer = this._delay(function() {
                        delete this.previousFilter
                    }, 1e3)) : delete this.previousFilter) : delete this.previousFilter
            }
            s && t.preventDefault()
        },
        _activate: function(n) {
            this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(n) : this.select(n))
        },
        refresh: function() {
            var t, r = this.options.icons.submenu,
                i = this.element.find(this.options.menus);
            this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length);
            i.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function() {
                var t = n(this),
                    i = t.prev("a"),
                    u = n("<span>").addClass("ui-menu-icon ui-icon " + r).data("ui-menu-submenu-carat", !0);
                i.attr("aria-haspopup", "true").prepend(u);
                t.attr("aria-labelledby", i.attr("id"))
            });
            t = i.add(this.element);
            t.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
                tabIndex: -1,
                role: this._itemRole()
            });
            t.children(":not(.ui-menu-item)").each(function() {
                var t = n(this);
                /[^\-\u2014\u2013\s]/.test(t.text()) || t.addClass("ui-widget-content ui-menu-divider")
            });
            t.children(".ui-state-disabled").attr("aria-disabled", "true");
            this.active && !n.contains(this.element[0], this.active[0]) && this.blur()
        },
        _itemRole: function() {
            return {
                menu: "menuitem",
                listbox: "option"
            }[this.options.role]
        },
        _setOption: function(n, t) {
            "icons" === n && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(t.submenu);
            this._super(n, t)
        },
        focus: function(n, t) {
            var i, r;
            this.blur(n, n && "focus" === n.type);
            this._scrollIntoView(t);
            this.active = t.first();
            r = this.active.children("a").addClass("ui-state-focus");
            this.options.role && this.element.attr("aria-activedescendant", r.attr("id"));
            this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active");
            n && "keydown" === n.type ? this._close() : this.timer = this._delay(function() {
                this._close()
            }, this.delay);
            i = t.children(".ui-menu");
            i.length && n && /^mouse/.test(n.type) && this._startOpening(i);
            this.activeMenu = t.parent();
            this._trigger("focus", n, {
                item: t
            })
        },
        _scrollIntoView: function(t) {
            var e, o, i, r, u, f;
            this._hasScroll() && (e = parseFloat(n.css(this.activeMenu[0], "borderTopWidth")) || 0, o = parseFloat(n.css(this.activeMenu[0], "paddingTop")) || 0, i = t.offset().top - this.activeMenu.offset().top - e - o, r = this.activeMenu.scrollTop(), u = this.activeMenu.height(), f = t.height(), 0 > i ? this.activeMenu.scrollTop(r + i) : i + f > u && this.activeMenu.scrollTop(r + i - u + f))
        },
        blur: function(n, t) {
            t || clearTimeout(this.timer);
            this.active && (this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", n, {
                item: this.active
            }))
        },
        _startOpening: function(n) {
            clearTimeout(this.timer);
            "true" === n.attr("aria-hidden") && (this.timer = this._delay(function() {
                this._close();
                this._open(n)
            }, this.delay))
        },
        _open: function(t) {
            var i = n.extend({
                of: this.active
            }, this.options.position);
            clearTimeout(this.timer);
            this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true");
            t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
        },
        collapseAll: function(t, i) {
            clearTimeout(this.timer);
            this.timer = this._delay(function() {
                var r = i ? this.element : n(t && t.target).closest(this.element.find(".ui-menu"));
                r.length || (r = this.element);
                this._close(r);
                this.blur(t);
                this.activeMenu = r
            }, this.delay)
        },
        _close: function(n) {
            n || (n = this.active ? this.active.parent() : this.element);
            n.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
        },
        collapse: function(n) {
            var t = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            t && t.length && (this._close(), this.focus(n, t))
        },
        expand: function(n) {
            var t = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
            t && t.length && (this._open(t.parent()), this._delay(function() {
                this.focus(n, t)
            }))
        },
        next: function(n) {
            this._move("next", "first", n)
        },
        previous: function(n) {
            this._move("prev", "last", n)
        },
        isFirstItem: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        isLastItem: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        _move: function(n, t, i) {
            var r;
            this.active && (r = "first" === n || "last" === n ? this.active["first" === n ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[n + "All"](".ui-menu-item").eq(0));
            r && r.length && this.active || (r = this.activeMenu.children(".ui-menu-item")[t]());
            this.focus(i, r)
        },
        nextPage: function(t) {
            var i, r, u;
            return this.active ? (this.isLastItem() || (this._hasScroll() ? (r = this.active.offset().top, u = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
                return i = n(this), 0 > i.offset().top - r - u
            }), this.focus(t, i)) : this.focus(t, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]())), undefined) : (this.next(t), undefined)
        },
        previousPage: function(t) {
            var i, r, u;
            return this.active ? (this.isFirstItem() || (this._hasScroll() ? (r = this.active.offset().top, u = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
                return i = n(this), i.offset().top - r + u > 0
            }), this.focus(t, i)) : this.focus(t, this.activeMenu.children(".ui-menu-item").first())), undefined) : (this.next(t), undefined)
        },
        _hasScroll: function() {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },
        select: function(t) {
            this.active = this.active || n(t.target).closest(".ui-menu-item");
            var i = {
                item: this.active
            };
            this.active.has(".ui-menu").length || this.collapseAll(t, !0);
            this._trigger("select", t, i)
        }
    })
}(jQuery);
window.Modernizr = function(n, t, i) {
        function l(n) {
            c.cssText = n
        }

        function at(n, t) {
            return l(y.join(n + ";") + (t || ""))
        }

        function h(n, t) {
            return typeof n === t
        }

        function v(n, t) {
            return !!~("" + n).indexOf(t)
        }

        function ut(n, t) {
            var u, r;
            for (u in n)
                if (r = n[u], !v(r, "-") && c[r] !== i) return t == "pfx" ? r : !0;
            return !1
        }

        function vt(n, t, r) {
            var f, u;
            for (f in n)
                if (u = t[n[f]], u !== i) return r === !1 ? n[f] : h(u, "function") ? u.bind(r || t) : u;
            return !1
        }

        function f(n, t, i) {
            var r = n.charAt(0).toUpperCase() + n.slice(1),
                u = (n + " " + st.join(r + " ") + r).split(" ");
            return h(t, "string") || h(t, "undefined") ? ut(u, t) : (u = (n + " " + ht.join(r + " ") + r).split(" "), vt(u, t, i))
        }

        function yt() {
            u.input = function(i) {
                for (var r = 0, u = i.length; r < u; r++) w[i[r]] = i[r] in o;
                return w.list && (w.list = !!t.createElement("datalist") && !!n.HTMLDataListElement), w
            }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" "));
            u.inputtypes = function(n) {
                for (var u = 0, r, f, e, h = n.length; u < h; u++) o.setAttribute("type", f = n[u]), r = o.type !== "text", r && (o.value = g, o.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(f) && o.style.WebkitAppearance !== i ? (s.appendChild(o), e = t.defaultView, r = e.getComputedStyle && e.getComputedStyle(o, null).WebkitAppearance !== "textfield" && o.offsetHeight !== 0, s.removeChild(o)) : /^(search|tel)$/.test(f) || (r = /^(url|email)$/.test(f) ? o.checkValidity && o.checkValidity() === !1 : o.value != g)), ct[n[u]] = !!r;
                return ct
            }("search tel url email datetime date month week time datetime-local number range color".split(" "))
        }
        var u = {},
            d = !0,
            s = t.documentElement,
            e = "modernizr",
            ft = t.createElement(e),
            c = ft.style,
            o = t.createElement("input"),
            g = ":)",
            et = {}.toString,
            y = " -webkit- -moz- -o- -ms- ".split(" "),
            ot = "Webkit Moz O ms",
            st = ot.split(" "),
            ht = ot.toLowerCase().split(" "),
            p = {
                svg: ""
            },
            r = {},
            ct = {},
            w = {},
            nt = [],
            tt = nt.slice,
            b, a = function(n, i, r, u) {
                var l, a, c, v, f = t.createElement("div"),
                    h = t.body,
                    o = h || t.createElement("body");
                if (parseInt(r, 10))
                    while (r--) c = t.createElement("div"), c.id = u ? u[r] : e + (r + 1), f.appendChild(c);
                return l = ["&#173;", '<style id="s', e, '">', n, "<\/style>"].join(""), f.id = e, (h ? f : o).innerHTML += l, o.appendChild(f), h || (o.style.background = "", o.style.overflow = "hidden", v = s.style.overflow, s.style.overflow = "hidden", s.appendChild(o)), a = i(f, n), h ? f.parentNode.removeChild(f) : (o.parentNode.removeChild(o), s.style.overflow = v), !!a
            },
            pt = function(t) {
                var i = n.matchMedia || n.msMatchMedia,
                    r;
                return i ? i(t).matches : (a("@media " + t + " { #" + e + " { position: absolute; } }", function(t) {
                    r = (n.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle).position == "absolute"
                }), r)
            },
            lt = function() {
                function n(n, u) {
                    u = u || t.createElement(r[n] || "div");
                    n = "on" + n;
                    var f = n in u;
                    return f || (u.setAttribute || (u = t.createElement("div")), u.setAttribute && u.removeAttribute && (u.setAttribute(n, ""), f = h(u[n], "function"), h(u[n], "undefined") || (u[n] = i), u.removeAttribute(n))), u = null, f
                }
                var r = {
                    select: "input",
                    change: "input",
                    submit: "form",
                    reset: "form",
                    error: "img",
                    load: "img",
                    abort: "img"
                };
                return n
            }(),
            it = {}.hasOwnProperty,
            rt, k;
        rt = !h(it, "undefined") && !h(it.call, "undefined") ? function(n, t) {
            return it.call(n, t)
        } : function(n, t) {
            return t in n && h(n.constructor.prototype[t], "undefined")
        };
        Function.prototype.bind || (Function.prototype.bind = function(n) {
            var t = this,
                i, r;
            if (typeof t != "function") throw new TypeError;
            return i = tt.call(arguments, 1), r = function() {
                var f, e, u;
                return this instanceof r ? (f = function() {}, f.prototype = t.prototype, e = new f, u = t.apply(e, i.concat(tt.call(arguments))), Object(u) === u ? u : e) : t.apply(n, i.concat(tt.call(arguments)))
            }, r
        });
        r.flexbox = function() {
            return f("flexWrap")
        };
        r.canvas = function() {
            var n = t.createElement("canvas");
            return !!n.getContext && !!n.getContext("2d")
        };
        r.canvastext = function() {
            return !!u.canvas && !!h(t.createElement("canvas").getContext("2d").fillText, "function")
        };
        r.webgl = function() {
            return !!n.WebGLRenderingContext
        };
        r.touch = function() {
            var i;
            return "ontouchstart" in n || n.DocumentTouch && t instanceof DocumentTouch ? i = !0 : a(["@media (", y.join("touch-enabled),("), e, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(n) {
                i = n.offsetTop === 9
            }), i
        };
        r.geolocation = function() {
            return "geolocation" in navigator
        };
        r.postmessage = function() {
            return !!n.postMessage
        };
        r.websqldatabase = function() {
            return !!n.openDatabase
        };
        r.indexedDB = function() {
            return !!f("indexedDB", n)
        };
        r.hashchange = function() {
            return lt("hashchange", n) && (t.documentMode === i || t.documentMode > 7)
        };
        r.history = function() {
            return !!n.history && !!history.pushState
        };
        r.draganddrop = function() {
            var n = t.createElement("div");
            return "draggable" in n || "ondragstart" in n && "ondrop" in n
        };
        r.websockets = function() {
            return "WebSocket" in n || "MozWebSocket" in n
        };
        r.rgba = function() {
            return l("background-color:rgba(150,255,150,.5)"), v(c.backgroundColor, "rgba")
        };
        r.hsla = function() {
            return l("background-color:hsla(120,40%,100%,.5)"), v(c.backgroundColor, "rgba") || v(c.backgroundColor, "hsla")
        };
        r.multiplebgs = function() {
            return l("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(c.background)
        };
        r.backgroundsize = function() {
            return f("backgroundSize")
        };
        r.borderimage = function() {
            return f("borderImage")
        };
        r.borderradius = function() {
            return f("borderRadius")
        };
        r.boxshadow = function() {
            return f("boxShadow")
        };
        r.textshadow = function() {
            return t.createElement("div").style.textShadow === ""
        };
        r.opacity = function() {
            return at("opacity:.55"), /^0.55$/.test(c.opacity)
        };
        r.cssanimations = function() {
            return f("animationName")
        };
        r.csscolumns = function() {
            return f("columnCount")
        };
        r.cssgradients = function() {
            var n = "background-image:";
            return l((n + "-webkit- ".split(" ").join("gradient(linear,left top,right bottom,from(#9f9),to(white));" + n) + y.join("linear-gradient(left top,#9f9, white);" + n)).slice(0, -n.length)), v(c.backgroundImage, "gradient")
        };
        r.cssreflections = function() {
            return f("boxReflect")
        };
        r.csstransforms = function() {
            return !!f("transform")
        };
        r.csstransforms3d = function() {
            var n = !!f("perspective");
            return n && "webkitPerspective" in s.style && a("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(t) {
                n = t.offsetLeft === 9 && t.offsetHeight === 3
            }), n
        };
        r.csstransitions = function() {
            return f("transition")
        };
        r.fontface = function() {
            var n;
            return a('@font-face {font-family:"font";src:url("https://")}', function(i, r) {
                var f = t.getElementById("smodernizr"),
                    u = f.sheet || f.styleSheet,
                    e = u ? u.cssRules && u.cssRules[0] ? u.cssRules[0].cssText : u.cssText || "" : "";
                n = /src/i.test(e) && e.indexOf(r.split(" ")[0]) === 0
            }), n
        };
        r.generatedcontent = function() {
            var n;
            return a(["#", e, "{font:0/0 a}#", e, ':after{content:"', g, '";visibility:hidden;font:3px/1 a}'].join(""), function(t) {
                n = t.offsetHeight >= 3
            }), n
        };
        r.video = function() {
            var i = t.createElement("video"),
                n = !1;
            try {
                (n = !!i.canPlayType) && (n = new Boolean(n), n.ogg = i.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), n.h264 = i.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), n.webm = i.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""))
            } catch (r) {}
            return n
        };
        r.audio = function() {
            var i = t.createElement("audio"),
                n = !1;
            try {
                (n = !!i.canPlayType) && (n = new Boolean(n), n.ogg = i.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), n.mp3 = i.canPlayType("audio/mpeg;").replace(/^no$/, ""), n.wav = i.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), n.m4a = (i.canPlayType("audio/x-m4a;") || i.canPlayType("audio/aac;")).replace(/^no$/, ""))
            } catch (r) {}
            return n
        };
        r.localstorage = function() {
            try {
                return localStorage.setItem(e, e), localStorage.removeItem(e), !0
            } catch (n) {
                return !1
            }
        };
        r.sessionstorage = function() {
            try {
                return sessionStorage.setItem(e, e), sessionStorage.removeItem(e), !0
            } catch (n) {
                return !1
            }
        };
        r.webworkers = function() {
            return !!n.Worker
        };
        r.applicationcache = function() {
            return !!n.applicationCache
        };
        r.svg = function() {
            return !!t.createElementNS && !!t.createElementNS(p.svg, "svg").createSVGRect
        };
        r.inlinesvg = function() {
            var n = t.createElement("div");
            return n.innerHTML = "<svg/>", (n.firstChild && n.firstChild.namespaceURI) == p.svg
        };
        r.smil = function() {
            return !!t.createElementNS && /SVGAnimate/.test(et.call(t.createElementNS(p.svg, "animate")))
        };
        r.svgclippaths = function() {
            return !!t.createElementNS && /SVGClipPath/.test(et.call(t.createElementNS(p.svg, "clipPath")))
        };
        for (k in r) rt(r, k) && (b = k.toLowerCase(), u[b] = r[k](), nt.push((u[b] ? "" : "no-") + b));
        return u.input || yt(), u.addTest = function(n, t) {
                if (typeof n == "object")
                    for (var r in n) rt(n, r) && u.addTest(r, n[r]);
                else {
                    if (n = n.toLowerCase(), u[n] !== i) return u;
                    t = typeof t == "function" ? t() : t;
                    typeof d != "undefined" && d && (s.className += " " + (t ? "" : "no-") + n);
                    u[n] = t
                }
                return u
            }, l(""), ft = o = null,
            function(n, t) {
                function v(n, t) {
                    var i = n.createElement("p"),
                        r = n.getElementsByTagName("head")[0] || n.documentElement;
                    return i.innerHTML = "x<style>" + t + "<\/style>", r.insertBefore(i.lastChild, r.firstChild)
                }

                function s() {
                    var n = r.elements;
                    return typeof n == "string" ? n.split(" ") : n
                }

                function u(n) {
                    var t = a[n[l]];
                    return t || (t = {}, o++, n[l] = o, a[o] = t), t
                }

                function h(n, r, f) {
                    if (r || (r = t), i) return r.createElement(n);
                    f || (f = u(r));
                    var e;
                    return e = f.cache[n] ? f.cache[n].cloneNode() : b.test(n) ? (f.cache[n] = f.createElem(n)).cloneNode() : f.createElem(n), e.canHaveChildren && !w.test(n) ? f.frag.appendChild(e) : e
                }

                function y(n, r) {
                    if (n || (n = t), i) return n.createDocumentFragment();
                    r = r || u(n);
                    for (var e = r.frag.cloneNode(), f = 0, o = s(), h = o.length; f < h; f++) e.createElement(o[f]);
                    return e
                }

                function p(n, t) {
                    t.cache || (t.cache = {}, t.createElem = n.createElement, t.createFrag = n.createDocumentFragment, t.frag = t.createFrag());
                    n.createElement = function(i) {
                        return r.shivMethods ? h(i, n, t) : t.createElem(i)
                    };
                    n.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + s().join().replace(/\w+/g, function(n) {
                        return t.createElem(n), t.frag.createElement(n), 'c("' + n + '")'
                    }) + ");return n}")(r, t.frag)
                }

                function c(n) {
                    n || (n = t);
                    var f = u(n);
                    return r.shivCSS && !e && !f.hasCSS && (f.hasCSS = !!v(n, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), i || p(n, f), n
                }
                var f = n.html5 || {},
                    w = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    b = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    e, l = "_html5shiv",
                    o = 0,
                    a = {},
                    i, r;
                (function() {
                    try {
                        var n = t.createElement("a");
                        n.innerHTML = "<xyz><\/xyz>";
                        e = "hidden" in n;
                        i = n.childNodes.length == 1 || function() {
                            t.createElement("a");
                            var n = t.createDocumentFragment();
                            return typeof n.cloneNode == "undefined" || typeof n.createDocumentFragment == "undefined" || typeof n.createElement == "undefined"
                        }()
                    } catch (r) {
                        e = !0;
                        i = !0
                    }
                })();
                r = {
                    elements: f.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
                    shivCSS: f.shivCSS !== !1,
                    supportsUnknownElements: i,
                    shivMethods: f.shivMethods !== !1,
                    type: "default",
                    shivDocument: c,
                    createElement: h,
                    createDocumentFragment: y
                };
                n.html5 = r;
                c(t)
            }(this, t), u._version = "2.6.2", u._prefixes = y, u._domPrefixes = ht, u._cssomPrefixes = st, u.mq = pt, u.hasEvent = lt, u.testProp = function(n) {
                return ut([n])
            }, u.testAllProps = f, u.testStyles = a, u.prefixed = function(n, t, i) {
                return t ? f(n, t, i) : f(n, "pfx")
            }, s.className = s.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (d ? " js " + nt.join(" ") : ""), u
    }(this, this.document),
    function(n, t, i) {
        function h(n) {
            return "[object Function]" == y.call(n)
        }

        function c(n) {
            return "string" == typeof n
        }

        function l() {}

        function w(n) {
            return !n || "loaded" == n || "complete" == n || "uninitialized" == n
        }

        function e() {
            var n = a.shift();
            v = 1;
            n ? n.t ? s(function() {
                ("c" == n.t ? u.injectCss : u.injectJs)(n.s, 0, n.a, n.x, n.e, 1)
            }, 0) : (n(), e()) : v = 0
        }

        function ut(n, i, f, h, c, l, y) {
            function k(t) {
                if (!nt && w(p.readyState) && (tt.r = nt = 1, !v && e(), p.onload = p.onreadystatechange = null, t)) {
                    "img" != n && s(function() {
                        g.removeChild(p)
                    }, 50);
                    for (var u in r[i]) r[i].hasOwnProperty(u) && r[i][u].onload()
                }
            }
            var y = y || u.errorTimeout,
                p = t.createElement(n),
                nt = 0,
                b = 0,
                tt = {
                    t: f,
                    s: i,
                    e: c,
                    a: l,
                    x: y
                };
            1 === r[i] && (b = 1, r[i] = []);
            "object" == n ? p.data = i : (p.src = i, p.type = n);
            p.width = p.height = "0";
            p.onerror = p.onload = p.onreadystatechange = function() {
                k.call(this, b)
            };
            a.splice(h, 0, tt);
            "img" != n && (b || 2 === r[i] ? (g.insertBefore(p, d ? null : o), s(k, y)) : r[i].push(p))
        }

        function ft(n, t, i, r, u) {
            return v = 0, t = t || "j", c(n) ? ut("c" == t ? et : nt, n, t, this.i++, i, r, u) : (a.splice(this.i++, 0, n), 1 == a.length && e()), this
        }

        function b() {
            var n = u;
            return n.loader = {
                load: ft,
                i: 0
            }, n
        }
        var f = t.documentElement,
            s = n.setTimeout,
            o = t.getElementsByTagName("script")[0],
            y = {}.toString,
            a = [],
            v = 0,
            k = "MozAppearance" in f.style,
            d = k && !!t.createRange().compareNode,
            g = d ? f : o.parentNode,
            f = n.opera && "[object Opera]" == y.call(n.opera),
            f = !!t.attachEvent && !f,
            nt = k ? "object" : f ? "script" : "img",
            et = f ? "script" : nt,
            tt = Array.isArray || function(n) {
                return "[object Array]" == y.call(n)
            },
            p = [],
            r = {},
            it = {
                timeout: function(n, t) {
                    return t.length && (n.timeout = t[0]), n
                }
            },
            rt, u;
        u = function(n) {
            function a(n) {
                for (var n = n.split("!"), f = p.length, t = n.pop(), e = n.length, t = {
                        url: t,
                        origUrl: t,
                        prefixes: n
                    }, u, r, i = 0; i < e; i++) r = n[i].split("="), (u = it[r.shift()]) && (t = u(t, r));
                for (i = 0; i < f; i++) t = p[i](t);
                return t
            }

            function f(n, t, u, f, e) {
                var o = a(n),
                    s = o.autoCallback;
                o.url.split(".").pop().split("?").shift();
                o.bypass || (t && (t = h(t) ? t : t[n] || t[f] || t[n.split("/").pop().split("?")[0]]), o.instead ? o.instead(n, t, u, f, e) : (r[o.url] ? o.noexec = !0 : r[o.url] = 1, u.load(o.url, o.forceCSS || !o.forceJS && "css" == o.url.split(".").pop().split("?").shift() ? "c" : i, o.noexec, o.attrs, o.timeout), (h(t) || h(s)) && u.load(function() {
                    b();
                    t && t(o.origUrl, e, f);
                    s && s(o.origUrl, e, f);
                    r[o.url] = 2
                })))
            }

            function s(n, t) {
                function a(n, o) {
                    if (n) {
                        if (c(n)) o || (i = function() {
                            var n = [].slice.call(arguments);
                            s.apply(this, n);
                            u()
                        }), f(n, i, t, 0, e);
                        else if (Object(n) === n)
                            for (r in v = function() {
                                    var t = 0,
                                        i;
                                    for (i in n) n.hasOwnProperty(i) && t++;
                                    return t
                                }(), n) n.hasOwnProperty(r) && (!o && !--v && (h(i) ? i = function() {
                                var n = [].slice.call(arguments);
                                s.apply(this, n);
                                u()
                            } : i[r] = function(n) {
                                return function() {
                                    var t = [].slice.call(arguments);
                                    n && n.apply(this, t);
                                    u()
                                }
                            }(s[r])), f(n[r], i, t, r, e))
                    } else o || u()
                }
                var e = !!n.test,
                    o = n.load || n.both,
                    i = n.callback || l,
                    s = i,
                    u = n.complete || l,
                    v, r;
                a(e ? n.yep : n.nope, !!o);
                o && a(o)
            }
            var e, t, o = this.yepnope.loader;
            if (c(n)) f(n, 0, o, 0);
            else if (tt(n))
                for (e = 0; e < n.length; e++) t = n[e], c(t) ? f(t, 0, o, 0) : tt(t) ? u(t) : Object(t) === t && s(t, o);
            else Object(n) === n && s(n, o)
        };
        u.addPrefix = function(n, t) {
            it[n] = t
        };
        u.addFilter = function(n) {
            p.push(n)
        };
        u.errorTimeout = 1e4;
        null == t.readyState && t.addEventListener && (t.readyState = "loading", t.addEventListener("DOMContentLoaded", rt = function() {
            t.removeEventListener("DOMContentLoaded", rt, 0);
            t.readyState = "complete"
        }, 0));
        n.yepnope = b();
        n.yepnope.executeStack = e;
        n.yepnope.injectJs = function(n, i, r, f, h, c) {
            var a = t.createElement("script"),
                v, y, f = f || u.errorTimeout;
            a.src = n;
            for (y in r) a.setAttribute(y, r[y]);
            i = c ? e : i || l;
            a.onreadystatechange = a.onload = function() {
                !v && w(a.readyState) && (v = 1, i(), a.onload = a.onreadystatechange = null)
            };
            s(function() {
                v || (v = 1, i(1))
            }, f);
            h ? a.onload() : o.parentNode.insertBefore(a, o)
        };
        n.yepnope.injectCss = function(n, i, r, u, f, h) {
            var u = t.createElement("link"),
                c, i = h ? e : i || l;
            u.href = n;
            u.rel = "stylesheet";
            u.type = "text/css";
            for (c in r) u.setAttribute(c, r[c]);
            f || (o.parentNode.insertBefore(u, o), s(i, 0))
        }
    }(this, document);
Modernizr.load = function() {
        yepnope.apply(window, [].slice.call(arguments, 0))
    },
    function(n) {
        function r() {
            var n = document.createElement("input"),
                t = "onpaste";
            return n.setAttribute(t, ""), "function" == typeof n[t] ? "paste" : "input"
        }
        var t, u = r() + ".mask",
            i = navigator.userAgent,
            f = /iphone/i.test(i),
            e = /android/i.test(i);
        n.mask = {
            definitions: {
                9: "[0-9]",
                a: "[A-Za-z]",
                "*": "[A-Za-z0-9]"
            },
            dataName: "rawMaskFn",
            placeholder: "_"
        };
        n.fn.extend({
            caret: function(n, t) {
                var i;
                if (0 !== this.length && !this.is(":hidden")) return "number" == typeof n ? (t = "number" == typeof t ? t : n, this.each(function() {
                    this.setSelectionRange ? this.setSelectionRange(n, t) : this.createTextRange && (i = this.createTextRange(), i.collapse(!0), i.moveEnd("character", t), i.moveStart("character", n), i.select())
                })) : (this[0].setSelectionRange ? (n = this[0].selectionStart, t = this[0].selectionEnd) : document.selection && document.selection.createRange && (i = document.selection.createRange(), n = 0 - i.duplicate().moveStart("character", -1e5), t = n + i.text.length), {
                    begin: n,
                    end: t
                })
            },
            unmask: function() {
                return this.trigger("unmask")
            },
            mask: function(i, r) {
                var a, l, o, h, c, s;
                return !i && this.length > 0 ? (a = n(this[0]), a.data(n.mask.dataName)()) : (r = n.extend({
                    placeholder: n.mask.placeholder,
                    completed: null
                }, r), l = n.mask.definitions, o = [], h = s = i.length, c = null, n.each(i.split(""), function(n, t) {
                    "?" == t ? (s--, h = n) : l[t] ? (o.push(RegExp(l[t])), null === c && (c = o.length - 1)) : o.push(null)
                }), this.trigger("unmask").each(function() {
                    function y(n) {
                        for (; s > ++n && !o[n];);
                        return n
                    }

                    function g(n) {
                        for (; --n >= 0 && !o[n];);
                        return n
                    }

                    function d(n, t) {
                        var u, i;
                        if (!(0 > n)) {
                            for (u = n, i = y(t); s > u; u++)
                                if (o[u]) {
                                    if (!(s > i && o[u].test(v[i]))) break;
                                    v[u] = v[i];
                                    v[i] = r.placeholder;
                                    i = y(i)
                                }
                            p();
                            a.caret(Math.max(c, n))
                        }
                    }

                    function nt(n) {
                        for (var u, f, t = n, i = r.placeholder; s > t; t++)
                            if (o[t]) {
                                if (u = y(t), f = v[t], v[t] = i, !(s > u && o[u].test(f))) break;
                                i = f
                            }
                    }

                    function tt(n) {
                        var u, i, t, r = n.which;
                        8 === r || 46 === r || f && 127 === r ? (u = a.caret(), i = u.begin, t = u.end, 0 == t - i && (i = 46 !== r ? g(i) : t = y(i - 1), t = 46 === r ? y(t) : t), b(i, t), d(i, t - 1), n.preventDefault()) : 27 == r && (a.val(k), a.caret(0, w()), n.preventDefault())
                    }

                    function it(t) {
                        var u, h, f, c = t.which,
                            i = a.caret();
                        t.ctrlKey || t.altKey || t.metaKey || 32 > c || c && (0 != i.end - i.begin && (b(i.begin, i.end), d(i.begin, i.end - 1)), u = y(i.begin - 1), s > u && (h = String.fromCharCode(c), o[u].test(h) && (nt(u), v[u] = h, p(), f = y(u), e ? setTimeout(n.proxy(n.fn.caret, a, f), 0) : a.caret(f), r.completed && f >= s && r.completed.call(a))), t.preventDefault())
                    }

                    function b(n, t) {
                        for (var i = n; t > i && s > i; i++) o[i] && (v[i] = r.placeholder)
                    }

                    function p() {
                        a.val(v.join(""))
                    }

                    function w(n) {
                        var t, f, i = a.val(),
                            u = -1;
                        for (t = 0, pos = 0; s > t; t++)
                            if (o[t]) {
                                for (v[t] = r.placeholder; pos++ < i.length;)
                                    if (f = i.charAt(pos - 1), o[t].test(f)) {
                                        v[t] = f;
                                        u = t;
                                        break
                                    }
                                if (pos > i.length) break
                            } else v[t] === i.charAt(pos) && t !== h && (pos++, u = t);
                        return n ? p() : h > u + 1 ? (a.val(""), b(0, s)) : (p(), a.val(a.val().substring(0, u + 1))), h ? t : c
                    }
                    var a = n(this),
                        v = n.map(i.split(""), function(n) {
                            if ("?" != n) return l[n] ? r.placeholder : n
                        }),
                        k = a.val();
                    a.data(n.mask.dataName, function() {
                        return n.map(v, function(n, t) {
                            return o[t] && n != r.placeholder ? n : null
                        }).join("")
                    });
                    a.attr("readonly") || a.one("unmask", function() {
                        a.unbind(".mask").removeData(n.mask.dataName)
                    }).bind("focus.mask", function() {
                        clearTimeout(t);
                        var n;
                        k = a.val();
                        n = w();
                        t = setTimeout(function() {
                            p();
                            n == i.length ? a.caret(0, n) : a.caret(n)
                        }, 10)
                    }).bind("blur.mask", function() {
                        w();
                        a.val() != k && a.change()
                    }).bind("keydown.mask", tt).bind("keypress.mask", it).bind(u, function() {
                        setTimeout(function() {
                            var n = w(!0);
                            a.caret(n);
                            r.completed && n == a.val().length && r.completed.call(a)
                        }, 0)
                    });
                    w()
                }))
            }
        })
    }(jQuery);
//$(function() {
//    $(document).on("copy paste cut contextmenu drag drop dragstart", function(n) {
//        for (var i = [], r = event.currentTarget.activeElement.className.split(" "), t = 0; t < r.length; t++) r[t] == "ab" && i.push(t);
//        if (i.length > 0) return !0;
//        n.preventDefault()
//    });
//    $("input:text").attr("autocomplete", "off");
//    try {
//        $(".collapsed")[0] != null && $(".collapsed")[0].click()
//    } catch (n) {}
//});
hex_chr = "0123456789abcdef";
Number.prototype.padLeft = function(n, t) {
    var i = String(n || 10).length - String(this).length + 1;
    return i > 0 ? new Array(i).join(t || "0") + this : this
};
numb = "0123456789";
mth = [" ", "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
document.onclick = fInvisibleMenu;
classname = "chk";
StartPosition = 0;
document.onclick = fInvisibleApply