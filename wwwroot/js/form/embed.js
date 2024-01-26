$(document).ready(function () {
  let selectedSelects = $(
    'select[id="district"], select[id="preDistrict"], select[id="perDistrict"]'
  );

  // To update Tehsils based on District
  selectedSelects.each(function () {
    $(this).on("change", function () {
      var id = $(this).attr("id");
      var selectedValue = $(this).val();
      const selectTehsil =
        id == "district"
          ? "#tehsil"
          : id == "preDistrict"
          ? "#preTehsil"
          : "#perTehsil";
      $(selectTehsil).empty();
      $(selectTehsil).append(
        `<option value="Please Select">Please Select</option>`
      );
      selectedValue !== "Please Select" &&
        Tehsil[selectedValue].map((item) =>
          $(selectTehsil).append(`<option value="${item}">${item}</option>`)
        );
    });
  });

  //  To update pension type
  $("#pensionType").change(function () {
    let selectedValue = $(this).val();
    if (selectedValue == "TRANSGENDER PERSON") {
      $("#genderContainer").empty();
      $("#genderContainer").append(
        `<p class="d-flex gap-2"><input type="radio" name="gender" value="transgender" />TRANSGENDER</p>`
      );
    } else if (selectedValue == "WOMEN IN DISTRESS") {
      $("#genderContainer").empty();
      $("#genderContainer").append(
        `<p class="d-flex gap-2"><input type="radio" name="gender" value="female" />FEMALE</p>`
      );
    } else {
      $("#genderContainer").empty();
      $("#genderContainer").append(
        ` <p class="d-flex gap-2"><input type="radio" name="gender" value="male" />MALE</p>
          <p class="d-flex gap-2"><input type="radio" name="gender" value="female" />FEMALE</p>`
      );
    }
    $("#pensionTypeContent").empty();
    if (PensionType.hasOwnProperty(selectedValue)) {
      const type = PensionType[selectedValue];

      type.map((item) => {
        for (value in item) {
          if (value != "id") {
            $("#pensionTypeContent").append(`
            <div class="col-sm-6 fw-bold d-flex gap-2">
              <p>${value}</p>
              <p class="text-danger ">*</p>
            </div>
          `);
            if (Array.isArray(item[value])) {
              let Options = "";
              item[value].map(
                (a) => (Options += ` <option value=${a}>${a}</option>`)
              );
              $("#pensionTypeContent").append(`
                <div class="col-sm-6">
                  <select class="form-select" name=${item["id"]} id=${item["id"]} required>
                    <option value="Please Select">
                      Please Select
                    </option>
                    ${Options}
                  </select>
                </div>
              `);
            } else {
              $("#pensionTypeContent").append(`
                <div class="col-sm-6">
                  <input type="text" class="form-control" name=${item["id"]} id=${item["id"]} />
                </div>
              `);
            }
          }
        }
      });
    }
  });

  // to copy the present address to permanent address
  $("#isPresent").change(function () {
    if ($(this).prop("checked")) {
      $("#perAddress").val($("#preAddress").val());
      $("#perDistrict").val($("#preDistrict").val());
      $("#perDistrict").trigger("change"); // to trigger and populate the tehsil select tag
      $("#perTehsil").val($("#preTehsil").val());
      $("#perBlock").val($("#preBlock").val());
      $("#perMuncipality").val($("#preMuncipality").val());
      $("#perVillage").val($("#preVillage").val());
      $("#perWard").val($("#preWard").val());
      $("#perPincode").val($("#prePincode").val());
    } else {
      $("#perAddress").val("");
      $("#perDistrict").val("Please Select");
      $("#perBlock").val("");
      $("#perMuncipality").val("");
      $("#perVillage").val("");
      $("#perWard").val("");
      $("#perPincode").val("");
      $("#perDistrict").trigger("change"); // to trigger and empty the tehsil select tag
    }
  });

  // to set age
  $("#dob").change(function () {
    const dob = new Date($(this).val());
    const currentDate = new Date();

    const timeDifference = currentDate - dob;

    const ageInYears = Math.floor(
      timeDifference / (365.25 * 24 * 60 * 60 * 1000)
    );

    $("#age").val(ageInYears);
  });

  $("#isPreviousBank").change(function () {
    if ($(this).val() == "YES") {
      $("#previousBank").empty();
      let input = ``;

      previousBank.map((item) => {
        for (let element in item) {
          if (element != "id") {
            if (Array.isArray(item[element])) {
              let Options = "";
              item[element].map(
                (item) =>
                  (Options += `<option value="${item}">${item}</option>`)
              );
              input += `
                  <select class="form-select" id=${item["id"]} name="${item["id"]}">
                    <option value="Please Select">Please Select</option>
                    ${Options}
                  </select>
                `;
            } else {
              input = `<input class="form-control" id="${item["id"]}" name="${item["id"]}" />`;
            }
            $("#previousBank").append(`
              <div class="row mt-1">
                <div class="col-sm-6 fw-bold d-flex gap-2">
                  <label class="form-label" for="bank name">${element}</label>
                  <p class="text-danger ">*</p>
                </div>
                <div class="col-sm-6">
                  ${input}
                </div>
              </div>
            `);
          }
        }
      });
    } else $("#previousBank").empty();
  });

  // form submission
  $("#pensionForm").submit(function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const formObject = {};

    formData.forEach(function (value, key) {
      if (value instanceof File && value.size === 0) {
        formObject[key] = "";
      } else {
        formObject[key] = value;
      }
    });

    if (!formObject.hasOwnProperty("gender")) {
      formObject["gender"] = "";
    }

    if (!formObject.hasOwnProperty("category")) {
      formObject["category"] = "";
    }

    if (!formObject.hasOwnProperty("agree")) {
      formObject["agree"] = "";
    }

    let result = true;
    for (let key in formObject) {
      if (formObject[key] == "" || formObject[key] == "Please Select") {
        result = false;
        setErrorSpan(key, "This field is required");
      }
    }

    const jsonData = JSON.stringify(formObject);

    const postData = { data: jsonData };

    // Use AJAX to send the object to the server
    if (result) {
      $.ajax({
        type: "POST",
        url: "/Home/FormData", // Replace with your actual controller and action
        data: postData,
        success: function () {
          window.location.href = "/Home/Result"; // Redirect to the second page
        },
        error: function (error) {
          console.log(error);
        },
      });
    }
  });

  //key press error check
  $("input").on("input", function (event) {
    const id = $(this).attr("id");

    // Get the last character from the input
    const lastChar = $(this).val().slice(-1);

    // Check if the last character is a lowercase letter
    if (
      /[a-z]/.test(lastChar) &&
      id != "email" &&
      id != "number" &&
      id != "prePincode" &&
      id != "perPincode" &&
      id != "accNumber"
    ) {
      // Convert the last character to uppercase
      const updatedValue = $(this).val().slice(0, -1) + lastChar.toUpperCase();
      $(this).val(updatedValue);
    }

    if ($("#" + id + "Msg").length) {
      CheckErrors.call(this);
    }
  });

  // blur error check
  $("input").blur(function () {
    CheckErrors.call(this);
  });

  $("select").change(function () {
    CheckErrors.call(this);
  });

  $("#pensionTypeContent").on("change", "select", function () {
    CheckErrors.call(this);
  });
});
