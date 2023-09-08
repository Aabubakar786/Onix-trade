/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, createContext, useContext, useEffect, useState} from 'react'

export interface PageLink {
  title: string
  path: string
  isActive: boolean
  isSeparator?: boolean
}

export interface PageDataContextModel {
  pageTitle?: string
  addButtonText?: string
  showAddButton?: boolean
  addButtonURL?: string
  setPageTitle: (_title: string) => void
  pageDescription?: string
  setPageDescription: (_description: string) => void
  setShowAddButton: (show: boolean) => void
  setAddButtonText: (text: string) => void
  setAddButtonURL: (url: string) => void
  pageBreadcrumbs?: Array<PageLink>
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => void
}

const PageDataContext = createContext<PageDataContextModel>({
  setPageTitle: (_title: string) => {},
  setPageBreadcrumbs: (_breadcrumbs: Array<PageLink>) => {},
  setPageDescription: (_description: string) => {},
  setShowAddButton: (show: boolean) => {},
  setAddButtonText: (text: string) => {},
  setAddButtonURL: (url: string) => {},
})

const PageDataProvider: React.FC = ({children}) => {
  const [pageTitle, setPageTitle] = useState<string>('')
  const [showAddButton, setShowAddButton] = useState<boolean>(false)
  const [addButtonText, setAddButtonText] = useState<string>('')
  const [addButtonURL, setAddButtonURL] = useState<string>('')
  const [pageDescription, setPageDescription] = useState<string>('')
  const [pageBreadcrumbs, setPageBreadcrumbs] = useState<Array<PageLink>>([])
  const value: PageDataContextModel = {
    pageTitle,
    setPageTitle,
    showAddButton,
    setShowAddButton,
    addButtonText,
    setAddButtonText,
    addButtonURL,
    setAddButtonURL,
    pageDescription,
    setPageDescription,
    pageBreadcrumbs,
    setPageBreadcrumbs,
  }
  return <PageDataContext.Provider value={value}>{children}</PageDataContext.Provider>
}

function usePageData() {
  return useContext(PageDataContext)
}

type Props = {
  description?: string
  breadcrumbs?: Array<PageLink>
  showAddButton?: boolean
  addButtonText?: string
  addButtonURL?: string
}

const PageTitle: FC<Props> = ({
  children,
  description,
  breadcrumbs,
  showAddButton,
  addButtonText,
  addButtonURL,
}) => {
  const {
    setPageTitle,
    setPageDescription,
    setPageBreadcrumbs,
    setAddButtonText,
    setAddButtonURL,
    setShowAddButton,
  } = usePageData()
  useEffect(() => {
    if (children) {
      setPageTitle(children.toString())
    }
    return () => {
      setPageTitle('')
    }
  }, [children])

  useEffect(() => {
    if (description) {
      setPageDescription(description)
    }
    return () => {
      setPageDescription('')
    }
  }, [description])

  useEffect(() => {
    if (breadcrumbs) {
      setPageBreadcrumbs(breadcrumbs)
    }
    return () => {
      setPageBreadcrumbs([])
    }
  }, [breadcrumbs])
  useEffect(() => {
    if (showAddButton) {
      setShowAddButton(showAddButton)
    }
    return () => {
      setShowAddButton(false)
    }
  }, [showAddButton])
  useEffect(() => {
    if (addButtonText) {
      setAddButtonText(addButtonText)
    }
    return () => {
      setAddButtonText('')
    }
  }, [addButtonText])
  useEffect(() => {
    if (addButtonURL) {
      setAddButtonURL(addButtonURL)
    }
    return () => {
      setAddButtonURL('')
    }
  }, [addButtonURL])

  return <></>
}

const PageDescription: React.FC = ({children}) => {
  const {setPageDescription} = usePageData()
  useEffect(() => {
    if (children) {
      setPageDescription(children.toString())
    }
    return () => {
      setPageDescription('')
    }
  }, [children])
  return <></>
}

export {PageDescription, PageTitle, PageDataProvider, usePageData}
