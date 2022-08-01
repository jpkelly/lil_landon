var AWS = require('aws-sdk');
var fs = require('fs');

AWS.config.update({
	region: 'us-west-1'
});

console.log('Writing entries to Accessibility table.');

var dynamodb = new AWS.DynamoDB.DocumentClient();
var accessibilitiesData = JSON.parse(fs.readFileSync('../components/data/accessibility.json', 'utf8'));

accessibilitiesData.forEach(function (text) {
	var params = {
		TableName: 'Accessibility',
		Item: {
			text: text.text
		}
	};

	dynamodb.put(params, function (err, data) {
		if (err) console.error('Unable to load data into table for accessibility', text.text, '. Error: ', JSON.stringify(err, null, 2));
		else console.log('Added', text.text, 'to table.');
	});
});
