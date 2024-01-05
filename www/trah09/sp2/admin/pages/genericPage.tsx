import {
	Component,
	CreatePage,
	DataGridPage,
	EditPage,
	GenericCell,
	LinkButton,
	NavigateBackButton,
	TextCell,
	TextField,
	useCurrentRequest,
} from '@contember/admin'
import { DeleteEntityButton, EditButton, LocaleSideDimension, SeoField } from '@mangoweb/contember-plugins'
import { ContentEditor } from '../components/ContentEditor'
import { LinkUrlField } from '../components/LinkUrlField'

export const List = () => {
	const request = useCurrentRequest()

	return (
		<DataGridPage
			entities="GenericPage"
			itemsPerPage={50}
			rendererProps={{
				title: 'Generic pages',
				actions: <LinkButton to="genericPage/create">Add generic page</LinkButton>,
			}}
		>
			{request?.dimensions.locale.map((localeCode) => (
				<TextCell
					key={localeCode}
					disableOrder
					field={`locales(locale.code = '${localeCode}').title`}
					header={`Title (${localeCode})`}
				/>
			))}
			<GenericCell canBeHidden={false} justification="justifyEnd" shrunk>
				<EditButton pageName="genericPage/edit">Edit</EditButton>
			</GenericCell>
			<GenericCell canBeHidden={false} justification="justifyEnd" shrunk>
				<DeleteEntityButton immediatePersist />
			</GenericCell>
		</DataGridPage>
	)
}

const Form = Component(() => (
	<LocaleSideDimension>
		<TextField field="title" label="Title" />
		<LinkUrlField derivedFrom="title" />
		<ContentEditor />
		<SeoField field="seo" titleDerivedFrom="title" compact={false} />
	</LocaleSideDimension>
))

export const create = (
	<CreatePage
		entity="GenericPage"
		rendererProps={{
			title: 'Add a new generic page',
			navigation: <NavigateBackButton to="genericPage/list">Generic pages</NavigateBackButton>,
		}}
		redirectOnSuccess={(request, id) => ({
			...request,
			pageName: 'genericPage/edit',
			parameters: {
				id,
			},
		})}
	>
		<Form />
	</CreatePage>
)

export const edit = (
	<EditPage
		entity="GenericPage(id=$id)"
		rendererProps={{
			title: 'Edit generic page',
			navigation: <NavigateBackButton to="genericPage/list">Generic pages</NavigateBackButton>,
		}}
	>
		<Form />
	</EditPage>
)
