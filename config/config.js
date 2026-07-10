/* Config Sample
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 *
 * PORTRAIT LAYOUT (1080x1920) — module regions:
 *   top_bar      → MMM-FlipClock (big, centered)
 *   top_left     → weather   |   top_right → calendar "Notable Days"  (side-by-side pair)
 *   upper_third  → MMM-Multimonth (full-width, months in a row)
 *   bottom_bar   → newsfeed (CSS moves it just above the photos)
 *   fullscreen_below → MMM-Wallpaper (CSS pins it to the bottom band)
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

	useHttps: true,									// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "certs/private.key",			// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "certs/certificate.crt",		// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",

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
			position: 'top_bar',					// PORTRAIT: full-width clock at the very top
			config:
			{
					showDate: false					// date is shown by the default clock module below the cards
			}

		},


		{
			module: "MMM-Wallpaper",
			position: "fullscreen_below",			// PORTRAIT: CSS pins this to the bottom band, full width
			config:
			{
					source: "local:/home/pi5/Pictures/Magic Mirror Pics",
					caption: false,
					slideInterval: 30 * 1000,
					maximumEntries: 10000,
					shuffle: true,
					crossfade: true

			}
		},


		{
			module: "weather",
			position: "top_left",					// PORTRAIT: left half of the side-by-side pair
			config:
			{
					weatherProvider: "openmeteo",
					type: "current",
					lat: 12.97694,
					lon: 80.22972
			}
		},
		{
			module: "clock",
			position: "top_bar",					// PORTRAIT: date line between flip clock and the cards
			config:
			{
					showTime: false,				// date only — time is the flip clock's job
					showDate: true,
					dateFormat: "dddd, LL"
			}
		},

		{
			module: 'MMM-Multimonth',
			position: 'upper_third',				// PORTRAIT: full-width band below the date line
			config:
			{
					monthsVertical: false			// lay the 3 months in a horizontal row
			}
		},

		{
			module: "calendar",
			header: "Notable Days",
			position: "top_right",					// PORTRAIT: right half of the side-by-side pair
			config:
			{
					fade: false,					// no dimming of later entries

					calendars:
					[
					{
						fetchInterval: 3 * 60 * 60 * 1000,						// 3h — short enough that a transient fetch failure (e.g. cert rotation) self-heals same-day instead of waiting a week
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


		{
			module: "newsfeed",
			position: "bottom_bar",					// PORTRAIT: CSS lifts this just above the photo band
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
				broadcastNewsUpdates: true,
				wrapTitle: false,				// single line — CSS scrolls it as a ticker
				updateInterval: 18 * 1000,		// must match the 18s news-ticker CSS animation
				animationSpeed: 0				// no fade — headlines swap off-screen
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
