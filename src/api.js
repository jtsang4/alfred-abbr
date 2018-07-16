import querystring from 'querystring'
import fastXMLParser from 'fast-xml-parser'
import alfy from 'alfy'
import { API_URL, UID, TOKEN_ID } from './config'

function genQueryURL(term, searchType, sortby) {
  const params = {
    uid: UID,
    tokenid: TOKEN_ID,
    searchType,
    sortby,
    term,
  }
  return API_URL + '?' + querystring.stringify(params)
}

function formatResponse(data) {
  return data.map((item, index) => ({
    title: item.definition,
    subtitle: `Category: ${item.category}`,
    arg: index,
  }))
}

const defaultResponse = [{title: 'No result...', subtitle: 'Abbreviation', arg: 0}]

export function query(input, sortby = 'p') {
  const args = input.split(' ')
  const isReverse = args[0] === 'r' && args.length > 1
  const term = isReverse ? args[1] : args[0]
  const searchType = isReverse ? 'r' : 'e'
  const url = genQueryURL(term, searchType, sortby)
  return alfy.fetch(url, {json: false}).then((responseXML) => {
    const responseJson = fastXMLParser.parse(responseXML)
    return responseJson.results.result ? formatResponse(responseJson.results.result) : defaultResponse
  })
}