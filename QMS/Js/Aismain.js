$(function() {
        $(document).on("copy paste cut contextmenu drag drop dragstart", function(n) {
            for (var i = [], r = event.currentTarget.activeElement.className.split(" "), t = 0; t < r.length; t++) r[t] == "ab" && i.push(t);
            if (i.length > 0) return !0;
            n.preventDefault()
        });
        $("input:text").attr("autocomplete", "off");
        try {
            $(".collapsed")[0] != null && $(".collapsed")[0].click()
        } catch (n) {}
    });
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}
