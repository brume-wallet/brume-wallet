import { LocaleProvider } from "@/mods/foreground/global/mods/locale";
import { Overlay } from "@/mods/foreground/overlay/overlay";
import { Router } from "@/mods/foreground/router/router";

export default function Main() {
  return <LocaleProvider value={undefined}>
    <main id="main" className="p-safe h-full w-full flex flex-col overflow-hidden animate-opacity-in">
      <Overlay>
        <Router />
      </Overlay>
    </main>
  </LocaleProvider>
}
