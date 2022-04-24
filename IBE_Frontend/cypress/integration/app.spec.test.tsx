describe("Render App page", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Searching Room Result on the basis of checkin, checkout date and number of Room", () => {
    cy.wait(5000);
    cy.get("#propertyField").click();
    cy.get("#propertyField1").click();
    cy.get('#mui-3').click();
    cy.get(':nth-child(1) > .PrivatePickersSlideTransition-root > .css-i6bazn > :nth-child(4) > :nth-child(6) > .MuiDateRangePickerDay-root > .MuiDateRangePickerDay-rangeIntervalPreview > .MuiButtonBase-root > :nth-child(1) > .MuiGrid-container > .MuiTypography-root').click();
    cy.get(':nth-child(5) > :nth-child(7) > .MuiDateRangePickerDay-root > .MuiDateRangePickerDay-rangeIntervalPreview > .MuiButtonBase-root > :nth-child(1) > .MuiGrid-container').click();
    cy.get('.MuiToolbar-root').click();
    cy.get(".MuiToolbar-root > .MuiTypography-root").click();
    cy.get("body").click();
    cy.get("#roomFiled").click();
    cy.get("#room3").click();
    cy.get("#promoField").clear();
    cy.get("#promoField").type("FIRSTSTAY");
    cy.get(".form > .MuiButton-root", { timeout: 5000 }).click();
    cy.url().should(
      "include",
      "checkinDate=2022-04-22T18%3A30%3A00.000Z&checkoutDate=2022-04-30T18%3A30%3A00.000Z"
    );
    cy.get("#roomSearchCOUPLE_SUITE").should("have.text", "COUPLE SUITE");
  });

  it("Should filter RoomType on the Basis of RoomTypeFilter and BedType Filter", () => {
    cy.viewport("macbook-15");
    cy.visit(
      "/search?property=team-1&checkinDate=2022-04-11T18%3A30%3A00.000Z&checkoutDate=2022-04-21T18%3A30%3A00.000Z&guests=%5Bobject+Object%5D&guests=%5Bobject+Object%5D&rateType=&room=3&promocode=undefined&assistSupport=false"
    );
    cy.wait(5000);
    cy.get("#roomTypeFilter").click();
    cy.get("#roomTypeFilter1").click().contains("STANDARD_SUITE").click();
    cy.get("#roomtypeFilterCompSTANDARD_SUITE").click();
    cy.get("#roomtypeFilterCompCOUPLE_SUITE").click();
    cy.get("#roomtypeFilterCompGRAND_DELUXE").click();
    cy.get("#roomSearchCOUPLE_SUITE").should("have.text", "COUPLE SUITE");
    cy.get("#roomSearchSTANDARD_SUITE").should("have.text", "STANDARD SUITE");
    cy.get("#roomSearchGRAND_DELUXE").should("have.text", "GRAND DELUXE");
    cy.get("#bedTypeFilter").click();
    cy.get("#queenBedTypeFilter").click();
    cy.get("#roomSearchGRAND_DELUXE").should("have.text", "GRAND DELUXE");
  });
});
