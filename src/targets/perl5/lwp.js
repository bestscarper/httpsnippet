/**
 * @description
 * HTTP code snippet generator for Perl using LWP
 *
 * @author
 * @ashleyhindmarsh
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

var util = require('util')
var CodeBuilder = require('../../helpers/code-builder')

module.exports = function (source, options) {
  // Start snippet
  var code = new CodeBuilder('    ')

  // Dependencies
  code.push('use strict; use warnings;')
      .push('use LWP::UserAgent;')
      .push('use HTTP::Request;')
      .push('use URI;')
      .blank()

  code.push('my $ua = LWP::UserAgent->new;');

  // Set URL
  code.push('my $url = URI->new("%s");', source.url)
      .blank()

  // Construct query string
  if (source.queryString.length) {
    code.push( '$url->query(%s);', JSON.stringify(source.queryObj) )
        .blank
  }

  // Construct payload
  var payload = JSON.stringify(source.postData.text)

  if (payload) {
    code.push('my $payload = %s;', payload)
  }

  // Construct request
  var method = source.method
  var request = util.format('my $request = HTTP::Request->new( %s => $url  );', method);
  code.push(request)
      .blank()

  if (payload) {
    code.push( '$request->content( $payload );' )
  }

  // Construct headers
  var header
  var headers = source.allHeaders
  for (header in headers) {
    code.push( '$request->header( \'%s\' => \'%s\' );', header, headers[header] )
        .blank;
  }

  // execute request
  code.push('my $response = $ua->request($request);')

  // print response
  code.push('print($response->decoded_content);')

  return code.join()
}

module.exports.info = {
  key: 'lwp',
  title: 'LWP',
  link: 'https://metacpan.org/pod/LWP',
  description: 'LWP library'
}

