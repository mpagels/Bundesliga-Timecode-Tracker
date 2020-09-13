/// <reference types="cypress" />

const mockData = [
  {
    description: 'Mbabu schaltet sich vorne ein, Alaba klärt zur Ecke.',
    timeCode: '3417',
    timeCodeFormated: '34:17',
    timeCodeResult: '00:00:34:17',
  },
  {
    description:
      'Goretzka chippt auf Müller, dessen Kopfballbogenlampe aufs Tordach fliegt.',
    timeCode: '004708',
    timeCodeFormated: '00:47:08',
    timeCodeResult: '00:01:22:00',
  },
  {
    description: 'Freistoß aus 25 Metern zentraler Position. Neuer hält.',
    timeCode: '3214',
    timeCodeFormated: '32:14',
    timeCodeResult: '00:01:54:14',
  },
  {
    description: 'Lewandowski, der auf das kurze Eck schießt Casteels pariert.',
    timeCode: '002822',
    timeCodeFormated: '00:28:22',
    timeCodeResult: '00:02:23:11',
  },
]

const mockDataEvent = [
  {
    description:
      'Goretzka chippt auf Müller, dessen Kopfballbogenlampe aufs Tordach fliegt.',
    playerName: 'Goretzka',
    timeCode: '3215',
    timeCodeFormated: '32:15',
    timeCodeLowerThirdIn: '1500',
    timeCodeLowerThirdInFormatted: '15:00',
    timeCodeLowerThirdLength: '0800',
    timeCodeLowerThirdLengthFormatted: '08:00',
    timeCodeResult: '00:00:32:15',
    lowerThirdInResult: '00:00:15:00',
    lowerThirdLength: '00:00:08:00',
  },
]

