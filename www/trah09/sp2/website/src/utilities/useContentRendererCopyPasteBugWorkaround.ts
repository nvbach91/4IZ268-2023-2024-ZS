import { useMemo } from 'react'
import type { ContentResult } from '../data/ContentFragment'

export const useContentRendererCopyPasteBugWorkaround = (blocks: ContentResult['blocks']) =>
	useMemo(() => {
		const allReferences: ContentResult['blocks'][number]['references'] = []

		return blocks.map((block) => {
			allReferences.push(...block.references)

			return { ...block, references: allReferences }
		})
	}, [blocks])
