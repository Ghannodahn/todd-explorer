import React, { useMemo, useState, useEffect } from 'react'
import { marked } from 'marked'
import './markdown-viewer.css'

interface MarkdownViewerProps {
  content: string
  contentUrl?: string
}

/**
 * Renders markdown content with consistent styling using marked
 * @param content The markdown content to render
 * @param contentUrl Optional URL to fetch markdown content from
 */
const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content, contentUrl }) => {
  const [fetchedContent, setFetchedContent] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log('contentUrl:', contentUrl);
    if (contentUrl && contentUrl.trim() !== '') {
      setIsLoading(true)
      setError(null)

      console.log('fetching' + contentUrl)
      fetch(contentUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch content: ${response.status} ${response.statusText}`)
          }
          return response.text()
        })
        .then(data => {
          setFetchedContent(data)
          setIsLoading(false)
        })
        .catch(err => {
          console.error('Error fetching markdown content:', err)
          setError(`Failed to load content: ${err.message}`)
          setIsLoading(false)
        })
    }
  }, [contentUrl])

  const displayContent = useMemo(() => {
    // Use fetchedContent if available, otherwise fall back to the content prop
    const sourceContent: string = fetchedContent !== null ? fetchedContent as string : content as string

    if (sourceContent) {
      return marked.parse(sourceContent)
    } else {
        return ''
    }
  }, [fetchedContent, content])

  if (isLoading) {
    return <div className="markdown-content">Loading content...</div>
  }

  if (error) {
    return (
      <div className="markdown-content">
        <p className="error">{error}</p>
        {/* Display the fallback content if there's an error */}
        <div dangerouslySetInnerHTML={{ __html: marked.parse(content) }} />
      </div>
    )
  }

  return (
    <div 
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: displayContent }} 
    />
  )
}

export default MarkdownViewer