context('SequencePage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.contains('SPEICHERN').as('saveButton')
    cy.contains('ABBRECHEN').as('cancelButton')
  })

  it('tests description and timecode input and correct addition after every save', () => {
    mockData.forEach((data, index) => {
      cy.get('textarea')
        .type(data.description)
        .should('have.value', data.description)
      cy.get('input')
        .type(data.timeCode)
        .should('have.value', data.timeCodeFormated)
      cy.get('@saveButton').click()
      cy.get('footer').should('contain', data.timeCodeResult)
    })
  })

  it('tests description and timecode input and correct addition after every save, then deactivate the first sequence', () => {
    mockData.forEach((data, index) => {
      cy.get('textarea')
        .type(data.description)
        .should('have.value', data.description)
      cy.get('input')
        .type(data.timeCode)
        .should('have.value', data.timeCodeFormated)
      cy.get('@saveButton').click()
      cy.get('footer').should('contain', data.timeCodeResult)
    })
    cy.get('[data-cy=playPauseButton]').first().click()
    cy.get('footer').should('contain', '00:01:48:19')
  })

  it('tests a complete empty save try', () => {
    cy.get('@saveButton').click()
    cy.get('span').first().should('contain', 'Szenenbeschreibung fehlt')
    cy.get('span')
      .last()
      .should('contain', 'Timecode fehlt oder ist fehlerhaft')
  })

  it('tests if the error message appears if only the textarea is empty', () => {
    cy.get('input')
      .type(mockData[0].timeCode)
      .should('have.value', mockData[0].timeCodeFormated)
    cy.get('button').eq(-1).click()
    cy.get('span').eq(0).should('contain', 'Szenenbeschreibung fehlt')
  })

  it('tests if the error message appears if only the input is empty', () => {
    cy.get('textarea')
      .type(mockData[0].description)
      .should('have.value', mockData[0].description)
    cy.get('@saveButton').click()
    cy.get('span')
      .last()
      .should('contain', 'Timecode fehlt oder ist fehlerhaft')
  })

  it('tests when at first the timecode input was forgotten, then filled with timecode and saved', () => {
    cy.get('textarea')
      .type(mockData[0].description)
      .should('have.value', mockData[0].description)
    cy.get('@saveButton').click()
    cy.get('span')
      .last()
      .should('contain', 'Timecode fehlt oder ist fehlerhaft')
    cy.get('input')
      .type(mockData[0].timeCode)
      .should('have.value', mockData[0].timeCodeFormated)
    cy.get('span').last().should('not.contain', 'Szenenbeschreibung fehlt')
    cy.get('@saveButton').click()
    cy.get('footer').should('contain', mockData[0].timeCodeResult)
  })

  it('tests when at first the textarea input was forgotten, then filled with timecode and saved', () => {
    cy.get('input')
      .type(mockData[0].timeCode)
      .should('have.value', mockData[0].timeCodeFormated)
    cy.get('@saveButton').click()
    cy.get('span').eq(0).should('contain', 'Szenenbeschreibung fehlt')
    cy.get('textarea')
      .type(mockData[0].description)
      .should('have.value', mockData[0].description)
    cy.get('span').last().should('not.contain', 'Szenenbeschreibung fehlt')
    cy.get('@saveButton').click()
    cy.get('footer').should('contain', mockData[0].timeCodeResult)
  })

  it('tests the delete button after an empty save ', () => {
    cy.get('@saveButton').click()
    cy.get('span').first().should('contain', 'Szenenbeschreibung fehlt')
    cy.get('span')
      .last()
      .should('contain', 'Timecode fehlt oder ist fehlerhaft')
    cy.get('@cancelButton').click()
    cy.get('span')
      .last()
      .should('not.contain', 'Szenenbeschreibung fehlt')
      .prev()
      .should('not.contain', 'Szenenbeschreibung fehlt')
  })

  it('tests input description and timecode and then delete all ', () => {
    cy.get('textarea')
      .type(mockData[0].description)
      .should('have.value', mockData[0].description)
    cy.get('input')
      .type(mockData[0].timeCode)
      .should('have.value', mockData[0].timeCodeFormated)
    cy.get('@cancelButton').click()
    cy.get('textarea').should('not.have.value')
    cy.get('input').should('not.have.value')
  })

  it('tests if the error message appears, when textarea is filled with "Enter" value ', () => {
    cy.get('textarea').type('{enter}{enter}{enter}')
    cy.get('input').type(mockData[0].timeCode)
    cy.get('@saveButton').click()
    cy.get('span').first().should('contain', 'Szenenbeschreibung fehlt')
  })

  it('tests if the tag button opens the additional input fields, and try to save empty formular', () => {
    cy.get('button').contains('Tor').click()
    cy.get('@saveButton').click()
    cy.get('span')
      .first()
      .should('contain', 'Szenenbeschreibung fehlt')
      .siblings()
      .should('contain', 'Timecode fehlt oder ist fehlerhaft')
      .next()
      .should('contain', 'Name fehlt')
      .next()
      .should(
        'contain',
        'Timecode fehlt, ist fehlerhaft oder ist insgesamt zu lang!'
      )
      .next()
      .should(
        'contain',
        'Timecode fehlt, ist fehlerhaft oder ist insgesamt zu lang!'
      )
  })

  it('tests save formular with "Tor" event', () => {
    cy.get('button').contains('Tor').click()
    cy.get('textarea')
      .type(mockDataEvent[0].description)
      .should('have.value', mockDataEvent[0].description)
    cy.get('input')
      .first()
      .type(mockDataEvent[0].timeCode)
      .should('have.value', mockDataEvent[0].timeCodeFormated)
    cy.get('input')
      .eq(1)
      .type(mockDataEvent[0].playerName)
      .should('have.value', mockDataEvent[0].playerName)
    cy.get('input')
      .eq(2)
      .type(mockDataEvent[0].timeCodeLowerThirdIn)
      .should('have.value', mockDataEvent[0].timeCodeLowerThirdInFormatted)
    cy.get('input')
      .eq(3)
      .type(mockDataEvent[0].timeCodeLowerThirdLength)
      .should('have.value', mockDataEvent[0].timeCodeLowerThirdLengthFormatted)
    cy.get('@saveButton').click()
    cy.get('footer').should('contain', mockDataEvent[0].timeCodeResult)
  })

  it('tests description and timecode input and last input is with event input and correct addition after every save', () => {
    mockData.forEach((data, index) => {
      cy.get('textarea')
        .type(data.description)
        .should('have.value', data.description)
      cy.get('input')
        .type(data.timeCode)
        .should('have.value', data.timeCodeFormated)
      cy.get('@saveButton').click()

      cy.get('footer').should('contain', data.timeCodeResult)
    })
    cy.get('button').contains('Tor').click()

    cy.get('textarea')
      .type(mockDataEvent[0].description)
      .should('have.value', mockDataEvent[0].description)
    cy.get('input')
      .eq(0)
      .type(mockDataEvent[0].timeCode)
      .should('have.value', mockDataEvent[0].timeCodeFormated)
    cy.get('input')
      .eq(1)
      .type(mockDataEvent[0].playerName)
      .should('have.value', mockDataEvent[0].playerName)
    cy.get('input')
      .eq(2)
      .type(mockDataEvent[0].timeCodeLowerThirdIn)
      .should('have.value', mockDataEvent[0].timeCodeLowerThirdInFormatted)
    cy.get('input')
      .eq(3)
      .type(mockDataEvent[0].timeCodeLowerThirdLength)
      .should('have.value', mockDataEvent[0].timeCodeLowerThirdLengthFormatted)
    cy.get('@saveButton').click()

    cy.get('footer').should('contain', '00:02:56:01')
  })

  it('tests the timecode input, when someone change the minute', () => {
    cy.get('input')
      .first()
      .type(mockDataEvent[0].timeCode)
      .should('have.value', mockDataEvent[0].timeCodeFormated)
      .type('{leftarrow}{leftarrow}{leftarrow}{backspace}')
      .should('have.value', '31:5')
      .type('5')
      .should('have.value', '35:15')
  })

  it('adds a sequence without event, then hit edit and adds a "tor" event', () => {
    cy.get('textarea')
      .type(mockData[0].description)
      .should('have.value', mockData[0].description)
    cy.get('input')
      .type(mockData[0].timeCode)
      .should('have.value', mockData[0].timeCodeFormated)
    cy.get('@saveButton').click()
    cy.contains(mockData[0].description)
    cy.get('svg').first().click()
    cy.get('button').contains('Tor').click()
    cy.get('input')
      .eq(1)
      .type(mockDataEvent[0].playerName)
      .should('have.value', mockDataEvent[0].playerName)
    cy.get('input')
      .eq(2)
      .type(mockDataEvent[0].timeCodeLowerThirdIn)
      .should('have.value', mockDataEvent[0].timeCodeLowerThirdInFormatted)
    cy.get('input')
      .eq(3)
      .type(mockDataEvent[0].timeCodeLowerThirdLength)
      .should('have.value', mockDataEvent[0].timeCodeLowerThirdLengthFormatted)
    cy.get('@saveButton').click()
    cy.get('section').first().contains(mockData[0].description)
    cy.get('section').first().contains('Tor')
    cy.get('section').first().contains('Spieler: Goretzka')
    cy.get('section').first().contains('Bauchbinde IN:00:00:15:00')
    cy.get('section').first().contains('Bauchbinde OUT:00:00:23:00')
  })
})
