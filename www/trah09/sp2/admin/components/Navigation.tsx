import { Menu } from '@contember/admin'
import { TenantMenuItem } from '@mangoweb/contember-plugins'

export const Navigation = () => (
	<Menu>
		<Menu.Item>
			<Menu.Item title="Home page" to="homePage" />
			<Menu.Item title="Course" to="course" />
			<Menu.Item title="Reservations" to="reservations" />
			{/* <Menu.Item title="General" to="general" /> */}
			{/* <Menu.Item title="Header" to="header" /> */}
			{/* <Menu.Item title="Generic pages" to="genericPage/list" /> */}
			{/* <Menu.Item title="Contact submissions" to="contactSubmission/list" /> */}
			{/* <Menu.Item title="Redirects" to="redirect/list" /> */}
			<Menu.Item title="Locales" to="locale" />
			<TenantMenuItem />
		</Menu.Item>
	</Menu>
)
