import fetch from 'node-fetch';

export default async (string) => {
  string = string.replace(/(\r\n|\n|\r)/gm, "");


  let res = await fetch("https://api.languagetool.org/v2/check?c=1&instanceId=35069%3A1649698031896&v=standalone", {
    "body": "data=%7B%22text%22%3A%22" + string + "%22%7D&textSessionId=35069%3A1649698031896&enableHiddenRules=true&level=picky&language=auto&noopLanguages=en%2Csv&preferredLanguages=en%2Csv&preferredVariants=en-US%2Cde-DE%2Cpt-PT%2Cca-es&disabledRules=WHITESPACE_RULE%2CCONSECUTIVE_SPACES&useragent=webextension-chrome-ng&mode=allButTextLevelOnly&allowIncompleteResults=true",
    "method": "POST"
  });

  let matches = (await res.json()).matches;

  let totalOffset = 0;
  for (let match of matches) {
    // let match = matches[0];
    console.log(match);
    let replacement = match.replacements[0].value;
    // console.log(replacement);
    // console.log(match.offset, match.length);
    // console.log(replacement.length);
    // console.log(string);
    string = string.substring(0, match.offset + totalOffset) + replacement + string.substring(match.offset + match.length + totalOffset);
    totalOffset += replacement.length - match.length; //to adjust for new string length
    // console.log(string);
    // console.log(totalOffset);
  }

  return string;


};