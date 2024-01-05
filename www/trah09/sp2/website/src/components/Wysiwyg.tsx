import { RichTextRenderer } from '@contember/react-client'
import type { FunctionComponent, ReactNode } from 'react'
import style from './Wysiwyg.module.sass'

// @TODO: exclusive - source or children but not both
export type WysiwygProps = {
	source?: string
	children?: ReactNode
}

export const Wysiwyg: FunctionComponent<WysiwygProps> = ({ source, children }) => {
	return <div className={style.wrapper}>{source ? <RichTextRenderer source={source} /> : children}</div>
}
