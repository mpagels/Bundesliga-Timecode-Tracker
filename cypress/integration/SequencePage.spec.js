/// <reference types="cypress" />

const mockData = [
  {
    description: 'Mbabu schaltet sich vorne ein, Alaba klärt zur Ecke.',
    timeCode: '3417',
    timeCodeResult: '00:00:34:17',
  },
  {
    description:
      'Goretzka chippt auf Müller, dessen Kopfballbogenlampe aufs Tordach fliegt.',
    timeCode: '004708',
    timeCodeResult: '00:01:22:00',
  },
  {
    description: 'Freistoß aus 25 Metern zentraler Position. Neuer hält.',
    timeCode: '3214',
    timeCodeResult: '00:01:54:14',
  },
  {
    description: 'Lewandowski, der auf das kurze Eck schießt Casteels pariert.',
    timeCode: '002822',
    timeCodeResult: '00:02:23:11',
  },
]

context('SequencePage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('tests description and timecode input and correct addition after every save', () => {
    mockData.forEach((data, index) => {
      cy.get('textarea')
        .type(data.description)
        .should('have.value', data.description)
      cy.get('input').type(data.timeCode).should('have.value', data.timeCode)
      cy.get('button').eq(1).click()
      cy.get('footer').should('contain', data.timeCodeResult)
    })
  })

  it('tests a complete empty save try', () => {
    cy.get('button').eq(1).click()
    cy.get('span').eq(0).should('contain', 'Szenenbeschreibung fehlt')
    cy.get('span').eq(-1).should('contain', 'Timecode fehlt oder Fehlerhaft')
  })

  it('tests if the error message appears if only the textarea is empty', () => {
    cy.get('input')
      .type(mockData[0].timeCode)
      .should('have.value', mockData[0].timeCode)
    cy.get('button').eq(1).click()
    cy.get('span').eq(0).should('contain', 'Szenenbeschreibung fehlt')
  })

  it('tests if the error message appears if only the input is empty', () => {
    cy.get('textarea')
      .type(mockData[0].description)
      .should('have.value', mockData[0].description)
    cy.get('button').eq(1).click()
    cy.get('span').eq(-1).should('contain', 'Timecode fehlt oder Fehlerhaft')
  })

  it('tests when at first the timecode input was forgotten, then filled with timecode and saved', () => {
    cy.get('textarea')
      .type(mockData[0].description)
      .should('have.value', mockData[0].description)
    cy.get('button').eq(1).click()
    cy.get('span').eq(-1).should('contain', 'Timecode fehlt oder Fehlerhaft')
    cy.get('input')
      .type(mockData[0].timeCode)
      .should('have.value', mockData[0].timeCode)
    cy.get('span').eq(-1).should('not.contain', 'Szenenbeschreibung fehlt')
    cy.get('button').eq(1).click()
    cy.get('footer').should('contain', mockData[0].timeCodeResult)
  })

  it('tests when at first the textarea input was forgotten, then filled with timecode and saved', () => {
    cy.get('input')
      .type(mockData[0].timeCode)
      .should('have.value', mockData[0].timeCode)
    cy.get('button').eq(1).click()
    cy.get('span').eq(0).should('contain', 'Szenenbeschreibung fehlt')
    cy.get('textarea')
      .type(mockData[0].description)
      .should('have.value', mockData[0].description)
    cy.get('span').eq(-1).should('not.contain', 'Szenenbeschreibung fehlt')
    cy.get('button').eq(1).click()
    cy.get('footer').should('contain', mockData[0].timeCodeResult)
  })

  it('tests the delete button after an empty save ', () => {
    cy.get('button').eq(1).click()
    cy.get('span').eq(0).should('contain', 'Szenenbeschreibung fehlt')
    cy.get('span').eq(-1).should('contain', 'Timecode fehlt oder Fehlerhaft')
    cy.get('button').eq(0).click()
    cy.get('span').eq(-1).should('not.contain', 'Szenenbeschreibung fehlt')
    cy.get('span').eq(-1).should('not.contain', 'Szenenbeschreibung fehlt')
  })

  it('tests input description and timecode and then delete all ', () => {
    cy.get('textarea')
      .type(mockData[0].description)
      .should('have.value', mockData[0].description)
    cy.get('input')
      .type(mockData[0].timeCode)
      .should('have.value', mockData[0].timeCode)
    cy.get('button').eq(0).click()
    cy.get('textarea').should('not.have.value')
    cy.get('input').should('not.have.value')
  })

  it('tests if the error message appears, when textarea is filled with "Enter" value ', () => {
    cy.get('textarea').type('{enter}{enter}{enter}')
    cy.get('input').type(mockData[0].timeCode)
    cy.get('button').eq(1).click()
    cy.get('span').eq(0).should('contain', 'Szenenbeschreibung fehlt')
  })
})
