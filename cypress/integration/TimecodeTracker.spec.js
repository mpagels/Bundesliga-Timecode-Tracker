/// <reference types="cypress" />

const mockData = [
  {
    description: 'Mbabu schaltet sich vorne ein, Alaba klärt zur Ecke.',
    timeCode: '3417',
    timeCodeFormated: '34:17',
    timeCodeResult: '00:00:34:17',
  },
]

context('TimeTracker', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.get('a').find('button').first().as('settingButton')
    cy.get('a').find('button').last().as('addButton')
    cy.visit('http://localhost:3000/create')
    cy.get('button').contains('SPEICHERN').as('saveSceneButton')
    cy.visit('http://localhost:3000/')
  })

  it('starts the app and check if renders corrext', () => {
    cy.contains('TIMECODE TRACKER')
    cy.contains('GESAMTLÄNGE')
    cy.contains('00:00:00:00')
    cy.contains('VORGABE')

    cy.contains('FÜGE EINE SZENE HINZU')

    cy.get('nav').contains('1ST').contains('00:00:00:00')
    cy.get('nav').contains('2ND').contains('00:00:00:00')
    cy.get('nav').contains('INTERVIEW').contains('00:00:00:00')
    cy.get('nav').contains('SPECIALS')
    cy.get('nav').contains('INFO')
  })

  it('clicks on setting button and checks if setting page renders correct', () => {
    cy.get('@settingButton').click()
    cy.contains('EINSTELLUNGEN')
    cy.contains('SPIELTAG LÖSCHEN')
    cy.get('nav').contains('1ST').contains('00:00:00:00')
    cy.get('nav').contains('2ND').contains('00:00:00:00')
    cy.get('nav').contains('INTERVIEW').contains('00:00:00:00')
    cy.get('nav').contains('SPECIALS')
    cy.get('nav').contains('INFO')
    cy.get('button').first()
  })

  it('navigate to settings page and clicks on X button', () => {
    cy.get('@settingButton').click()
    cy.get('button').first().click()

    cy.contains('TIMECODE TRACKER')
    cy.contains('GESAMTLÄNGE')
    cy.contains('00:00:00:00')
    cy.contains('VORGABE')

    cy.contains('FÜGE EINE SZENE HINZU')

    cy.get('nav').contains('1ST').contains('00:00:00:00')
    cy.get('nav').contains('2ND').contains('00:00:00:00')
    cy.get('nav').contains('INTERVIEW').contains('00:00:00:00')
    cy.get('nav').contains('SPECIALS')
    cy.get('nav').contains('INFO')
  })

  it('clicks on add button and checks if input page renders correct', () => {
    cy.get('@addButton').click()
    cy.contains('NEUE SZENE HINZUFÜGEN')
    cy.contains('1st')
    cy.contains('2nd')
    cy.contains('Interview')
    cy.contains('Special')
    cy.contains('Neue Szene hinzufügen')
    cy.contains('SZENENLÄNGE')
    cy.contains('Tor')
    cy.contains('Rote Karte')
    cy.contains('SPEICHERN')
    cy.contains('LÖSCHEN')
    cy.get('nav').contains('1ST').contains('00:00:00:00')
    cy.get('nav').contains('2ND').contains('00:00:00:00')
    cy.get('nav').contains('INTERVIEW').contains('00:00:00:00')
    cy.get('nav').contains('SPECIALS')
    cy.get('nav').contains('INFO')
  })

  it.only('adds a sequence with no event for the first halftime', () => {
    cy.get('@addButton').click()
    cy.contains('1st').click()
    cy.get('label').contains('Neue Szene hinzufügen').click()
    cy.get('textarea').should('have.focus').type(mockData[0].description)
    cy.get('label').contains('SZENENLÄNGE').click()
    cy.get('input')
      .last()
      .should('have.focus')
      .type(mockData[0].timeCode)
      .should('have.value', mockData[0].timeCodeFormated)
    cy.get('@saveSceneButton').click()
  })
})
