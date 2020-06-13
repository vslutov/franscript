import type { ChangeEvent } from 'react'

import { useState } from 'react'

import styles from './Transcript.module.css'

type Phoneme = string
type Transcription = string

type Rule = [Phoneme, Transcription]
type Specification = { [input: string]: Rule }

const expand = (input: Specification) : Specification => {
  const output = {}

  for (const graphemes in input) {
    for (const grapheme of graphemes.split(',')) {
      output[grapheme] = input[graphemes]
    }
  }

  return output
}

const rules = expand({
  b: ['b', 'б'],
  ch: ['ʃ', 'ш'],
  d: ['d', 'д'],
  'f,ph': ['f', 'ф'],
  'g,gu': ['g', 'г'],
  gn: ['ɲ', 'нь'],
  h: ['', ''],
  'j,g,ge': ['ʒ', 'ж'],
  'c,qu,k': ['k', 'к'],
  l: ['l', 'л'],
  li: ['lj', 'ль'],
  m: ['m', 'м'],
  n: ['n', 'н'],
  ng: ['ŋ', 'нг'],
  p: ['p', 'п'],
  r: ['ʁ', 'р'],
  's,ç,c': ['s', 'с'],
  ti: ['sj', 'сь'],
  t: ['t', 'т'],
  v: ['v', 'в'],
  w: ['w', 'в'],
  x: ['ks', 'кс'],
  'y,i': ['i', 'и'],
  'il,ill': ['j', 'ль'],
  'z,s': ['z', 'з'],
  'a,â': ['a', 'а'],
  'é,è,ê,ai,e': ['e', 'е'],
  'eu,œ,œu': ['œ', 'э'],
  e: ['ə', 'е'],
  'o,au,ô': ['ɔ', 'о'],
  oi: ['wa', 'уа'],
  u: ['ɥ', 'ю'],
  'an,en': ['ɑ̃', 'ан'],
  'am,em': ['ɑ̃', 'ам'],
  'in,en,ain': ['ɛ̃', 'ен'],
  on: ['ɔ̃', 'он'],
  om: ['ɔ̃', 'ом'],
  un: ['œ̃', 'ен'],
  oin: ['wɛ̃', 'уэн']
})

type TranscriptResult = {
  phoneme: Phoneme
  transcription: Transcription
}

const transcript = (input: string): TranscriptResult => {
  const maxGraphemeLength: number = Math.max(
    ...Object.keys(rules).map(x => x.length))

  let phoneme: Phoneme = ''
  let transcription: Transcription = ''

  while (input !== '') {
    let prefix: string = ''
    let savedPrefix: string = null

    for (let i = 0; i < maxGraphemeLength; ++i) {
      prefix += input.charAt(i).toLowerCase()
      if (prefix in rules) {
        savedPrefix = prefix
      }
    }

    if (savedPrefix != null) {
      phoneme += rules[savedPrefix][0]
      transcription += rules[savedPrefix][1]
      input = input.slice(savedPrefix.length)
    } else {
      phoneme += input.charAt(0)
      transcription += input.charAt(0)
      input = input.slice(1)
    }
  }

  return {
    phoneme,
    transcription
  }
}

export const Transcript = (): JSX.Element => {
  const [input, setInput] = useState("Salut! Je m'appelle Vladimir.")
  const output = transcript(input)

  return (
    <div className={styles.twoColumns}>
      <textarea
        className={styles.input}
        value={input}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setInput(e.target.value)}
      />
      <div>
        <p className={styles.output}>[{output.phoneme}]</p>
        <p className={styles.output}>{output.transcription}</p>
      </div>
    </div>
  )
}
