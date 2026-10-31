import type { ReactNode } from "react"
import "./PageHeader.css"

export type PageHeaderProps = {
  title: string
  subtitle?: string
  /** Status next to the title — usually a `Badge`. */
  badge?: ReactNode
  /** Back link, when the page sits inside a flow. */
  back?: ReactNode
  actions?: ReactNode
}

/** The page header.
 *
 *  The title renders as `h1`: the page needs exactly one, and this is it.
 *  Getting that wrong is invisible on screen and immediately obvious to anyone
 *  navigating by headings. */
export function PageHeader({
  title,
  subtitle,
  badge,
  back,
  actions,
}: PageHeaderProps) {
  return (
    <header className="vv-page-header">
      <div className="vv-page-header__main">
        {back}
        <div className="vv-page-header__top">
          <h1 className="vv-page-header__title">{title}</h1>
          {badge}
        </div>
        {subtitle && <span className="vv-page-header__subtitle">{subtitle}</span>}
      </div>
      {actions && <div className="vv-page-header__actions">{actions}</div>}
    </header>
  )
}
