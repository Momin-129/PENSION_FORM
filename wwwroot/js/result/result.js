function generateTable(data) {
  const {
    name: name,
    dob: dob,
    guardian: guardian,
    number: number,
    email: email,
    pensionType: pensionType,
    bankName: bankName,
    branchName: branchName,
    ifcsCode: ifcsCode,
    accNumber: accNumber,
    preAddress: preAddress,
    preDistrict: preDistrict,
    preTehsil: preTehsil,
    preMuncipality: preMuncipality,
    prePincode: prePincode,
    perAddress: perAddress,
    perDistrict: perDistrict,
    perTehsil: perTehsil,
    perMuncipality: perMuncipality,
    perPincode: perPincode,
  } = data;

  const extractedData = {
    name: name,
    dob: dob,
    guardian: guardian,
    number: number,
    email: email,
    pensionType: pensionType,
    bankName: bankName,
    branchName: branchName,
    ifcsCode: ifcsCode,
    accNumber: accNumber,
    preAddress: preAddress,
    preDistrict: preDistrict,
    preTehsil: preTehsil,
    preMuncipality: preMuncipality,
    prePincode: prePincode,
    perAddress: perAddress,
    perDistrict: perDistrict,
    perTehsil: perTehsil,
    perMuncipality: perMuncipality,
    perPincode: perPincode,
  };

  const tableRow = [
    { "NAME OF APPLICANT": extractedData.name },
    { "DATA OF BIRTH": extractedData.dob },
    { "FATHER/HUSBAND/GUARDIAN": extractedData.guardian },
    { "MOBILE/E-MAIL": extractedData.number + "/" + extractedData.email },
    { "NAME OF PENSION SCHEME (JK-ISSS/ GOI-NSAP)": "JK-ISSS" },
    { "TYPE OF PENSION UNDER ISSS": extractedData.pensionType },
    {
      "BANK NAME/ BRANCH NAME":
        extractedData.bankName + "/" + extractedData.branchName,
    },
    {
      "IFSC CODE/ ACCOUNT NUMBER":
        extractedData.ifcsCode + "/" + extractedData.accNumber,
    },
    {
      "PRESENT ADDRESS":
        extractedData.preAddress +
        ", TEHSIL:" +
        extractedData.preTehsil +
        ",HALQA PANCHAYAT/URBAN AREA:" +
        extractedData.preMuncipality +
        ", DISTRICT:" +
        extractedData.preDistrict +
        ", PIN CODE:" +
        extractedData.prePincode,
    },
    {
      "PERMANENT ADDRESS":
        extractedData.perAddress +
        ", TEHSIL:" +
        extractedData.perTehsil +
        ",HALQA PANCHAYAT/URBAN AREA:" +
        extractedData.perMuncipality +
        ", DISTRICT:" +
        extractedData.perDistrict +
        ", PIN CODE:" +
        extractedData.perPincode,
    },
  ];
  tableRow.map((item) => {
    const key = Object.keys(item)[0];
    const value = Object.values(item)[0];
    $("#tableBody").append(`
      <tr style="border: 2px solid black;">
        <td scope="row" style="border: 2px solid black;">${key}</td>
        <td style="border: 2px solid black;">${value}</td>
      </tr>
    `);
  });
}

function printToPDF() {
  window.print();
}
