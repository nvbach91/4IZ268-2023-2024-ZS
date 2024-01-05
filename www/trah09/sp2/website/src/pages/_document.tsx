import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class AppDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<meta name="color-scheme" content="light" />
					<meta name="theme-color" media="(prefers-color-scheme: light)" content="#FFFFFF" />
					{/* <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000000" /> */}
					<link rel="manifest" href="/app.webmanifest" />
					{/* disable auto format detection (https://stackoverflow.com/questions/226131/how-to-disable-phone-number-linking-in-mobile-safari), which causes hydratation issue. */}
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
					<link
						href="https://fonts.googleapis.com/css2?family=Anton&family=Roboto:wght@400;700&display=swap"
						rel="stylesheet"
					/>
					<meta name="format-detection" content="telephone=no,date=no,address=no,email=no,url=no" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
