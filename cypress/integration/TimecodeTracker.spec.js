/// <reference types="cypress" />

const mockData = [
  {
    description: 'Mbabu schaltet sich vorne ein, Alaba klärt zur Ecke.',
    timeCode: '3417',
    timeCodeFormated: '34:17',
    timeCodeResult: '00:00:34:17',
    totalLengthFirst: '00:00:34:17',
    totalLengthSecond: '00:03:30:18',
  },
  {
    description:
      'Goretzka chippt auf Müller, dessen Kopfballbogenlampe aufs Tordach fliegt.',
    timeCode: '004708',
    timeCodeFormated: '00:47:08',
    timeCodeResult: '00:01:22:00',
    totalLengthFirst: '00:01:22:00',
    totalLengthSecond: '00:04:18:01',
  },
  {
    description: 'Freistoß aus 25 Metern zentraler Position. Neuer hält.',
    timeCode: '3214',
    timeCodeFormated: '32:14',
    timeCodeResult: '00:01:54:14',
    totalLengthFirst: '00:01:54:14',
    totalLengthSecond: '00:04:50:15',
  },
  {
    description: 'Lewandowski, der auf das kurze Eck schießt Casteels pariert.',
    timeCode: '002822',
    timeCodeFormated: '00:28:22',
    timeCodeResult: '00:02:23:11',
    totalLengthFirst: '00:02:23:11',
    totalLengthSecond: '00:05:19:12',
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
    timeCodeResult: '00:02:56:01',
    lowerThirdInResult: '00:02:38:11',
    lowerThirdLength: '00:02:46:11',
    totalLengthFirst: '00:02:56:01',
    totalLengthSecond: '00:05:52:02',
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
    cy.get('nav').contains('1ST').as('First')
    cy.get('nav').contains('2ND').as('Second')
    cy.get('nav').contains('INTERVIEW').as('Interview')
    cy.get('nav').contains('SPECIALS').as('Special')
    cy.get('nav').contains('INFO').as('Info')
    cy.get('.Header__BubbleWrapper-sc-42wb12-4 > :nth-child(1)').as(
      'Gesamtlänge'
    )
  })

  it('starts the app and check if renders corrext', () => {
    cy.contains('TIMECODE TRACKER')
    cy.contains('GESAMTLÄNGE')
    cy.contains('00:00:00:00')
    cy.contains('VORGABE')
    cy.contains('00:00min')
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
    cy.contains('SPIELBERICHT LÄNGE')
    cy.contains('SPEICHERN')
    cy.get('input').should('have.attr', 'placeholder', 'MM:SS')
    cy.get('nav').contains('1ST').contains('00:00:00:00')
    cy.get('nav').contains('2ND').contains('00:00:00:00')
    cy.get('nav').contains('INTERVIEW').contains('00:00:00:00')
    cy.get('nav').contains('SPECIALS')
    cy.get('nav').contains('INFO')
    cy.get('button').first().as('closeButton')
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

  it.only('clicks on add button and checks if it possible to click on the "input" selection', () => {
    cy.get('@addButton').click()
    cy.contains('1st')
    cy.contains('2nd')
    cy.contains('Interview')
    cy.contains('Special')
    cy.get('input[id="1st"]').click().should('be.checked')
    cy.get('input[id="2nd"]').should('not.be.checked')
    cy.get('input[id="interview"]').should('not.be.checked')
    cy.get('input[id="special"]').should('not.be.checked')
    cy.get('input[id="2nd"]').click().should('be.checked')
    cy.get('input[id="1st"]').should('not.be.checked')
    cy.get('input[id="interview"]').should('not.be.checked')
    cy.get('input[id="special"]').should('not.be.checked')
    cy.get('input[id="interview"]').click().should('be.checked')
    cy.get('input[id="1st"]').should('not.be.checked')
    cy.get('input[id="2nd"]').should('not.be.checked')
    cy.get('input[id="special"]').should('not.be.checked')
    cy.get('input[id="special"]').click().should('be.checked')
    cy.get('input[id="1st"]').should('not.be.checked')
    cy.get('input[id="2nd"]').should('not.be.checked')
    cy.get('input[id="interview"]').should('not.be.checked')
  })

  it('adds a sequence with no event for the first halftime', () => {
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
    cy.get('@First').contains(mockData[0].timeCodeFormated)
    cy.get('nav').contains('2ND').as('Second')
    cy.get('nav').contains('INTERVIEW').as('Interview')
    cy.get('nav').contains('SPECIALS').as('Special')
    cy.get('nav').contains('INFO').as('Info')
  })

  it('adds a sequence with no event for the second halftime', () => {
    cy.get('@addButton').click()
    cy.contains('2nd').click()
    cy.get('label').contains('Neue Szene hinzufügen').click()
    cy.get('textarea').should('have.focus').type(mockData[0].description)
    cy.get('label').contains('SZENENLÄNGE').click()
    cy.get('input')
      .last()
      .should('have.focus')
      .type(mockData[0].timeCode)
      .should('have.value', mockData[0].timeCodeFormated)
    cy.get('@saveSceneButton').click()
    cy.get('@First').contains('00:00:00:00')
    cy.get('@Second').contains(mockData[0].timeCodeFormated)
    cy.get('@Interview').contains('00:00:00:00')
  })

  it('simulates a gameday', () => {
    // first half
    mockData.forEach((data, index) => {
      cy.get('@addButton').click()
      cy.contains('1st').click()
      cy.get('label').contains('Neue Szene hinzufügen').click()
      cy.get('textarea').should('have.focus').type(data.description)
      cy.get('label').contains('SZENENLÄNGE').click()
      cy.get('input')
        .last()
        .should('have.focus')
        .type(data.timeCode)
        .should('have.value', data.timeCodeFormated)
      cy.get('@saveSceneButton').click()
      cy.get('@First').contains(data.timeCodeResult)
      cy.get('@Second').contains('00:00:00:00')
      cy.get('@Interview').contains('00:00:00:00')
      cy.get('@Gesamtlänge').contains(data.totalLengthFirst)

      for (let i = 0; i <= index; i++) {
        cy.contains('DAUER')
        cy.contains(mockData[i].timeCodeFormated)
        cy.contains(mockData[i].description)
      }
    })
    mockDataEvent.forEach((data, index) => {
      cy.get('@addButton').click()
      cy.contains('1st').click()
      cy.get('label').contains('Neue Szene hinzufügen').click()
      cy.get('textarea').should('have.focus').type(data.description)
      cy.get('label').contains('SZENENLÄNGE').click()
      cy.get('input')
        .last()
        .should('have.focus')
        .type(data.timeCode)
        .should('have.value', data.timeCodeFormated)
      cy.get('button').contains('Tor').click()
      cy.get('label').contains('SPIELERNAME').click()
      cy.get('#playerName')
        .should('have.focus')
        .type(data.playerName)
        .should('have.value', data.playerName)
      cy.get('label').contains('BAUCHBINDE IN (relativ zur Szene)').click()
      cy.get('#BAUCHBINDE\\ IN\\ \\(relativ\\ zur\\ Szene\\)')
        .should('have.focus')
        .type(data.timeCodeLowerThirdIn)
        .should('have.value', data.timeCodeLowerThirdInFormatted)
      cy.get('label').contains('BAUCHBINDE LÄNGE').click()
      cy.get('#BAUCHBINDE\\ LÄNGE')
        .should('have.focus')
        .type(data.timeCodeLowerThirdLength)
        .should('have.value', data.timeCodeLowerThirdLengthFormatted)
      cy.get('@saveSceneButton').click()
      cy.get('@First').contains('00:02:56:01')
      cy.get('@Second').contains('00:00:00:00')
      cy.get('@Interview').contains('00:00:00:00')
      cy.get('@Gesamtlänge').contains(data.totalLengthFirst)

      for (let i = 0; i <= index; i++) {
        cy.contains('DAUER')
        cy.contains(mockDataEvent[i].timeCodeFormated)
        cy.contains(mockDataEvent[i].description)
        cy.contains('Tor')
        cy.contains(mockDataEvent[i].playerName)
      }
    })

    // second half
    cy.get('@Second').click()
    mockData.forEach((data, index) => {
      cy.get('@addButton').click()
      cy.contains('2nd').click()
      cy.get('label').contains('Neue Szene hinzufügen').click()
      cy.get('textarea').should('have.focus').type(data.description)
      cy.get('label').contains('SZENENLÄNGE').click()
      cy.get('input')
        .last()
        .should('have.focus')
        .type(data.timeCode)
        .should('have.value', data.timeCodeFormated)
      cy.get('@saveSceneButton').click()
      cy.get('@First').contains('00:02:56:01')
      cy.get('@Second').contains(data.timeCodeResult)
      cy.get('@Interview').contains('00:00:00:00')
      cy.get('@Gesamtlänge').contains(data.totalLengthSecond)

      for (let i = 0; i <= index; i++) {
        cy.contains('DAUER')
        cy.contains(mockData[i].timeCodeFormated)
        cy.contains(mockData[i].description)
      }
    })

    mockDataEvent.forEach((data, index) => {
      cy.get('@addButton').click()
      cy.contains('2nd').click()
      cy.get('label').contains('Neue Szene hinzufügen').click()
      cy.get('textarea').should('have.focus').type(data.description)
      cy.get('label').contains('SZENENLÄNGE').click()
      cy.get('input')
        .last()
        .should('have.focus')
        .type(data.timeCode)
        .should('have.value', data.timeCodeFormated)
      cy.get('button').contains('Tor').click()
      cy.get('label').contains('SPIELERNAME').click()
      cy.get('#playerName')
        .should('have.focus')
        .type(data.playerName)
        .should('have.value', data.playerName)
      cy.get('label').contains('BAUCHBINDE IN (relativ zur Szene)').click()
      cy.get('#BAUCHBINDE\\ IN\\ \\(relativ\\ zur\\ Szene\\)')
        .should('have.focus')
        .type(data.timeCodeLowerThirdIn)
        .should('have.value', data.timeCodeLowerThirdInFormatted)
      cy.get('label').contains('BAUCHBINDE LÄNGE').click()
      cy.get('#BAUCHBINDE\\ LÄNGE')
        .should('have.focus')
        .type(data.timeCodeLowerThirdLength)
        .should('have.value', data.timeCodeLowerThirdLengthFormatted)
      cy.get('@saveSceneButton').click()
      cy.get('@First').contains(data.totalLengthFirst)
      cy.get('@Second').contains(data.totalLengthFirst)
      cy.get('@Interview').contains('00:00:00:00')
      cy.get('@Gesamtlänge').contains(data.totalLengthSecond)

      for (let i = 0; i <= index; i++) {
        cy.contains('DAUER')
        cy.contains(mockDataEvent[i].timeCodeFormated)
        cy.contains(mockDataEvent[i].description)
        cy.contains('Tor')
        cy.contains(mockDataEvent[i].playerName)
      }
    })

    // check info page
    cy.get('@Info').click()
    cy.get('@Gesamtlänge').contains('00:05:52:02')
    cy.contains('TOR')
    cy.contains('GORETZKA')
    cy.contains('BAUCHBINDE IN')
    cy.contains('00:02:38:11')
    cy.contains('BAUCHBINDE OUT')
    cy.contains('00:02:46:11')
    cy.contains('TOR')
    cy.contains('GORETZKA')
    cy.contains('BAUCHBINDE IN')
    cy.contains('00:05:34:12')
    cy.contains('BAUCHBINDE OUT')
    cy.contains('00:05:42:12')
  })
})
