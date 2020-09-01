const TimecodeCalculator = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  frames: 0,

  reset: function () {
    this.hours = 0
    this.minutes = 0
    this.seconds = 0
    this.frames = 0
  },

  pad: function (num, size) {
    const s = '000000000' + num
    return s.substr(s.length - size)
  },

  format: function (string_of_tc) {
    const num = this.pad(string_of_tc, 8)
    const h_of_str = parseInt(num.slice(0, 2), 10)
    const m_of_str = parseInt(num.slice(2, 4), 10)
    const s_of_str = parseInt(num.slice(4, 6), 10)
    const fr_of_str = parseInt(num.slice(6, 8), 10)

    return (
      String(this.pad(h_of_str, 2)) +
      ':' +
      String(this.pad(m_of_str, 2)) +
      ':' +
      String(this.pad(s_of_str, 2)) +
      ':' +
      String(this.pad(fr_of_str, 2))
    )
  },

  add: function (string_of_tc) {
    // if (string_of_tc.length % 2 !=== 0) {
    //     return "Wrong TC Format" }

    string_of_tc = this.pad(string_of_tc, 8)

    const h_of_str = parseInt(string_of_tc.slice(0, 2), 10)
    const m_of_str = parseInt(string_of_tc.slice(2, 4), 10)
    const s_of_str = parseInt(string_of_tc.slice(4, 6), 10)
    const fr_of_str = parseInt(string_of_tc.slice(6, 8), 10)

    // Calculate frames
    if (this.frames + fr_of_str > 24) {
      if (
        (this.frames + fr_of_str) % 25 === 0 &&
        parseInt(this.frames + fr_of_str, 10) / 25 === 1
      ) {
        this.seconds += 1
        this.frames = 0
      } else {
        this.seconds += parseInt((this.frames + fr_of_str) / 25, 10)
        this.frames = (this.frames + fr_of_str) % 25
      }
    } else {
      this.frames += fr_of_str
    }

    // Calculate seconds
    if (this.seconds > 59) {
      this.minutes += 1
      this.seconds = 0
    }

    if (this.seconds + s_of_str > 59) {
      if (
        (this.seconds + s_of_str) % 60 === 0 &&
        parseInt(this.seconds + s_of_str, 10) / 60 === 1
      ) {
        this.minutes += 1
        this.seconds = 0
      } else {
        this.minutes += parseInt((this.seconds + s_of_str) / 60, 10)
        this.seconds = (this.seconds + s_of_str) % 60
      }
    } else {
      this.seconds += s_of_str
    }

    // Calculate minutes
    if (this.minutes > 59) {
      this.hours += 1
      this.minutes = 0
    }

    if (this.minutes + m_of_str > 59) {
      if (
        (this.minutes + m_of_str) % 60 === 0 &&
        parseInt(this.minutes + m_of_str, 10) / 60 === 1
      ) {
        this.hours += 1
        this.minutes = 0
      } else {
        this.hours += parseInt((this.minutes + m_of_str) / 60, 10)
        this.minutes = (this.minutes + m_of_str) % 60
      }
    } else {
      this.minutes += m_of_str
    }

    // Calculate hours
    this.hours += h_of_str
  },

  getResult: function () {
    return (
      String(this.pad(this.hours, 2)) +
      ':' +
      String(this.pad(this.minutes, 2)) +
      ':' +
      String(this.pad(this.seconds, 2)) +
      ':' +
      String(this.pad(this.frames, 2))
    )
  },
}

export function getTimecodeGameLength(ArrayOfTimecodes) {
  TimecodeCalculator.reset()
  for (let x = 0; x < 2; x++) {
    TimecodeCalculator.add(ArrayOfTimecodes[x])
  }
  return TimecodeCalculator.getResult()
}

export function getTimecodeTotalLength(ArrayOfTimecodes) {
  TimecodeCalculator.reset()
  ArrayOfTimecodes.forEach((timecode) => TimecodeCalculator.add(timecode))
  return TimecodeCalculator.getResult()
}

export function getTimecodeTotalLengthFromSequenceCards(SequenceCards) {
  TimecodeCalculator.reset()
  SequenceCards.forEach(({ timeCode }) => TimecodeCalculator.add(timeCode))
  return TimecodeCalculator.getResult()
}

export function getFormatedTimecode(timecodeAsString) {
  return TimecodeCalculator.format(timecodeAsString)
}
