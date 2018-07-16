'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var querystring = _interopDefault(require('querystring'));
var fastXMLParser = _interopDefault(require('fast-xml-parser'));
var alfy = _interopDefault(require('alfy'));

const API_URL = 'http://www.stands4.com/services/v2/abbr.php';
const UID = 'uid';
const TOKEN_ID = 'token_id';

function genQueryURL(term, searchType, sortby) {
  const params = {
    uid: UID,
    tokenid: TOKEN_ID,
    searchType,
    sortby,
    term,
  };
  return API_URL + '?' + querystring.stringify(params)
}

function formatResponse(data) {
  return data.map((item, index) => ({
    title: item.definition,
    subtitle: `Category: ${item.category}`,
    arg: index,
  }))
}

const defaultResponse = [{title: 'No result...', subtitle: 'Abbreviation', arg: 0}];

function query(input, sortby = 'p') {
  const args = input.split(' ');
  const isReverse = args[0] === 'r' && args.length > 1;
  const term = isReverse ? args[1] : args[0];
  const searchType = isReverse ? 'r' : 'e';
  const url = genQueryURL(term, searchType, sortby);
  return alfy.fetch(url, {json: false}).then((responseXML) => {
    const responseJson = fastXMLParser.parse(responseXML);
    return responseJson.results.result ? formatResponse(responseJson.results.result) : defaultResponse
  })
}

query(alfy.input).then(data => {
  alfy.output(data);
});
