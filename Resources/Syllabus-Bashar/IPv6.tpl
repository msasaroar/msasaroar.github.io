___TERMS_OF_SERVICE___

By creating or modifying this file you agree to Google Tag Manager's Community
Template Gallery Developer Terms of Service available at
https://developers.google.com/tag-manager/gallery-tos (or such other URL as
Google may provide), as modified from time to time.


___INFO___

{
  "type": "MACRO",
  "id": "cvt_temp_public_id",
  "version": 1,
  "securityGroups": [],
  "displayName": "IPv6",
  "description": "Generate IPv6 from IPv4",
  "containerContexts": [
    "SERVER"
  ]
}


___TEMPLATE_PARAMETERS___

[]


___SANDBOXED_JS_FOR_SERVER___

const makeInteger = require('makeNumber');
const createRegex = require('createRegex');
const testRegex = require('testRegex');
const ipv6Pattern = createRegex('^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$');
const getEventData = require('getEventData');

const ip = data.test_ip ? data.test_ip :  getEventData('ip_override');

function isIPv6(ip) {
  return testRegex(ipv6Pattern, ip);
}

function convertIPv4ToIPv6(ipv4) {
  if (isIPv6(ipv4)) {
    return ipv4; 
  }
  
  const parts = ipv4.split('.').map(makeInteger);
  const ipv6 = '0000:0000:0000:0000:0000:ffff:' +
  (parts[0] < 16 ? '0' : '') + parts[0].toString(16) +
  (parts[1] < 16 ? '0' : '') + parts[1].toString(16) + ':' +
  (parts[2] < 16 ? '0' : '') + parts[2].toString(16) +
  (parts[3] < 16 ? '0' : '') + parts[3].toString(16);

  return ipv6;
}

return convertIPv4ToIPv6(ip);


___SERVER_PERMISSIONS___

[
  {
    "instance": {
      "key": {
        "publicId": "read_event_data",
        "versionId": "1"
      },
      "param": [
        {
          "key": "eventDataAccess",
          "value": {
            "type": 1,
            "string": "any"
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  }
]


___TESTS___

scenarios:
- name: Convert IPv4 to IPv6 - 1
  code: |-
    const mockData = {test_ip: '182.252.81.10'};
    let variableResult = runCode(mockData);
    assertThat(variableResult).isEqualTo('0000:0000:0000:0000:0000:ffff:b6fc:510a');
- name: Convert IPv4 to IPv6 - 2
  code: |-
    const mockData = {test_ip: '182.252.81.15'};
    let variableResult = runCode(mockData);
    assertThat(variableResult).isEqualTo('0000:0000:0000:0000:0000:ffff:b6fc:510f');
- name: If IPv6 Return Original
  code: |-
    const mockData = {test_ip: '2001:db8:3333:4444:5555:6666:7777:8888'};
    let variableResult = runCode(mockData);
    assertThat(variableResult).isEqualTo('2001:db8:3333:4444:5555:6666:7777:8888');


___NOTES___

Created on 11/7/2023, 2:00:56 AM


