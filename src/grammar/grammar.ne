@builtin "whitespace.ne"
@builtin "string.ne"

@{%
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
%}

# Upper level
query ->
      fetch              {% d => _.flattenDeep(notNull(d)) %}
    | fetch __ filter    {% d => _.flattenDeep(notNull(d)) %}

# Fetch stage
fetch ->
      target __ selector               {% fetch %}
    | target                           {% fetch %}
    | quantifier __ target __ selector {% fetchQuantity %}
    | quantifier __ target             {% fetchQuantity %}

target ->
      "thngs"i      {% d => '/thngs' %}
    | "thng"i       {% d => '/thngs' %}
    | "products"i   {% d => '/products' %}

quantifier ->
    int {% id %}

selector ->
    selectorField __ selectorValue {% selector %}

selectorField ->
      "tagged"i     {% d => 'tags' %}
    | "with tags"i  {% d => 'tags' %}
    | "named"i      {% d => 'name' %}
    | "with name"i  {% d => 'name' %}

selectorValue ->
    string {% id %}

# Filter stage
filter ->
    "where" __ filterExpression {% nth(2) %}

filterExpression ->
    filterField _ filterOperator _ filterValue {% filter %}

filterField -> property {% id %}
filterValue -> string   {% id %}

filterOperator ->
      "="   {% id %}
    | "~"   {% id %}
    | "^"   {% id %}
    | "$"   {% id %}


property ->
    [\w\.]:+ {% join %}

string ->
    [\w\*]:+ {% join %}

int ->
    [0-9]:+ {% d => parseInt(join(d)) %}

_ ->
    [\s] {% nuller %}

__ ->
    [ \t]:+ {% nuller %}