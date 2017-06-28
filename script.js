

function generateImages() {
	var numberOfImages = 5;
	var imageSet = [];
	for(var i = 0; i < numberOfImages; i++) {
		$.ajax({
			method: 'GET',
			dataType: 'json',
			url: 'https://source.unsplash.com/random/400x300',
			success: function(response) {
				console.log(response);
				console.log('yay')
			},
			error: function(err) {
				console.log('noo', err);
			}
		})
	}
}

// Application ID d349d0fb3f9aa57463894e9d910e3cb8bfac189eade38d25cab16c02c1b014bc
// Secret 54e7fea5f41c959c33d39ce2f7839b96414208b455e17a4c10384a6ce773042a
// Callback URLs
// urn:ietf:wg:oauth:2.0:oob (Authorize)
// Rate Limit by hour
// 50 (50 requests remaining this hour)
// Request Usage
// No request usage data to display