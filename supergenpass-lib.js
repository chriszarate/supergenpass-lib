/*!
 * SuperGenPass library
 * https://github.com/chriszarate/supergenpass-lib
 * http://supergenpass.com
 * License: GPLv2
 */

'use strict';

var md5 = require('crypto-js/md5');
var sha512 = require('crypto-js/sha512');
var encBase64 = require('crypto-js/enc-base64');

var hashFunctions = {
	md5: function (str) { return customBase64Hash(str, md5); },
	sha512: function (str) { return customBase64Hash(str, sha512); }
};

var defaults = {
	secret: '',
	method: 'md5',
	length: 10,
	removeSubdomains: true
};

// Hard-coded and static list of ccTLDs.
var ccTLDList = {"ac":"ac|com|edu|gov|net|mil|org","ae":"com|net|org|gov|ac|co|sch|pro","ai":"com|org|edu|gov","ar":"com|net|org|gov|mil|edu|int","at":"co|ac|or|gv|priv","au":"com|gov|org|edu|id|oz|info|net|asn|csiro|telememo|conf|otc|id","az":"com|net|org","bb":"com|net|org","be":"ac|belgie|dns|fgov","bh":"com|gov|net|edu|org","bm":"com|edu|gov|org|net","br":"adm|adv|agr|am|arq|art|ato|bio|bmd|cim|cng|cnt|com|coop|ecn|edu|eng|esp|etc|eti|far|fm|fnd|fot|fst|g12|ggf|gov|imb|ind|inf|jor|lel|mat|med|mil|mus|net|nom|not|ntr|odo|org|ppg|pro|psc|psi|qsl|rec|slg|srv|tmp|trd|tur|tv|vet|zlg","bs":"com|net|org","ca":"ab|bc|mb|nb|nf|nl|ns|nt|nu|on|pe|qc|sk|yk|gc","ck":"co|net|org|edu|gov","cn":"com|edu|gov|net|org|ac|ah|bj|cq|gd|gs|gx|gz|hb|he|hi|hk|hl|hn|jl|js|ln|mo|nm|nx|qh|sc|sn|sh|sx|tj|tw|xj|xz|yn|zj","co":"arts|com|edu|firm|gov|info|int|nom|mil|org|rec|store|web","cr":"ac|co|ed|fi|go|or|sa","cu":"com|net|org","cy":"ac|com|gov|net|org","dk":"co","do":"art|com|edu|gov|gob|org|mil|net|sld|web","dz":"com|org|net|gov|edu|ass|pol|art","ec":"com|k12|edu|fin|med|gov|mil|org|net","ee":"com|pri|fie|org|med","eg":"com|edu|eun|gov|net|org|sci","er":"com|net|org|edu|mil|gov|ind","es":"com|org|gob|edu|nom","et":"com|gov|org|edu|net|biz|name|info","fj":"ac|com|gov|id|org|school","fk":"com|ac|gov|net|nom|org","fr":"asso|nom|barreau|com|prd|presse|tm|aeroport|assedic|avocat|avoues|cci|chambagri|chirurgiens-dentistes|experts-comptables|geometre-expert|gouv|greta|huissier-justice|medecin|notaires|pharmacien|port|veterinaire","ge":"com|edu|gov|mil|net|org|pvt","gg":"co|org|sch|ac|gov|ltd|ind|net|alderney|guernsey|sark","gr":"com|edu|gov|net|org","gt":"com|edu|net|gob|org|mil|ind","gu":"com|edu|net|org|gov|mil","hk":"com|net|org|idv|gov|edu","hu":"co|2000|erotika|jogasz|sex|video|info|agrar|film|konyvelo|shop|org|bolt|forum|lakas|suli|priv|casino|games|media|szex|sport|city|hotel|news|tozsde|tm|erotica|ingatlan|reklam|utazas","id":"ac|co|go|mil|net|or","il":"co|net|org|ac|gov|k12|muni|idf","im":"ltd.co|plc.co|co|net|org|ac|gov|nic","in":"co|net|ac|ernet|gov|nic|res|gen|firm|mil|org|ind","ir":"ac|co|gov|id|net|org|sch","je":"ac|co|net|org|gov|ind|jersey|ltd|sch","jo":"com|org|net|gov|edu|mil","jp":"ad|ac|co|go|or|ne|gr|ed|lg|net|org|gov|hokkaido|aomori|iwate|miyagi|akita|yamagata|fukushima|ibaraki|tochigi|gunma|saitama|chiba|tokyo|kanagawa|niigata|toyama|ishikawa|fukui|yamanashi|nagano|gifu|shizuoka|aichi|mie|shiga|kyoto|osaka|hyogo|nara|wakayama|tottori|shimane|okayama|hiroshima|yamaguchi|tokushima|kagawa|ehime|kochi|fukuoka|saga|nagasaki|kumamoto|oita|miyazaki|kagoshima|okinawa|sapporo|sendai|yokohama|kawasaki|nagoya|kobe|kitakyushu|utsunomiya|kanazawa|takamatsu|matsuyama","kh":"com|net|org|per|edu|gov|mil","kr":"ac|co|go|ne|or|pe|re|seoul|kyonggi","kw":"com|net|org|edu|gov","la":"com|net|org","lb":"com|org|net|edu|gov|mil","lc":"com|edu|gov|net|org","lv":"com|net|org|edu|gov|mil|id|asn|conf","ly":"com|net|org","ma":"co|net|org|press|ac","mk":"com","mm":"com|net|org|edu|gov","mn":"com|org|edu|gov|museum","mo":"com|net|org|edu|gov","mt":"com|net|org|edu|tm|uu","mx":"com|net|org|gob|edu","my":"com|org|gov|edu|net","na":"com|org|net|alt|edu|cul|unam|telecom","nc":"com|net|org","ng":"ac|edu|sch|com|gov|org|net","ni":"gob|com|net|edu|nom|org","np":"com|net|org|gov|edu","nz":"ac|co|cri|gen|geek|govt|iwi|maori|mil|net|org|school","om":"com|co|edu|ac|gov|net|org|mod|museum|biz|pro|med","pa":"com|net|org|edu|ac|gob|sld","pe":"edu|gob|nom|mil|org|com|net","pg":"com|net|ac","ph":"com|net|org|mil|ngo","pl":"aid|agro|atm|auto|biz|com|edu|gmina|gsm|info|mail|miasta|media|mil|net|nieruchomosci|nom|org|pc|powiat|priv|realestate|rel|sex|shop|sklep|sos|szkola|targi|tm|tourism|travel|turystyka","pk":"com|net|edu|org|fam|biz|web|gov|gob|gok|gon|gop|gos","ps":"edu|gov|plo|sec","pt":"com|edu|gov|int|net|nome|org|publ","py":"com|net|org|edu","qa":"com|net|org|edu|gov","re":"asso|com|nom","ro":"com|org|tm|nt|nom|info|rec|arts|firm|store|www","ru":"com|net|org|gov|pp","sa":"com|edu|sch|med|gov|net|org|pub","sb":"com|net|org|edu|gov","sd":"com|net|org|edu|sch|med|gov","se":"tm|press|parti|brand|fh|fhsk|fhv|komforb|kommunalforbund|komvux|lanarb|lanbib|naturbruksgymn|sshn|org|pp","sg":"com|net|org|edu|gov|per","sh":"com|net|org|edu|gov|mil","st":"gov|saotome|principe|consulado|embaixada|org|edu|net|com|store|mil|co","sv":"com|org|edu|gob|red","sy":"com|net|org|gov","th":"ac|co|go|net|or","tn":"com|net|org|edunet|gov|ens|fin|nat|ind|info|intl|rnrt|rnu|rns|tourism","tr":"com|net|org|edu|gov|mil|bbs|k12|gen","tt":"co|com|org|net|biz|info|pro|int|coop|jobs|mobi|travel|museum|aero|name|gov|edu|nic|us|uk|ca|eu|es|fr|it|se|dk|be|de|at|au","tv":"co","tw":"com|net|org|edu|idv|gov","ua":"com|net|org|edu|gov","ug":"ac|co|or|go","uk":"co|me|org|edu|ltd|plc|net|sch|nic|ac|gov|nhs|police|mod","us":"dni|fed","uy":"com|edu|net|org|gub|mil","ve":"com|net|org|co|edu|gov|mil|arts|bib|firm|info|int|nom|rec|store|tec|web","vi":"co|net|org","vn":"com|biz|edu|gov|net|org|int|ac|pro|info|health|name","vu":"com|edu|net|org|de|ch|fr","ws":"com|net|org|gov|edu","yu":"ac|co|edu|org","ye":"com|net|org|gov|edu|mil","za":"ac|alt|bourse|city|co|edu|gov|law|mil|net|ngo|nom|org|school|tm|web","zw":"co|ac|org|gov","org":"eu|dk","com":"au|br|cn|de|eu|gb|hu|no|qc|ru|sa|se|uk|us|uy|za","net":"de|gb|uk","no":"tel","nr":"fax|mob|mobil|mobile|tel|tlf","arpa":"e164"};

