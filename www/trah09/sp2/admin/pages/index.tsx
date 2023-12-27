import { Component, DataBindingProvider, EntityListSubTree, FeedbackRenderer, Page } from '@contember/admin'

export default () => (
	<Page name="index">
		<DataBindingProvider stateComponent={FeedbackRenderer}>
			<In />
		</DataBindingProvider>
	</Page>
)

const In = Component(() => <EntityListSubTree entities="Locale" alias="locale" />)
