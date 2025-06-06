import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from './breadcrumb'

interface Link {
  path: string
  name: string
  id: number
}

interface Props {
  links: Link[]
  page: string
}

export const AppBreadcrump: React.FC<Props> = ({ links, page }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map((link) => (
          <BreadcrumbItem key={link.id}>
            <BreadcrumbLink href={link.path}>{link.name}</BreadcrumbLink>
          </BreadcrumbItem>
        ))}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{page}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
