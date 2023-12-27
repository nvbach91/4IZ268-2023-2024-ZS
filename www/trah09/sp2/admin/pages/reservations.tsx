import { DataGridPage, DeleteEntityButton, GenericCell, LinkButton, TextCell } from '@contember/admin'

export default () => (
	<DataGridPage entities="Reservation" itemsPerPage={50} rendererProps={{ title: 'Reservation' }}>
		<TextCell field="name" header="Name" />
		<GenericCell shrunk>
			<LinkButton to="reservationDetail(id: $entity.id)">Detail</LinkButton>
		</GenericCell>
		<GenericCell shrunk canBeHidden={false} justification="justifyEnd">
			<DeleteEntityButton immediatePersist />
		</GenericCell>
	</DataGridPage>
)
