import { Box, EditPage, HasOne, Repeater, RichTextField, Section, SelectField, TextField } from '@contember/admin'
import { ImageField, LocaleSideDimension, SeoField } from '@mangoweb/contember-plugins'
import { LinkUrlField } from '../components/LinkUrlField'

export default () => (
	<EditPage
		pageName="homePage"
		entity="HomePage(unique=One)"
		setOnCreate="(unique = One)"
		rendererProps={{ title: 'Home page' }}
	>
		<LocaleSideDimension>
			<LinkUrlField label="url" derivedFrom="title" />
		</LocaleSideDimension>
		<Section heading="Hero">
			<LocaleSideDimension>
				<TextField field="title" label="Title" />
				<RichTextField field="description" label="Description" />
				<ImageField field="image" label="Image" />
			</LocaleSideDimension>
		</Section>
		<Section heading="Contact section">
			<RichTextField field="address" label="Address" />
			<TextField field="email" label="Email" />
			<TextField field="tel" label="Tel" />
		</Section>
		<Section heading="Form fields">
			<LocaleSideDimension>
				<HasOne field="formFields">
					<TextField field="successMessage" label="Success message" />
					<TextField field="errorMessage" label="Error message" />
					<Box header="Name">
						<TextField field="name" label="Name" />
						<TextField field="nameRequiredMessage" label="Name require message" />
					</Box>
					<Box header="Email">
						<TextField field="email" label="Email" />
						<TextField field="emailRequiredMessage" label="Email require message" />
					</Box>
					<Box header="Phone">
						<TextField field="phone" label="Phone" />
						<TextField field="phoneRequiredMessage" label="Phone require message" />
					</Box>
					<Box>
						<TextField field="numberOfPeople" label="Number of people" />
						<TextField field="date" label="Date" />
						<TextField field="vacancies" label="Vacancies" />
						<TextField field="note" label="Note" />
					</Box>
					<Box header="Submit button label">
						<TextField field="submitButtonLabel" label="Submit button label" />
					</Box>
				</HasOne>
			</LocaleSideDimension>
		</Section>
		<Section heading="Socials">
			<HasOne field="socials">
				<Repeater field="items" label="Items" sortableBy="order">
					<HasOne field="socialLink">
						<SelectField
							field="type"
							label="Type"
							options={[
								{ label: 'Facebok', value: 'facebook' },
								{ label: 'Instagram', value: 'instagram' },
							]}
						/>
						<TextField field="url" label="Url" />
					</HasOne>
				</Repeater>
			</HasOne>
		</Section>
		<LocaleSideDimension>
			<SeoField field="seo" />
		</LocaleSideDimension>
	</EditPage>
)
