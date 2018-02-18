// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }

    const _ = require('lodash');
    const join = d => d[0].join('');
    const nuller = d => null;
    const nth = n => d => d[n];
    const notNull = d => d.filter(i => i !== null);
    const {
      fetch,
      filter,
      selector,
      until,
      fetchQuantity
    } = require('./utils');
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "dqstring$ebnf$1", "symbols": []},
    {"name": "dqstring$ebnf$1", "symbols": ["dqstring$ebnf$1", "dstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "dqstring", "symbols": [{"literal":"\""}, "dqstring$ebnf$1", {"literal":"\""}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "sqstring$ebnf$1", "symbols": []},
    {"name": "sqstring$ebnf$1", "symbols": ["sqstring$ebnf$1", "sstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "sqstring", "symbols": [{"literal":"'"}, "sqstring$ebnf$1", {"literal":"'"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "btstring$ebnf$1", "symbols": []},
    {"name": "btstring$ebnf$1", "symbols": ["btstring$ebnf$1", /[^`]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "btstring", "symbols": [{"literal":"`"}, "btstring$ebnf$1", {"literal":"`"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "dstrchar", "symbols": [/[^\\"\n]/], "postprocess": id},
    {"name": "dstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": 
        function(d) {
            return JSON.parse("\""+d.join("")+"\"");
        }
        },
    {"name": "sstrchar", "symbols": [/[^\\'\n]/], "postprocess": id},
    {"name": "sstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": function(d) { return JSON.parse("\""+d.join("")+"\""); }},
    {"name": "sstrchar$string$1", "symbols": [{"literal":"\\"}, {"literal":"'"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "sstrchar", "symbols": ["sstrchar$string$1"], "postprocess": function(d) {return "'"; }},
    {"name": "strescape", "symbols": [/["\\\/bfnrt]/], "postprocess": id},
    {"name": "strescape", "symbols": [{"literal":"u"}, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/], "postprocess": 
        function(d) {
            return d.join("");
        }
        },
    {"name": "query", "symbols": ["fetch"], "postprocess": d => _.flattenDeep(notNull(d))},
    {"name": "query", "symbols": ["fetch", "__", "filter"], "postprocess": d => _.flattenDeep(notNull(d))},
    {"name": "fetch", "symbols": ["target", "__", "selector"], "postprocess": fetch},
    {"name": "fetch", "symbols": ["target"], "postprocess": fetch},
    {"name": "fetch", "symbols": ["quantifier", "__", "target", "__", "selector"], "postprocess": fetchQuantity},
    {"name": "fetch", "symbols": ["quantifier", "__", "target"], "postprocess": fetchQuantity},
    {"name": "target$subexpression$1", "symbols": [/[tT]/, /[hH]/, /[nN]/, /[gG]/, /[sS]/], "postprocess": function (d) {return d.join(""); }},
    {"name": "target", "symbols": ["target$subexpression$1"], "postprocess": d => '/thngs'},
    {"name": "target$subexpression$2", "symbols": [/[tT]/, /[hH]/, /[nN]/, /[gG]/], "postprocess": function (d) {return d.join(""); }},
    {"name": "target", "symbols": ["target$subexpression$2"], "postprocess": d => '/thngs'},
    {"name": "target$subexpression$3", "symbols": [/[pP]/, /[rR]/, /[oO]/, /[dD]/, /[uU]/, /[cC]/, /[tT]/, /[sS]/], "postprocess": function (d) {return d.join(""); }},
    {"name": "target", "symbols": ["target$subexpression$3"], "postprocess": d => '/products'},
    {"name": "quantifier", "symbols": ["int"], "postprocess": id},
    {"name": "selector", "symbols": ["selectorField", "__", "selectorValue"], "postprocess": selector},
    {"name": "selectorField$subexpression$1", "symbols": [/[tT]/, /[aA]/, /[gG]/, /[gG]/, /[eE]/, /[dD]/], "postprocess": function (d) {return d.join(""); }},
    {"name": "selectorField", "symbols": ["selectorField$subexpression$1"], "postprocess": d => 'tags'},
    {"name": "selectorField$subexpression$2", "symbols": [/[wW]/, /[iI]/, /[tT]/, /[hH]/, {"literal":" "}, /[tT]/, /[aA]/, /[gG]/, /[sS]/], "postprocess": function (d) {return d.join(""); }},
    {"name": "selectorField", "symbols": ["selectorField$subexpression$2"], "postprocess": d => 'tags'},
    {"name": "selectorField$subexpression$3", "symbols": [/[nN]/, /[aA]/, /[mM]/, /[eE]/, /[dD]/], "postprocess": function (d) {return d.join(""); }},
    {"name": "selectorField", "symbols": ["selectorField$subexpression$3"], "postprocess": d => 'name'},
    {"name": "selectorField$subexpression$4", "symbols": [/[wW]/, /[iI]/, /[tT]/, /[hH]/, {"literal":" "}, /[nN]/, /[aA]/, /[mM]/, /[eE]/], "postprocess": function (d) {return d.join(""); }},
    {"name": "selectorField", "symbols": ["selectorField$subexpression$4"], "postprocess": d => 'name'},
    {"name": "selectorValue", "symbols": ["string"], "postprocess": id},
    {"name": "filter$string$1", "symbols": [{"literal":"w"}, {"literal":"h"}, {"literal":"e"}, {"literal":"r"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "filter", "symbols": ["filter$string$1", "__", "filterExpression"], "postprocess": nth(2)},
    {"name": "filterExpression", "symbols": ["filterField", "_", "filterOperator", "_", "filterValue"], "postprocess": filter},
    {"name": "filterField", "symbols": ["property"], "postprocess": id},
    {"name": "filterValue", "symbols": ["string"], "postprocess": id},
    {"name": "filterOperator", "symbols": [{"literal":"="}], "postprocess": id},
    {"name": "filterOperator", "symbols": [{"literal":"~"}], "postprocess": id},
    {"name": "filterOperator", "symbols": [{"literal":"^"}], "postprocess": id},
    {"name": "filterOperator", "symbols": [{"literal":"$"}], "postprocess": id},
    {"name": "property$ebnf$1", "symbols": [/[\w\.]/]},
    {"name": "property$ebnf$1", "symbols": ["property$ebnf$1", /[\w\.]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "property", "symbols": ["property$ebnf$1"], "postprocess": join},
    {"name": "string$ebnf$1", "symbols": [/[\w\*]/]},
    {"name": "string$ebnf$1", "symbols": ["string$ebnf$1", /[\w\*]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "string", "symbols": ["string$ebnf$1"], "postprocess": join},
    {"name": "int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "int", "symbols": ["int$ebnf$1"], "postprocess": d => parseInt(join(d))},
    {"name": "_", "symbols": [/[\s]/], "postprocess": nuller},
    {"name": "__$ebnf$1", "symbols": [/[ \t]/]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", /[ \t]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": nuller}
]
  , ParserStart: "query"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