// Compute hexadecimal hash and convert it to Base-64.
var customBase64Hash = function (str, hashFunction) {
	var hash = hashFunction(str).toString(encBase64);
	return customBase64(hash);
};

// Replace non-alphanumeric characters and padding in the Base-64 alphabet to
// comply with most password policies.
var customBase64 = function (str) {
	return str.replace(/\+/g, '9').replace(/\//g, '8').replace(/\=/g, 'A');
};

// Loop ten times using the hash function, then continue hashing until the
// password policy is satisfied.
var generatePassword = function (hashInput, length, hashFunction) {

	var i = 0;
	var generatedPassword = hashInput;
	var passwordIsInvalid = true;

	// Hash until password is valid.
	while (passwordIsInvalid) {
		i++;
		generatedPassword = hashFunction(generatedPassword);
		passwordIsInvalid = i < 10 || !validatePassword(generatedPassword, length);
	}

	return generatedPassword.substring(0, length);

};

// Validate a password to the standards of SuperGenPass.
var validatePassword = function (str, length) {

	// Cut password to requested length.
	var password = str.substring(0, length);

	// 1. Password must start with a lowercase letter [a-z].
	// 2. Password must contain at least one uppercase letter [A-Z].
	// 3. Password must contain at least one numeral [0-9].
	var startsWithLowercaseLetter = /^[a-z]/;
	var containsUppercaseLetter   = /[A-Z]/;
	var containsNumeral           = /[0-9]/;

	// Return true if all tests are satisfied.
	return startsWithLowercaseLetter.test(password) &&
	       containsUppercaseLetter.test(password) &&
	       containsNumeral.test(password);

};

var validatePasswordInput = function (str) {
	var type = typeof str;
	if (type !== 'string') {
		throw new Error('Password must be a string, received ' + type);
	}
};

var validateCombinedPasswordInput = function (str) {
	if (!str.length) {
		throw new Error('Combined password input must not be empty');
	}
};

var validateMethod = function (method) {
	if (!hashFunctions.hasOwnProperty(method)) {
		throw new Error('Method not supported: ' + method);
	}
};

var validateLength = function (num) {
	if (num !== parseInt(num, 10) || num < 4 || 24 < num) {
		throw new Error('Length must be an integer between 4 and 24: ' + num);
	}
};

var validateOptions = function (options) {

	options = options || {};

	// Loop through defaults and test for undefined options.
	for (var option in defaults) {
		if (typeof options[option] === 'undefined') {
			options[option] = defaults[option];
		}
	}

	validatePasswordInput(options.secret);
	validateMethod(options.method);
	validateLength(options.length);

	return options;

};

// Isolate the domain name of a URL.
var getDomainName = function (url, removeSubdomains) {

	var domain = /^(?:[a-z]+:\/\/)?(?:[^/@]+@)?([^/:]+)/i;
	var ipAddress = /^\d{1,3}\.\d{1,3}.\d{1,3}\.\d{1,3}$/;
	var match = url.match(domain);
	var hostname;

	if (match) {
		hostname = match[1];
	} else {
		throw new Error('URL is invalid: ' + url);
	}

	// If the hostname is an IP address, no further processing can be done.
	if (hostname.match(ipAddress)) {
		return hostname;
	}

	// Return the hostname with subdomains removed, if requested.
	return (removeSubdomains) ? cleanDomainName(hostname) : hostname;

};

// Remove subdomains while respecting a number of hard-coded secondary ccTLDs.
var cleanDomainName = function (hostname) {

	var hostnameParts = hostname.split('.');
	var tld = hostnameParts.pop();
	var ccTLDs;

	// A hostname with less than three parts is as short as it will get.
	if (hostnameParts.length < 2) {
		return hostname;
	}

	// Loop through list of ccTLDs.
	if (ccTLDList.hasOwnProperty(tld)) {
		ccTLDs = ccTLDList[tld].split('|');
		for (var i = 0; i < ccTLDs.length; i++) {
			var ccTLDParts = ccTLDs[i].split('.');
			var ccTLDIndex = 0 - ccTLDParts.length;
			// If there's a match, return the ccTLD plus one extra part.
			if (hostnameParts.slice(ccTLDIndex).join('.') === ccTLDs[i]) {
				return hostnameParts.slice(ccTLDIndex - 1).join('.') + '.' + tld;
			}
		}
	}

	// If no ccTLDs were matched, return the final two parts of the hostname.
	return hostnameParts.pop() + '.' + tld;

};

var api = function (masterPassword, url, options) {

	options = validateOptions(options);
	validatePasswordInput(masterPassword);
	validateCombinedPasswordInput(masterPassword + options.secret);

	var domain = getDomainName(url, options.removeSubdomains);
	var input = masterPassword + options.secret + ':' + domain;

	return generatePassword(input, options.length, hashFunctions[options.method]);

};

api.hostname = function (url, options) {
	options = validateOptions(options);
	return getDomainName(url, options.removeSubdomains);
};

module.exports = api;
