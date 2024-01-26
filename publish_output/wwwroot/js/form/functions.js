function setErrorSpan(id, msg) {
  if ($("#" + id + "Msg").length) {
    $("#" + id + "Msg").text(msg);
  } else {
    const newSpan = $("<span>")
      .attr({ id: id + "Msg", class: "errorMsg" })
      .text(msg);

    if (id == "gender" || id == "category" || id == "agree") {
      $("#" + id + "Container").append(newSpan);
    } else $("#" + id).after(newSpan);
  }
}

function CheckErrors() {
  const id = $(this).attr("id");
  if ($("#" + id).is("select")) {
    if ($(this).val() == "Please Select") {
      setErrorSpan(id, "This field is required.");
    } else setErrorSpan(id, "");
  } else if ($(this).val().length == 0 && id != "photograph") {
    setErrorSpan(id, "This field is required");
  } else if (id == "name" || id == "guardian") {
    if (!/^[A-Za-z .']+$/.test($(this).val())) {
      setErrorSpan(
        id,
        "Please use letters (a-z, A-Z) and special characters (. and ') only."
      );
    } else setErrorSpan(id, "");
  } else if (
    id == "number" ||
    id == "prePincode" ||
    id == "perPincode" ||
    id == "accNumber"
  ) {
    let maxLenght = 0;
    if (id == "number") maxLenght = 10;
    else if (id == "prePincode" || id == "perPincode") maxLenght = 6;
    else if (id == "accNumber") maxLenght = 16;

    if (!/^\d+$/.test($(this).val())) {
      setErrorSpan(id, "Please enter only digits");
    } else if ($(this).val().length < maxLenght) {
      setErrorSpan(id, `Please enter at least ${maxLenght} characters.`);
    } else {
      setErrorSpan(id, "");
    }
  } else if (
    id !== "preAddress" &&
    id !== "perAddress" &&
    id != "dob" &&
    id != "photograph" &&
    id != "email" &&
    id != "ifcsCode" &&
    id != "agree"
  ) {
    if (!/^[A-Za-z\s]+$/.test($(this).val())) {
      setErrorSpan(id, "Please enter only charater(s).");
    } else if ($(this).val().length < 3) {
      setErrorSpan(id, "Please enter at least 3 character(s).");
    } else setErrorSpan(id, "");
  } else setErrorSpan(id, "");
}
