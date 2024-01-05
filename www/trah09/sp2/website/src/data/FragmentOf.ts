import type { GraphQLTypes, InputType } from '../../generated/contember/zeus'
import type { scalars } from '../utilities/scalars'

export type FragmentOf<Name extends keyof GraphQLTypes, Fragment> = InputType<
	GraphQLTypes[Name],
	Fragment extends (...args: infer Args) => unknown ? ReturnType<Fragment> : Fragment,
	typeof scalars
>
