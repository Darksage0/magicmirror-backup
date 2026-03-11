													/* Config Sample
													*
													* For more information on how you can configure this file
													* see https://docs.magicmirror.builders/configuration/introduction.html
													* and https://docs.magicmirror.builders/modules/configuration.html
													*
													* You can use environment variables using a `config.js.template` file instead of `config.js`
													* which will be converted to `config.js` while starting. For more information
													* see https://docs.magicmirror.builders/configuration/introduction.html#enviromnent-variables
													*/
let config = 
{
	address: "0.0.0.0",								// Address to listen on, can be:
													// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
													// - another specific IPv4/6 to listen on a specific interface
													// - "0.0.0.0", "::" to listen on any interface
													// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/",									// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
													// you must set the sub path here. basePath must end with a /
	ipWhitelist: [],								// Set [] to allow all IP addresses
													// or add a specific IPv4 of 192.168.1.5 :
													// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
													// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
													// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: true,									// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "certs/private.key",			// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "certs/certificate.crt",		// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",   								// this variable is provided as a consistent location
													// it is currently only used by 3rd party modules. no MagicMirror code uses this value
													// as we have no usage, we  have no constraints on what this field holds
													// see https://en.wikipedia.org/wiki/Locale_(computer_software) for the possibilities

	logLevel: ["INFO", "LOG", "WARN", "ERROR"], 	// Add "DEBUG" for even more logging
	timeFormat: 12,
	units: "metric",

	modules:
	 [

		{
			module: "alert",
		},


		{
			module: "updatenotification",
			position: "top_bar"
		},


		{
  			 module: 'MMM-FlipClock',
    		 position: 'top_left',
   			 config: 
			 {
       												 // See 'Configuration options' for more information.
    		 }

		},


		{
			module: "MMM-Wallpaper",
			position: "fullscreen_below",
			config: 
			{ 										// See "Configuration options" for more information.
					source: "local:/home/pi5/Pictures/Magic Mirror Pics",
					caption: false,
					slideInterval: 30 * 1000,		// Change slides every minute
					maximumEntries: 10000,
					shuffle: true,
					crossfade: true
													
			}
		},


		/*		
		{
			module: "clock",
			position: "top_left"
		},		
		*/ 											//closing default clock module
		
		
		/*
		{
			module: "compliments",
			position: "lower_third"
		},
		*/ 											//closing compliment module
		
		
		{
			module: "weather",
			position: "top_right",
			config: 
			{
					weatherProvider: "openmeteo",
					type: "current",
					lat: 12.97694,
					lon: 80.22972
			}
		},
		{
			module: 'MMM-Multimonth',
			position: 'top_right', 					// can be any of the postions
			config: 
			{ 										// Optional - will default to 3 months, with one previous and one next, vertical orientation.
			}
		},

		{
			module: "calendar",
			header: "Notable Days",
			position: "top_right",
			config: 
			{
					calendars: 
					[
					{
						fetchInterval: 7 * 24 * 60 * 60 * 1000,
						symbol: "calendar-check",
						url: "https://www.officeholidays.com/ics-all/india/tamil-nadu"
					}
					],
					
			customEvents: [
													// Array of {keyword: "", symbol: "", color: "", eventClass: ""} where Keyword is a regexp and symbol/color/eventClass are to be applied for matched
			{ keyword: ".*", transform: { search: "Regional Holiday", replace: "" } },
			{ keyword: ".*", transform: { search: "\\(", replace: "" } },
			{ keyword: ".*", transform: { search: "\\)", replace: "" } },
			{ keyword: ".*", transform: { search: "Not a Public Holiday", replace: "" } }
		],
			}
		},


		


		/*
		{
			module: "weather",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				weatherProvider: "openmeteo",
				type: "forecast",
				lat: 12.97694,
				lon: 80.22972
			}
		},
		*/


		{
			module: "newsfeed",
			position: "bottom_bar",
			config: 
			{
				feeds: 
					[
					{
						title: "The Hindu",
						url: "https://www.thehindu.com/feeder/default.rss"
					}
					],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true
			}
		},


		
		{
			module: "MMM-mmpm",
			position: "",
		},
				
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }
