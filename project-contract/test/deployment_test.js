const GPAToken= artifacts.require("GPAToken");
const UniversityToken = artifacts.require("UniversityToken");
const DiplomaCertificate = artifacts.require("DiplomaCertificate");



contract("University Contract Address Setting", (accounts) => {
  it("should set the correct UniversityToken address in GPAToken", async () => {
    const gpaTokenInstance = await GPAToken.deployed();
    const universityTokenInstance = await UniversityToken.deployed();

    const setUniversityAddress = await gpaTokenInstance.getUniversityAddress();
    assert.equal(setUniversityAddress, universityTokenInstance.address, "The UniversityToken address in GPAToken is incorrect");
  });

  it("should set the correct UniversityToken address in DiplomaCertificate", async () => {
    const diplomaCertificateInstance = await DiplomaCertificate.deployed();
    const universityTokenInstance = await UniversityToken.deployed();

    const setUniversityAddress = await diplomaCertificateInstance.getUniversityAddress();
    assert.equal(setUniversityAddress, universityTokenInstance.address, "The UniversityToken address in DiplomaCertificate is incorrect");
  });

  it("check whether diploma certificate and gpatoken are set correctly ", async () => {
    const diplomaCertificateInstance = await DiplomaCertificate.deployed();
    const gpaTokenInstance = await GPAToken.deployed();
    const universityTokenInstance = await UniversityToken.deployed();

    const GpaTokenAddress = await universityTokenInstance.getGpaTokenAddress();
    const DiplomaUniversityAddress = await universityTokenInstance.getDiplomaCertificateAddress();

    assert.equal(DiplomaUniversityAddress, diplomaCertificateInstance.address, "DiplomaCertificate address not set correctly in UniversityToken");
    assert.equal(GpaTokenAddress, gpaTokenInstance.address, "Gpa Token Address not set correctly in UniversityToken");
  });


});