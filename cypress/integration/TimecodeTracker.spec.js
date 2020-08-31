/// <reference types="cypress" />

context('TimeTracker', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('tests all timecode inputs and correct addition', () => {
    cy.get('input[id=0]').type('53000').should('have.value', '53000')
    cy.get('[class^="TimecodeResult__"]').eq(0).should('contain', '00:05:30:00')
    cy.get('[class^="TimecodeResult__"]')
      .eq(-1)
      .should('contain', '00:05:30:00')

    cy.get('input[id=1]').type('21524').should('have.value', '21524')
    cy.get('[class^="TimecodeResult__"]').eq(0).should('contain', '00:07:45:24')
    cy.get('[class^="TimecodeResult__"]')
      .eq(-1)
      .should('contain', '00:07:45:24')

    cy.get('input[id=2]').type('2516').should('have.value', '2516')
    cy.get('[class^="TimecodeResult__"]').eq(0).should('contain', '00:07:45:24')
    cy.get('[class^="TimecodeResult__"]')
      .eq(-1)
      .should('contain', '00:08:11:15')
  })
})
