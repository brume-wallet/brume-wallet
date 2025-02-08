import { Director, Localizer } from "@/mods/foreground/global/mods/locale"
import { Locale } from "@/mods/foreground/locale"
import { Nullable } from "@hazae41/option"
import { useEffect, useMemo, useState } from "react"

export interface Params {
  readonly locale: string
}

export function getStaticPaths() {
  return {
    paths: Locale.codes.map(locale => ({ params: { locale } })),
    fallback: false
  }
}

export function getStaticProps(context: {
  readonly params: Params
}) {
  return { props: context.params }
}

export default function Main(props: Params) {
  const { locale } = props

  const [hash, setHash] = useState(location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(location.hash)
    addEventListener("hashchange", onHashChange, { passive: true })
    return () => removeEventListener("hashchange", onHashChange)
  }, [])

  useEffect(() => {
    location.hash = hash
  }, [hash])

  const url = useMemo(() => {
    const url = new URL(`/${locale}/frame`, location.href)
    url.hash = hash
    return url
  }, [hash])

  const [iframe, setIframe] = useState<Nullable<HTMLIFrameElement>>()

  const subwindow = useMemo(() => {
    if (iframe == null)
      return
    if (iframe.contentWindow == null)
      return
    return iframe.contentWindow
  }, [iframe])

  useEffect(() => {
    if (subwindow == null)
      return
    const onSubwindowHashChange = () => setHash(subwindow.location.hash)
    subwindow.addEventListener("hashchange", onSubwindowHashChange, { passive: true })
    return () => subwindow.removeEventListener("hashchange", onSubwindowHashChange)
  }, [subwindow])

  return <Localizer value={locale}>
    <Director>
      <main id="root" className="p-safe h-full w-full flex flex-col overflow-hidden animate-opacity-in">
        <iframe className="grow w-full"
          ref={setIframe}
          src={url.href}
          seamless />
      </main>
    </Director>
  </Localizer>
}