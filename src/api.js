import querystring from 'querystring'
import fastXMLParser from 'fast-xml-parser'
import alfy from 'alfy'
import { API_URL, UID, TOKEN_ID } from './config'

function genQueryURL(term, searchType = 'e', sortby = 'p') {
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

export function query(term, searchType, sortby) {
  const url = genQueryURL(term, searchType, sortby)

  return alfy.fetch(url, {json: false}).then((responseXML) => {
    const responseJson = fastXMLParser.parse(responseXML)
    if (responseJson.results.result) {
      return formatResponse(responseJson.results.result)
    } else {
      return [{
        title: 'No result...',
        subtitle: 'Abbreviation...',
        arg: 0,
      }]
    }
  })
}